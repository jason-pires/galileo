import { mocked } from 'ts-jest/utils'
import * as ProductsService from '../src/products/products.service';
import { Product } from '../src/products/products.type';

jest.mock('../src/products/products.service', () => {
    return jest.fn();
});

const mockedProductsService = mocked(ProductsService, true);
const productsRepo: Product[] = [
    {
        id: 2,
        color: {
          id: 3,
          name: "AZUL"
        },
        name: "Produto A",
        price: 1000,
        size: "30x30cm"
      },
      {
        id: 3,
        color: {
          id: 6,
          name: "VERMELHO"
        },
        name: "Produto X",
        price: 2100,
        size: "100x100cm"
      },
      {
        id: 4,
        color: {
          id: 5,
          name: "PRETO"
        },
        name: "Produto C",
        price: 500,
        size: "20x20cm"
      }
]

mockedProductsService.findAll = jest.fn().mockImplementationOnce(async () => {
    return Promise.resolve(productsRepo);
});

mockedProductsService.find = jest.fn().mockImplementation((id: number) => {
    const found = productsRepo.find(i => i.id === id);
    return Promise.resolve(found);
});

mockedProductsService.create = jest.fn().mockImplementation(async (createProduct: Product): Promise<Product> => {
    let maxID = productsRepo.map(m => (m.id || 0)).reduce((a, b) => a > b ? a : b);
    createProduct.id = ++maxID;
    productsRepo.push(createProduct);
    return Promise.resolve(createProduct);
});

mockedProductsService.update = jest.fn().mockImplementation(async (id: number, updateProduct: Product): Promise<Product | null> => {
    const idx = productsRepo.findIndex(c => c.id === id);
    if(idx > -1) {
        productsRepo[idx] = updateProduct;
    } else {
        return Promise.resolve(null);
    }
    return Promise.resolve(updateProduct);
});

mockedProductsService.remove = jest.fn().mockImplementation(async (id: number) => {
    const idx = productsRepo.findIndex(c => c.id === id);
    if(idx > -1) {
        delete productsRepo[idx];
    } else {
        return Promise.resolve(null);
    }
});

export default module.exports = {
    mockedProductsService
}