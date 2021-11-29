/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { customersRouter } from './customers/customers.router'
import { productsRouter } from './products/products.router'
import { errorHandler } from "./common/middleware/error.middleware";
import { notFoundHandler } from "./common/middleware/not-found.middleware"

dotenv.config();

/**
 * App Variables
 */
if(!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT as string, 10);
const app = express();

/**
 *  App Configuration
 */
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/api/clientes', customersRouter);
app.use('/api/produtos', productsRouter);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */ 
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});