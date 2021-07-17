import p5 from 'p5'
import p5Types from 'p5'
import React, { FC, useEffect, useRef } from 'react'
import { Boundary } from '../../utils/rayCasting/Boundary'
import { Particle } from '../../utils/rayCasting/Particle'

const Processing: FC = (): JSX.Element => {
	const sceneWidth = window.innerWidth
	const sceneHeight = window.innerHeight
	const canvasRef = useRef<HTMLDivElement>(null)

	const Sketch = (p: p5Types): void => {
		const walls: Boundary[] = []
		let particle: Particle

		p.setup = (): void => {
			p.createCanvas(sceneWidth, sceneHeight + 40).position(0, -40)

			walls.push(new Boundary(p, 0, 0, sceneWidth, 0))
			walls.push(new Boundary(p, sceneWidth, 0, sceneWidth, sceneHeight))
			walls.push(new Boundary(p, sceneWidth, sceneHeight, 0, sceneHeight))
			walls.push(new Boundary(p, 0, sceneHeight, 0, 0))

			for (let i = 0; i < 5; i++) {
				const x1: number = p.random(sceneWidth)
				const x2: number = p.random(sceneWidth)
				const y1: number = p.random(sceneHeight)
				const y2: number = p.random(sceneHeight)
				walls[i] = new Boundary(p, x1, x2, y1, y2)
			}
			particle = new Particle(p)
		}

		p.draw = (): void => {
			particle.update(p.mouseX, p.mouseY)
			particle.look(p, walls)
			particle.show(p)

			/** DEBUGGING PURPOSES */
			// for (let wall of walls) {
			// 	wall.show(p);
			// }
		}

		p.windowResized = (): void => {
			p.clear()
			p.resizeCanvas(window.innerWidth, window.innerHeight)
		}
	}

	useEffect(() => {
		/* eslint-disable */
		// @ts-ignore
		new p5(Sketch, canvasRef.current)
	}, [])

	return (
		<div id='canvasRef' ref={canvasRef} />
	)

}

export default Processing
