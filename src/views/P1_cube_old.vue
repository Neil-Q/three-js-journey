<template>
    <canvas class="webgl" id="three-canvas"></canvas>
</template>

<script lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

export default {
    data() {
            return {
            }
        },
    methods: {
    },
    mounted() {
        const debugObject = {
            color: "#3a6ea6",
            subdivision: 1,
            spin: () => { gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 }) }
        }

        // Three scene init
        const scene = new THREE.Scene()

        const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
        const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        const canvas = document.getElementById("three-canvas")
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
        camera.position.z = 3
        scene.add(camera)

        const controls = new OrbitControls(camera, canvas)

        /* const axesHelper = new THREE.AxesHelper(2)
        scene.add(axesHelper) */

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        const gui = new GUI()
        gui
            .add(mesh.position, 'y')
            .min(- 3)
            .max(3)
            .step(0.01)
            .name('elevation')

        gui.add(mesh, 'visible')
        gui.add(material, 'wireframe')

        gui
            .addColor(debugObject, 'color')
            .onChange(() => {
                material.color.set(debugObject.color)
            })

        gui.add(debugObject, 'spin')

        gui
            .add(debugObject, 'subdivision')
            .min(1)
            .max(5)
            .step(1)
            .name('SubD width')
            .onFinishChange(() =>
                {
                    const subD = debugObject.subdivision
                    
                    mesh.geometry.dispose()
                    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, subD, subD, subD)
                })

        //Add controles
        // const cursor = {
        //     x: 0,
        //     y: 0
        // }

        // Events
        // canvas!.addEventListener('mousemove', (event) => {
        //     const x = -((event.clientX - canvas!.getBoundingClientRect().left) / sizes.width - 0.5)
        //     const y = (event.clientY - canvas!.getBoundingClientRect().top) / sizes.height - 0.5

        //     cursor.x = x*4
        //     cursor.y = y*2
        // })

        window.addEventListener("resize", () => {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            renderer.setSize(sizes.width, sizes.height)
        })

        //Animate
        function animate() {
            controls.update()
            // camera.position.x = cursor.x
            // camera.position.y = cursor.y 
            // camera.lookAt(mesh.position)

            renderer.render(scene, camera)
            window.requestAnimationFrame(animate)
        }
        animate()

        console.log(window.devicePixelRatio)
    },
}
</script>

<style lang="scss">
</style>