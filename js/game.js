
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
    var obj = new Array(rows);
    for (cont = 0; cont < rows; cont++){
        obj[cont] = new Array(columns);
    }
    return obj;

}

var Agent = function(x, y, status){
    this.x = x;
    this.y = y;
    this.status = status; //live or dead
    this.statusNext = this.status; // status next cicle
    
    this.neighbors = [];

    this.addNeighbors = function(){
        var xNeighbor;
        var yNeighbor;

        for(i=-1; i<2; i++){
            for(j=-1; j<2; j++){
                xNeighbor = (this.x + j + columns) % columns;
                yNeighbor = (this.y + i + rows) % rows;

                if(i!=0 || j!=0){ //pendiente cambiar esto por eleccion usuario para personalizar el juego a demanda
                    this.neighbors.push(gameBoard[xNeighbor][yNeighbor])
                }
            }
        }
    }

    this.draw = function(){

        var color;

        if(this.status==1){
            color=green;
        }else{
            color=black;
        }
        ctx.fillStyle = color;
        ctx.fillRect(this.x*tileX, this.y*tileY, tileX, tileY);
    }
}

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
    ctx = canvas.getContext("2D");

    canvas.width = canvasX;
    canvas.height = canvasY;

    tileX = Math.floor(canvasX/rows);
    tileY = Math.floor(canvasY/columns);

    gameBoard = createArray2D(rows,columns);
    
    gameBoardInitialize(gameBoard);


    setInterval(function(){main();},1000/fps )
}

function deleteCanvas(){
    canvas.width = canvas.width;
    canvas.height = canvas.height; 
}

function main(){
    console.log("frame");
    deleteCanvas();
}