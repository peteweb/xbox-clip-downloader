module.exports = {
    weHaveArgFor: function(args, flag){
    	return (args.indexOf(flag) !== -1);
    },
    getArgFor: function(args, flag){
    	return args[args.indexOf(flag) + 1];
    },
    isNotNullUndefinedEmpty: function(value){
    	if(value !== null && value !== undefined && value !== ""){
    		return true;
    	} else {
    		return false;
    	}
    }
};
