import { PluginManager } from '../managers/plugin/plugin-manager';
import { PhilosophersPlugin } from '../plugins/philosopers/philosophers-plugin';

class Client {
    plugins = new PluginManager();

    public connect() {
        this.plugins.add('philosophers', new PhilosophersPlugin());
    }

    public init() {}
}

export { Client };
