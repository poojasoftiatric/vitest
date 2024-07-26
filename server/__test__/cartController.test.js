// test/cartController.test.js
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import sinon from 'sinon';
import supertest from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { createCart, getCarts, getCartById, updateCart, deleteCart } from '../controllers/cartController.js';
import Cart from '../models/cart.js';  // Use .js extension for ES modules

const app = express();
app.use(bodyParser.json());
app.post('/api/cart', createCart);
app.get('/api/cart', getCarts);
app.get('/api/cart/:id', getCartById);
app.put('/api/cart/:id', updateCart);
app.delete('/api/cart/:id', deleteCart);

describe('Cart Controller', () => {
  let sandbox;
  let request;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    request = supertest(app);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create a new cart', async () => {
    const cartData = { userName: 'John Doe', zip: '12345', country: 'US', state: 'NY', phone: '1234567890', address: '123 Main St', district: 'Manhattan' };
    sandbox.stub(Cart.prototype, 'save').resolves(cartData);

    const response = await request.post('/api/cart').send(cartData);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(cartData);
  });

  it('should get all carts', async () => {
    const cartData = [{ userName: 'John Doe', zip: '12345', country: 'US', state: 'NY', phone: '1234567890', address: '123 Main St', district: 'Manhattan' }];
    sandbox.stub(Cart, 'find').resolves(cartData);

    const response = await request.get('/api/cart');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(cartData);
  });

  it('should get a cart by ID', async () => {
    const cartId = '123';
    const cartData = { userName: 'John Doe', zip: '12345', country: 'US', state: 'NY', phone: '1234567890', address: '123 Main St', district: 'Manhattan', cartId };
    sandbox.stub(Cart, 'findOne').withArgs({ cartId }).resolves(cartData);

    const response = await request.get(`/api/cart/${cartId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(cartData);
  });

  it('should update a cart by ID', async () => {
    const cartId = '123';
    const updateData = { userName: 'Jane Doe', zip: '54321', country: 'US', state: 'CA', phone: '0987654321', address: '456 Elm St', district: 'Hollywood' };
    const updatedCart = { ...updateData, cartId };
    sandbox.stub(Cart, 'findOneAndUpdate').withArgs({ cartId }, updateData, { new: true }).resolves(updatedCart);

    const response = await request.put(`/api/cart/${cartId}`).send(updateData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedCart);
  });

  it('should delete a cart by ID', async () => {
    const cartId = '123';
    sandbox.stub(Cart, 'findOneAndDelete').withArgs({ cartId }).resolves({ message: 'Product deleted' });

    const response = await request.delete(`/api/cart/${cartId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Product deleted' });
  });
});
