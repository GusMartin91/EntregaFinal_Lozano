import mongoose from "mongoose";
import CartsDAO from '../daos/CartsDAO.js';

class CartService {
    async createCart(session = null) {
        return await CartsDAO.createCart(session);
    }

    async getCartById(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return null;
        }

        const cart = await CartsDAO.getCartById(cartId);

        return cart || null;
    }

    async addProductToCart(cartId, productId, quantity, session = null) {
        const cart = await CartsDAO.getCartById(cartId);

        if (!cart) return null;

        const productIndex = cart.products.findIndex(p => p.product._id.toString() === productId);

        if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return await CartsDAO.updateCart(cartId, cart.products, session);
    }

    async updateCart(cartId, cart, session = null) {
        return await CartsDAO.updateCart(cartId, cart.products, session);
    }

    async removeProductFromCart(cartId, productId, session = null) {
        const cart = await CartsDAO.getCartById(cartId);
        if (!cart) return null;
        cart.products = cart.products.filter(p => p.product._id.toString() !== productId);

        return await CartsDAO.updateCart(cartId, cart.products, session = null);
    }

    async clearCart(cartId, session = null) {
        return await CartsDAO.updateCart(cartId, [], session = null);
    }
    async createTicket(ticketNumber, date, buyerEmail, totalAmount, details, session = null) {
        return await CartsDAO.createTicket(ticketNumber, date, buyerEmail, totalAmount, details, session);
    }

    async deleteCart(cartId, session = null) {
        return await CartsDAO.deleteCart(cartId, session);
    }
}

export default new CartService();
