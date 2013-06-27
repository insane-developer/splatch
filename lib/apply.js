(function (){
	try{
		window.applyShinyPatch = apply;
	}catch(e){};
	try{
		module.exports = apply;
	}catch(e){};
	function apply(str, patch){
		var i, l = patch.length, result = '';
		var startTime = new Date();
		for( i = 0; i < l; i++ ){
			if( typeof patch[i] === 'string' ){
				result += patch[i];
			}else{
				result += str.substr(patch[i++], patch[i]);
			}
		}
		console.log('Наложил патч за ' + (new Date() - startTime) + 'мс');
		return result;
	}
})();