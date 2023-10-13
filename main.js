// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 1080;
cnv.height = 600;

// Global Variables
let numOfRaindrops = randomInt(10, 10);

let player = [];
  for (let i = 0; i < 2; i++) {
    newPlayer();
  }

function newPlayer() {
  player.push({
    x: randomDec(0, cnv.width),
    y: 0,
    rad: randomDec(5, 11),
    xSpeed: 0,
    ySpeed: 0,
    xSpeedResetTimer: 0,
    xSpeedResetGoal: 45
  });
}

let raindropsArray = [];
for (let i = 0; i < numOfRaindrops; i++) {
  newRaindrop();
}

// Controls
let keyW = false;
let keyA = false;
let keyD = false;
let keyS = false;
let ArrowUp = false;
let arrowLeft = false;
let arrowRight = false;
let arrowDown = false;


// Update the Number of raindropss
function checkDrops() {
  if (raindropsArray.length < numOfRaindrops) {
    newRaindrop();
  } else if (raindropsArray.length > numOfRaindrops) {
    raindropsArray.pop();
  }
}


// Animation
requestAnimationFrame(drawAnimation);
function drawAnimation() {
  // Clear Canvas
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  raindrops();
  players();

  // Request Animation Frame
  requestAnimationFrame(drawAnimation);
}

// EVENT STUFF
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  if (event.code === "KeyW") {
    keyW = true;
  }
  if (event.code === "KeyA") {
    keyA = true;
  }
  if (event.code === "KeyD") {
    keyD = true;
  }
  if (event.code === "KeyS") {
    keyS = true;
  }
  if (event.code === "ArrowUp") {
    arrouwUp = true;
  }
  if (event.code === "ArrowLeft") {
    arrowLeft = true;
  }
  if (event.code === "ArrowRight") {
    arrowRight = true;
  }
  if (event.code === "ArrowDown") {
    arrowDown = true;
  }
}

function keyupHandler(event) {
   if (event.code === "KeyA") {
    keyA = false;
  }
  if (event.code === "KeyD") {
    keyD = false;
  }
  if (event.code === "ArrowLeft") {
    arrowLeft = false;;
  }
  if (event.code === "ArrowRight") {
    arrowRight = false;
  }
}

