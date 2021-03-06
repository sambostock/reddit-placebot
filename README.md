# Reddit Placebot

I forked this bot to protect our national flag on [/r/canada](https://www.reddit.com/r/canada/)

## Easy install instructions

These are the step-by step instructions for non-tech people:

- Go to [nodejs.org](https://nodejs.org/) and download and install the latest version
- Download this repository from this link: https://github.com/sambostock/reddit-placebot/archive/master.zip
- Uncompress the downloaded zip file
- Go to the uncompressed folder
- Rename the `users.example.json` to `users.json` and open it up to put your Reddit user names and passwords in the same format as the examples (and erase the examples). **Make sure there is a comma on every line except the last, like in the example. If you have only one account, you don't need any commas.**
- **Windows**: run `install-and-run.bat`
- **Linux or Mac**: run `install.sh` and wait until it finishes. Then every time you want to start the script, run `start.sh`

## Troubleshooting

If you get an error something like this, then it means your `users.json` file has issues with commas. Please double check the instructions above.

```Failed at the reddit-placebot@1.1.0 start script 'node src/run.js --harmony'.
Make sure you have the latest version of node.js and npm installed.
If you do, this is most likely a problem with the reddit-placebot package,
not with npm itself.
Tell the author that this fails on your system:
    node src/run.js --harmony
You can get information on how to open an issue for this project with:
    npm bugs reddit-placebot
Or if that isn't available, you can get their info via:
    npm owner ls reddit-placebot
There is likely additional logging output above.
```

# Advanced

## Installation

You need to have [NodeJS installed](https://nodejs.org)

```
git clone https://github.com/sambostock/reddit-placebot
cd reddit-placebot
npm install
```

### Users

Change `users.example.json` to `users.json` and add your username and password
of your account and all your throwaways.

## Usage

Any command line options will override the options on `config.json`:

```
  npm run start
  npm run start --remote --target <REMOTE_TARGET_URL>
  npm run start --target <LOCAL_TARGET_FILE>
  npm run start --target <LOCAL_TARGET_FILE> --startX <targetStartX> --startY <targetStartY>
```
## Configuration

### The Target Image File

It can be a PNG, JPG or BMP file of any size or compression.

To change the position of the board you want to paint the target in:

- `targetStartX: 0-999`
- `targetStartY: 0-999`

Transparent pixels are just transparent pixels in PNG, or #ff00ff (for legacy reasons)
and will be ignored by the bot.

#### Colors

You can use any colors and will try to find the closest match. The available
board colors are visible in the file /src/colors.js. But it's better if you use
and eyedropper tool from a board image.

### Target Location

The bot downloads the board each time it's time to draw, so it only changes
the necessary pixels that don't match the target.

#### Remote (for multiple people)

You can configure the target to be downloaded from a remote URL:

- `useRemoteTarget: true`
- `REMOTE_TARGET_URL: "http://example.com/remote_target.png"`

The image will be downloaded before painting and saved to `images/remote_target`.

#### Local (just for your own bots)

*images/target.png*

- `useRemoteTarget: false`
- `LOCAL_TARGET_FILE: __dirname + '/images/target.png'`

### Bundle up changes

If you want to wait until multiple users are available to paint and do the
changes all at the same time, change the config:

- `bundleAccounts: <Number 1-Infinity> (default = 8)`

### Drawing Mode

- `drawMode: <mode> (default = 'RANDOM')`
  - `'TOPLEFT'`: Will draw from top to bottom and left to right
  - `'RANDOM'`: Will draw at random points

## Testing

My initial intention was to make a simple script, didn't expect it to last, so
testing manually was feasible. Now I should be writing tests, because it's getting
tedious, but I don't know how long will /r/place last for.

## Other Projects

Thanks to [trosh/rplace](https://github.com/trosh/rplace) to figure out how to actually read the bitmap from the server. I just ported that to Node.

Thanks [oliver-moran/jimp](https://github.com/oliver-moran/jimp) for a Node image processing library
without any kind of binary dependencies.

Thanks [dtao/nearest-color](https://github.com/dtao/nearest-color) for the nearest
color matching.

## License

The Reddit Placebot is released under the [MIT License](http://www.opensource.org/licenses/MIT).
