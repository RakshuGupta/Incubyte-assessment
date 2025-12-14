"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const express_validator_1 = require("express-validator");
const authService = new auth_service_1.AuthService();
const register = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { user, token } = await authService.register(req.body);
        res.status(201).json({ user, token });
    }
    catch (error) {
        console.error('Registration error:', error);
        const statusCode = error.message.includes('already exists') ? 409 : 400;
        res.status(statusCode).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { user, token } = await authService.login(req.body);
        res.json({ user, token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ error: error.message });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map