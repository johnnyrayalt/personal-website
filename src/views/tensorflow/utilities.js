import Stats from 'stats.js'
import { ScatterGL } from 'scatter-gl'
import { TRIANGULATION } from './triangulation'
import * as dat from 'dat.gui'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import * as tf from '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'

const GREEN = '#32EEDB'
const RED = '#FF2C35'
const BLUE = '#157AB3'

export default class TensorFlowFaceDetectionUtils {
	DEFAULT_VIDEO_SIZE = 500
	NUM_KEYPOINTS = 468
	NUM_IRIS_KEYPOINTS = 5

	stats = new Stats()
	scatterGLHasInitialized = false
	stopRendering = false

	model
	video
	ctx
	state
	videoWidth
	videoHeight
	canvasWidth
	canvasHeight
	mobile
	renderPointCloud
	scatterGL
	rafID

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	constructor(model, video, ctx, state, width, height) {
		[model, video, ctx, state, width, height].forEach(name => console.log(name))
		this.model = model
		this.video = video
		this.ctx = ctx
		this.mobile = this.isMobile()
		this.renderPointCloud = this.mobile === false
		this.state = { ...state }
		console.log(state)
		this.videoWidth = width
		this.videoHeight = height
		this.canvasWidth = width
		this.canvasHeight = height
	}

	run = async () => {
		await tf.setBackend(this.state.backend).then(async () => {
			await tf.ready()

			this.ctx.translate(this.canvasWidth, 0)
			this.ctx.scale(-1, 1)
			this.ctx.fillStyle = GREEN
			this.ctx.strokeStyle = GREEN
			this.ctx.lineWidth = 0.5

			this.model = await faceLandmarksDetection.load(
				faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
				{ maxFaces: this.state.maxFaces },
			)
			requestAnimationFrame(void await this.renderPrediction())

			// if (this.renderPointCloud) {
			// 	document.querySelector('#scatter-gl-container').style =
			// 		`width: ${this.DEFAULT_VIDEO_SIZE}px; height: ${this.DEFAULT_VIDEO_SIZE}px;`
			//
			// 	this.scatterGL = new ScatterGL(
			// 		document.querySelector('#scatter-gl-container'),
			// 		{ 'rotateOnStart': false, 'selectEnabled': false })
			// }
		})
	}

	isMobile = () => {
		const isAndroid = /Android/i.test(navigator.userAgent)
		const isiOS = /iPhone/i.test(navigator.userAgent)
		return isAndroid || isiOS
	}

