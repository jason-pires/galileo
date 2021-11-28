/**
 * Global Helpers
 */
let count: number = 4;

/**
 * Data Model Interfaces
 */
import { Customer } from './customer.type';
import { Customers } from './customers.type'

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

export const findAll = async (): Promise<Customer[]> => Object.values(customers);

export const find = async (id: number): Promise<Customer> => customers[id];

export const create = async (customer: Customer): Promise<Customer> => {
    const id = ++count;
    customers[id] = {
        id,
        ...customer,
    };
    return customers[id];
};

export const update = async ( id: number, customerUpdate: Customer): Promise<Customer | null> => {
    const customer = await find(id);
    if (!customer) {
        return null;
    }
    customers[id] = { id, ...customerUpdate };
    return customers[id];
};

export const remove = async (id: number): Promise<null | void> => {
    const customer = await find(id);
    if (!customer) {
      return null;
    }
    delete customers[id];
  };