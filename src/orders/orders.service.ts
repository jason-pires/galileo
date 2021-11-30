import { BaseOrder, Order } from "./order.type";
import * as ordersData from './orders.data'

export const create = async (baseOrder: BaseOrder): Promise<Order> => {
    const lastID = await ordersData.create(baseOrder);
    return { id: lastID, ...baseOrder } as Order;
};

export const update = async (order: Order): Promise<Order> => {
    return await ordersData.update(order);
};

export const findAll = async (): Promise<Order[]> => {
    // TODO fill orderProducts object
    return await ordersData.findAll();
};

export const find = async (id: number): Promise<Order> => {
    return await ordersData.find(id);
};

export const remove = async (id: number): Promise<void | null> => {
    return await ordersData.remove(id);
};