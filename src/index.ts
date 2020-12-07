import { Client } from './client/client';
import { config } from 'dotenv';

config();

const client = new Client({
    token: process.env.TOKEN,
});

client.connect();
