import { IParsedCommand } from '../../command/command-parser';
import { BaseCommandPlugin } from '../base-command-plugin';

class PhilosophersPlugin extends BaseCommandPlugin {
    constructor() {
        super({
            name: 'Philosophers',
        });
        this.attachEvents();

        this.addCommand({
            key: 'philosophers',
            params: [
                {
                    name: 'text',
                    type: 'string',
                },
            ],
            handler: this.onPhilosophers.bind(this),
        });
    }

    private onPhilosophers(command: IParsedCommand, message: any) {
        const [text] = command.params;

        console.log(text, message);
    }
}

export { PhilosophersPlugin };
