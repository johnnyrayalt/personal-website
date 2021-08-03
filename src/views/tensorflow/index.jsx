import React, { useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import { drawMesh } from './utilities'
import { useViewport } from '../../utils/useViewportHook'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import './styles.css'
import '@tensorflow/tfjs-backend-webgl'

const Tensorflow = () => {
	const { width, height } = useViewport()

	const videoConstraints = {
		width: width,
		height: height,
		facingMode: 'user',
	}

	const webcamRef = useRef(null)
	const canvasRef = useRef(null)

	const loadFaceMesh = async () => await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)

	const detectFace = (model) => {
		if (
			webcamRef.current !== undefined &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			setInterval(async () => {
				const video = webcamRef.current.video
				const videoWidth = webcamRef.current.video.videoWidth
				const videoHeight = webcamRef.current.video.videoHeight

				webcamRef.current.video.width = videoWidth
				webcamRef.current.video.height = videoHeight

				canvasRef.current.width = videoWidth
				canvasRef.current.height = videoHeight

				const face = await model.estimateFaces({ input: video })

				const ctx = canvasRef.current.getContext('2d')

				requestAnimationFrame(() => drawMesh(face, ctx))
			}, 100)
		}
	}

	useEffect(() => {
		loadFaceMesh().then(model => {
			void detectFace(model)
		}, [])
	})

	return (
		<div>
			<div className='webcam-blackout-wrapper' />
			<Webcam
				ref={webcamRef}
				audio={false}
				height={height}
				width={width}
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