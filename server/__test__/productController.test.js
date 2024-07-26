import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import sinon from 'sinon';
import supertest from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import Product from '../models/product.js';

const app = express();
app.use(bodyParser.json());
app.post('/api/products', createProduct);
app.get('/api/products', getProducts);
app.get('/api/products/:id', getProductById);
app.put('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);

describe('Product Controller', () => {
  let sandbox;
  let request;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    request = supertest(app);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should get a product by ID', async () => {
    const productId = '123';  // Ensure this is a string if that's what the route expects
    const productData = {
      productName: 'Sample Product',
      stockAvailability: 10,
      productClass: 'Electronics',
      vendorName: 'Vendor A',
      price: 99.99,
      imageUrl: 'http://example.com/image.jpg',
      productId
    };
    sandbox.stub(Product, 'findOne').withArgs({ productId }).resolves(productData);

    const response = await request.get(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(productData);
  });
});
