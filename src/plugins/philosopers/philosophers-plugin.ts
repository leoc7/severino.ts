import { Message } from 'discord.js';
import { IParsedCommand } from '../../command/command-parser';
import { BaseCommandPlugin } from '../base-command-plugin';
import Jimp from 'jimp';
import path from 'path';

class PhilosophersPlugin extends BaseCommandPlugin {
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

        const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);

        Jimp.read(path.join(__dirname, '..', '..', '..', 'assets', 'martin.png')).then(image => {
            image.print(font, 20, 30, text).write('teste.png', async () => {
                await message.channel.send('', {
                    files: ['teste.png'],
                });
            });
        });
    }
}

export { PhilosophersPlugin };
