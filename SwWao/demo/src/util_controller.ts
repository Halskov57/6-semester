import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { readFile } from 'fs/promises';
import {orderSchema } from './orderSchema.js';


const connection = mongoose.createConnection('mongodb://localhost:27017/myapp', {
    authSource: 'admin',
    user: 'myapp',
    pass: 'password',
}
)
const OrderModel = connection.model('Order', orderSchema)

const bootstrap = async (req: Request , res: Response) => {
    await OrderModel.deleteMany({}).exec()

    const oders = await readFile('../MOCK_DATA_MATERIALS.json', 'utf-8')
    const ordersResults = await OrderModel.insertMany(JSON.parse(oders))

    res.json({
        orders:{
            ids: ordersResults.map(o => o._id),
            cnt: ordersResults.length,
        }
    })}

    export const Utils = {bootstrap}