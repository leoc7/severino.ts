import { BasePlugin } from '../../plugins/base-plugin';
import { BaseManager } from '../base-manager';

class PluginManager extends BaseManager<BasePlugin> {
    public emit(header: string, data: any) {
        this.iterate((key, plugin) => {
            plugin.receive(header, data);
        });
    }
}

export { PluginManager };
