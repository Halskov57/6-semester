import { Router } from 'express';
import { Utils } from '../util_controller.js';
import OrderModel from '../orderSchema.js';

const router = Router();

// Get all orders
router.get('/orders', async (req, res) => {
    const orders = await OrderModel.find({});
    res.json({ orders });
});

// Post orders
router.post('/orders', async (req, res) => {
    const newOrder = new OrderModel(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
});

// Get order by ID
router.get('/orders/:id', async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).send('Order not found');
    }
});

// Update an order by ID
router.put('/orders/:id', async (req, res) => {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (order) {
        res.json(order);
    } else {
        res.status(404).send('Order not found');
    }
});

// Patch an order by ID
router.patch('/orders/:id', async (req, res) => {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (order) {
        res.json(order);
    } else {
        res.status(404).send('Order not found');
    }
});

// Delete order by ID
router.delete('/orders/:id', async (req, res) => {
    const result = await OrderModel.findByIdAndDelete(req.params.id);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send('Order not found');
    }
});

// Seed
router.get('/bootstrap', Utils.bootstrap);

export default router;