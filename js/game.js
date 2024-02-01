
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


function initialize(){
    canvas = document.getElementById("screen");
    ctx = canvas.getContext("2D");

    canvas.width = canvasX;
    canvas.height = canvasY;

    tileX = Math.floor(canvasX/rows);
    tileY = Math.floor(canvasY/columns);

    setInterval(function(){main();},1000/fps )
}

function main(){
    console.log("frame");
}