// Helper Functions
  // Set Raindrops and Players
  function newRaindrop() {
    raindropsArray.push(
      {
      x: randomDec(0, cnv.width),
      y: randomDec(0, cnv.height),
      rad: randomDec(5, 11),
      stopTimer: randomDec(0, 301),
      stopGoal: randomDec(300, 480),
      jumpTimer: 0,
      jumpGoal: randomDec(300, 480),
      xSpeed: randomDec(-3, 4),
      ySpeed: randomDec(4, 8),
      xSpeedMax: 3,
      xSpeedMin: -3,
      ySpeedMax: 7,
      ySpeedMin: 0,
      pulse: 10,
      pulse2: 0
      }
    );
  }

  // raindropsArray
  function raindrops() {
    for (let i = 0; i < raindropsArray.length; i++) {
      // Draw raindrops
      drawDrops(raindropsArray, i);

      // Move raindrops
      raindropsArray[i].x += raindropsArray[i].xSpeed;
      raindropsArray[i].y += raindropsArray[i].ySpeed;

      // Teleport dropsies!
      teleport(raindropsArray, i);

      // Flutteryness (adds some spice)
      raindropsArray[i].xSpeed += randomDec(-1, 1);
      raindropsArray[i].ySpeed += randomDec(-1, 2);

      // Stop & Jump Timers
      raindropTimers(i);

      // Max Speed
      maxSpeed(raindropsArray, i);
    }
  }

  function players() {
    // Draw players
    for (let i = 0; i < player.length; i++) {
      drawDrops(player, i);
    }

    // Controll players
    controls();

    // Teleport players!
    for (let i = 0; i < player.length; i++) {
      teleport(player, i);
    }

    // Player Max Speed
    for (let i = 0; i < player.length; i++) {
      maxSpeed(player, i);
    }



    // console.log(player[0].xSpeed)
    // console.log(player[0].xSpeed, player[1].xSpeed)
  }

  // Draw raindrops (players and raindrops)
  function drawDrops(variable, n) {
    // Pulse thing (looks nice but likely to be removed)
    if (raindropsArray[n].pulse2 <= 200) {
      if (variable === raindropsArray) {
        ctx.fillStyle = `rgb(${raindropsArray[n].pulse++}, ${raindropsArray[n].pulse++}, ${raindropsArray[n].pulse})`;
        ctx.beginPath();
        ctx.arc(variable[n].x, variable[n].y, variable[n].rad, 0, 2 * Math.PI);
        ctx.fill();
      }
      raindropsArray[n].pulse2++;
    } else if (raindropsArray[n].pulse2 <= 400) {
      if (variable === raindropsArray) {
        ctx.fillStyle = `rgb(${raindropsArray[n].pulse--}, ${raindropsArray[n].pulse--}, ${raindropsArray[n].pulse})`;
        ctx.beginPath();
        ctx.arc(variable[n].x, variable[n].y, variable[n].rad, 0, 2 * Math.PI);
        ctx.fill();
      }
      raindropsArray[n].pulse2++;
    } else {
      raindropsArray[n].pulse2 = 0;
    }
    
    // // Normal raindrops
    // if (variable === raindropsArray) {
    //   ctx.fillStyle = `lightblue`;
    //   ctx.beginPath();
    //   ctx.arc(variable[n].x, variable[n].y, variable[n].rad, 0, 2 * Math.PI);
    //   ctx.fill();
    // }    

    if (variable === player) {
      ctx.fillStyle = `red`;
      ctx.beginPath();
      ctx.arc(variable[n].x, variable[n].y, variable[n].rad, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // Player Controls
  function controls() {
    movePlayer(0, keyA, keyD)
    movePlayer(1, arrowLeft, arrowRight)
  }

  function movePlayer(n, left, right) {
    // Left and Rigth Acceleration
    if (left === true) {
      player[n].xSpeed += -5 / player[n].rad;
      player[n].xSpeedResetTimer = 0;
    }
    if (right === true) {
      player[n].xSpeed += 5 / player[n].rad;
      player[n].xSpeedResetTimer = 0;
    }

    // Left and Right Deacceleration
    if (left !== true && right !== true && player[n].xSpeed !== 0) {
      if (player[n].xSpeed < 0) {
        player[n].xSpeed -= -player[n].rad / 50;
        player[n].xSpeedResetTimer++;
      } else if (player[n].xSpeed > 0) {
        player[n].xSpeed -= player[n].rad / 50;
        player[n].xSpeedResetTimer++;
      }
      if (player[n].xSpeedResetTimer === player[n].xSpeedResetGoal) {
        player[n].xSpeedResetTimer = 0;
        player[n].xSpeed = 0;
      }
    }

    // Downward Velocity
    for (let i = 0; i < player.length; i++) {
      player[i].ySpeed = player[i].rad / 2;
      player[i].x += player[i].xSpeed / 2;
      player[i].y += player[i].ySpeed;
    }
  }

  // Teleport raindrops
  function teleport(variable, n) {
    if (variable === raindropsArray) {
      if (variable[n].x > cnv.width + 25) {
        variable[n].x = 0;
      } else if (variable[n].x < -25) {
        variable[n].x = cnv.width;
      }
      if (variable[n].y > cnv.height + 15) {
        variable[n].y = -20;
      } else if (variable[n].y < -25) {
        variable[n].x = randomDec(0,cnv.width);
        variable[n].y = -20;
      }
    }
    if (variable === player) {
      if (variable[n].x > cnv.width + 25) {
        variable[n].x = 0;
      } else if (variable[n].x < -25) {
        variable[n].x = cnv.width;
      }
      if (variable[n].y > cnv.height) {
        variable[n].y = -20;
      }
    }
  }

  // Raindrop Timers
  function raindropTimers(n) {
    raindropsArray[n].stopTimer++;
      raindropsArray[n].jumpTimer++;
      if (raindropsArray[n].stopTimer > raindropsArray[n].stopGoal) {
        raindropsArray[n].xSpeed = 0;
        raindropsArray[n].ySpeed = 0;
      }
      if (raindropsArray[n].stopTimer > raindropsArray[n].stopGoal + randomDec(15, 21)) {
        raindropsArray[n].stopTimer = randomDec(0, 31);
        raindropsArray[n].stopGoal = randomDec(300, 480);
      }
      if (raindropsArray[n].jumpTimer > raindropsArray[n].jumpGoal) {
        raindropsArray[n].xSpeed += randomDec(-5, 6);
        raindropsArray[n].ySpeed += randomDec(0, 8);
        raindropsArray[n].jumpTimer = randomDec(0, 31);
        raindropsArray[n].jumpGoal = randomDec(300, 480);
      }
  }

  // Raindrop Max Speed
  function maxSpeed(variable, n) {
    if (variable === raindropsArray) {
      // Raindrop
      if (variable[n].xSpeed > variable[n].xSpeedMax) {
        variable[n].xSpeed = variable[n].xSpeedMax;
      }
      if (variable[n].ySpeed > variable[n].ySpeedMax) {
        variable[n].ySpeed = variable[n].ySpeedMax;
      }
      if (variable[n].xSpeed < variable[n].xSpeedMin) {
        variable[n].xSpeed = variable[n].xSpeedMin;
      }
      if (variable[n].ySpeed < variable[n].ySpeedMin) {
        variable[n].ySpeed = 1;
      }
    } else if (variable === player) {
      // Players
      if (variable[n].xSpeed > 30 / variable[n].rad) {
        variable[n].xSpeed = 30 / variable[n].rad;
      }
      if (variable[n].xSpeed < -30 / variable[n].rad) {
        variable[n].xSpeed = -30 / variable[n].rad;
      }
    }
  }