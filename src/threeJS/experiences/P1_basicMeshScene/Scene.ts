import * as Three from 'three'
import Experience from './Experience'

class Scene {

    experience: Experience
    material: THREE.MeshBasicMaterial
    geometry: THREE.BoxGeometry
    mesh: THREE.Mesh
    instance: THREE.Scene

    constructor(experience: Experience) {

        this.experience = experience
        this.instance = new Three.Scene()

        this.material =  new Three.MeshBasicMaterial({ color: 0xff0000 })
        this.geometry = new Three.BoxGeometry(1, 1, 1),
        this.mesh = new Three.Mesh(this.geometry, this.material)

        this.instance.add(this.mesh)
    }

    addCamera(cameraInstance: THREE.Camera) :void {
        this.instance.add(cameraInstance)
    }

    getInstance() :THREE.Scene {
        return this.instance
    }

    setMeshToCube() :void {
        this.geometry = new Three.BoxGeometry(1, 1, 1)
    }

    setMeshToSphere() {
        this.geometry = new Three.SphereGeometry( 15, 32, 16 )
    }

    update(speed: number) :void {
        this.mesh.rotation.y += (Math.PI * 0.005) * speed
    }
}

export default Scene