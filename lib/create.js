/**
 * Copyright (C) 2013 Andrey Mokrousov https://github.com/insane-developer
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSEAND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
(function (ns){
	try{
		window.createShinyPatch = create;
	}catch(e){};
	try{
		module.exports = create;
	}catch(e){};
	var HASH_KEY_SIZE = 1;
	function create( strA, strB, blocksize ){
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
		
		console.log('Заполнил хэш за ' + (fillhashTime - startTime) + 'мс');
		hashInfo(hash);
		
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
					/* Среди всех блоков с подходящим хэшом находим наиболее подходящий (с наибольшей длиной совпадения) */
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
			if( nicestMatch && nicestMatchLength >= blocksize ){
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
		console.log('Сосчитал патч за ' + (finishTime - fillhashTime) + 'мс (всего ' + (finishTime - startTime) + 'мс)');
		return result;
	}

	function fillHash( str, blocksize){
		var hash = {},
			len = str.length - blocksize,
			i;
		for(i = 0; i < len; i ++ ){
			var key = str.substr(i, HASH_KEY_SIZE);

			hash[ key ] || (hash[ key ] = []);
			hash[ key ].push(i);
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
		console.log(keys.length + ' ключей, начало: ');

		for(i = 0; i < keys.length; i++){
			var len = keys[i].len, _keys = [];
			while(i < keys.length && len === keys[i].len){
				_keys.push(keys[i++].key);
			}
			console.log('\t' + len + ': ' + _keys.length + ': ' + _keys.join(', ').substr(0,100));
		}
		console.log('Максимальное число блоков на ключ: ' + max + ', минимальное: ' + min);
	}
})();