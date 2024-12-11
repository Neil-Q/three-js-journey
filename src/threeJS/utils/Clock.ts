import EventEmitter from './EventEmitter'

class Clock extends EventEmitter {

    start: number
    current: number
    elapsed: number
    delta: number

    constructor() {
        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16

        this.tick()
    }

    tick() {
        window.requestAnimationFrame(() => {
            const currentTime = Date.now()
            this.delta = currentTime - this.current
            this.current = currentTime
            this.elapsed = this.current - this.start

            this.notify("tick")
            this.tick()
        })
    }
}

export default Clock