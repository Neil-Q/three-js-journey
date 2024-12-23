import * as Three from "three"
import Resizer from "@/threeJS/utils/Resizer"
import Clock from "@/threeJS/utils/Clock"
import Camera from "./Camera"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Experience {

    camera: Camera
    canvas: HTMLCanvasElement
    clock: Clock
    controls: OrbitControls
    resizer: Resizer
    scene: THREE.Scene
    renderer: THREE.Renderer

    private constructor(canvas: HTMLCanvasElement) {

        if (!(canvas instanceof HTMLCanvasElement)) throw new Error('La cible de l\'experience doit être un élément de type canvas')

        this.canvas = canvas
        this.resizer = new Resizer(this.canvas)
        this.clock = new Clock
        // this.clock.on("tick", this.update.bind(this))
        
        this.scene = new Three.Scene()
        this.camera = this.setCamera()
        this.renderer = this.setRenderer()


        this.controls = new OrbitControls(this.camera.getInstance(), this.canvas)
    }

    setCamera() :Camera {
        const camera = new Camera({
            resizer: this.resizer,
            scene: this.scene
        })

        this.scene.add(camera.instance)

        return camera
    }

    setRenderer() :THREE.Renderer {
        const renderer = new Three.WebGLRenderer({
            canvas: this.canvas
        })

        renderer.setSize(this.resizer.getWidth(), this.resizer.getHeight())
        renderer.setPixelRatio(2)

        this.clock.on("tick", () => {
            renderer.render(this.scene, this.camera.getInstance())
        })

        this.resizer.on("resize", () => {
            renderer.setSize(this.resizer.getWidth(), this.resizer.getHeight())
        })

        return renderer
    }
}

export default Experience