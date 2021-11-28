/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { customersRouter } from './customers/customers.router'

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

/**
 * Server Activation
 */ 
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});