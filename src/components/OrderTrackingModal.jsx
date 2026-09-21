import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Search, Truck, CheckCircle2, PackageCheck, MapPin } from 'lucide-react';

export default function OrderTrackingModal() {
  const { isTrackingOpen, setIsTrackingOpen, recentOrders } = useShop();
  const [searchId, setSearchId] = useState('');
  const [activeOrder, setActiveOrder] = useState(() => recentOrders[0] || null);

  if (!isTrackingOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const found = recentOrders.find(
      (o) =>
        o.orderId.toLowerCase() === searchId.trim().toLowerCase() ||
        (o.trackingNo && o.trackingNo.toLowerCase() === searchId.trim().toLowerCase())
    );
    if (found) {
      setActiveOrder(found);
    } else {
      alert(`No order found matching "${searchId}". Try sample ID: AY-89241`);
    }
  };

  const steps = [
    { title: "Order Confirmed", desc: "Formulation and batch verification", icon: CheckCircle2, done: true },
    { title: "Packed in Luxury Gift Box", desc: "Carefully sealed with rose petal ribbon", icon: PackageCheck, done: true },
    { title: "In Transit with Courier", desc: "Handed over to TCS Express / Trax Logistics", icon: Truck, done: true },
    { title: "Out for Delivery", desc: "Rider on route to your doorstep", icon: MapPin, done: false }
  ];

  return (
    <div className="overlay-backdrop modal-overlay" onClick={() => setIsTrackingOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '600px',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(18, 18, 18, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FDFBF7', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck style={{ width: '20px', height: '20px', color: '#121212' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Track Your Luxury Shipment</h3>
          </div>
          <button onClick={() => setIsTrackingOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-scroll-body" style={{ padding: 'clamp(16px, 4vw, 28px)' }}>
          {/* Search Form */}
          <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Order ID (e.g. AY-89241) or Tracking #"
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(18, 18, 18, 0.15)',
                fontSize: '13px',
                outline: 'none',
                backgroundColor: 'var(--bg-surface)'
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '13px' }}
            >
              <Search style={{ width: '14px', height: '14px' }} />
              <span>Track</span>
            </button>
          </form>

          {/* Active Order Tracking Result */}
          {activeOrder && (
            <div>
              {/* Top Order Badge */}
              <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px 20px', borderRadius: '16px', marginBottom: '24px', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#121212' }}>
                    Order #{activeOrder.orderId}
                  </span>
                  <span style={{ background: '#128C7E', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px' }}>
                    {activeOrder.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#736C65' }}>
                  Courier: <strong>{activeOrder.courier}</strong> ({activeOrder.trackingNo}) • Expected Delivery: 24-48 Hours
                </div>
              </div>

              {/* Progress Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '8px' }}>
                {steps.map((st, i) => {
                  const Icon = st.icon;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: st.done ? '#121212' : '#F2ECE4',
                          color: st.done ? '#FFFFFF' : '#9B948C',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          zIndex: 2
                        }}
                      >
                        <Icon style={{ width: '18px', height: '18px' }} />
                      </div>

                      <div style={{ paddingTop: '2px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: st.done ? '#121212' : '#9B948C' }}>
                          {st.title}
                        </h4>
                        <p style={{ fontSize: '12px', color: '#736C65', marginTop: '2px' }}>
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
