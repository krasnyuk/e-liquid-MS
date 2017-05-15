import {Injectable} from "@angular/core";

@Injectable()
export class SystemConfig {
    public static serverProtocol: string = 'http';
    public static serverPort: string = '5000';
    public static serverUrl: string = 'localhost'; // production
    public static apiPrefix: string = '/api';

    public static getServerAddress(): string {
        return `${SystemConfig.serverProtocol}://${SystemConfig.serverUrl}:${SystemConfig.serverPort + SystemConfig.apiPrefix}`;
    }

    public static getServerShortAddress(): string {
        return `${SystemConfig.serverProtocol}://${SystemConfig.serverUrl}:${SystemConfig.serverPort}`;
    }
}