import { validationResult } from 'express-validator';
import UserService from '../services/UserService.js';

class UserController {
    static async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const { email, password } = req.body;
        try {
            const { message, accessToken, refreshToken, user } = await UserService.login(email, password);
            res.cookie('UserCookie', accessToken, { httpOnly: true });
            res.cookie('RefreshToken', refreshToken, { httpOnly: true });
            return res.success({ message, user });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async refreshToken(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const refreshToken = req.cookies.RefreshToken;
        try {
            const { message, accessToken } = await UserService.refreshToken(refreshToken);
            res.cookie('UserCookie', accessToken, { httpOnly: true });
            return res.success({ message });
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const { email, password } = req.body;
        const userId = req.user._id;

        try {
            const result = await UserService.update(userId, email, password);
            return res.success(result);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static logout(req, res) {
        res.clearCookie('UserCookie');
        res.clearCookie('RefreshToken');
        return res.success('Logged out successfully');
    }

    static getCurrentUser(req, res) {
        return res.success(req.user);
    }
}

export default UserController;