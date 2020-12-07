import { CommandHelper } from '../command/command-helper';
import { CommandParser } from '../command/command-parser';
import { ICommand } from '../managers/command/base-command';
import { CommandManager } from '../managers/command/command-manager';
import { BasePlugin } from './base-plugin';

class BaseCommandPlugin extends BasePlugin {
    commands = new CommandManager();

    protected attachEvents() {
        this.events.add('message', this.onMessage.bind(this));
    }

    private onMessage(data: string) {
        const parsed = CommandParser.parse(data);

        if (!parsed) return;
        
        const command = this.commands.find(parsed.key);

        if (command) {
            if (CommandHelper.match(command, parsed)) {
                command.handler(parsed, data);
            }
        }
    }

    protected addCommand(command: ICommand) {
        if (!CommandHelper.validate(command)) {
            throw new Error('Error on adding a command');
        }

        this.commands.add(command.key, command);
    }
}

export { BaseCommandPlugin };
