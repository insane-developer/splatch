const chai = require('chai'),
    seedrandom = require('seedrandom'),
    rnd = seedrandom('string'),
    MIN_LENGTH = 10;
chai.should();

describe('splatch', function () {
    const create = require('../lib/create.js'),
        apply = require('../lib/apply.js'),
        generator = require('../lib/testGenerator.js');


    describe('special cases', function () {
        it('makes a patch for equal strings', function () {
            for (var i = 0; i < 100; i++) {
                const str = generator(i)[0];
                const patch = create(str, str);

                patch.should.be.an('array').and.have.lengthOf(2);
                patch[0].should.equal(0);
                patch[1].should.equal(i);
            }
        });

        it('makes a patch for zero-to-string', function () {
            for (var i = 1; i < 100; i++) {
                const str = generator(i)[0];
                const patch = create('', str);

                patch.should.be.an('array').and.have.lengthOf(1);
                patch[0].should.equal(str);
            }
        });

        it('makes an empty patch for string-to-zero', function () {
            for (var i = 1; i < 100; i++) {
                const str = generator(i)[0];
                const patch = create(str, '');

                patch.should.be.an('array').and.have.lengthOf(0);
            }
        });

        function shuffle(str) {
            const l = str.length;
            let i = 0;
            const substrings = [];
            while (i < l) {
                let subLen = parseInt(MIN_LENGTH + (i ? rnd() * MIN_LENGTH : 1));
                if (l - i - subLen < MIN_LENGTH) {
                    subLen = l - i;
                }
                substrings.push(str.slice(i, Math.min(i + subLen, l)));
                i += subLen;
            }
            substrings.length.should.be.above(1);
            const res = [substrings.pop()];
            substrings.sort(() => rnd() - 0.5);
            //substrings.unshift(substrings.pop());
            return res.concat(substrings).join('');
        }

        it('don\'t include unneded strings', function () {
            for (var i = 3 * MIN_LENGTH; i < 100; i++) {
                const str = generator(i)[0];
                const str2 = shuffle(str);
                const patch = create(str, str2);

                str2.should.not.equal(str);
                console.log(str, '\n', str2);
                patch.should.be.an('array');
                patch.forEach((x, i) => x.should.be.a('number', `${i}th token`));
                patch.should.not.satisfy(arr => arr.some(x => typeof x === 'string'));
            }
        });
    });

    describe('random strings', function () {
        const count = 100;
        const perTest = 100;
        for (var i = 0; i < count; i++) {
            it(`makes valid patches #${i * perTest} - ${(i+1) * perTest - 1}`, function () {
                const strings = generator(i * perTest + 2 * MIN_LENGTH),
                    patch = create(...strings);

                patch.should.be.an('array');

                const res = apply(strings[0], patch);

                res.should.equal(strings[1]);
            });
        }
    });
});