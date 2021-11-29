import { mocked } from 'ts-jest/utils'
import * as CustomersService from '../src/customers/customers.service';
import { Customer } from '../src/customers/customer.type';

jest.mock('../src/customers/customers.service', () => {
    return jest.fn();
});

const mockedCustomersService = mocked(CustomersService, true);
const findAllResponse: Customer[] = [
    {
        id: 1,
        name: 'Cliente 1',
        gender: 'F',
        email: 'cliente1@email.com',
        document: '111.111.111-11'
    },
    {
        id: 2,
        name: 'Cliente 2',
        gender: 'M',
        email: 'cliente2@email.com',
        document: '222.222.222-22'
    }
]

mockedCustomersService.findAll = jest.fn().mockImplementationOnce(async () => {
    return Promise.resolve(findAllResponse);
});

mockedCustomersService.find = jest.fn().mockImplementation((id: number) => {
    const found = findAllResponse.find(i => i.id === id);
    return Promise.resolve(found);
});

mockedCustomersService.create = jest.fn().mockImplementation(async (createCustomer: Customer): Promise<Customer> => {
    let maxID = findAllResponse.map(m => (m.id || 0)).reduce((a, b) => a > b ? a : b);
    createCustomer.id = ++maxID;
    findAllResponse.push(createCustomer);
    return Promise.resolve(createCustomer);
});

mockedCustomersService.update = jest.fn().mockImplementation(async (id: number, updateCustomer: Customer): Promise<Customer | null> => {
    const idx = findAllResponse.findIndex(c => c.id === id);
    if(idx > -1) {
        findAllResponse[idx] = updateCustomer;
    } else {
        return Promise.resolve(null);
    }
    return Promise.resolve(updateCustomer);
});

mockedCustomersService.remove = jest.fn().mockImplementation(async (id: number) => {
    const idx = findAllResponse.findIndex(c => c.id === id);
    if(idx > -1) {
        delete findAllResponse[idx];
    } else {
        return Promise.resolve(null);
    }
});

export default module.exports = {
    mockedCustomersService
}