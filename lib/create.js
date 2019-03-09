module.exports = create;

var HASH_KEY_SIZE = 3,
    DEBUG = 2;

function create(strA, strB, blocksize, logLevel){
    var hash = {},
        i,
        lengthA = strA.length,
        lengthB = strB.length,
        startTime = new Date();

    if (strA === strB){
        return [0, lengthA];
    }
    if (!blocksize) {
        blocksize = 10;
    }
    if (blocksize < HASH_KEY_SIZE){
        blocksize = HASH_KEY_SIZE;
    }
    hash = fillHash(strA, blocksize);
    var fillhashTime = new Date();

    if (logLevel) {
        console.log('Hash was filled in ' + (fillhashTime - startTime) + 'ms');
    }
    if (logLevel === DEBUG) {
        hashInfo(hash);
    }

    var result = [],
        leftover = '';
    for (i = 0; i < lengthB; i++){
        var key = strB.substr(i, HASH_KEY_SIZE),
            candidates = hash[key],
            c,
            nicestMatch,
            nicestMatchLength = 0;

        if (candidates && candidates.length){
            for (c = 0; c < candidates.length; c++){
                var candidate = candidates[c],
                    begin = candidate,
                    len = 0,
                    k = i;
                /* Find the best match among all blocks with corresponding
                 * hash (Best match means longest coincidence)
                 */
                while (strA[begin] === strB[k] && begin < lengthA && k < lengthB){
                    len++;
                    k++;
                    begin++;
                }
                if (nicestMatchLength < len){
                    nicestMatchLength = len;
                    nicestMatch = candidate;
                }
            }
        }
        var noMatch;
        if (nicestMatch !== noMatch && nicestMatchLength >= blocksize){
            if (leftover.length) {
                result.push(leftover);
            }
            result.push(nicestMatch, nicestMatchLength);
            leftover = '';
            i += nicestMatchLength - 1;
        } else {
            leftover += strB[i];
        }
    }
    if (leftover.length){
        result.push(leftover);
    }
    var finishTime = new Date();
    if (logLevel) {
        console.log('Patch was computed in ' + (finishTime - fillhashTime) + 'ms (total ' + (finishTime - startTime) + 'ms)');
    }
    return result;
}

function fillHash(str, blocksize){
    var hash = {},
        len = str.length - blocksize,
        i;
    for (i = 0; i < len; i ++){
        var key = str.substr(i, HASH_KEY_SIZE);
        if (hash[key]) {
            hash[key].push(i);
        } else {
            hash[key] = [i];
        }
    }
    return hash;
}
function hashInfo(hash){
    let max = 0,
        min,
        keys = [],
        key;
    for (key in hash){
        keys.push({
            key: key,
            len: hash[key].length
        });

        let len = hash[key].length;
        if (len > max){
            max = len;
        }
        if (len < min || !min){
            min = len;
        }
    }
    keys.sort(function(a, b){
        return -(a.len - b.len);
    });
    let i;
    console.log(keys.length + ' keys in hash:');

    for (i = 0; i < keys.length; i++){
        let len = keys[i].len, _keys = [];
        while (i < keys.length && len === keys[i].len){
            _keys.push(keys[i++].key);
        }
        console.log('\t' + len + ': ' + _keys.length + ': ' + _keys.join(', ').substr(0, 100));
    }
    console.log('Max blocks count per key: ' + max + ', min: ' + min);
}