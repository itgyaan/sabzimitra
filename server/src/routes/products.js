import { Router } from 'express';
import { db } from '../data/db.js';

const router = Router();

// GET /products
router.get('/', (req, res) => {
  const { category, search, organic } = req.query;
  const products = db.getProducts({ category, search, organic });
  return res.json({
    success: true,
    count: products.length,
    categories: db.categories,
    products
  });
});

// GET /products/categories
router.get('/categories', (req, res) => {
  return res.json({
    success: true,
    categories: db.categories
  });
});

// GET /products/:id
router.get('/:id', (req, res) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  return res.json({ success: true, product });
});

// PUT /products/:id/price (Vendor or Admin)
router.put('/:id/price', (req, res) => {
  const { pricePerKg, stockKg, isAvailable } = req.body;
  const updated = db.updateProductPrice(req.params.id, { pricePerKg, stockKg, isAvailable });
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  return res.json({ success: true, product: updated });
});

// POST /products (Vendor add custom product)
router.post('/', (req, res) => {
  const newProd = db.addProduct(req.body);
  return res.status(201).json({ success: true, product: newProd });
});

export default router;
