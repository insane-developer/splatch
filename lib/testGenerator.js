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