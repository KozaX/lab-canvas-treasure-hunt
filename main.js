const canvasEl = document.querySelector('canvas');

const context = canvasEl.getContext('2d');

const width = canvasEl.width;
const height = canvasEl.height;

const drawGrid = () => {
  for (let i = 0; i < 11; i++) {
    //Vertical lines
    context.beginPath();
    context.moveTo(i * (width / 10), 0);
    context.lineTo(i * (width / 10), height);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(0, i * (height / 10));
    context.lineTo(width, i * (height / 10));
    context.stroke();
    context.closePath();
  }
};

const drawEverything = () => {
  drawGrid();
  drawPlayer();
  drawTreasure();
};

//CLASS CHARACTER
class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  moveUp() {
    this.row--;
  }
  moveRight() {
    this.col++;
  }
  moveDown() {
    this.row++;
  }
  moveLeft() {
    this.col--;
  }
}

//CLASS TREASURE
class Treasure {
  constructor() {
    this.col = Math.floor(Math.random() * 10);
    this.row = Math.floor(Math.random() * 10);
  }

  setRandomPosition() {
    this.col = Math.floor(Math.random() * 10);
    this.row = Math.floor(Math.random() * 10);
  }
}

const treasure = new Treasure();
const player = new Character(0, 0);

//DRAW PLAYER FUNCTION
const drawPlayer = () => {
  const hunter = new Image();
  hunter.src = '/images/character-down.png';

  hunter.addEventListener('load', () => {
    context.drawImage(
      hunter,
      player.col * (width / 10),
      player.row * (width / 10)
    );
  });
};

//DRAW TREASURE FUNCTION
const drawTreasure = () => {
  const treasureImg = new Image();
  treasureImg.src = '/images/treasure.png';

  treasureImg.addEventListener('load', () => {
    context.drawImage(
      treasureImg,
      treasure.col * 50,
      treasure.row * 50,
      50,
      50
    );
  });
};

drawEverything();

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    player.moveRight();
    if (player.col === treasure.col && player.row === treasure.row) {
      treasure.setRandomPosition();
    }
    context.clearRect(0, 0, width, height);
    drawEverything();
  } else if (e.key === 'ArrowDown') {
    player.moveDown();
    if (player.col === treasure.col && player.row === treasure.row) {
      treasure.setRandomPosition();
    }
    context.clearRect(0, 0, width, height);
    drawEverything();
  } else if (e.key === 'ArrowLeft') {
    player.moveLeft();
    if (player.col === treasure.col && player.row === treasure.row) {
      treasure.setRandomPosition();
    }
    context.clearRect(0, 0, width, height);
    drawEverything();
  } else {
    player.moveUp();
    if (player.col === treasure.col && player.row === treasure.row) {
      treasure.setRandomPosition();
    }
    context.clearRect(0, 0, width, height);
    drawEverything();
  }
});
