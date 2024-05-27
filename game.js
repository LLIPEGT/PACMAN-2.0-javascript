const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghosts");

let createRect = (x, y, width, height, color) =>{
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

let fps = 30;
let oneBlockSize = 20;
let wallColor = "#342DCA";
let wallSpaceWidth = oneBlockSize / 1.5;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "black";

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;


let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let gameLoop = () =>{
    update();
    draw();
}

let update = () =>{
    pacman.moveProcess();
};

let draw = () =>{
    createRect(0, 0, canvas.width, canvas.height, "black");

    drawList();

    pacman.draw()
}

let gameInterval = setInterval(gameLoop, 1000 / fps);

let drawList = () =>{
    for(let a  = 0; a < map.length; a++){
        for(let b = 0; b < map[0].length; b++){
            if(map[a][b] == 1){ //no entanto é uma parede 
                createRect(b * oneBlockSize, a * oneBlockSize, oneBlockSize, oneBlockSize, wallColor);
            };
            if(b>0 && map[a][b-1] == 1){
                createRect(b*oneBlockSize, a * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColor);
            };
            if(b < map[0].length -1 && map[a][b+1] == 1){
                createRect(b*oneBlockSize + wallOffset, a * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColor);
            }

            if(a>0 && map[a-1][b] == 1){
                createRect(b*oneBlockSize  + wallOffset, a * oneBlockSize, wallSpaceWidth, wallSpaceWidth + wallOffset, wallInnerColor);
            };
            if(a < map.length -1 && map[a+1][b] == 1){
                createRect(
                    b * oneBlockSize + wallOffset,
                    a * oneBlockSize + wallOffset,
                    wallSpaceWidth,
                    wallSpaceWidth + wallOffset,
                    wallInnerColor
                );
            }
        }
    }
};

let createNewPacman = () =>{
    pacman = new Pacman(
            oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize / 5
    );
};

createNewPacman();
gameLoop();

window.addEventListener("keydown", (event) => {
    let k = event.keyCode

    setTimeout(() => {
        if (k == 37 || k == 65) {//esquerda
            pacman.nextDirection = DIRECTION_LEFT;
        }else if (k == 38 || k == 87) {//acima
            pacman.nextDirection = DIRECTION_UP
        }else if (k == 39 || k == 68) {//direita
            pacman.nextDirection = DIRECTION_RIGHT
        }else if (k == 40 || k == 83) {//abaixo
            pacman.nextDirection = DIRECTION_BOTTOM
        }

    }, 1)
})