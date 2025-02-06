import { Router } from 'express';
import { Utils } from '../util_controller.js';

const router = Router();


const orders = [
    {
    id: 1,
    material: "Plastic",
    amount: 8345839,
    currency: "CNY",
    price: 624.83,
    timestamp:"1614553155000",
    delivery:{
        first_name: "Jeniffer",
        last_name: "Adam",
        address:{
        street_name: "Blaine",
        street_number: "48649",
        city: "Linxi"
          }
        }
        },
    ]

// Get all orders
router.get('/orders', (req, res) => {
    res.json(orders);
});

// Post orders
router.post('/orders', (req, res) => {
    const newOrder = {
        id: orders.length + 1,
        material: req.body.material,
        amount: req.body.amount,
        currency: req.body.currency,
        price: req.body.price,
        timestamp: req.body.timestamp,
        delivery: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: {
                street_name: req.body.street_name,
                street_number: req.body.street_number,
                city: req.body.city
            }
        }
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

router.get('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = orders.find(o => o.id === orderId);
    if (order) {
        res.json(order);
    } else {
        res.status(404).send('Order not found');
    }
});


// Update an order by ID
router.put('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (order) {
        order.material = req.body.material;
        order.amount = req.body.amount;
        order.currency = req.body.currency;
        order.price = req.body.price;
        order.timestamp = req.body.timestamp;
        order.delivery = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: {
                street_name: req.body.street_name,
                street_number: req.body.street_number,
                city: req.body.city
            }
        }
        res.json(order);
    }
});

// Patch an order by Id
router.patch('/orders/:id', (req, res)=> {
    const order = orders.find(o=> o.id === parseInt(req.params.id));
    if(order){
        if(req.body.material !== null){
            order.material = req.body.material;
        }
        if(req.body.amount !== null){
            order.amount = req.body.amount;
        }
        if(req.body.currency !== null){
            order.currency = req.body.currency;
        }
        if(req.body.price !== null){
            order.price = req.body.price;
        }
        if(req.body.timestamp !== null){
            order.timestamp = req.body.timestamp;
        }
        if(req.body.delivery !== null){
            order.delivery =    {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: {
                street_name: req.body.street_name,
                street_number: req.body.street_number,
                city: req.body.city
            }
        }
    }
        res.json(order);
    }
})

// Delete order by ID
router.delete('/orders/:id', (req, res) => {
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex !== -1) {
        orders.splice(orderIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Order not found');
    }
});

//seed 
router.get('/bootstrap', Utils.bootstrap);


export default router;