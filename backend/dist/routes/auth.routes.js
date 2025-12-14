"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
router.post('/register', auth_validator_1.registerValidator, auth_controller_1.register);
router.post('/login', auth_validator_1.loginValidator, auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map