	distance = (a, b) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))


	renderPrediction = async () => {
		if (this.stopRendering) return

		const predictions = await this.model.estimateFaces({
			input: this.video,
			returnTensors: false,
			flipHorizontal: false,
			predictIrises: this.state.predictIrises,
		})

		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

		if (predictions.length > 0) {
			predictions.forEach(prediction => {
				const keypoints = prediction.scaledMesh

				if (this.state.triangulateMesh) {
					this.ctx.strokeStyle = 'aqua'
					this.ctx.lineWidth = 0.5

					for (let i = 0; i < TRIANGULATION.length / 3; i++) {
						const points = [
							TRIANGULATION[i * 3],
							TRIANGULATION[i * 3 + 1],
							TRIANGULATION[i * 3 + 2],
							// eslint-disable-next-line @typescript-eslint/no-unsafe-return
						].map(i => keypoints[i])

						this.drawPath(this.ctx, points, true)
					}
				} else {
					this.ctx.fillStyle = 'aqua'

					for (let i = 0; i < this.NUM_KEYPOINTS; i++) {
						const x = keypoints[i][0]
						const y = keypoints[i][1]

						this.ctx.beginPath()
						this.ctx.arc(x, y, 1, 0, 2 * Math.PI)
						this.ctx.fill()
					}
				}

				if (keypoints.length > this.NUM_KEYPOINTS) {
					this.ctx.strokeStyle = 'red'
					this.ctx.lineWidth = 1

					const leftCenter = keypoints[this.NUM_KEYPOINTS]
					const leftDiameterY = this.distance(keypoints[this.NUM_KEYPOINTS + 4], keypoints[this.NUM_KEYPOINTS + 2])
					const leftDiameterX = this.distance(keypoints[this.NUM_KEYPOINTS + 3], keypoints[this.NUM_KEYPOINTS + 1])

					this.ctx.beginPath()
					this.ctx.ellipse(
						leftCenter[0], leftCenter[1], leftDiameterX / 2, leftDiameterY / 2, 0, 0, 0
					)
					this.ctx.stroke()

					if (keypoints.length > this.NUM_KEYPOINTS + this.NUM_IRIS_KEYPOINTS) {
						const rightCenter = keypoints[this.NUM_KEYPOINTS + this.NUM_IRIS_KEYPOINTS]
						const rightDiameterY = this.distance(
							keypoints[this.NUM_KEYPOINTS + this.NUM_IRIS_KEYPOINTS + 2],
							keypoints[this.NUM_KEYPOINTS + this.NUM_IRIS_KEYPOINTS + 4],
						)
						const rightDiameterX = this.distance(
							keypoints[this.NUM_KEYPOINTS + this.NUM_IRIS_KEYPOINTS + 3],
							keypoints[this.NUM_KEYPOINTS + this.NUM_IRIS_KEYPOINTS + 1],
						)

						this.ctx.beginPath()
						this.ctx.ellipse(
							rightCenter[0], rightCenter[1], rightDiameterX / 2, rightDiameterY / 2, 0, 0, 2 * Math.PI,
						)
						this.ctx.stroke()
					}
				}
			})
		}

		this.rafID = requestAnimationFrame(void await this.renderPrediction())
	}

	drawPath = (ctx, points) => {
		const region = new Path2D()
		region.moveTo(points[0][0], points[0][1])

		for (const point of points) {
			region.lineTo(point[0], point[1])
		}

		region.closePath()
		ctx.stroke(region)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const drawMesh = (predictions, ctx) => {
// 	if (predictions.length > 0) {
// 		predictions.forEach(prediction => {
// 			const keyPoints = prediction.scaledMesh
//
// 			for (let i = 0; i < TRIANGULATION.length / 3; i++) {
// 				const points = [
// 					TRIANGULATION[i * 3],
// 					TRIANGULATION[i * 3 + 1],
// 					TRIANGULATION[i * 3 + 2]
// 					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
// 				].map(i => keyPoints[i])
// 				this.drawPath(ctx, points)
// 			}
//
// 			for (let i = 0; i < keyPoints.length; i++) {
// 				const x = keyPoints[i][0]
// 				const y = keyPoints[i][1]
//
// 				ctx.beginPath()
// 				ctx.arc(x, y, 1, 0, 3 * Math.PI)
// 				ctx.fillStyle = 'aqua'
// 				ctx.fill()
// 			}
// 		})
// 	}
// }

// setupCamera = async () => {
// 	this.video = document.getElementById('video')
//
// 	const stream = await navigator.mediaDevices.getUserMedia({
// 		'audio': false,
// 		'video': {
// 			facingMode: 'user',
// 			width: this.mobile ? undefined : this.DEFAULT_VIDEO_SIZE,
// 			height: this.mobile ? undefined : this.DEFAULT_VIDEO_SIZE
// 		}
// 	})
// 	this.video.srcObject = stream
// }

// setupDatGui = () => {
// 	const gui = new dat.GUI()
// 	gui.add(this.state, 'backend', ['webgl', 'wasm', 'cpu'])
// 		.onChange(async backend => {
// 			this.stopRendering = true
// 			window.cancelAnimationFrame(this.rafID)
// 			await tf.setBackend(backend)
// 			this.stopRendering = false
// 			requestAnimationFrame(() => this.renderPrediction)
// 		})
//
// 	gui.add(this.state, 'maxFaces', 1, 20, 1).onChange(async val => {
// 		this.model = await faceLandmarksDetection.load(
// 			faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
// 			{ maxFaces: val },
// 		)
// 	})
//
// 	gui.add(this.state, 'triangulateMesh')
// 	gui.add(this.state, 'predictedIrises')
//
// 	if (this.renderPointCloud) {
// 		gui.add(this.state, 'renderPointcloud').onChange(render => {
// 			document.querySelector('#scatter-gl-container').style.display =
// 				render ? 'inline-block' : 'none'
// 		})
// 	}
// }