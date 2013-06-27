module.exports = function apply(str, patch){
	var i, l = patch.length, result = '';
	for( i = 0; i < l; i++ ){
		if( typeof patch[i] === 'string' ){
			result += patch[i];
		}else{
			result += str.substr(patch[i], patch[i+1]);
			i++;
		}
	}
	return result;
}