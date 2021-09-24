let model;
let strokePath = null;

let x, y;
let pen;

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background('#292e39');
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	background('#292e39');
	setupNewSketch();
	model = ml5.SketchRNN('cat', modelReady);
}

function modelReady() {
	console.log('model ready');
	model.reset();
	model.generate(gotSketch);
}

function draw() {
	translate(width / 2, height / 2);
	if (strokePath != null) {
		let newX = x + strokePath.dx * 0.2;
		let newY = y + strokePath.dy * 0.2;
		if (pen == 'down') {
			stroke('#4c566a');
			strokeWeight(1.5);
			line(x, y, newX, newY);
		}
		pen = strokePath.pen;
		strokePath = null;
		x = newX;
		y = newY;

		if (pen !== 'end') {
			model.generate(gotSketch);
		} else {
			console.log('drawing complete');
			setupNewSketch();
			model.reset();
			model.generate(gotSketch);
		}
	}
}

function gotSketch(error, s) {
	if (error) {
		console.error(error);
	} else {
		strokePath = s;
	}
}

function setupNewSketch() {
	pen = 'down';
	x = random(-width / 2, width / 2);
	y = random(-height / 2, height / 2);
}
