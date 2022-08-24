import GLServerPinger from "./GLServerPinger.js";
import DiscordRPC from "discord-rpc";
import dotenv from "dotenv";

dotenv.config();

const UPDATE_DELAY_SECONDS = 30;

const client = new DiscordRPC.Client({
    transport: "ipc"
});

const serverPinger = new GLServerPinger();

const updateActivity = async () => {
    const isOnline = await serverPinger.isOnline();
    client.setActivity({
        details: `Ping: ${serverPinger.ping()}ms`,
        state: `Servers are ${isOnline ? "online" : "offline"}`,
        largeImageKey: isOnline ? "gl-logo-online" : "gl-logo-offline",
        largeImageText: "Galaxy Life",
        smallImageKey: isOnline ? "starling-happy" : "starling-scared",
        smallImageText: isOnline ? "Online" : "Offline",
        instance: false
    });
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