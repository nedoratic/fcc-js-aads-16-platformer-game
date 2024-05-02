// DOM Elements Variables
const startScreen = document.querySelector('.start-screen');
const startBtn = document.getElementById('start-btn');
const checkpointScreen = document.querySelector('.checkpoint-screen');
const checkpointMessage = document.querySelector('.checkpoint-screen > p');

// Canvas Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Game
const gravity = 0.5;

let isCheckpointCollisionDetectionActive = true;

const proportionalSize = (size) => {
	return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
};

// Player Class
class Player {
	constructor() {
		this.position = {
			x: proportionalSize(10),
			y: proportionalSize(400),
		};
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.width = proportionalSize(40);
		this.height = proportionalSize(40);
	}
	draw() {
		ctx.fillStyle = '#99c9ff';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y <= canvas.height) {
			if (this.position.y < 0) {
				this.position.y = 0;
				this.velocity.y = gravity;
			}
			this.velocity.y += gravity;
		} else {
			this.velocity.y = 0;
		}

		if (this.position.x < this.width) {
			this.position.x = this.width;
		}

		if (this.position.x >= canvas.width - 2 * this.width) {
			this.position.x = canvas.width - 2 * this.width;
		}
	}
}

// Platform Class
class Platform {
	constructor(x, y) {
		this.position = {
			x,
			y,
		};
		this.width = 200;
		this.height = proportionalSize(40);
	}
	draw() {
		ctx.fillStyle = '#acd157';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}

// CheckPoint Class
class CheckPoint {
	constructor(x, y, z) {
		this.position = {
			x,
			y,
		};
		this.width = proportionalSize(40);
		this.height = proportionalSize(70);
		this.claimed = false;
	}

	draw() {
		ctx.fillStyle = '#f1be32';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
	claim() {
		this.width = 0;
		this.height = 0;
		this.position.y = Infinity;
		this.claimed = true;
	}
}

const player = new Player();

// Platforms
const platformPositions = [
	{ x: 500, y: proportionalSize(450) },
	{ x: 700, y: proportionalSize(400) },
	{ x: 850, y: proportionalSize(350) },
	{ x: 900, y: proportionalSize(350) },
	{ x: 1050, y: proportionalSize(150) },
	{ x: 2500, y: proportionalSize(450) },
	{ x: 2900, y: proportionalSize(400) },
	{ x: 3150, y: proportionalSize(350) },
	{ x: 3900, y: proportionalSize(450) },
	{ x: 4200, y: proportionalSize(400) },
	{ x: 4400, y: proportionalSize(200) },
	{ x: 4700, y: proportionalSize(150) },
];

const platforms = platformPositions.map((platform) => new Platform(platform.x, platform.y));

// Checkpoints
const checkpointPositions = [
	{ x: 1170, y: proportionalSize(80), z: 1 },
	{ x: 2900, y: proportionalSize(330), z: 2 },
	{ x: 4800, y: proportionalSize(80), z: 3 },
];

const checkpoints = checkpointPositions.map((checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z));
