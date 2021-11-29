import { BaseProduct, Product } from './products.type';
import * as productsData from './products.data'

/**
 * Service Methods
 */

export const findAll = async (): Promise<Product[]> => productsData.findAll();

export const find = async (id: number): Promise<Product> => productsData.find(id);

export const create = async (baseCustomer: BaseProduct): Promise<Product> => {
    const lastID = await productsData.create(baseCustomer);
    return {id: lastID, ...baseCustomer} as Product;
};

export const update = async (id: number, customerUpdate: BaseProduct): Promise<Product> => {
    const customer = {id, ...customerUpdate} as Product;
    const found: Product = await find(id);
    if (found) {
      return await productsData.update(customer);
    }
    return await create(customerUpdate);
};

export const remove = async (id: number): Promise<null | void> => {
    const found = await productsData.find(id);
    if (!found) {
        return null;
    }
    return await productsData.remove(id);
};