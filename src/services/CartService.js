import CartsDAO from '../daos/CartsDAO.js';

class CartService {
    async createCart() {
        return await CartsDAO.createCart();
    }

    async getCartById(cartId) {
        return await CartsDAO.getCartById(cartId);
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await CartsDAO.getCartById(cartId);
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
