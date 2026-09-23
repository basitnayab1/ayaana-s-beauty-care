import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1000 });

  const rightLabelBase64 = fs.readFileSync('public/assets/toner_label_right_full.png').toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      </head>
      <body style="margin:0; background:#222;">
        <canvas id="labelCanvas" width="1024" height="512"></canvas>
      </body>
    </html>
  `);

  await page.evaluate(async (labelImgB64) => {
    await document.fonts.ready;

    const cv = document.getElementById('labelCanvas');
    const ctx = cv.getContext('2d');
    const W = cv.width;
    const H = cv.height;

    const croppedImg = new Image();
    await new Promise((res) => {
      croppedImg.onload = res;
      croppedImg.src = 'data:image/png;base64,' + labelImgB64;
    });

    // 1. Pearl White Silk Label Background
    ctx.fillStyle = '#FCFAF8';
    ctx.fillRect(0, 0, W, H);

    // Subtle satin highlight
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, 'rgba(235, 227, 222, 0.4)');
    grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(1, 'rgba(235, 227, 222, 0.4)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Rose Gold Hairline Trim
    const goldGrad = ctx.createLinearGradient(0, 0, W, 0);
    goldGrad.addColorStop(0, '#D6A685');
    goldGrad.addColorStop(0.5, '#E8B4A5');
    goldGrad.addColorStop(1, '#D6A685');
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.lineTo(W, 4);
    ctx.moveTo(0, H - 4);
    ctx.lineTo(W, H - 4);
    ctx.stroke();

    // 2. FRONT FACE ARTWORK (Center of texture: centered at W/2 = 512)
    const labelW = 310;
    const labelH = 465;
    const labelX = (W - labelW) / 2;
    const labelY = (H - labelH) / 2 - 2;

    ctx.save();
    // Use multiply blend twice to deepen rich tones (logo, writing, flowers)
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(croppedImg, labelX, labelY, labelW, labelH);
    ctx.drawImage(croppedImg, labelX, labelY, labelW, labelH);
    ctx.restore();

    // 3. BACK & SIDES
    // LEFT SIDE: Directions
    ctx.fillStyle = '#2A2520';
    ctx.font = 'bold 13px Montserrat, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('DIRECTIONS FOR USE', 45, 120);

    ctx.font = '11px Montserrat, sans-serif';
    ctx.letterSpacing = '0.2px';
    const lines = [
      'After cleansing, hold spray bottle',
      '8-10 inches away from face and',
      'mist evenly with eyes closed.',
      'Gently pat with clean palms.',
      'Use morning & night for glowing skin.',
      '',
      'KEY BOTANICALS:',
      '• Pure Rose Hydrosol & Niacinamide',
      '• Alpha-Arbutin & Licorice Extract',
      '• Hyaluronic Acid & Pro-Vitamin B5'
    ];
    lines.forEach((l, i) => {
      if (l.startsWith('KEY')) {
        ctx.fillStyle = '#C75678';
        ctx.font = 'bold 11px Montserrat, sans-serif';
      } else {
        ctx.fillStyle = '#554F48';
        ctx.font = '11px Montserrat, sans-serif';
      }
      ctx.fillText(l, 45, 150 + i * 22);
    });

    // RIGHT SIDE: Brand Info
    ctx.fillStyle = '#2A2520';
    ctx.font = 'bold 13px Montserrat, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('AYAANA’S BEAUTY CARE', W - 280, 120);

    ctx.font = '11px Montserrat, sans-serif';
    const rightLines = [
      'Pure Radiance Skincare',
      '100% Halal & Organic Certified',
      'Cruelty-Free • Paraben-Free',
      'Dermatologist Tested Formula',
      '',
      'Net Volume: 120 ml / 4.0 fl oz',
      'Batch No: AY-2026-WT',
      'MFG: 09/2026 • EXP: 09/2028',
      'Made in Pakistan • ayaanas.com'
    ];
    rightLines.forEach((l, i) => {
      if (l.startsWith('Net Volume')) {
        ctx.fillStyle = '#121212';
        ctx.font = 'bold 11.5px Montserrat, sans-serif';
      } else {
        ctx.fillStyle = '#554F48';
        ctx.font = '11px Montserrat, sans-serif';
      }
      ctx.fillText(l, W - 280, 150 + i * 22);
    });

    // Dashed divider
    ctx.strokeStyle = 'rgba(214, 166, 133, 0.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(330, 60);
    ctx.lineTo(330, H - 60);
    ctx.moveTo(W - 330, 60);
    ctx.lineTo(W - 330, H - 60);
    ctx.stroke();
    ctx.setLineDash([]);

  }, rightLabelBase64);

  const dataUrl = await page.evaluate(() => document.getElementById('labelCanvas').toDataURL('image/png'));
  fs.writeFileSync('public/assets/toner_3d_label.png', Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('Regenerated public/assets/toner_3d_label.png with dual multiply!');

  await browser.close();
}

run().catch(console.error);
