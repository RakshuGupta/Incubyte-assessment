"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restockSweet = exports.purchaseSweet = exports.deleteSweet = exports.updateSweet = exports.searchSweets = exports.getAllSweets = exports.createSweet = void 0;
const sweet_service_1 = require("../services/sweet.service");
const express_validator_1 = require("express-validator");
const sweetService = new sweet_service_1.SweetService();
const createSweet = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const sweet = await sweetService.create(req.body);
        res.status(201).json(sweet);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createSweet = createSweet;
const getAllSweets = async (req, res) => {
    try {
        const sweets = await sweetService.findAll();
        res.json(sweets);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllSweets = getAllSweets;
const searchSweets = async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;
        const query = {
            name: name,
            category: category,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        };
        const sweets = await sweetService.search(query);
        res.json(sweets);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.searchSweets = searchSweets;
const updateSweet = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = parseInt(req.params.id);
        const sweet = await sweetService.update(id, req.body);
        if (!sweet) {
            return res.status(404).json({ error: 'Sweet not found' });
        }
        res.json(sweet);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateSweet = updateSweet;
const deleteSweet = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await sweetService.delete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Sweet not found' });
        }
        res.json({ message: 'Sweet deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteSweet = deleteSweet;
const purchaseSweet = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = parseInt(req.params.id);
        const { quantity } = req.body;
        const sweet = await sweetService.purchase(id, quantity);
        if (!sweet) {
            return res.status(404).json({ error: 'Sweet not found' });
        }
        res.json(sweet);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.purchaseSweet = purchaseSweet;
const restockSweet = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = parseInt(req.params.id);
        const { quantity } = req.body;
        const sweet = await sweetService.restock(id, quantity);
        if (!sweet) {
            return res.status(404).json({ error: 'Sweet not found' });
        }
        res.json(sweet);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.restockSweet = restockSweet;
//# sourceMappingURL=sweet.controller.js.map