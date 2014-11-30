# Node Xbox One Clip Downloader - Alpha

A simple tool that allows you to easily download all of the currently available public video clips for a given Xbox One gamertag.

## Requirements

### API Key

For this to work, an API key is required from: https://xboxapi.com

### Node modules / NPM packages

* fs
* http
* https
* child_process
* posix-getopt
* q

## Usage

### Development arguments

During development, simplistic arguments are used for speed. In later versions, the cli options will change to those outlined in the below planned arguments.

#### Arguments

* 1st : REQUIRED : STRING : your XboxAPI.com API key, within double or single quotes
* 2nd : REQUIRED : STRING : the absolute path to a directory that is writable by node processes (e.g. a directory with 777 permissions or similar)
* 3rd : REQUIRED : STRING : the Xbox Live gamertag that you wish to download videos for (note - this tool does not currently handle accounts without videos - use a service like http://xboxclips.com to make sure you have clips to download in advance)
* 4th : OPTIONAL : INT 1/0 : verbose flag (shows detailed information in console output - work in progress - will eventually show more)

```
#!javascript
node xboxOneClips.js "XBOXAPI_APIKEY_HERE" "/absolute/path/to/dir/to/save/files/in" "GAMERTAG_HERE" 1
```

### Planned arguments

* -k : REQUIRED : STRING : your XboxAPI.com API key, within double or single quotes
* -d : REQUIRED : STRING : the absolute path to a directory that is writable by node processes (e.g. a directory with 777 permissions or similar)
* -t : REQUIRED : STRING : the Xbox Live gamertag that you wish to download videos for (note - this tool does not currently handle accounts without videos - use a service like http://xboxclips.com to make sure you have clips to download in advance)
* -o : OPTIONAL : NO PARAMS : verbose flag (shows detailed information in console output - work in progress - will eventually show more)

```
#!javascript
node xboxOneClips.js -k "XBOXAPI_APIKEY_HERE" -t "GAMERTAG_HERE" -d "/absolute/path/to/dir/to/save/files/in" -o
```

## Work In Progress

This download tool is still in development - feel free to add comments, suggest features, submit pull requests for alternative approaches, or fork and rework.