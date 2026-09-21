import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Lock,
  Unlock,
  Package,
  ShoppingBag,
  Plus,
  Trash2,
  Edit3,
  Save,
  LogOut,
  Key,
  MessageCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function AdminModal() {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    updateAdminPassword,
    products,
    setProducts,
    addNewProduct,
    deleteProduct,
    recentOrders,
    updateOrderStatus,
    formatPrice
  } = useShop();

  // Login form state
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'orders', 'add-product', 'security'
  const [editingId, setEditingId] = useState(null);
  const [editPricePKR, setEditPricePKR] = useState('');
  const [editStock, setEditStock] = useState('');

  // Add new product form state
  const [newProdData, setNewProdData] = useState({
    name: '',
    tagline: '',
    category: 'repair-creams',
    volume: '50ml',
    pricePKR: '',
    stock: '50',
    image: '/assets/hero_cream.jpg',
    description: ''
  });
  const [newProdSuccess, setNewProdSuccess] = useState(false);

  // Security password change state
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  if (!isAdminOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const res = adminLogin(loginInput, passwordInput);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      setLoginError('');
      setLoginInput('');
      setPasswordInput('');
    }
  };

  const handleStartEdit = (p) => {
    setEditingId(p.id);
    setEditPricePKR(p.pricePKR);
    setEditStock(p.stock);
  };

  const handleSaveEdit = (p) => {
    const updated = products.map((item) => {
      if (item.id === p.id) {
        return {
          ...item,
          pricePKR: Number(editPricePKR) || item.pricePKR,
          stock: Number(editStock) || item.stock
        };
      }
      return item;
    });
    setProducts(updated);
    setEditingId(null);
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProdData.name || !newProdData.pricePKR) {
      alert("Please provide product name and price.");
      return;
    }
    const catObj = CATEGORIES.find((c) => c.id === newProdData.category) || CATEGORIES[1];
    addNewProduct({
      ...newProdData,
      categoryName: catObj.name
    });
    setNewProdSuccess(true);
    setTimeout(() => {
      setNewProdSuccess(false);
      setActiveTab('inventory');
      setNewProdData({
        name: '',
        tagline: '',
        category: 'repair-creams',
        volume: '50ml',
        pricePKR: '',
        stock: '50',
        image: '/assets/hero_cream.jpg',
        description: ''
      });
    }, 1200);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      alert("Password must be at least 4 characters.");
      return;
    }
    updateAdminPassword(newPassword);
    setPasswordSuccess(true);
    setNewPassword('');
    setTimeout(() => setPasswordSuccess(false), 2000);
  };

  if (!isAdminOpen) return null;

  return (
    <div className="overlay-backdrop modal-overlay" onClick={() => setIsAdminOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: isAdminLoggedIn ? '920px' : '440px',
          backgroundColor: '#FFFFFF',
          transition: 'max-width 0.3s ease'
        }}
      >
        {/* 1. If Not Logged In -> Show Admin Login Form */}
        {!isAdminLoggedIn ? (
          <div className="modal-scroll-body">
            {/* Top Bar */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(18, 18, 18, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FDFBF7', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock style={{ width: '18px', height: '18px', color: '#121212' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Owner Login</h3>
              </div>
              <button onClick={() => setIsAdminOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <img
                  src="/assets/logo.png"
                  alt="Ayaana's"
                  style={{ width: '56px', height: '56px', borderRadius: '50%', margin: '0 auto 12px auto', border: '2px solid rgba(226, 130, 159, 0.4)' }}
                />
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#121212' }}>Ayaana’s Owner Portal</h2>
                <p style={{ fontSize: '12px', color: '#736C65', marginTop: '4px' }}>
                  Restricted management access for store owner and inventory.
                </p>
              </div>

              {loginError && (
                <div style={{ backgroundColor: '#FDE8ED', border: '1px solid #E2829F', color: '#C75678', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', lineHeight: 1.4 }}>
                  {loginError}
                </div>
              )}

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#121212', display: 'block', marginBottom: '6px' }}>
                  Username or Email
                </label>
                <input
                  type="text"
                  required
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="admin@ayaanas.com or ayaana"
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(18, 18, 18, 0.15)',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: 'var(--bg-surface)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#121212', display: 'block', marginBottom: '6px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password"
                    style={{
                      width: '100%',
                      padding: '11px 42px 11px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(18, 18, 18, 0.15)',
                      fontSize: '13px',
                      outline: 'none',
                      backgroundColor: 'var(--bg-surface)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#736C65' }}
                  >
                    {showPassword ? <EyeOff style={{ width: '16px', height: '16px' }} /> : <Eye style={{ width: '16px', height: '16px' }} />}
                  </button>
                </div>
              </div>

              {/* Default Credential Helper Note */}
              <div style={{ background: '#F8F4EE', padding: '10px 14px', borderRadius: '8px', fontSize: '11px', color: '#736C65' }}>
                💡 <strong>Default Owner Login:</strong><br />
                User: <code>admin@ayaanas.com</code> (or <code>ayaana</code>)<br />
                Pass: <code>ayaana123</code>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '13px', fontSize: '13.5px', marginTop: '4px' }}
              >
                <Unlock style={{ width: '15px', height: '15px' }} />
                <span>Log In to Owner Portal</span>
              </button>
            </form>
          </div>
        ) : (
          /* 2. If Logged In -> Show Authenticated Admin Dashboard */
          <div>
            {/* Top Navigation */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(18, 18, 18, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FDFBF7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/assets/logo.png" alt="Ayaana's" style={{ width: '34px', height: '34px', borderRadius: '50%' }} />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#121212', lineHeight: 1.1 }}>
                    Owner Dashboard
                  </h3>
                  <span style={{ fontSize: '11px', color: '#128C7E', fontWeight: 600 }}>
                    ● Authenticated (Syeda Ayaana)
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={adminLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#F2ECE4',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#C75678',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut style={{ width: '14px', height: '14px' }} />
                  <span>Logout</span>
                </button>

                <button onClick={() => setIsAdminOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                  <X style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
            </div>

            {/* Dashboard Tabs Bar */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(18, 18, 18, 0.08)', backgroundColor: '#FFFFFF', padding: '0 24px', overflowX: 'auto', flexShrink: 0 }}>
              <button
                onClick={() => setActiveTab('inventory')}
                style={{
                  padding: '14px 18px',
                  border: 'none',
                  background: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: activeTab === 'inventory' ? '#121212' : '#736C65',
                  borderBottom: activeTab === 'inventory' ? '2.5px solid #121212' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                <Package style={{ width: '15px', height: '15px' }} />
                <span>Products & Stock ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('add-product')}
                style={{
                  padding: '14px 18px',
                  border: 'none',
                  background: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: activeTab === 'add-product' ? '#121212' : '#736C65',
                  borderBottom: activeTab === 'add-product' ? '2.5px solid #121212' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                <Plus style={{ width: '15px', height: '15px', color: '#C75678' }} />
                <span>Add Product</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                style={{
                  padding: '14px 18px',
                  border: 'none',
                  background: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: activeTab === 'orders' ? '#121212' : '#736C65',
                  borderBottom: activeTab === 'orders' ? '2.5px solid #121212' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                <ShoppingBag style={{ width: '15px', height: '15px' }} />
                <span>Orders Received ({recentOrders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                style={{
                  padding: '14px 18px',
                  border: 'none',
                  background: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: activeTab === 'security' ? '#121212' : '#736C65',
                  borderBottom: activeTab === 'security' ? '2.5px solid #121212' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                <Key style={{ width: '15px', height: '15px' }} />
                <span>Security Settings</span>
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="modal-scroll-body" style={{ padding: '24px' }}>
              {/* TAB 1: Inventory & Stock */}
              {activeTab === 'inventory' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#736C65' }}>
                      Click <strong>Edit</strong> on any product to update Price or Stock quantity in real-time.
                    </span>
                    <button
                      onClick={() => setActiveTab('add-product')}
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '12px' }}
                    >
                      <Plus style={{ width: '14px', height: '14px' }} />
                      <span>Add New Product</span>
                    </button>
                  </div>

                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '8px' }}>
                    <div style={{ minWidth: '540px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '70px 2.2fr 1fr 1fr 110px', gap: '12px', fontSize: '11px', fontWeight: 800, color: '#736C65', textTransform: 'uppercase', padding: '0 12px' }}>
                        <span>Photo</span>
                        <span>Product</span>
                        <span>Price (PKR)</span>
                        <span>Stock</span>
                        <span>Actions</span>
                      </div>

                      {products.map((p) => {
                        const isEditing = editingId === p.id;
                        return (
                          <div
                            key={p.id}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '70px 2.2fr 1fr 1fr 110px',
                              gap: '12px',
                              alignItems: 'center',
                              padding: '12px',
                              borderRadius: '12px',
                              backgroundColor: 'var(--bg-surface)',
                              border: '1px solid var(--border-card)'
                            }}
                          >
                            <img src={p.image} alt={p.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />

                            <div>
                              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#121212' }}>{p.name}</div>
                              <div style={{ fontSize: '11px', color: '#C75678' }}>{p.categoryName} ({p.volume})</div>
                            </div>

                            <div>
                              {isEditing ? (
                                <input
                                  type="number"
                                  value={editPricePKR}
                                  onChange={(e) => setEditPricePKR(e.target.value)}
                                  style={{ width: '85px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #121212', fontSize: '13px' }}
                                />
                              ) : (
                                <span style={{ fontWeight: 700, fontSize: '13px' }}>Rs. {Number(p.pricePKR).toLocaleString()}</span>
                              )}
                            </div>

                            <div>
                              {isEditing ? (
                                <input
                                  type="number"
                                  value={editStock}
                                  onChange={(e) => setEditStock(e.target.value)}
                                  style={{ width: '60px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #121212', fontSize: '13px' }}
                                />
                              ) : (
                                <span style={{ fontSize: '12.5px', fontWeight: 600, color: p.stock < 30 ? '#C75678' : '#128C7E' }}>
                                  {p.stock} in stock
                                </span>
                              )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {isEditing ? (
                                <button
                                  onClick={() => handleSaveEdit(p)}
                                  style={{ background: '#128C7E', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                  <Save style={{ width: '12px', height: '12px' }} />
                                  <span>Save</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStartEdit(p)}
                                  style={{ background: '#121212', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                  <Edit3 style={{ width: '12px', height: '12px' }} />
                                  <span>Edit</span>
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to remove "${p.name}"?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                style={{ background: 'none', border: 'none', color: '#9B948C', cursor: 'pointer', padding: '4px' }}
                                title="Delete product"
                              >
                                <Trash2 style={{ width: '15px', height: '15px' }} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Add New Product Form */}
              {activeTab === 'add-product' && (
                <form onSubmit={handleAddProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
                  <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Add Product from WhatsApp Catalog</h3>
                    <p style={{ fontSize: '12.5px', color: '#736C65' }}>Enter your WhatsApp product details to publish it instantly to the store.</p>
                  </div>

                  {newProdSuccess && (
                    <div style={{ background: '#D2F4EA', color: '#0F5132', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, textAlign: 'center' }}>
                      ✓ Product successfully added to your store!
                    </div>
                  )}

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#121212', display: 'block', marginBottom: '4px' }}>Product Name *</label>
                    <input
                      type="text"
                      required
                      value={newProdData.name}
                      onChange={(e) => setNewProdData({ ...newProdData, name: e.target.value })}
                      placeholder="e.g. Ayaana's Whitening Glow Cream"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(18,18,18,0.15)', fontSize: '13px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#121212', display: 'block', marginBottom: '4px' }}>Price (PKR) *</label>
                      <input
                        type="number"
                        required
                        value={newProdData.pricePKR}
                        onChange={(e) => setNewProdData({ ...newProdData, pricePKR: e.target.value })}
                        placeholder="e.g. 2850"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(18,18,18,0.15)', fontSize: '13px', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#121212', display: 'block', marginBottom: '4px' }}>Volume / Size</label>
                      <input
                        type="text"
                        value={newProdData.volume}
                        onChange={(e) => setNewProdData({ ...newProdData, volume: e.target.value })}
                        placeholder="e.g. 50ml, 100ml"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(18,18,18,0.15)', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#121212', display: 'block', marginBottom: '4px' }}>Category</label>
                      <select
                        value={newProdData.category}
                        onChange={(e) => setNewProdData({ ...newProdData, category: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(18,18,18,0.15)', fontSize: '13px', outline: 'none', backgroundColor: '#FFFFFF' }}
                      >
                        {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#121212', display: 'block', marginBottom: '4px' }}>Stock Available</label>
                      <input
                        type="number"
                        value={newProdData.stock}
                        onChange={(e) => setNewProdData({ ...newProdData, stock: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(18,18,18,0.15)', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#121212', display: 'block', marginBottom: '4px' }}>Product Photo</label>
                    <select
                      value={newProdData.image}
                      onChange={(e) => setNewProdData({ ...newProdData, image: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(18,18,18,0.15)', fontSize: '13px', outline: 'none', backgroundColor: '#FFFFFF' }}
                    >
                      <option value="/assets/hero_cream.jpg">Luxury Cream Jar (Studio)</option>
                      <option value="/assets/radiance_toner.jpg">Radiance Toner Bottle</option>
                      <option value="/assets/gold_serum.jpg">24K Gold Dropper Serum</option>
                      <option value="/assets/hand_cream.jpg">Hand & Foot Cream Jar</option>
                      <option value="/assets/hero_model.jpg">Model Glow Photo</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#121212', display: 'block', marginBottom: '4px' }}>Short Description</label>
                    <textarea
                      rows={3}
                      value={newProdData.description}
                      onChange={(e) => setNewProdData({ ...newProdData, description: e.target.value })}
                      placeholder="Benefits, active ingredients, or usage instructions..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(18,18,18,0.15)', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '14px' }}
                  >
                    <span>Publish Product to Store</span>
                  </button>
                </form>
              )}

              {/* TAB 3: Orders Received */}
              {activeTab === 'orders' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <span style={{ fontSize: '13px', color: '#736C65' }}>
                    View orders placed online or dispatched. You can change their status and chat directly with the customer.
                  </span>

                  {recentOrders.map((ord) => (
                    <div
                      key={ord.orderId}
                      style={{
                        padding: '18px',
                        borderRadius: '16px',
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-card)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontWeight: 800, fontSize: '15px' }}>Order #{ord.orderId}</span>
                          <span style={{ fontSize: '11px', color: '#736C65', marginLeft: '8px' }}>Date: {ord.date}</span>
                        </div>

                        {/* Status Updater */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#736C65' }}>Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.orderId, e.target.value)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: '1px solid rgba(18,18,18,0.15)',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              backgroundColor: '#FFFFFF',
                              color: ord.status === 'Delivered' ? '#0F5132' : (ord.status === 'In Transit' ? '#084298' : '#664D03')
                            }}
                          >
                            <option value="Processing Order">Processing Order</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ fontSize: '13px', color: '#2E2B28' }}>
                        <strong>Customer:</strong> {ord.customerName} ({ord.phone}) • <strong>City:</strong> {ord.city} • <strong>Address:</strong> {ord.address}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(18,18,18,0.06)' }}>
                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#121212' }}>
                          Total: {formatPrice(ord.total, ord.total)} ({ord.paymentMethod})
                        </div>

                        {/* Direct WhatsApp Message to Customer */}
                        {ord.phone && (
                          <a
                            href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${ord.customerName}! This is Ayaana's Skincare regarding your order #${ord.orderId}. Your order is currently ${ord.status}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp"
                            style={{ padding: '6px 14px', fontSize: '12px', textDecoration: 'none' }}
                          >
                            <MessageCircle style={{ width: '14px', height: '14px' }} />
                            <span>Message Customer</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: Security & Password */}
              {activeTab === 'security' && (
                <form onSubmit={handlePasswordChange} style={{ maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <Key style={{ width: '32px', height: '32px', color: '#121212', margin: '0 auto 8px auto' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Change Owner Password</h3>
                    <p style={{ fontSize: '12.5px', color: '#736C65' }}>Keep your admin credentials secure.</p>
                  </div>

                  {passwordSuccess && (
                    <div style={{ background: '#D2F4EA', color: '#0F5132', padding: '10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, textAlign: 'center' }}>
                      ✓ Password successfully updated!
                    </div>
                  )}

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#121212', display: 'block', marginBottom: '4px' }}>New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(18,18,18,0.15)', fontSize: '13px', outline: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '13.5px' }}
                  >
                    <span>Update Password</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
