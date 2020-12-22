let aiPlayer = 'X';
let humanPlayer = 'O';
let nowPlayer = humanPlayer;
let lines;

let x;
let y;

let board = [
  ['','',''],
  ['','',''],
  ['','',''],
];

function setup() {
  createCanvas(400, 400);
  frameRate(2);
  x = width/3;
  y = height / 3;
  bestNextMove();
}

function isEqual(p,q,r){
  return (p==q && q == r && p != '');
}

function drawLine(pos) {
  strokeWeight(6);
  stroke(0);
  if (pos === 'lineD2')
    line(375, 25, 25, 375);
  
  else if (pos === 'lineC0')
    line(25, 67, 375, 67);
   else if (pos === 'lineC1')
   line(25, 200, 375, 200);
    else if (pos === 'lineC2')
   line(25, 333, 375, 333);
  
   else if (pos === 'lineR0')
    line(67, 25, 67, 375);
   else if (pos === 'lineR1')
   line(200, 25, 200, 375);
   else  if (pos === 'lineR2')
   line(333, 25, 333, 375);
  
  else if (pos === 'lineD1')
    line(25, 25, 375, 375);
  
  else if (pos === 'line'){
    line(0, 0, 0, 0);
  }
 
}

function isWin(){
  let winner = null;
lines = 'line';
  
  for(let i =0;i<3;i++){
    if(isEqual(board[i][0], board[i][1], board[i][2])){
      winner = board[i][0];
      lines = 'lineR'.concat(i);
    }
    
  }
  
  for(let i =0;i<3;i++){
    if(isEqual(board[0][i], board[1][i], board[2][i])){
      winner = board[0][i];
      lines = 'lineC'.concat(i);
      }
    
  }
  
   if(isEqual(board[0][0],board[1][1],board[2][2])){
      winner = board[2][2];
 
     lines = 'lineD1';
    }
   if(isEqual(board[2][0],board[1][1], board[0][2])){
      winner = board[1][1];
  lines = 'lineD2';
    }
  
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }
  
  if(winner == null && openSpots == 0){
    return 'tie';
  }else {
    
    return winner;
  
  }
}

function mousePressed(){
  if(currentPlayer == humanPlayer){
    let i = floor(mouseX / x);
    let j = floor(mouseY / y);
  
  if (board[i][j] == '') {
      board[i][j] = humanPlayer;
      currentPlayer = aiPlayer;
      bestNextMove();
  }
  }
}

function draw() {
  background(255);
  let placeWidth = width /3;
  let placeHeight = height/3;
  
  line(placeWidth,0,placeWidth,height);
  line(placeWidth*2,0,placeWidth*2,height);
  line(0,placeHeight,width,placeHeight);
  line(0,placeHeight*2,width,placeHeight*2);
  
  for (let j = 0 ; j <3 ; j++){
    for (let i = 0 ; i <3 ; i++){
      let x = placeWidth*i+ placeWidth/2;
      let y = placeHeight*j+ placeHeight/2;
      let place = board[i][j];
     
      textSize(30);
      strokeWeight(5);
      
      if(place == humanPlayer){      
        ellipse(x,y,placeWidth/2);
      }else if(place == aiPlayer){
        let lengthLine = placeWidth/4;
        line(x-lengthLine, y-lengthLine, x+lengthLine, y+lengthLine);
        line(x+lengthLine,y-lengthLine,x-lengthLine,y+lengthLine);
     } 
    }
  }

  let result = isWin();
  
  if(result != null){
   
    noLoop();
     drawLine(lines);
    createP(result).style('color','#111').style('font-size', '40pt');
  }

}