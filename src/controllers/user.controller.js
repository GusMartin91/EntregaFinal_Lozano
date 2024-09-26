import { validationResult } from 'express-validator';
import UserService from '../services/user.service.js';

class UserController {
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const result = await UserService.login(email, password);
            return res.success(result);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async refreshToken(req, res) {
        const refreshToken = req.cookies.RefreshToken;
        try {
            const result = await UserService.refreshToken(refreshToken);
            return res.success(result);
        } catch (error) {
            return res.unauthorized(error.message);
        }
    }

    static async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const { email, password } = req.body;
        try {
            const result = await UserService.register(email, password);
            return res.success(result);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async update(req, res) {
        const { email, password } = req.body;
        const userId = req.user._id;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        try {
            const result = await UserService.update(userId, email, password);
            return res.success(result);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static logout(req, res) {
        UserService.logout();
        res.clearCookie('UserCookie');
        res.clearCookie('RefreshToken');
        return res.success('Logged out successfully');
    }

    static getCurrentUser(req, res) {
        return res.success(req.user);
    }
}

export default UserController;