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
(function (){
	try{
		window.applyShinyPatch = apply;
	}catch(e){};
	try{
		module.exports = apply;
	}catch(e){};

	function apply(str, patch, logLevel){
		var i, l = patch.length, result = '';
		var startTime = new Date();
		for( i = 0; i < l; i++ ){
			if( typeof patch[i] === 'string' ){
				result += patch[i];
			}else{
				result += str.substr(patch[i++], patch[i]);
			}
		}
		logLevel && console.log('Наложил патч за ' + (new Date() - startTime) + 'мс');
		return result;
	}
})();