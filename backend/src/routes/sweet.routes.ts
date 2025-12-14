import { Router } from 'express';
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from '../controllers/sweet.controller';
import {
  createSweetValidator,
  updateSweetValidator,
  purchaseValidator,
  restockValidator,
} from '../validators/sweet.validator';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Public routes (authenticated users)
router.get('/', getAllSweets);
router.get('/search', searchSweets);
router.post('/:id/purchase', purchaseValidator, purchaseSweet);

// Admin-only routes
router.post('/', requireAdmin, createSweetValidator, createSweet);
router.put('/:id', requireAdmin, updateSweetValidator, updateSweet);
router.delete('/:id', requireAdmin, deleteSweet);
router.post('/:id/restock', requireAdmin, restockValidator, restockSweet);

export default router;

