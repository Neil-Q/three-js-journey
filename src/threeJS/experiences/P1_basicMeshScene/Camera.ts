import * as Three from "three"
import Resizer from "@/threeJS/utils/Resizer"

class Camera {

    scene: THREE.Scene
    resizer: Resizer
    instance: THREE.PerspectiveCamera

    constructor(_options: {
        resizer: Resizer,
        scene: THREE.Scene
    })
    {
        this.scene = _options.scene
        this.resizer = _options.resizer
        
        this.instance = this.setInstance()
        
        this.resizer.on("resize", () => {
            this.resize()
        })
    }

    getInstance() :THREE.PerspectiveCamera {
        return this.instance
    }

    resize() :void {
        this.instance.aspect = this.resizer.getWidth()/this.resizer.getHeight()
        this.instance.updateProjectionMatrix()
    }

    setInstance() :THREE.PerspectiveCamera {
        const instance = new Three.PerspectiveCamera(75, this.resizer.getWidth()/this.resizer.getHeight())
        instance.position.z = 3

        return instance
    }
}

export default Camera