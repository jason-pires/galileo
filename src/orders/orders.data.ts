import { OkPacket, RowDataPacket } from "mysql2";
import { db } from "../db";
import { BaseOrder, Order } from './order.type';

export const create = (order: BaseOrder) => {

    return new Promise<number>(async (resolve, reject) => {

        await db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');

        db.beginTransaction((err) => {
            if (err) {
                throw err;
            }
            let insertId = 0;
            let queryString = `
                INSERT INTO db_market.orders
                (date, description, payment, customer) 
                VALUES (?, ?, ?, ?);`;
            db.query(
                queryString,
                [order.date, order.decription, order.payment, order.customer.id],
                (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            reject(err);
                        })
                    }
                    insertId = (<OkPacket>result).insertId;
                    order.orderProducts.forEach((op) => {
                        queryString = 'INSERT INTO db_market.order_products (`order`, product, quantity) VALUES (?,?,?);';
                        db.query(queryString,
                            [insertId, op.product.id, op.quantity],
                            (err, result) => {
                                if (err) {
                                    return db.rollback(() => {
                                        reject(err);
                                    })
                                }
                                db.commit((err) => {
                                    if (err) {
                                        return db.rollback(function () {
                                            reject(err);
                                        });
                                    }
                                    resolve(insertId);
                                })
                            })
                    })
                }
            );
        })
    });
};

// export const find = (id: number) => {

//     return new Promise<Product>((resolve, reject) => {
//         const queryString = `
//         SELECT
//             prod.id, prod.name, color.id color_id, color.name color_name, prod.size, prod.price
//         FROM db_market.products prod
//             INNER JOIN db_market.colors color on color.id = prod.color
//         WHERE prod.id = ?`;

//         db.query(queryString, db.escape(id), (err, result) => {
//             if (err) { reject(err) }
//             const row = (<RowDataPacket>result)[0];
//             const product: Product = {
//                 id: row.id,
//                 color: {
//                     id: row.color_id,
//                     name: row.color_name
//                 },
//                 name: row.name,
//                 price: row.price,
//                 size: row.size
//             }
//             resolve(product);
//         });
//     })
// }

// export const findAll = () => {

//     return new Promise<Product[]>((resolve, reject) => {
//         const queryString = `
//         SELECT
//             prod.id, prod.name, color.id color_id, color.name color_name, prod.size, prod.price
//         FROM db_market.products prod
//             INNER JOIN db_market.colors color on color.id = prod.color
//         ORDER BY prod.id`;

//         db.query(queryString, (err, result) => {
//             if (err) { reject(err) }

//             const rows = <RowDataPacket[]>result;
//             const products: Product[] = [];

//             rows.forEach(row => {
//                 const product: Product = {
//                     id: row.id,
//                     color: {
//                         id: row.color_id,
//                         name: row.color_name
//                     },
//                     name: row.name,
//                     price: row.price,
//                     size: row.size
//                 }
//                 products.push(product);
//             });
//             resolve(products);
//         });
//     })
// }

// export const update = (product: Product) => {
//     return new Promise<Product>((resolve, reject) => {
//         const queryString = `
//         UPDATE db_market.products
//         SET
//         name = ?,
//         color = ?,
//         size = ?,
//         price = ?
//         WHERE id = ?;`;

//         db.query(
//             queryString,
//             [
//                 product.name,
//                 product.color.id,
//                 product.size,
//                 product.price,
//                 db.escape(product.id),
//             ],
//             (err) => {
//                 if (err) { reject(err) }
//                 resolve(product);
//             }
//         );
//     });
// }

// export const remove = (id: number) => {
//     return new Promise<null | void>((resolve, reject) => {

//         const queryString = `
//             DELETE FROM db_market.products
//             WHERE id = ?;`;

//         db.query(
//             queryString,
//             [
//                 db.escape(id),
//             ],
//             (err) => {
//                 if (err) { reject(err) }
//                 resolve(null);
//             }
//         );
//     });
// }