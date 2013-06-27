if(module){
	module.exports = create;
}

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
	hash = fillHash(strA, blocksize);
	var fillhashTime = new Date();
	
	console.log('Заполнили хэш за ' + (fillhashTime - startTime) + 'мс');
	console.log('------------ хэш -------------');
	hashInfo(hash);
	
	var result = [],
		leftover = '';
	for(i = 0; i < lengthB; i++ ){
		var key = strB.substr(i,2),
			candidates = hash[key],
			c,
			nicestMatch,
			nicestMatchLength = 0;
		/*console.log('символ', i, '"' + strB[i] + '"');*/
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
			/*console.log('Совпадение');
			console.log('B:"' + strB.substr(i, nicestMatchLength) + '"');
			console.log('A:"' + strA.substr(nicestMatch, nicestMatchLength) + '"');
			console.log('Остаток: "' + leftover + '"');
			console.log('Это',nicestMatch,nicestMatchLength);*/
			result.push(leftover);
			result.push(nicestMatch);
			result.push(nicestMatchLength);
			leftover = '';
			i += nicestMatchLength;
		}else{
			/*console.log('лажа');*/
			leftover += strB[i];
		}
	}
	if( leftover ){
		result.push(leftover);
	}
	var finishTime = new Date();
	console.log('Сосчитали патч за ' + (finishTime - fillhashTime) + 'мс (всего ' + (finishTime - startTime) + 'мс)');
	return result;
}

function fillHash( str, blocksize){
	var hash = {},
		len = str.length - blocksize,
		i;
	for(i = 0; i < len; i ++ ){
		var key = str.substr(i, 2);;

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
		keys.push(key);
		var len = hash[key].length;
		if( len > max ){
			max = len;
		}
		if( len < min || !min ){
			min = len;
		}
	}
	console.log(keys.length + ' ключей, начало: ' + keys.join(', ').substr(0,80) + '...');
	console.log('Максимальное число блоков на ключ: ' + max + ', минимальное: ' + min);
}
