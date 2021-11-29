"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("ts-jest/utils");
const CustomersService = __importStar(require("../src/customers/customers.service"));
jest.mock('../src/customers/customers.service', () => {
    return jest.fn();
});
const mockedCustomersService = (0, utils_1.mocked)(CustomersService, true);
const findAllResponse = [
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
];
mockedCustomersService.findAll = jest.fn().mockImplementationOnce(() => __awaiter(void 0, void 0, void 0, function* () {
    return Promise.resolve(findAllResponse);
}));
mockedCustomersService.find = jest.fn().mockImplementation((id) => {
    let found = findAllResponse.find(i => i.id === id);
    return Promise.resolve(found);
});
mockedCustomersService.create = jest.fn().mockImplementation((createCustomer) => __awaiter(void 0, void 0, void 0, function* () {
    let maxID = findAllResponse.map(m => (m.id || 0)).reduce((a, b) => a > b ? a : b);
    createCustomer.id = ++maxID;
    findAllResponse.push(createCustomer);
    return Promise.resolve(createCustomer);
}));
mockedCustomersService.update = jest.fn().mockImplementation((id, updateCustomer) => __awaiter(void 0, void 0, void 0, function* () {
    let idx = findAllResponse.findIndex(c => c.id === id);
    if (idx > -1) {
        findAllResponse[idx] = updateCustomer;
    }
    else {
        return Promise.resolve(null);
    }
    return Promise.resolve(updateCustomer);
}));
mockedCustomersService.remove = jest.fn().mockImplementation((id) => __awaiter(void 0, void 0, void 0, function* () {
    let idx = findAllResponse.findIndex(c => c.id === id);
    if (idx > -1) {
        delete findAllResponse[idx];
    }
    else {
        return Promise.resolve(null);
    }
}));
exports.default = module.exports = {
    mockedCustomersService
};
