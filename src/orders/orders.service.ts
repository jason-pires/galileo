import { BaseOrder, Order } from "./order.type";
import * as ordersData from './orders.data'

export const create = async (baseOrder: BaseOrder): Promise<Order> => {
    const lastID = await ordersData.create(baseOrder);
    return {id: lastID, ...baseOrder} as Order;
};