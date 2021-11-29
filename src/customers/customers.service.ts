/**
 * Global Helpers
 */
let count: number = 3;

/**
 * Data Model Interfaces
 */
import { BaseCustomer, Customer } from './customer.type';
import { Customers } from './customers.type'
import * as customersData from './customers.data'

/**
 * In-Memory Store
 */
let customers: Customers = {
    1: {
        id: 1,
        name: 'Cliente 1',
        gender: 'F',
        email: 'cliente1@email.com',
        document: '111.111.111-11'
    },
    2: {
        id: 2,
        name: 'Cliente 2',
        gender: 'M',
        email: 'cliente2@email.com',
        document: '222.222.222-22'
    },
    3: {
        id: 3,
        name: 'Cliente 3',
        gender: 'I',
        email: 'cliente3@email.com',
        document: '333.333.333-33'
    },
}

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
    let found: Customer = await find(id);
    if (found) {
      return await customersData.update(customer);
    }
    return await create(customerUpdate);
};

export const remove = async (id: number): Promise<null | void> => {
    const customer = await find(id);
    if (!customer) {
        return null;
    }
    delete customers[id];
};