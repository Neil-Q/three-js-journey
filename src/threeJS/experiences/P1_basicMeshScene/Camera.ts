import * as Three from "three"
import * as Lil from "node_modules/lil-gui/dist/lil-gui.esm"
import Resizer from "@/threeJS/utils/Resizer"
import EventEmitter from "@/threeJS/utils/EventEmitter"

class Camera extends EventEmitter {

    scene: THREE.Scene
    resizer: Resizer
    guiMain: Lil.GUI
    guiType: Lil.GUI
    guiOptions: Lil.GUI
    instance: THREE.PerspectiveCamera | THREE.OrthographicCamera
    
    resizeCallback? : CallableFunction 

    constructor(_options: {
        gui: Lil.GUI
        resizer: Resizer,
        scene: THREE.Scene
    })
    {
        super()

        this.scene = _options.scene
        this.resizer = _options.resizer
        
        this.guiMain = _options.gui.addFolder("Camera")
        this.guiType = this.guiMain.addFolder("Type")
        this.guiOptions = this.guiMain.addFolder("Options")
        
        this.instance = this.createOrthographicCamera()
        
        this.setGuiCameraType()
    }

    getInstance() :THREE.PerspectiveCamera | THREE.OrthographicCamera {

        return this.instance
    }

    setGuiCameraType() :void {

        const debugobject = {
            perspective: () => {this.changeCamera("perspective")},
            orthographic: () => {this.changeCamera("orthographic")}
        }

        this.guiType.add(debugobject, 'perspective')
        this.guiType.add(debugobject, 'orthographic')
    }

    changeCamera(type: "perspective" | "orthographic") :void {

        const reset = () => {
            this.guiOptions.destroy()
            this.guiOptions = this.guiMain.addFolder("Options")

            if (this.resizeCallback) {
                this.resizer.off("resize", this.resizeCallback)
            }
        }

        switch (type) {
            case "perspective":
                if(this.instance instanceof Three.PerspectiveCamera) return
                
                reset()
                this.instance = this.createPerspectiveCamera()
                break
        
            case "orthographic":
                if(this.instance instanceof Three.OrthographicCamera) return

                reset()
                this.instance = this.createOrthographicCamera()
                break
        
            default: return
        }

        this.notify("cameraChange")
    }

    createOrthographicCamera() :THREE.OrthographicCamera {

        const camera :THREE.OrthographicCamera = new Three.OrthographicCamera()
        camera.position.z = 3

        this.resizeCallback = () => {
            const aspectRatio = this.resizer.getWidth()/this.resizer.getHeight()
            camera.left = -5
            camera.right = 5
            camera.top = 5 / aspectRatio
            camera.bottom = -5 / aspectRatio

            camera.updateProjectionMatrix()
        }
        this.resizeCallback()

        this.resizer.on("resize", this.resizeCallback)

        this.guiOptions.add(camera, "zoom").min(1).max(5).step(0.1).name("Zoom").onChange(() => {camera.updateProjectionMatrix()})

        return camera
    }

    createPerspectiveCamera() :THREE.PerspectiveCamera {

        const camera :THREE.PerspectiveCamera = new Three.PerspectiveCamera(75, this.resizer.getWidth()/this.resizer.getHeight())
        camera.position.z = 3

        this.resizeCallback = () => {
            camera.aspect = this.resizer.getWidth()/this.resizer.getHeight()
            camera.updateProjectionMatrix()
        }
        this.resizer.on("resize", this.resizeCallback)

        this.guiOptions.add(camera, "fov").min(1).max(180).step(1).name("fov").onChange(() => {camera.updateProjectionMatrix()})
        this.guiOptions.add(camera, "zoom").min(1).max(5).step(0.1).name("Zoom").onChange(() => {camera.updateProjectionMatrix()})

        return camera
    }
}

export default Camera