import * as Three from "three"
import Experience from "../Experience"

class World {

    scene: THREE.Scene
    mesh: THREE.Mesh

    constructor(experience: Experience) {
        this.scene = experience.scene

        this.mesh = new Three.Mesh(
            new Three.BoxGeometry(1, 1, 1),
            new Three.MeshBasicMaterial({ color: 0xff0000 })
        )

        this.scene.add(this.mesh)
    }
}

export default World