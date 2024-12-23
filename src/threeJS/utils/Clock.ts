import EventEmitter from './EventEmitter'

class Clock extends EventEmitter {

    start: number
    current: number
    elapsed: number
    defaultDelta: number
    delta: number

    constructor() {
        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.defaultDelta = 16
        this.delta = 16

        this.tick()
    }

    tick() {
        window.requestAnimationFrame(() => {
            const currentTime = Date.now()
            this.delta = currentTime - this.current
            this.current = currentTime
            this.elapsed = this.current - this.start

            const speedRatio = this.delta/this.defaultDelta

            this.notify("tick", speedRatio)
            this.tick()
        })
    }
}

export default Clock