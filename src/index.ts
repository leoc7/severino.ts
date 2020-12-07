
import { Client } from './client/client';
const client = new Client();
client.connect();

client.plugins.emit('message', 'philosophers testetestatasdfasdf');