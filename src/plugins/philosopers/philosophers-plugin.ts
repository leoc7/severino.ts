import { Message } from 'discord.js';
import { IParsedCommand } from '../../command/command-parser';
import { BaseCommandPlugin } from '../base-command-plugin';
import { PhilosophersImageFactory } from './image-factory';

class PhilosophersPlugin extends BaseCommandPlugin {
    factory = new PhilosophersImageFactory();

    constructor() {
        super({
            name: 'Philosophers',
        });
        this.attachEvents();

        this.addCommand({
            key: 'filo',
            params: [
                {
                    name: 'text',
                    type: 'string',
                },
            ],
            handler: this.onPhilosophers.bind(this),
        });
    }

    private async onPhilosophers(command: IParsedCommand, message: Message) {
        const [text] = command.params;

        const imageName = await this.factory.create({
            text,
        });

        await message.channel.send('', {
            files: [imageName],
        });

        this.factory.delete(imageName);
    }
}

export { PhilosophersPlugin };
