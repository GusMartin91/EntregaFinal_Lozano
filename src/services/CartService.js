import mongoose from "mongoose";
import CartsDAO from '../daos/CartsDAO.js';

class CartService {
    async createCart() {
        return await CartsDAO.createCart();
    }

    async getCartById(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return null;
        }

        const cart = await CartsDAO.getCartById(cartId);

        return cart || null;
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await CartsDAO.getCartById(cartId);

        if (!cart) return null;

        const productIndex = cart.products.findIndex(p => p.product._id.toString() === productId);

        if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return await CartsDAO.updateCart(cartId, cart.products);
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await CartsDAO.getCartById(cartId);
        if (!cart) return null;
        cart.products = cart.products.filter(p => p.product._id.toString() !== productId);

        return await CartsDAO.updateCart(cartId, cart.products);
    }

    async clearCart(cartId) {
        return await CartsDAO.updateCart(cartId, []);
    }

    async deleteCart(cartId) {
        return await CartsDAO.deleteCart(cartId);
    }
}

export default new CartService();
