var fs = require('fs');
var parsedJSON = require(process.argv[2]);

//console.log(parsedJSON[0]);

var outputTitle = parsedJSON[0].titleName.replace(/\W+/g, "") + '-' + parsedJSON[0].dateRecorded.replace(/\W+/g, "-");
//console.log(outputTitle);
//console.log(parsedJSON[0].gameClipUris[0].uri);

var uniqueOutputTitle;

for (var i = parsedJSON.length - 1; i >= 0; i--) {

	for (var p = parsedJSON[i].gameClipUris.length - 1; p >= 0; p--) {
		if(parsedJSON[i].gameClipUris[p].uriType === 'Download'){
			uniqueOutputTitle = parsedJSON[i].titleName.replace(/\W+/g, "") + '-' + parsedJSON[i].dateRecorded.replace(/\W+/g, "-");
			console.log(uniqueOutputTitle);
			console.log(parsedJSON[i].gameClipUris[p].uri);
		}
	};
};