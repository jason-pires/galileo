import { OkPacket, RowDataPacket } from "mysql2";
import { Customer } from "../customers/customers.type";
import { db } from "../db";
import { BaseOrder, Order, OrderProduct } from './order.type';

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

export const findAll = () => {

    return new Promise<Order[]>((resolve, reject) => {
        const queryString = `
        SELECT 
            /*ORDER*/
            o.id, o.date, o.description, o.payment, 
            /*CUSTOMER*/
            c.id customer_id, c.name customer_name, c.email customer_email, c.document customer_document, c.gender customer_gender
        FROM \`orders\` o
        INNER JOIN customers c ON c.id = o.customer
        ORDER BY o.date DESC;`;

        db.query(queryString, (err, result) => {
            if (err) { reject(err) }

            const rows = <RowDataPacket[]>result;
            const orders: Order[] = [];

            rows.forEach(async row => {
                const order: Order = {
                    id: row.id,
                    decription: row.decription,
                    date: row.date,
                    payment: row.payment,
                    customer: {
                        id: row.customer_id,
                        document: row.customer_document,
                        email: row.customer_email,
                        gender: row.customer_gender,
                        name: row.customer_name
                    },
                    orderProducts: [] as OrderProduct[]
                }
                orders.push(order);
            });
            resolve(orders);
        });
    })
}

export const find = (id: number) => {

    return new Promise<Order>((resolve, reject) => {
        const queryString = `
        SELECT 
            /*ORDER*/
            o.id, o.date, o.description, o.payment, 
            /*CUSTOMER*/
            c.id customer_id, c.name customer_name, c.email customer_email, c.document customer_document, c.gender customer_gender
        FROM \`orders\` o
        INNER JOIN customers c ON c.id = o.customer
        WHERE o.id = ?`;

        db.query(queryString, [id], (err, result) => {
            if (err) { reject(err) }
            const row = (<RowDataPacket[]>result)[0];
            const order: Order = {
                id: row.id,
                decription: row.decription,
                date: row.date,
                payment: row.payment,
                customer: {
                    id: row.customer_id,
                    document: row.customer_document,
                    email: row.customer_email,
                    gender: row.customer_gender,
                    name: row.customer_name
                },
                orderProducts: [] as OrderProduct[]
            }
            resolve(order);
        });
    })
}

export const findOrderProducts = (orderId: number) => {

    return new Promise<OrderProduct[]>((resolve, reject) => {
        const queryString = `
                SELECT 
                    op.order order_id,
                    /*PRODUCT*/
                    p.id product_id, p.name product_name, p.size product_size, p.price product_price,
                    /*COLOR*/
                    co.id color_id, co.name color_name,
                    /*ORDER_PRODUCT*/
                    op.quantity
                FROM order_products op
                INNER JOIN products p ON p.id = op.product
                INNER JOIN colors co ON co.id = p.color
                WHERE op.order = ?`;

        db.query(queryString, db.escape(orderId), (err, result) => {
            if (err) { reject(err) }

            const rows = <RowDataPacket[]>result;
            const orderProducts: OrderProduct[] = [];

            rows.forEach(row => {
                const orderProduct: OrderProduct = {
                    product: {
                        id: row.product_id,
                        name: row.product_name,
                        size: row.product_size,
                        price: row.product_price,
                        color: {
                            id: row.color_id,
                            name: row.color_name,
                        }
                    },
                    quantity: row.quantity
                }
                orderProducts.push(orderProduct);
            });
            return resolve(orderProducts);
        });
    })
}

export const update = (order: Order) => {
    return new Promise<Order>(async (resolve, reject) => {
        const oldId = order.id;
        const newId = await create(order);
        await remove(oldId);
        order.id = newId;
        resolve(order);
    });
}

export const remove = (id: number) => {
    return new Promise<null | void>(async (resolve, reject) => {

        await db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');

        db.beginTransaction((err) => {
            if (err) {
                throw err;
            }
            let queryString = `DELETE FROM db_market.orders WHERE id = ?;`;
            db.query(
                queryString,
                [id],
                (err) => {
                    if (err) {
                        return db.rollback(() => {
                            reject(err);
                        })
                    }
                    queryString = 'DELETE FROM db_market.order_products WHERE `order` = ?;';
                    db.query(queryString,
                        [id],
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
                                resolve(null);
                            })
                        })
                });
        })
    });
}
