/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const sunlight = "s";
const water = "w";
const co2 = "c";
const ground = "g";

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
.....44.44......
.....44444......
......444.......
.......4........
.......4........
.......4........
....C..4..C.....
....CCCCCCC.....
.....CCCCC......
.....CCCCC......` ],
  [ sunlight, bitmap`
................
................
................
............6...
...........66...
.......6..66..6.
......66.66..66.
.....66..6..66..
....66..66.66...
....6..66..6....
...66..6..66....
..66..66.66.....
.....66..6......
...666..66......
.......66.......
................`
  ],
  [water, bitmap`
................
................
................
.......7........
......777.......
......777.......
.....77777......
.....77777......
....7777777.....
....7777777.....
....7777777.....
.....77777......
......777.......
................
................
................`],
  [co2, bitmap`
................
.....1...11.....
....11..11......
....1...1.......
....1...11......
....11...1......
.....1...11.....
.....11...1.....
......1...11....
.....11...11....
....11....1.....
....1.....1.....
....1.....1.....
....11...1......
.....11..1......
................`],
  [ground, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
)

setSolids([])
setPushables({
  [ player ]: []
})

let level = 0
const levels = [
  map`
...s...
.......
...c...
.......
...w...
...p...
ggggggg`,
  map`
c.w..s
......
......
......
......
...p..`
]
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([])
let score = 0


setMap(levels[level])

setPushables({
  [ player ]: []
})

var gameRunning = true; 

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
});


function moveSun() {
  let sunlights = getAll(sunlight);

  for (let i = 0; i < sunlights.length; i++) {
    sunlights[i].y += 1;
  }
  
}

function moveWater() {
  let waters = getAll(water);

  for (let i = 0; i < waters.length; i++) {
    waters[i].y += 1;
  } 
}
function moveCo2() {
  let co2s = getAll(co2);

  for (let i = 0; i < co2s.length; i++) {
    co2s[i].y += 1;
  }
  
}
function despawn() {
  let sunlights = getAll(sunlight);

  for (let i = 0; i < sunlights.length; i++) {
   if (sunlights[i].y == 6) {
     sunlights[i].remove();
   }
  }
}



function checkHit() {
  let sunlights = getAll(sunlight);
  let p = getFirst(player);

  for (let i = 0; i < sunlights.length; i++) {
    if (sunlights[i].x == p.x && sunlights[i].y == p.y) {
      return true;
    }
  }

  return false;
}



var gameLoop = setInterval(() => {
  moveSun();
  
  despawn();
  checkHit();
  
  
  if (checkHit()) {
    score += 1
  }
 /* if (checkHitFruits()) {
    score += 1
  }*/
  
  addText(`Water: ${score}`, {x: 2, y: 1, color: color`L`})
  

}, 1000-level*100);
