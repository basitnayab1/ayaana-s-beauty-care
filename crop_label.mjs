import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 800 });

  const imgPath = path.resolve('public/assets/whitening_toner.png');
  const imgBase64 = fs.readFileSync(imgPath).toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000;">
        <img id="img" src="data:image/png;base64,${imgBase64}" />
        <canvas id="cv"></canvas>
      </body>
    </html>
  `);

  await page.waitForSelector('#img');

  const crops = await page.evaluate(() => {
    const img = document.getElementById('img');
    const cv = document.getElementById('cv');
    cv.width = img.naturalWidth;
    cv.height = img.naturalHeight;
    const ctx = cv.getContext('2d');
    ctx.drawImage(img, 0, 0);

    function crop(x, y, w, h) {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const cx = c.getContext('2d');
      cx.drawImage(cv, x, y, w, h, 0, 0, w, h);
      return c.toDataURL('image/png');
    }

    // Label on middle bottle:
    // Left edge ~ 443, right edge ~ 577, width ~ 134
    // Top of label ~ 418? Wait, top of white label is around 365!
    // Bottom of white label is around 560!
    // Height of white label ~ 195
    return {
      middleFullLabel: crop(443, 360, 134, 205),
      rightFullLabel: crop(622, 360, 134, 205),
      leftFullLabel: crop(264, 360, 134, 205),
      middleBottleFull: crop(420, 130, 180, 580)
    };
  });

  fs.writeFileSync('public/assets/toner_label_middle_full.png', Buffer.from(crops.middleFullLabel.split(',')[1], 'base64'));
  fs.writeFileSync('public/assets/toner_label_right_full.png', Buffer.from(crops.rightFullLabel.split(',')[1], 'base64'));
  fs.writeFileSync('public/assets/toner_label_left_full.png', Buffer.from(crops.leftFullLabel.split(',')[1], 'base64'));
  fs.writeFileSync('public/assets/toner_bottle_middle_full.png', Buffer.from(crops.middleBottleFull.split(',')[1], 'base64'));

  console.log('Saved full label crops successfully!');
  await browser.close();
}

run().catch(console.error);
