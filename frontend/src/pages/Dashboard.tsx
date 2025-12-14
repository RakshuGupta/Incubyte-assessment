import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sweet } from '../types';
import { sweetsAPI } from '../services/api';
import '../App.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [purchasing, setPurchasing] = useState<number | null>(null);

  useEffect(() => {
    loadSweets();
  }, []);

  useEffect(() => {
    filterSweets();
  }, [sweets, searchName, searchCategory, minPrice, maxPrice]);

  const loadSweets = async () => {
    try {
      const data = await sweetsAPI.getAll();
      setSweets(data);
      setFilteredSweets(data);
    } catch (error) {
      console.error('Failed to load sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSweets = async () => {
    try {
      const params: any = {};
      if (searchName) params.name = searchName;
      if (searchCategory) params.category = searchCategory;
      if (minPrice) params.minPrice = parseFloat(minPrice);
      if (maxPrice) params.maxPrice = parseFloat(maxPrice);

      if (Object.keys(params).length > 0) {
        const data = await sweetsAPI.search(params);
        setFilteredSweets(data);
      } else {
        setFilteredSweets(sweets);
      }
    } catch (error) {
      console.error('Failed to search sweets:', error);
    }
  };

  const handlePurchase = async (sweetId: number) => {
    setPurchasing(sweetId);
    try {
      await sweetsAPI.purchase(sweetId, 1);
      await loadSweets();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to purchase sweet');
    } finally {
      setPurchasing(null);
    }
  };

  const categories = Array.from(new Set(sweets.map(s => s.category)));

  return (
    <div>
      <div className="header">
        <div className="header-content">
          <h1>🍬 Sweet Shop Management System</h1>
          <div className="header-actions">
            {user?.role === 'admin' && (
              <Link to="/admin" className="btn btn-secondary" style={{ textDecoration: 'none', marginRight: '12px' }}>
                Admin Panel
              </Link>
            )}
            <span style={{ marginRight: '12px', color: '#666' }}>Welcome, {user?.username}!</span>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, color: '#333' }}>Search & Filter Sweets</h2>
            {user?.role === 'admin' && (
              <Link to="/admin" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                + Add New Sweet
              </Link>
            )}
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
              step="0.01"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>Loading sweets...</div>
        ) : (
          <div className="grid">
            {filteredSweets.map(sweet => (
              <div key={sweet.id} className="sweet-card">
                <h3>{sweet.name}</h3>
                <div className="category">{sweet.category}</div>
                <div className="price">${sweet.price.toFixed(2)}</div>
                <div className={`quantity ${sweet.quantity === 0 ? 'out-of-stock' : ''}`}>
                  {sweet.quantity === 0 ? 'Out of Stock' : `In Stock: ${sweet.quantity}`}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handlePurchase(sweet.id)}
                  disabled={sweet.quantity === 0 || purchasing === sweet.id}
                  style={{ width: '100%' }}
                >
                  {purchasing === sweet.id ? 'Purchasing...' : 'Purchase'}
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredSweets.length === 0 && sweets.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: 'white', marginBottom: '10px' }}>No sweets in inventory yet!</h3>
              {user?.role === 'admin' ? (
                <div>
                  <p style={{ marginBottom: '20px' }}>Start by adding your first sweet to the inventory.</p>
                  <Link to="/admin" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                    + Add Your First Sweet
                  </Link>
                </div>
              ) : (
                <p>Please contact an administrator to add sweets to the inventory.</p>
              )}
            </div>
          </div>
        )}

        {!loading && filteredSweets.length === 0 && sweets.length > 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
            No sweets found matching your criteria. Try adjusting your search filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

