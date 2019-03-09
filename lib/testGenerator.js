const seedrandom = require('seedrandom'),
    rnd = seedrandom('quack');
/**
 * estGenerator is a tool for creating pairs of files on specified length and content for test purposes.
 */
module.exports = function testGenerator(Alength, Blength, vocA, vocB){
    if (!vocA) {
        vocA = ' `1234567890-=qwertyuiop[]\\asdfghjkl;zxcvbnm,./!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?'.split('');
    }
    if (!vocB) {
        vocB = vocA;
    }
    if (!Blength) {
        Blength = Alength;
    }
    return [
        generate(Alength, vocA),
        generate(Blength, vocB)
    ];
};
function generate(len, voc){
    var i, str = '';
    for (i = 0; i < len; i++){
        str += voc[(rnd() + '').substr(3, 12) % voc.length];
    }
    return str;
}