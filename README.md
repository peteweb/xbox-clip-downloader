# Node Xbox One Clip Downloader

A simple tool that allows you to easily download all of the currently available public Xbox One video clips for a given Xbox One gamertag.

## Requirements

### API Key

For this to work, an API key is required from: https://xboxapi.com

### Node modules / NPM packages

> fs
> http
> child_process
> posix-getopt

## Usage

node xboxOneClips.js -k "XBOXAPI_APIKEY_HERE" -t "GAMERTAG_HERE" -d "/absolute/path/to/dir/to/save/files/in"