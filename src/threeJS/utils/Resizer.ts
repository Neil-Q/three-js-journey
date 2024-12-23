import EventEmitter from "./EventEmitter"

class Resizer extends EventEmitter {

    placeholder: HTMLDivElement
    width: number
    height: number
    pixelRatio: number
    resizeObserver: ResizeObserver
    
    constructor(canvas: HTMLCanvasElement) {
        
        super()

        if (!(canvas.parentNode instanceof HTMLDivElement)) throw new Error('Le parent du canvas doit être un élément de type "div".')

        this.placeholder = canvas.parentNode
        this.width = this.placeholder.clientWidth
        this.height = this.placeholder.clientHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        this.resizeObserver = new ResizeObserver( () => {
            this.updateDimensions()
            this.notify("resize")
        })
        this.resizeObserver.observe(this.placeholder)
    }

    getHeight() :number {
        return this.height
    }

    getWidth() :number {
        return this.width
    }

    updateDimensions() {
        this.width = this.placeholder.clientWidth
        this.height = this.placeholder.clientHeight
    }
}

export default Resizer