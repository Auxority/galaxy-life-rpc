import fetch from "node-fetch";
import { performance } from "perf_hooks";

export default class GLServerPinger {
    private static readonly MASTER_URL = "https://game.galaxylifegame.net/director/getMaster";
    private _currentPing: number;
    private _serverUrl: string;

    public constructor() {
        this._currentPing = -1;
        this._serverUrl = "";
    }

    public async isOnline(): Promise<boolean> {
        await this.updateServerUrl();
        const start = performance.now();
        const res = await fetch(this._serverUrl);
        this.measureResponseTime(start);
        return res.status === 200;
    }

    public ping(): string {
        return this.formatNumber(this._currentPing);
    }

    private async updateServerUrl(): Promise<void> {
        const res = await fetch(GLServerPinger.MASTER_URL);
        if (res.status === 200) {
            this._serverUrl = await res.text();
        } else {
            throw new Error("Could not find server url");
        }
    }

    private formatNumber(value: number, fractionDigits: number = 0, roundNearest: number = 1): string {
        const power = Math.pow(10, fractionDigits);
        return String(
            Math.round(value * power / roundNearest) / power * roundNearest
        );
    }

    private measureResponseTime(start: number): void {
        this._currentPing = performance.now() - start;
    }
}
