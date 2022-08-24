# Galaxy Life - Discord Rich Presence
Hi there, I thought I would make a quick rich presence to check the status of the galaxy life servers.

# Usage
To run this project you'll need a few things.

1) You'll need to install Node.JS (from [here](https://nodejs.org/en/))

![Which Node.JS version to download](https://cdn.discordapp.com/attachments/302318511764799488/1011909064323768330/node-tutorial.png)

* _If you are familiar with git clone, you can skip steps 2 and 3._

2) You'll need to download this repository as a zip file. You can do so by clicking [here](https://github.com/Auxority/galaxy-life-rpc/archive/refs/heads/main.zip) or by using the buttons provided by GitHub as shown in the image.

![Showing where to download the repository as a zip file](https://cdn.discordapp.com/attachments/302318511764799488/1011906124074721300/unknown.png)

3) You'll need to unzip the downloaded file.

![Showing how to unzip the file](https://cdn.discordapp.com/attachments/302318511764799488/1011907426972344330/unzip-tutorial.png)

3) Open the unzipped folder.

![The contents of the unzipped folder](https://cdn.discordapp.com/attachments/302318511764799488/1011909368146575410/unknown.png)

4) Copy the `.env.example` file and rename it to `.env`

![The new .env file](https://cdn.discordapp.com/attachments/302318511764799488/1011909562745499668/unknown.png)

5) Visit the developer portal by clicking [this link](https://discord.com/developers/applications)

![The developer portal](https://cdn.discordapp.com/attachments/302318511764799488/1011910536134393887/unknown.png)

6) Create a new application by clicking the "New Application" button. Give it any name you like.

![Creating a new application](https://media.discordapp.net/attachments/302318511764799488/1011910772420513842/unknown.png?width=974&height=702)

7) Open your newly created application

![Open the new application](https://media.discordapp.net/attachments/302318511764799488/1011911903028711494/unknown.png)

8) Copy the application id. This should match with the number shown in the address bar of your browser.

![Where to find your application id](https://cdn.discordapp.com/attachments/302318511764799488/1011908513427111986/client_id_tutorial.png)

9) Open the .env file and replace `YOUR_CLIENT_ID_HERE` with the application id you just copied. Make sure that this is still prefixed with `CLIENT_ID=` after you have pasted your application id. So it would end up looking something like this: `CLIENT_ID=1011101101110111011`

10) Save the .env file

11) Go back to the developer portal (see step 5)

12) Open the rich presence page.

![](https://media.discordapp.net/attachments/302318511764799488/1011912344462438410/unknown.png?width=884&height=702)

13) Add the images of your choice, but make sure to give them the same names as shown in the example. `gl-logo-offline`, `gl-logo-online`, `starling-happy` and `starling-scared`. The images have to be at least 512x512 pixels.

    If you want to use the images I used, you can download them here:
* [gl-logo-offline](https://cdn.discordapp.com/attachments/302318511764799488/1011913086342545448/gl-logo-offline.png)

* [gl-logo-online](https://cdn.discordapp.com/attachments/302318511764799488/1011913086724210748/gl-logo-online.png)

* [starling-happy](https://media.discordapp.net/attachments/302318511764799488/1011936906990325770/starling-happy.png)

* [starling-scared](https://media.discordapp.net/attachments/302318511764799488/1011936993132937297/starling-scared.png)

14) Open a terminal in the folder you have extracted. (see step 3) A simple way to to do this, is by typing `cmd` in this bar and pressing the Enter/Return key on your keyboard.

![How to open a terminal](https://cdn.discordapp.com/attachments/302318511764799488/1011915252134322196/unknown.png)

Your terminal might look something like this:

![A cmd terminal](https://cdn.discordapp.com/attachments/302318511764799488/1011916027107491860/unknown.png)

15) Run `npm install` in the terminal to install all required packages. 

![Installing npm packages](https://cdn.discordapp.com/attachments/302318511764799488/1011916761664344104/unknown.png)

16) Make sure that discord is open.

17) Run `npm start` in your terminal to start the rich presence.