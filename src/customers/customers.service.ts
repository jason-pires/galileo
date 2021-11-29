import { BaseCustomer, Customer } from './customer.type';
import * as customersData from './customers.data'

/**
 * Service Methods
 */

export const findAll = async (): Promise<Customer[]> => customersData.findAll();

export const find = async (id: number): Promise<Customer> => customersData.find(id);

export const create = async (baseCustomer: BaseCustomer): Promise<Customer> => {
    const lastID = await customersData.create(baseCustomer);
    return {id: lastID, ...baseCustomer} as Customer;
};

export const update = async (id: number, customerUpdate: BaseCustomer): Promise<Customer> => {
    const customer = {id, ...customerUpdate} as Customer;
    const found: Customer = await find(id);
    if (found) {
      return await customersData.update(customer);
    }
    return await create(customerUpdate);
};

export const remove = async (id: number): Promise<null | void> => {
    const found = await customersData.find(id);
    if (!found) {
        return null;
    }
    return await customersData.remove(id);
};