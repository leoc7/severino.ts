import { IParsedCommand } from '../managers/command/base-command';

class CommandParser {
    public static parse(command: string): IParsedCommand {
        const parts = command.split(' ');

        if (parts.length < 1) {
            return;
        }

        const key = parts[0];
        const params = [];

        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];

            params.push(part);
        }

        return {
            key,
            params,
        };
    }
}

export { CommandParser, IParsedCommand };
