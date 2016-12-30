# Node Xbox One Clip Downloader - Beta 1

A simple tool that allows you to easily download all of the currently available public video clips for a given Xbox One gamertag.

## Requirements

### XboxAPI API Key

For this to work, an API key is required from: https://xboxapi.com

### Node version required

4.2.6 > latest (last tested with 4.2.6 LTS)

### Node modules / NPM packages

A package.json file is included for simplicity - just run `npm install` in root to fetch everything you need, should the bundled packages not work for you.

## Usage

#### Arguments

* -k : REQUIRED : STRING : your XboxAPI.com API key, within double or single quotes
* -d : REQUIRED : STRING : the absolute path to a directory that is writable by node processes (e.g. a directory with 777 permissions or similar)
* -t : REQUIRED : STRING : the Xbox Live gamertag that you wish to download videos for (note - this tool does not currently handle accounts without videos - use a service like http://xboxclips.com to make sure you have clips to download in advance)
* -v : OPTIONAL : NO PARAMS : verbose flag (shows detailed information in console output - work in progress - will eventually show more)
* --version : OPTIONAL : NO PARAMS : shows the current version

(previously, version 0.0.1 did not have or make use of these keys)

```
#!javascript
npm run getxboxvideos -- -k "XBOXAPI_APIKEY_HERE" -t "GAMERTAG_HERE" -d "/absolute/path/to/dir/to/save/files/in" -v
```

### Deprecated arguments

During development, simplistic arguments were initially used for speed. In the current version, the cli options have (mostly) changed to those outlined in the initial version README.

## Work In Progress

This download tool is still in development - feel free to add comments, suggest features, submit pull requests for alternative approaches, or fork and rework.
