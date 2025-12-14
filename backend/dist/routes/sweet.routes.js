"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sweet_controller_1 = require("../controllers/sweet.controller");
const sweet_validator_1 = require("../validators/sweet.validator");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authenticate);
// Public routes (authenticated users)
router.get('/', sweet_controller_1.getAllSweets);
router.get('/search', sweet_controller_1.searchSweets);
router.post('/:id/purchase', sweet_validator_1.purchaseValidator, sweet_controller_1.purchaseSweet);
// Admin-only routes
router.post('/', auth_1.requireAdmin, sweet_validator_1.createSweetValidator, sweet_controller_1.createSweet);
router.put('/:id', auth_1.requireAdmin, sweet_validator_1.updateSweetValidator, sweet_controller_1.updateSweet);
router.delete('/:id', auth_1.requireAdmin, sweet_controller_1.deleteSweet);
router.post('/:id/restock', auth_1.requireAdmin, sweet_validator_1.restockValidator, sweet_controller_1.restockSweet);
exports.default = router;
//# sourceMappingURL=sweet.routes.js.map