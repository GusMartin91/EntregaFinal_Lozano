import ProductsDAO from '../daos/ProductsDAO.js';

class ProductService {
    static async createProduct(productData) {
        return await ProductsDAO.createProduct(productData);
    }

    static async updateProduct(productId, updateData) {
        return await ProductsDAO.updateProductById(productId, updateData);
    }

    static async deleteProduct(productId) {
        return await ProductsDAO.deleteProductById(productId);
    }

    static async getAllProducts() {
        return await ProductsDAO.getAllProducts();
    }

    static async getProductById(productId) {
        return await ProductsDAO.getProductById(productId);
    }
}

export default ProductService;
