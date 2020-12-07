import { BaseManager } from '../base-manager';
import { IEventHandler } from './base-event';

class EventManager extends BaseManager<IEventHandler> {}

export { EventManager };
