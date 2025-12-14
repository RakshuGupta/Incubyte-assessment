"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restockValidator = exports.purchaseValidator = exports.updateSweetValidator = exports.createSweetValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createSweetValidator = [
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 100 })
        .withMessage('Name must be less than 100 characters'),
    (0, express_validator_1.body)('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required')
        .isLength({ max: 50 })
        .withMessage('Category must be less than 50 characters'),
    (0, express_validator_1.body)('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('quantity')
        .isInt({ min: 0 })
        .withMessage('Quantity must be a non-negative integer'),
];
exports.updateSweetValidator = [
    (0, express_validator_1.body)('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Name must be less than 100 characters'),
    (0, express_validator_1.body)('category')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Category cannot be empty')
        .isLength({ max: 50 })
        .withMessage('Category must be less than 50 characters'),
    (0, express_validator_1.body)('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('quantity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity must be a non-negative integer'),
];
exports.purchaseValidator = [
    (0, express_validator_1.body)('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
];
exports.restockValidator = [
    (0, express_validator_1.body)('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
];
//# sourceMappingURL=sweet.validator.js.map