var getoptsLong = require('posix-getopt');
var parser, option;

parser = new getoptsLong.BasicParser('abo:(output)', process.argv);

while ((option = parser.getopt()) !== undefined) {
	switch (option.option) {
    case 'k':
        console.log('k is used for the apikey');
        break;

    case 't':
        console.log('t is used for a gamertag');
        break;

    case 'd':
        console.error('d is for the download directory',
            option.optarg);
        break;

    default:
        /* error message already emitted by getopt */
        mod_assert.equal('?', option.option);
        break;
    }
}

if (parser.optind() >= process.argv.length)
	usage('missing required argument: "input"');

console.log('input = %s', process.argv[parser.optind()]);