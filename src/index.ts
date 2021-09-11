import { Client } from './client/client';
import { config } from 'dotenv';

config();

const client = new Client({
    token: process.env.TOKEN,
});

client.connect();

/*const a = new PhilosophersImageFactory();

setTimeout(() => {
    a.generate({
        text: 'Deixei fazer 15 e chupei o pinto do meu tio'
    })
}, 300)
*/