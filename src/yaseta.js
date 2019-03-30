class Yaseta extends Array {
    _(fn) {
        const result = fn(this)
        return this._transformResult(result)
    }

    pipe(...fns) {
        const result = fns.reduce((result, fn) => {
            return fn(result)
        }, this)

        return this._transformResult(result)
    }

    _transformResult(result) {
        if (Array.isArray(result)) {
            return this.constructor.from(result)
        }

        return result
    }
}

module.exports = Yaseta