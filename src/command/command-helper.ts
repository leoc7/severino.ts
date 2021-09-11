import { ICommand } from '../managers/command/base-command';
import { IParsedCommand } from './command-parser';
import { isNumeric } from '../util';

class CommandHelper {
    public static validate(command: ICommand) {
        // if (command.params) {
        //     if (command.params.length < 1) return false;
        // }

        if (!command.handler) {
            return false;
        }

        return true;
    }

    public static match(command: ICommand, parsed: IParsedCommand) {
        console.log(command, parsed)
        if (command.key !== parsed.key) return false;
        if (command.params.length !== parsed.params.length) return false;

        for (let i = 0; i < command.params.length; i++) {
            const param = command.params[i];
            const parsedParam = parsed.params[i];

            switch (param.type) {
                case 'number':
                    if (!isNumeric(parsedParam)) return false;
            }
        }

        return true;
    }
}

export { CommandHelper };
