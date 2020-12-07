import { PluginManager } from '../managers/plugin/plugin-manager';
import { Client as DiscordClient } from 'discord.js';
import { PhilosophersPlugin } from '../plugins/philosopers/philosophers-plugin';

interface IClientData {
    token: string;
}

class Client {
    token: string;
    client: DiscordClient;

    plugins = new PluginManager();

    constructor({ token }: IClientData) {
        this.token = token;
        this.client = new DiscordClient();
    }

    public connect() {
        this.client.login(this.token);
        this.client.on('ready', () => {
            this.client.user.setPresence({
                activity: {
                    name: '!jurandir help',
                    type: 'PLAYING',
                },
                status: 'online',
            });
        });
        this.init();
    }

    public init() {
        this.client.on('message', message => {
            this.plugins.emit('message', message);
        });

        this.plugins.add('philosophers', new PhilosophersPlugin());
    }
}

export { Client };
