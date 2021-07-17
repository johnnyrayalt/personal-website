import p5Types from 'p5'

export class Boundary {
	a: p5Types.Vector
	b: p5Types.Vector

	constructor(p: p5Types, x1: number, x2: number, y1: number, y2: number) {
		this.a = p.createVector(x1, y1)
		this.b = p.createVector(x2, y2)
	}

	show = (p: p5Types) => {
		p.stroke(255)
		p.line(this.a.x, this.a.y, this.b.x, this.b.y)
	}
}