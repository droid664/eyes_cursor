import './style.css'

const mouse = {
	x: 0,
	y: 0,
}
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
let eyes = []

class Eye {
	constructor(x, y, radius) {
		this.x = x
		this.y = y
		this.radius = radius
	}
	draw() {
		const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x)
		const sin = Math.sin(angle)
		const cos = Math.cos(angle)

		let xIris = this.x + this.radius * 0.25 * cos
		let yIris = this.y + this.radius * 0.25 * sin
		let xPupil = this.x + this.radius * 0.65 * cos
		let yPupil = this.y + this.radius * 0.65 * sin

		// Рисуем склеру
		context.beginPath()
		context.fillStyle = 'white'
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
		context.fill()
		context.closePath()

		// Рисуем радужку
		context.beginPath()
		context.fillStyle = 'black'
		context.arc(xIris, yIris, this.radius * 0.65, 0, 2 * Math.PI)
		context.fill()
		context.closePath()

		// Рисуем зрачок
		context.beginPath()
		context.fillStyle = 'white'
		context.arc(xPupil, yPupil, this.radius * 0.2, 0, 2 * Math.PI)
		context.fill()
		context.closePath()
	}
}

function generateEyes() {
	let minDeltaOffset = 20

	for (let i = 0; i < 500; i++) {
		let overlap = false
		let x = Math.random() * canvas.width
		let y = Math.random() * canvas.height
		let radius = getRandomArbitrary(15, 260)

		if (eyes.length) {
			eyes.forEach((item) => {
				let dx = item.x - x
				let dy = item.y - y
				let dist = Math.sqrt(dx ** 2 + dy ** 2)

				if (dist < radius + item.radius + minDeltaOffset) {
					overlap = true
				}
			})
		}

		if (!overlap) {
			eyes.push(new Eye(x, y, radius))
		}
	}
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min
}

function init() {
	canvas.width = innerWidth
	canvas.height = innerHeight

	generateEyes()

	window.addEventListener('mousemove', setMouseCoords)
}
init()

window.addEventListener('resize', () => {
	eyes = []
	init()
})

function setMouseCoords(e) {
	mouse.x = e.x
	mouse.y = e.y
}

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height)
}

function animate() {
	clearCanvas()

	eyes.forEach((eye) => eye.draw())

	requestAnimationFrame(animate)
}
animate()
