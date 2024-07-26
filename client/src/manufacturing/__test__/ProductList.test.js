// ProductList.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductList from './ProductList';
import { getProducts } from '../utils/api';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the API call
vi.mock('../utils/api', () => ({
  getProducts: vi.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ProductList Component', () => {
  it('renders products correctly', async () => {
    // Mock product data
    const mockProducts = [
      { productId: 1, productName: 'Product 1', productClass: 'A', stockAvailability: 10, price: 100, imageUrl: 'product1.jpg' },
      { productId: 2, productName: 'Product 2', productClass: 'B', stockAvailability: 5, price: 200, imageUrl: 'product2.jpg' },
    ];

    // Mock API response
    getProducts.mockResolvedValue(mockProducts);

    render(
      <Router>
        <ProductList />
      </Router>
    );

    // Wait for products to be loaded
    for (const product of mockProducts) {
      expect(await screen.findByText(`Name: ${product.productName}`)).toBeInTheDocument();
    }
  });

  it('handles add to cart', async () => {
    const mockProducts = [
      { productId: 1, productName: 'Product 1', productClass: 'A', stockAvailability: 10, price: 100, imageUrl: 'product1.jpg' },
    ];
    getProducts.mockResolvedValue(mockProducts);

    render(
      <Router>
        <ProductList />
      </Router>
    );

    const addToCartButton = await screen.findByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{ ...mockProducts[0], quantity: 1 }]));
  });

  it('displays an error message on fetch failure', async () => {
    getProducts.mockRejectedValue(new Error('Failed to fetch products'));

    render(
      <Router>
        <ProductList />
      </Router>
    );

    expect(await screen.findByText('Error fetching products.')).toBeInTheDocument();
  });
});
