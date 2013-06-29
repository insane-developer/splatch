/**
 * SHINY-NEMESIS testGenerator is a tool for creating pairs of files on specified length and content for test purposes.
 *
 * @see https://github.com/insane-developer/shiny-nemesis
 *
 * @author Andrey Mokrousov (https://github.com/insane-developer)
 * @copyright © 2013 Andrey Mokrousov
 * @license MIT https://github.com/insane-developer/shiny-nemesis/master/LICENSE
 */
module.exports = function testGenerator(Alength, Blength, vocA, vocB){
	vocA || (vocA = '`1234567890-=qwertyuiop[]\\asdfghjkl;zxcvbnm,./!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?'.split(''));
	vocB || (vocB = vocA);
	Blength || (Blength = Alength);
	return [
		generate(Alength, vocA),
		generate(Blength, vocB)
	];
}
function generate(len, voc){
	var i, str = '';
	for( i = 0; i < len; i++ ){
		str += voc[(Math.random() + '').substr(3,12) % voc.length];
	}
	return str;
}