import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sweet, CreateSweetRequest } from '../types';
import { sweetsAPI } from '../services/api';
import '../App.css';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [formData, setFormData] = useState<CreateSweetRequest>({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
  });
  const [error, setError] = useState('');
  const [restocking, setRestocking] = useState<number | null>(null);
  const [restockQuantity, setRestockQuantity] = useState('');

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      const data = await sweetsAPI.getAll();
      setSweets(data);
    } catch (error) {
      console.error('Failed to load sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (sweet?: Sweet) => {
    if (sweet) {
      setEditingSweet(sweet);
      setFormData({
        name: sweet.name,
        category: sweet.category,
        price: sweet.price,
        quantity: sweet.quantity,
      });
    } else {
      setEditingSweet(null);
      setFormData({
        name: '',
        category: '',
        price: 0,
        quantity: 0,
      });
    }
    setError('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSweet(null);
    setFormData({
      name: '',
      category: '',
      price: 0,
      quantity: 0,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingSweet) {
        await sweetsAPI.update(editingSweet.id, formData);
      } else {
        await sweetsAPI.create(formData);
      }
      await loadSweets();
      handleCloseModal();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save sweet');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await sweetsAPI.delete(id);
      await loadSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete sweet');
    }
  };

  const handleRestock = async (sweetId: number) => {
    const quantity = parseInt(restockQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    setRestocking(sweetId);
    try {
      await sweetsAPI.restock(sweetId, quantity);
      setRestockQuantity('');
      await loadSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to restock sweet');
    } finally {
      setRestocking(null);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="header-content">
          <h1>🍬 Admin Panel - Sweet Shop</h1>
          <div className="header-actions">
            <Link to="/dashboard" className="btn btn-secondary" style={{ textDecoration: 'none', marginRight: '12px' }}>
              Back to Dashboard
            </Link>
            <span style={{ marginRight: '12px', color: '#666' }}>Admin: {user?.username}</span>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#333' }}>Manage Sweets</h2>
            <button onClick={() => handleOpenModal()} className="btn btn-primary">
              + Add New Sweet
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>Loading...</div>
        ) : (
          <div className="grid">
            {sweets.map(sweet => (
              <div key={sweet.id} className="sweet-card">
                <h3>{sweet.name}</h3>
                <div className="category">{sweet.category}</div>
                <div className="price">${sweet.price.toFixed(2)}</div>
                <div className="quantity">Stock: {sweet.quantity}</div>
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="number"
                    placeholder="Restock quantity"
                    value={restocking === sweet.id ? restockQuantity : ''}
                    onChange={(e) => setRestockQuantity(e.target.value)}
                    min="1"
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                  <button
                    className="btn btn-success"
                    onClick={() => handleRestock(sweet.id)}
                    disabled={restocking === sweet.id}
                  >
                    {restocking === sweet.id ? 'Restocking...' : 'Restock'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleOpenModal(sweet)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(sweet.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {sweets.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
            No sweets found. Add your first sweet!
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingSweet ? 'Edit Sweet' : 'Add New Sweet'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Sweet name"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  placeholder="Category (e.g., Chocolate, Gummies)"
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                  required
                  min="0"
                  placeholder="0"
                />
              </div>
              {error && <div className="error">{error}</div>}
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingSweet ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={handleCloseModal} className="btn btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

