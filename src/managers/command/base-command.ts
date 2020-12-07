type ICommandParamType = 'string' | 'number' | 'any';

interface ICommandParam {
    name: string;
    type: ICommandParamType;
}

interface ICommand {
    key: string;
    params: ICommandParam[];
    handler: (parsed: IParsedCommand, message: any) => void;
}

interface IParsedCommand {
    key: string;
    params: string[];
}

export { ICommand, ICommandParam, ICommandParamType, IParsedCommand };
