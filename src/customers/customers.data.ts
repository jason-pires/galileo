import { OkPacket, RowDataPacket } from "mysql2";
import { db } from "../db";
import { BaseCustomer, Customer } from "./customer.type";

export const create = (customer: BaseCustomer) => {

    return new Promise<number>((resolve, reject) => {
        const queryString = `
        INSERT INTO db_market.customers 
        (name,email,document,gender)
        VALUES (?,?,?,?)`;

        db.query(
            queryString,
            [customer.name, customer.email, customer.document, customer.gender],
            (err, result) => {
                if (err) { reject(err) }
                const insertId = (<OkPacket>result).insertId;
                resolve(insertId);
            }
        );
    });
};

export const find = (id: number) => {

    return new Promise<Customer>((resolve, reject) => {
        const queryString = `
        SELECT id, name, email, document, gender FROM db_market.customers WHERE id = ?`;

        db.query(queryString, db.escape(id), (err, result) => {
            if (err) { reject(err) }
            const row = (<RowDataPacket>result)[0];
            const customer: Customer = {
                id: row.id,
                document: row.document,
                email: row.email,
                gender: row.gender,
                name: row.name
            }
            resolve(customer);
        });
    })
}

export const findAll = () => {

    return new Promise<Customer[]>((resolve, reject) => {
        const queryString = `
        SELECT id, name, email, document, gender FROM db_market.customers`

        db.query(queryString, (err, result) => {
            if (err) { reject(err) }

            const rows = <RowDataPacket[]>result;
            const customers: Customer[] = [];

            rows.forEach(row => {
                const customer: Customer = {
                    id: row.id,
                    document: row.document,
                    email: row.email,
                    gender: row.gender,
                    name: row.name
                };
                customers.push(customer);
            });
            resolve(customers);
        });
    })
}

export const update = (customer: Customer) => {
    return new Promise<Customer>((resolve, reject) => {
        const queryString = `
    UPDATE db_market.customers
    SET
    name = ?,
    email = ?,
    document = ?,
    gender = ?
    WHERE id = ?;`;

        db.query(
            queryString,
            [
                customer.name,
                customer.email,
                customer.document,
                customer.gender,
                db.escape(customer.id),
            ],
            (err) => {
                if (err) { reject(err) }
                resolve(customer);
            }
        );
    });
}

export const remove = (id: number) => {
    return new Promise<null | void>((resolve, reject) => {

        const queryString = `
            DELETE FROM db_market.customers
            WHERE id = ?;`;

        db.query(
            queryString,
            [
                db.escape(id),
            ],
            (err) => {
                if (err) { reject(err) }
                resolve(null);
            }
        );
    });
}