import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { readFile } from 'fs/promises';
import OrderModel from './orderSchema.js';

mongoose.connect('mongodb://root:example@some-mongo:27017/mydatabase', {
    authSource: 'admin',
    user: 'root',
    pass: 'example',
});

const bootstrap = async (req: Request, res: Response) => {
    await OrderModel.deleteMany({}).exec();

    const orders = await readFile('/app/public/MOCK_DATA_MATERIALS.json', 'utf-8');
    const ordersResults = await OrderModel.insertMany(JSON.parse(orders));

    res.json({
        orders: ordersResults,
        cnt: ordersResults.length,
    });
};

export const Utils = { bootstrap };