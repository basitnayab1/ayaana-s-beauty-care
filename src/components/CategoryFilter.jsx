import React from 'react';
import { CATEGORIES } from '../data/products';
import { Sparkles } from 'lucide-react';

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`category-pill ${isActive ? 'active' : ''}`}
            >
              {cat.id === 'all' && <Sparkles style={{ width: '13px', height: '13px', display: 'inline', marginRight: '6px', color: isActive ? '#E2829F' : '#736C65' }} />}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
