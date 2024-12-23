<template>
    <div id="three-experience-placeholder">
        <canvas id="three-canvas"></canvas>
    </div>
</template>

<script>
// import * as THREE from 'three'
import Experience from '@/threeJS/experiences/P1_basicMeshScene/Experience'

export default {
    name: "P1_BasicMeshScene",
    methods: {
    },
    mounted() {
        const canvas = document.querySelector("#three-canvas")

        const experience = new Experience(canvas)

        // const canvas = document.getElementById("three-canvas")
        // const scene = new THREE.Scene()
        // const mesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshBasicMaterial({ color: 0xff0000 })
        // )
        // const sizes = {
        //     width: canvas.width,
        //     height: canvas.height
        // }
        // const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
        // const renderer = new THREE.WebGLRenderer({
        //     canvas: canvas
        // })

        // scene.add(mesh)
        // camera.position.z = 3
        // scene.add(camera)
        // renderer.setSize(sizes.width, sizes.height)

        // renderer.render(scene, camera)
    }
}
</script>

<style lang="scss" scoped>


    #three-experience-placeholder{
        height: 100%;
        width: 100%;
    }
</style>