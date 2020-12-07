class BaseManager<T> {
    items = {};

    public find(key: string) {
        return this.items[key] as T;
    }

    public add(key: string, item: T) {
        this.items[key] = item;

        return this;
    }

    public remove(key: string) {
        delete this.items[key];

        return this;
    }

    public iterate(callback: (key: string, item: T) => void) {
        Object.keys(this.items).forEach(key => {
            callback(key, this.items[key]);
        });
    }
}

export { BaseManager };
