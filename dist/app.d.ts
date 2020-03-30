import { Application } from 'midway';
export default class AppBootHook {
    app: Application;
    constructor(app: Application);
    didReady(): Promise<void>;
    serverDidReady(): Promise<void>;
}
