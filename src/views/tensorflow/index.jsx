import React, { useEffect, useRef } from 'react'
import TensorFlowFaceDetectionUtils from './utilities'
import Webcam from 'react-webcam'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import './styles.css'
import '@tensorflow/tfjs-backend-webgl'

const Tensorflow = () => {
	const videoConstraints = {
		width: 720,
		height: 500,
		facingMode: 'user',
	}

	const webcamRef = useRef(null)
	const canvasRef = useRef(null)

	const getContext = async (model) => {
		if (
			webcamRef.current !== undefined &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			const videoWidth = videoConstraints.width
			const videoHeight = videoConstraints.height

			webcamRef.current.video.width = videoWidth
			webcamRef.current.video.height = videoHeight
			canvasRef.current.width = videoWidth
			canvasRef.current.height = videoHeight

			const video = await webcamRef.current.video
			const predictions = await model.estimateFaces({ input: video })
			const ctx = canvasRef.current.getContext('2d')
			const state = {
				backend: 'webgl',
				maxFaces: 2,
				triangulateMesh: true,
				predictIrises: true,
				renderPointCloud: false
			}
			console.log(predictions, video, ctx, state, videoWidth, videoHeight)

			return { predictions, video, ctx, state, videoWidth, videoHeight }
		}
	}

	useEffect(() => {
		const run = (async () => {
			console.log('1')
			const model = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)
			console.log('2', model)
			let context = await getContext(model)
			console.log('3', context)
			const { predictions, video, ctx, state, videoWidth, videoHeight } = context
			const detect = new TensorFlowFaceDetectionUtils(predictions, video, ctx, state, videoWidth, videoHeight)
			void await detect.run()
		})
		void run()
	}, [])

	return (
		<div id='wrapper'>
			<div className='webcam-blackout-wrapper' />
			<Webcam
				ref={webcamRef}
				audio={false}
				height={500}
				width={720}
				videoConstraints={videoConstraints}
				screenshotFormat={'image/webp'}
				className='webcam'
			/>

			<canvas
				ref={canvasRef}
				className='canvas'
			/>
		</div>
	)
}

export default Tensorflow

// const run = async () => {
// 	try {
// 		const faceMesh = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)
// 		const context = await getContext(faceMesh)
// 		if (context.predictions !== undefined && context.ctx !== undefined && faceMesh !== undefined) {
// 			console.log('try', context.predictions, context.ctx)
// 			return requestAnimationFrame(() => detectFace(context.predictions, context.ctx))
// 		}
// 		console.log('try', 'bummer')
// 	} catch (e) {
// 		const faceMesh = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)
// 		const context = await getContext(faceMesh)
// 		if (context.predictions !== undefined && context.ctx !== undefined && faceMesh !== undefined) {
// 			console.log('catch', context.predictions, context.ctx)
// 			return requestAnimationFrame(() => detectFace(context.predictions, context.ctx))
// 		}
// 		console.log('catch', 'bummer')
// 	}
// }

// const detectFace = (face, ctx) => {
// 	const videoWidth = webcamRef.current.video.videoWidth
// 	const videoHeight = webcamRef.current.video.videoHeight
//
// 	webcamRef.current.video.width = videoWidth
// 	webcamRef.current.video.height = videoHeight
//
// 	canvasRef.current.width = videoWidth
// 	canvasRef.current.height = videoHeight
//
// 	const loop = () => {
// 		console.log('did we make ir')
// 		return Promise.resolve(() => {
// 			console.log('loop1')
// 			requestAnimationFrame(() => drawMesh(face, ctx))
// 			return requestAnimationFrame(() => detectFace(face, ctx))
// 		})
// 	}
//
// 	void loop()
// }

// const loadFaceMesh = async () => await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)
