module.exports = function create( strA, strB, blocksize ){
	var hashA = {},
		hashB = {},
		i,k,
		lengthA = strA.length,
		lengthB = strB.length,
		startTime = new Date();
	
	if( strA === strB ){
		return [];
	}
	blocksize || (blocksize = 10);
	hashA = fillHash(strA, blocksize);
	hashB = fillHash(strB, blocksize);
	var fillhashTime = new Date();
	
	console.log('Заполнили хэш за ' + (fillhashTime - startTime) + 'мс');
	console.log('------------ хэш A -------------');
	hashInfo(hashA);
	console.log('------------ хэш B -------------');
	hashInfo(hashB);
};

function fillHash( str, blocksize){
	var hash = {},
		len = str.length - blocksize,
		prevBlock;
	for(i = 0; i < len; i++ ){
		var key = str.substr(i, 2),
			block = {
			i: i,
			len: blocksize
		};
		if( prevBlock ){
			prevBlock.next = block;
		}
		hash[ key ] || (hash[ key ] = []);
	
		hash[ key ].push(block);
	}
	return hash;
};
function hashInfo(hash){
	var max = 0,
		min,
		keys = [];
	for( var key in hash ){
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
