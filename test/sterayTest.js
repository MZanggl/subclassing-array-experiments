const expect = require('chai').expect
const Steray = require('../src/steray')

describe('steray', function() {
    describe('times', function() {
        it('should return an array containing the indices 0 and 1', function() {
            const numbers = Steray.times(2, i => {
                return i
            })
            expect(numbers).to.deep.equal([ 0, 1 ])
        })
    })

    describe('pluck', function() {
        it('should pluck values using the key "name"', function() {
            const users = new Steray( 
                { name: 'Michael' },
                { name: 'Lukas' },
            )

            const names = users.pluck('name')
            expect(names).to.deep.equal([ 'Michael', 'Lukas' ])
        })
    })

    describe('chunk', function() {
        it('should chunk array into two chunks', function() {
            const numbers = new Steray(1, 2, 3, 4)

            const chunks = numbers.chunk(2)
            expect(chunks).to.deep.equal([ [1, 2], [3, 4] ])
        })
    })

    describe('prepend', function() {
        it('should prepend 1 and 2', function() {
            const numbers = new Steray(3, 4)

            const prepended = numbers.prepend(1, 2)
            expect(prepended).to.deep.equal([ 1, 2, 3, 4 ])
        })
    })

    describe('deduplicate', function() {
        it('should remove duplicates from one dimensional array', function() {
            const numbers = new Steray(1, 2, 2, 1)

            const uniqueNumbers = numbers.unique()
            expect(uniqueNumbers).to.deep.equal([ 1, 2 ])
        })
    })

    describe('groupBy', function() {
        it('should hashMap', function() {
            const users = new Steray( 
                { name: 'Michael', group: 1 },
                { name: 'Lukas', group: 1 },
                { name: 'Travis', group: 2 },
            )

            const userMap = users.groupBy('group')

            expect(userMap).to.deep.equal({
                '1': [
                    { name: 'Michael', group: 1 },
                    { name: 'Lukas', group: 1 },
                ],
                '2': [
                    { name: 'Travis', group: 2 },
                ]
            })
        })

        it('should hashMap using Steray array', function() {
            const users = new Steray( 
                { name: 'Michael', group: 1 },
                { name: 'Lukas', group: 1 },
                { name: 'Travis', group: 2 },
            )

            const userMap = users.groupBy('group')
            const groupOne = userMap['1']
            const isInstanceOfSteray = (groupOne instanceof Steray)
            expect(isInstanceOfSteray).to.be.true
        })
    })

    describe('tapping and piping', function() {
        it('should execute callback one time', function() {
            let i = 0
            new Steray(1, 2, 3).tap(array => i = i + array.length)

            expect(i).to.equal(3)
        })

        it('should return original array when tapping', function() {
            const array = new Steray(1, 2, 3).tap(() => 10)
            expect(array).to.deep.equal([1, 2, 3])
        })

        it('should return result of pipe', function() {
            const piped = new Steray(1, 2, 3).pipe(array => array.length)
            expect(piped).to.equal(3)
        })
    })

    describe('pad', function() {
        it('should pad twice', function() {
            const result = Steray.times(3, i => i).pad(5, 0)
            expect(result).to.deep.equal([ 0, 1, 2, 0, 0])
        })

        it('should not pad anything', function() {
            const result = Steray.times(3, i => i).pad(2, 0)
            expect(result).to.deep.equal([ 0, 1, 2 ])
        })
    })
})