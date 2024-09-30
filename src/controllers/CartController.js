import CartService from '../services/CartService.js';

class CartController {
    static async createCart(req, res) {
        try {
            const cart = await CartService.createCart();
            return res.success({ message: 'Cart created successfully', cart });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async getCartById(req, res) {
        try {
            const cartId = req.params.cartId;
            const cart = await CartService.getCartById(cartId);
            return res.success(cart);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async addProduct(req, res) {
        try {
            const { cartId, productId } = req.params;
            const { quantity } = req.body;
            const updatedCart = await CartService.addProductToCart(cartId, productId, quantity);
            return res.success(updatedCart);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async removeProduct(req, res) {
        try {
            const { cartId, productId } = req.params;
            const updatedCart = await CartService.removeProductFromCart(cartId, productId);
            return res.success(updatedCart);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async clearCart(req, res) {
        try {
            const { cartId } = req.params;
            const updatedCart = await CartService.clearCart(cartId);
            return res.success(updatedCart);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async deleteCart(req, res) {
        try {
            const { cartId } = req.params;
            await CartService.deleteCart(cartId);
            return res.success({ message: 'Cart deleted successfully' });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async purchaseCart(req, res) {
        try {
            const cartId = req.params.cartId;
            const cart = await CartService.getCartById(cartId);

            return cart ? res.success(cart) : res.notfound("Cart not found");
        } catch (error) {
            return res.internalerror(error.message);
        }
    }
}

export default CartController;
