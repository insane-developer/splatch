/**
 * SHINY-NEMESIS apply is a tool for appling patches, made by SHINY-NEMESIS patch tool.
 *
 * @see https://github.com/insane-developer/shiny-nemesis
 *
 * @author Andrey Mokrousov (https://github.com/insane-developer)
 * @copyright © 2013 Andrey Mokrousov
 * @license MIT https://github.com/insane-developer/shiny-nemesis/master/LICENSE
 */
(function (){
	try{
		window.applyShinyPatch = apply;
	}catch(e){};
	try{
		module.exports = apply;
	}catch(e){};

	function apply(str, patch, logLevel){
		var i, l = patch.length, result = '';
		var startTime = new Date();
		for( i = 0; i < l; i++ ){
			if( typeof patch[i] === 'string' ){
				result += patch[i];
			}else{
				result += str.substr(patch[i++], patch[i]);
			}
		}
		logLevel && console.log('Applied in ' + (new Date() - startTime) + 'ms');
		return result;
	}
})();