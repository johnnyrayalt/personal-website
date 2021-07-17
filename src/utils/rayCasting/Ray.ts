import p5Types, { Vector } from 'p5'
import { Boundary } from './Boundary'

export class Ray {
	pos: p5Types.Vector
	dir: p5Types.Vector

	constructor(pos: p5Types.Vector, angle: number) {
		this.pos = pos
		this.dir = Vector.fromAngle(angle)
	}

	cast = (p: p5Types, wall: Boundary): p5Types.Vector | null => {
		const x1: number = wall.a.x
		const y1: number = wall.a.y
		const x2: number = wall.b.x
		const y2: number = wall.b.y

		const x3: number = this.pos.x
		const y3: number = this.pos.y
		const x4: number = this.pos.x + this.dir.x
		const y4: number = this.pos.y + this.dir.y

		const den1: number = (x1 - x2) * (y3 - y4)
		const den2: number = (y1 - y2) * (x3 - x4)
		const den: number = den1 - den2
		if (den === 0) return null

		const t1: number = (x1 - x3) * (y3 - y4)
		const t2: number = (y1 - y3) * (x3 - x4)
		const t: number = (t1 - t2) / den

		const u1: number = (x1 - x2) * (y1 - y3)
		const u2: number = (y1 - y2) * (x1 - x3)
		const u: number = -(u1 - u2) / den

		if (t > 0 && t < 1 && u > 0) {
			const pt: p5Types.Vector = p.createVector()
			pt.x = x1 + t * (x2 - x1)
			pt.y = y1 + t * (y2 - y1)
			return pt
		} else {
			return null
		}
	}

}