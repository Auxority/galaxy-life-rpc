import fetch from "node-fetch";
import { performance } from "perf_hooks";

export default class GLServerPinger {
    private static readonly MASTER_URL = "https://game.galaxylifegame.net/director/getMaster";
    private static readonly AUTH_URL = "https://auth.phoenixnetwork.net/oauth2/auth";
    private _isMasterOnline: boolean;
    private _isAuthOnline: boolean;
    private _currentPing: number;
    private _serverUrl: string;

    public constructor() {
        this._isMasterOnline = false;
        this._isAuthOnline = false;
        this._currentPing = -1;
        this._serverUrl = "";
    }

    public async updateStatus(): Promise<boolean> {
        try {
            await this.updateServerUrl();
        } catch (e: any) {
            console.error("Cannot find server url.");
        }

        try {
            await this.updateAuthStatus();
        } catch (e: any) {
            console.error("Auth servers have changed.");
        }

        try {
            const start = performance.now();
            await this.updateMasterStatus();
            this.measureResponseTime(start);
            return this._isMasterOnline && this._isAuthOnline;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    public isAuthOnline(): boolean {
        return this._isAuthOnline;
    }

    public isMasterOnline(): boolean {
        return this._isMasterOnline;
    }

    public ping(): string {
        return this.formatNumber(this._currentPing);
    }

    private async updateMasterStatus(): Promise<void> {
        const res = await fetch(this._serverUrl);
        this._isMasterOnline = (res.status !== 503 && res.status !== 504);
    }

    private async updateAuthStatus(): Promise<void> {
        const res = await fetch(GLServerPinger.AUTH_URL);
        this._isAuthOnline = res.status !== 502;
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
