class Steray extends Array {
    static times(length, fn) {
        return this.from({ length }, (value, i) => fn(i))
    }

    pluck(prop) {
        return this.map(item => item[prop])
    }

    chunk(chunkSize) {
        const chunks = new this.constructor
        let i = 0
        const arraySize = this.length

        while (i < arraySize) {
            const chunk = this.slice(i, i + chunkSize)
            chunks.push(chunk)
            i = i + chunkSize
        }
        return chunks
    }

    groupBy(groupByProp) {
        return this.reduce((result, item) => {
            const id = item[groupByProp]
            result[id] = result[id] || new this.constructor
            
            result[id].push({ ...item });
    
            return result;
        }, {})
    }

    unique() {
        return this.reduce((uniqueList, item) => {
            if (!uniqueList.includes(item)) {
                uniqueList.push(item)
            }

            return uniqueList
        }, new this.constructor)
    }

    tap(fn) {
        fn(this)
        return this
    }

    pipe(fn) {
        return fn(this)
    }

    prepend(...values) {
        return new this.constructor(...values, ...this)
    }

    pad(size, filler) {
        const newArray = this.constructor.from(this)
        for (let i = this.length; i < size; i++) {
            newArray.push(filler)
        }
        return newArray
    }
}

module.exports = Steray