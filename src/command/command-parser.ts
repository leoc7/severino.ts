import { IParsedCommand } from '../managers/command/base-command';

class CommandParser {
    public static parse(command: string): IParsedCommand {
        let parts = command.split(' ');

        const key = parts[0];
        parts.splice(0, 1);
        const commandWithoutPreffix = parts.join(' ');

        const params = [];

        parts = commandWithoutPreffix.split('||');

        for (let i = 0; i < parts.length; i++) {
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
