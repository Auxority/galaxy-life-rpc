import GLServerPinger from "./GLServerPinger.js";
import DiscordRPC from "discord-rpc";
import dotenv from "dotenv";

dotenv.config();

const UPDATE_DELAY_SECONDS = 10;

const client = new DiscordRPC.Client({
    transport: "ipc"
});

const serverPinger = new GLServerPinger();

const generateState = (isMasterOnline: boolean, isAuthOnline: boolean): string => {
    return isMasterOnline === true ? (isAuthOnline === true ? "Servers are online" : "Authentication servers are offline") : "Servers are offline";
}

const updateActivity = async () => {
    try {
        const isOnline = await serverPinger.updateStatus();
        const newState = generateState(serverPinger.isMasterOnline(), serverPinger.isAuthOnline());

        client.setActivity({
            details: `Ping: ${serverPinger.ping()}ms`,
            state: newState,
            largeImageKey: isOnline ? "gl-logo-online" : "gl-logo-offline",
            largeImageText: "Galaxy Life",
            smallImageKey: isOnline ? "starling-happy" : "starling-scared",
            smallImageText: isOnline ? "Online" : "Offline",
            buttons: [
                {
                    label: "Play",
                    url: "steam://run/1927780"
                },
                {
                    label: "Show this on your profile",
                    url: "https://github.com/Auxority/galaxy-life-rpc"
                }
            ],
            instance: false
        });
    } catch (error) {
        console.error(error);
    }
}

client.on("ready", () => {
    console.log(`Authenticated for user: ${client.user?.username}`);
    updateActivity();
    setInterval(() => {
        updateActivity();
    }, UPDATE_DELAY_SECONDS * 1000);
});

client.login({
    clientId: process.env.CLIENT_ID as string
});