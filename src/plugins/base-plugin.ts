import { EventManager } from '../managers/event/event-manager';

interface IBasePluginData {
    name: string;
}

class BasePlugin {
    protected events = new EventManager();

    constructor(data: IBasePluginData) {
        Object.assign(this, data);
    }

    public receive(header: string, data: any) {
        const event = this.events.find(header);

        if (event) {
            event(data);
        }
    }
}

export { BasePlugin };
