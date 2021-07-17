import p5Types, { Vector } from 'p5'
import { Boundary } from './Boundary'
import { Ray } from './Ray'

export class Particle {
	pos: Vector
	rays: Ray[]

	constructor(p: p5Types) {
		this.pos = p.createVector(50, 50)
		this.rays = []
		const rays: number = 30
		for (let a = 0; a < 359.9; a += 360 / rays) {
			this.rays.push(new Ray(this.pos, p.radians(a)))
		}
	}

	colorFill = (): { [name: string]: number } => {
		const r: number = (Math.floor(Math.random() * 255) + 1)
		const g: number = (Math.floor(Math.random() * 255) + 1)
		const b: number = (Math.floor(Math.random() * 255) + 1)

		return { r, g, b }
	}

	update = (x: number, y: number): void => {
		this.pos.set(x, y)
	}

	look = (p: p5Types, walls: Boundary[]): void => {
		for (const ray of this.rays) {
			let closest = null
			let record = Infinity

			for (const wall of walls) {
				const pt: p5Types.Vector | null = ray.cast(p, wall)
				if (pt) {
					const d = Vector.dist(this.pos, pt)
					if (d < record) {
						closest = pt
						record = d
					}
				}
			}

			if (closest) {
				const { r, g, b } = this.colorFill()
				p.stroke(r, g, b, 25)
				p.strokeWeight(0.5)
				p.line(this.pos.x, this.pos.y, closest.x, closest.y)
			}
		}
	}

	show = (p: p5Types): void => {
		const { r, g, b } = this.colorFill()
		p.fill(r, g, b)
		p.ellipse(this.pos.x, this.pos.y, 0)
	}
}