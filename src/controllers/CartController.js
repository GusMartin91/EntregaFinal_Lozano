import CartService from '../services/CartService.js';
import ProductService from '../services/ProductService.js';

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
            if (!cart) return res.notfound("Cart not found");

            for (let i = 0; i < cart.products.length; i++) {
                let p = cart.products[i];
                let product = await ProductService.getProductById(p.product._id)
                if (product && product.stock >= p.quantity) {
                    p.inStock = true
                    product.stock = product.stock - p.quantity
                    await ProductService.updateProduct(p.product._id, product)
                }
            }

            const availableProducts = cart.products.filter(p => p.inStock == true)
            cart.products = cart.products.filter(p => p.inStock == undefined)

            if (availableProducts.length === 0) {
                return res.badrequest("No items available for purchase.")
            }

            let totalAmount = availableProducts.reduce((acum, item) => acum += item.quantity * item.product.price, 0)
            let ticketNumber = Date.now()
            let date = new Date()
            let buyerEmail = req.user.email
            const ticket = await CartService.createTicket({
                ticketNumber, date, buyerEmail, totalAmount,
                details: availableProducts
            })

            await CartService.updateCart(cartId, cart)

            return res.success(ticket);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }
}

export default CartController;
