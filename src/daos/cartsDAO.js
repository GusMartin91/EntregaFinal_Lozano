import { cartsModel } from './models/cartModel.js';

class CartsDAO {
    async createCart() {
        try {
            const newCart = await cartsModel.create({ products: [] });
            return newCart;
        } catch (error) {
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await cartsModel.findById(cartId).populate('products.product');

            return cart || null;
        } catch (error) {
            throw new Error(`Error finding cart: ${error.message}`);
        }
    }

    async updateCart(cartId, updatedProducts) {
        try {
            const updatedCart = await cartsModel.findByIdAndUpdate(cartId, { products: updatedProducts }, { new: true });
            if (!updatedCart) {
                throw new Error('Cart not found');
            }
            return updatedCart;
        } catch (error) {
            throw new Error(`Error updating cart: ${error.message}`);
        }
    }

    async deleteCart(cartId) {
        try {
            const deletedCart = await cartsModel.findByIdAndDelete(cartId);
            if (!deletedCart) {
                throw new Error('Cart not found');
            }
            return deletedCart;
        } catch (error) {
            throw new Error(`Error deleting cart: ${error.message}`);
        }
    }
}

export default new CartsDAO();
