module.exports = {
    apply: apply
};


function apply(str, patch, logLevel){
    var i, l = patch.length, result = '';
    var startTime = new Date();
    for (i = 0; i < l; i++) {
        if (typeof patch[i] === 'string') {
            result += patch[i];
        }else{
            result += str.substr(patch[i++], patch[i]);
        }
    }

    if (logLevel) {
        console.log('Applied in ' + (new Date() - startTime) + 'ms');
    }
    return result;
}