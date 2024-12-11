import EventEmitter from "./EventEmitter"

class Resizer extends EventEmitter {

    boundary: HTMLDivElement
    width: number
    height: number
    pixelRatio: number
    resizeObserver: ResizeObserver
    
    constructor(canvas: HTMLCanvasElement) {

        if (!(canvas.parentNode instanceof HTMLDivElement)) throw new Error('Le parent du canvas doit être un élément de type "div".')

        super()
        this.boundary = canvas.parentNode
        this.width = this.getWidth()
        this.height = this.getHeight()
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        this.resizeObserver = new ResizeObserver( () => {
            this.updateDimensions()
            this.notify("resize")
        })
        this.resizeObserver.observe(this.boundary)
    }

    getWidth() {
        if (this.boundary instanceof HTMLDivElement) return this.boundary.clientWidth

        return window.innerWidth
    }

    getHeight() {
        if (this.boundary instanceof HTMLDivElement) return this.boundary.clientHeight

        return window.innerHeight
    }

    updateDimensions() {
        this.width = this.getWidth()
        this.height = this.getHeight()
    }
}

export default Resizer