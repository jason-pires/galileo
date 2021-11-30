import { Customer } from "../customers/customers.type";
import { Product } from "../products/products.type";

/**
 * 0 = DINHEIRO\n1 = CARTAO\n2 = CHEQUE
 */
export enum PaymentEnum {
    MONEY = 0,
    CREDIT_CARD = 1,
    PAYCHECK = 2
}

export interface BaseOrder {
    date: Date,
    decription: string,
    payment: PaymentEnum,
    customer: Customer
    orderProducts: OrderProduct[]
}

export interface Order extends BaseOrder {
    id: number
}

export interface OrderProduct {
    product: Product,
    quantity: number
}