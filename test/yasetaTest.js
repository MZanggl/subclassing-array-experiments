const expect = require('chai').expect
const Yaseta = require('../src/yaseta')
const pluck = require('ramda/src/pluck')
const uniq = require('ramda/src/uniq')
const map = require('ramda/src/map')

describe('yaseta', function() {
    describe('underscore method', function() {
        it('returns result of callback', function() {
            const numbers = new Yaseta(1, 2)
            const size = numbers._(array => array.length)

            expect(size).to.equal(2)
        })

        it('can assign ramda methods', function() {
            const users = new Yaseta(
                { name: 'Conan' },
                { name: 'Genta' }
            )

            const usernames = users._(pluck('name'))

            expect(usernames).to.deep.equal(['Conan', 'Genta'])
        })

        it('returns result of assigned callback using higher order function', function() {
            const users = new Yaseta(
                { name: 'Conan' },
                { name: 'Genta' }
            )

            const customPluck = key => array => {
                return array.map(item => item[key])
            }

            const usernames = users._(customPluck('name'))

            expect(usernames).to.deep.equal(['Conan', 'Genta'])
        })

        it('can chain methods with ramda', function() {
            const users = new Yaseta(
                { name: 'Conan', location: { city: 'Tokyo' } },
                { name: 'Genta', location: { city: 'Tokyo' } },
                { name: 'Ayumi', location: { city: 'Kanagawa' } },
            )

            const cities = users
                ._(pluck('location'))
                ._(pluck('city'))
                .map(city => city.toUpperCase())
                ._(map(city => city.toUpperCase())) // same as above
                .filter(city => city.startsWith('T'))
                ._(uniq)

                expect(cities).to.deep.equal(['TOKYO'])
        })
    })

    describe('pipe', function() {
        it('can pipe methods', function() {
            const users = new Yaseta(
                { name: 'Conan', location: { city: 'Tokyo' } },
                { name: 'Genta', location: { city: 'Tokyo' } },
                { name: 'Ayumi', location: { city: 'Kanagawa' } },
            )

            const cities = users
                .pipe(
                    pluck('location'),
                    pluck('city'),
                    map(city => city.toUpperCase())
                )
                .filter(city => city.startsWith('T'))
                ._(uniq)

                expect(cities).to.deep.equal(['TOKYO'])
        })
    })
})