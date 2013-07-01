/**
 * SHINY-NEMESIS create is a tool for creating patches, which can be applied via apply tool.
 *
 * @see https://github.com/insane-developer/shiny-nemesis
 *
 * @author Andrey Mokrousov (https://github.com/insane-developer)
 * @copyright © 2013 Andrey Mokrousov
 * @license MIT https://github.com/insane-developer/shiny-nemesis/master/LICENSE
 */
(function (ns){
	try{
		window.createShinyPatch = create;
	}catch(e){};
	try{
		module.exports = create;
	}catch(e){};
	var HASH_KEY_SIZE = 3,
		MINIMAL = 1,
		DEBUG = 2;
	function create( strA, strB, blocksize, logLevel ){
		var hash = {},
			i,k,
			lengthA = strA.length,
			lengthB = strB.length,
			startTime = new Date();
		
		if( strA === strB ){
			return [0,lengthA];
		}
		blocksize || (blocksize = 10);
		if( blocksize < HASH_KEY_SIZE ){
			blocksize = HASH_KEY_SIZE;
		}
		hash = fillHash(strA, blocksize);
		var fillhashTime = new Date();
		
		logLevel && console.log('Hash was filled in ' + (fillhashTime - startTime) + 'ms');
		logLevel === DEBUG && hashInfo(hash);
		
		var result = [],
			leftover = '';
		for(i = 0; i < lengthB; i++ ){
			var key = strB.substr(i,HASH_KEY_SIZE),
				candidates = hash[key],
				c,
				nicestMatch,
				nicestMatchLength = 0;

			if( candidates && candidates.length ){
				for( c = 0; c < candidates.length; c++ ){
					var candidate = candidates[c],
						begin = candidate,
						len = 0,
						k = i;
					/* Find the best match among all blocks with corresponding hash (Best match means longest coincidence) */
					while( strA[begin] === strB[k] && begin < lengthA && k < lengthB ){
						len++;
						k++;
						begin++;
					}
					if( nicestMatchLength < len ){
						nicestMatchLength = len;
						nicestMatch = candidate;
					}
				}
			}
			if( nicestMatch !== undefined && nicestMatchLength >= blocksize ){
				leftover.length && result.push(leftover);
				result.push(nicestMatch, nicestMatchLength);
				leftover = '';
				i += nicestMatchLength - 1;
			}else{
				leftover += strB[i];
			}
		}
		if( leftover.length ){
			result.push(leftover);
		}
		var finishTime = new Date();
		logLevel && console.log('Patch was computed in ' + (finishTime - fillhashTime) + 'ms (total ' + (finishTime - startTime) + 'ms)');
		return result;
	}

	function fillHash( str, blocksize){
		var hash = {},
			len = str.length - blocksize,
			i;
		for(i = 0; i < len; i ++ ){
			var key = str.substr(i, HASH_KEY_SIZE);
			hash[ key ]? (hash[ key ].push(i)):(hash[ key ] = [i]);
		}
		return hash;
	}
	function hashInfo(hash){
		var max = 0,
			min,
			keys = [],
			key;
		for( key in hash ){
			keys.push({ key: key, len: hash[key].length });
			
			var len = hash[key].length;
			if( len > max ){
				max = len;
			}
			if( len < min || !min ){
				min = len;
			}
		}
		keys.sort(function(a,b){
			return -(a.len - b.len);
		});
		var i;
		console.log(keys.length + ' keys in hash:');

		for(i = 0; i < keys.length; i++){
			var len = keys[i].len, _keys = [];
			while(i < keys.length && len === keys[i].len){
				_keys.push(keys[i++].key);
			}
			console.log('\t' + len + ': ' + _keys.length + ': ' + _keys.join(', ').substr(0,100));
		}
		console.log('Max blocks count per key: ' + max + ', min: ' + min);
	}
})();