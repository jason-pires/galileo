import { Customer } from './customer.type'
import mockService from '../../__mocks__/customers.service.mock.test'

describe('Customer Service', () => {
    it('FindAll should return 2 elements', async () => {
        const response = await mockService.mockedCustomersService.findAll();
        expect(response.length).toBe(2);
    })

    it('Find shoud return id equals 1', async () => {
        const response = await mockService.mockedCustomersService.find(1);
        expect(response.id).toBe(1);
    })

    it('Create shoud resolve as id = 3', async () => {
        const myCustomer: Customer = {
            document: '',
            email: '',
            gender: '',
            name: ''
        }
        const response = await mockService.mockedCustomersService.create(myCustomer);
        expect(response.id).toBe(3);
    })

    it('Update shoud resolve as same customer', async () => {
        const myCustomer: Customer = {
            document: '',
            email: '',
            gender: '',
            name: 'updated'
        }
        const response = await mockService.mockedCustomersService.update(3, myCustomer);
        expect(response).toBeDefined();
    })

    // it('Remove shoud return object', async () => {
    //     const response = await mockService.mockedCustomersService.remove(1);
    //     expect(response).toBeDefined();
    // })
});