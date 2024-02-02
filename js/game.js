
var canvas;
var ctx;
var fps = 30;

var canvasX = 500;
var canvasY = 500;

var tileX, tileY;

//game board
var gameBoard;
var rows = 100;
var columns = 100;

var green = "#00ff40";
var black = "#000000";

function createArray2D(rows,columns){
    
    var obj = Array.from({length: rows}, () => Array(columns));
    return obj;
    
    // var obj = new Array(rows);
    // for (cont = 0; cont < rows; cont++){
    //     obj[cont] = new Array(columns);
    // }
    // return obj;

}
class Agent {
    constructor(x, y, status) {
        this.x = x;
        this.y = y;
        this.status = status; //live or dead
        this.nextStatus = this.status; // status next cicle
        this.neighbors = [];
    }

    addNeighbors() {
        var xNeighbor;
        var yNeighbor;

        for(var i=-1; i<2; i++){
            for(var j=-1; j<2; j++){
                xNeighbor = (this.x + j + columns) % columns;
                yNeighbor = (this.y + i + rows) % rows;

                if(i!==0 || j!==0){ 
                    this.neighbors.push(gameBoard[xNeighbor][yNeighbor])
                }
            }
        }
    }

    draw() {
        var color = this.status === 1 ? green : black;
        ctx.fillStyle = color;
        ctx.fillRect(this.x*tileX, this.y*tileY, tileX, tileY);
    }

    newLoop() {
        var addition = this.neighbors.reduce((acc, neighbor) => acc + neighbor.status, 0);
        this.nextStatus = this.status;

        //DEAD: less than 2 or more than 3 neighbors
        if(addition<2 || addition>3){
            this.nextStatus = 0; 
        }
        //LIVE and RENDERING : has exactly 3 neighbors
        if(addition===3){
            this.nextStatus= 1;
        }
    }

    mutation() {
        this.status = this.nextStatus;
    }
}

// var Agent = function(x, y, status){
//     this.x = x;
//     this.y = y;
//     this.status = status; //live or dead
//     this.nextStatus = this.status; // status next cicle
    
//     this.neighbors = [];

//     this.addNeighbors = function(){
//         var xNeighbor;
//         var yNeighbor;

//         for(i=-1; i<2; i++){
//             for(j=-1; j<2; j++){
//                 xNeighbor = (this.x + j + columns) % columns;
//                 yNeighbor = (this.y + i + rows) % rows;

//                 if(i!=0 || j!=0){ //pendiente cambiar esto por eleccion usuario para personalizar el juego a demanda
//                     this.neighbors.push(gameBoard[xNeighbor][yNeighbor])
//                 }
//             }
//         }
//     }

//     this.draw = function(){

//         var color;

//         if(this.status==1){
//             color=green;
//         }else{
//             color=black;
//         }
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x*tileX, this.y*tileY, tileX, tileY);
//     }

//     this.newLoop = function(){
        
//         var addition = 0;

//         for(i=0; i<this.neighbors.length; i++){
//             addition += this.neighbors[i].status;
//         }
//         this.nextStatus = this.status;

//         //DEAD: menos de 2 o mas de 3 vecinos
//         if(addition<2 || addition>3){
//             this.nextStatus = 0; 
//         }
//         //LIVE nd RENDERING : tiene exactamente 3 vecinos
//         if(addition==3){
//             this.nextStatus= 1;
//         }
//     }

//     this.mutation = function(){
//         this.status = this.nextStatus;
//     }
// }

function gameBoardInitialize(obj){

    var status;

    for (y=0; y<rows; y++){
        for(x=0; x<columns; x++){
            status = Math.floor(Math.random()*2); //posible modificacion para añadir coordenadas a gusto del usuario?
            obj[x][y] = new Agent(x, y, status);
        }
    }
    for (y=0; y<rows; y++){
        for(x=0; x<columns; x++){
            obj[x][y].addNeighbors();
        }
    }
}

function initialize(){
    canvas = document.getElementById("screen");
    ctx = canvas.getContext("2d");

    canvas.width = canvasX;
    canvas.height = canvasY;

    tileX = Math.floor(canvasX/rows);
    tileY = Math.floor(canvasY/columns);

    gameBoard = createArray2D(rows,columns);
    
    gameBoardInitialize(gameBoard);

    setInterval(function(){main();},1000/fps )
}

function drawGameBoard(obj){

    for (y=0; y<rows; y++){
        for(x=0; x<columns; x++){
            obj[x][y].draw();
        }
    }
    for (y=0; y<rows; y++){
        for(x=0; x<columns; x++){
            obj[x][y].newLoop();
        }
    }
    for (y=0; y<rows; y++){
        for(x=0; x<columns; x++){
            obj[x][y].mutation();
        }
    }

}


function deleteCanvas(){
    canvas.width = canvas.width;
    canvas.height = canvas.height; 
}

function main(){
    deleteCanvas();
    drawGameBoard(gameBoard);
}