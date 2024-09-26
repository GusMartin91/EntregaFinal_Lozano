import { body } from 'express-validator';
import { CustomRouter } from './router.js';
import { limiter } from '../middlewares/rateLimiter.middleware.js';
import UserController from '../controllers/user.controller.js';

export class UsersRouter extends CustomRouter {
    init() {
        this.post('/login', ['public'], limiter, UserController.login);
        this.post('/refresh-token', ['public'], UserController.refreshToken);

        this.post('/register', ['public'], limiter, [
            body('email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email is required'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').notEmpty().withMessage('Password is required')
        ], UserController.register);

        this.put('/update', ['user'], [
            body('email').optional().isEmail().withMessage('Invalid email format'),
            body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        ], UserController.update);

        this.post('/logout', ['user'], UserController.logout);
        this.get('/current', ['user'], UserController.getCurrentUser);
    }
}

export default UsersRouter;