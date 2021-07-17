import React, { useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import { drawMesh } from './utilities'
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

	const loadFaceMesh = async () => await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)

	const detectFace = (face, ctx) => {
		const videoWidth = webcamRef.current.video.videoWidth
		const videoHeight = webcamRef.current.video.videoHeight

		webcamRef.current.video.width = videoWidth
		webcamRef.current.video.height = videoHeight

		canvasRef.current.width = videoWidth
		canvasRef.current.height = videoHeight

		const loop = () => {
			console.log('did we make ir')
			return Promise.resolve(() => {
				console.log('loop1')
				requestAnimationFrame(() => drawMesh(face, ctx))
				return requestAnimationFrame(() => detectFace(face, ctx))
			})
		}

		void loop()
	}

	const getContext = async (model) => {
		if (
			webcamRef.current !== undefined &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			const video = await webcamRef.current.video
			const predictions = await model.estimateFaces({ input: video })
			const ctx = canvasRef.current.getContext('2d')
			return { predictions, ctx }
		}
	}

	const run = async () => {
		try {
			const faceMesh = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)
			const context = await getContext(faceMesh)
			if (context.predictions !== undefined && context.ctx !== undefined && faceMesh !== undefined) {
				console.log('try', context.predictions, context.ctx)
				return requestAnimationFrame(() => detectFace(context.predictions, context.ctx))
			}
			console.log('try', 'bummer')
		} catch (e) {
			const faceMesh = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)
			const context = await getContext(faceMesh)
			if (context.predictions !== undefined && context.ctx !== undefined && faceMesh !== undefined) {
				console.log('catch', context.predictions, context.ctx)
				return requestAnimationFrame(() => detectFace(context.predictions, context.ctx))
			}
			console.log('catch', 'bummer')
		}
	}

	useEffect(() => {
		void run()
	})

	return (
		<div>
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