// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
let carWindowImg = document.getElementById("car-window-img");
let carWindow2Img = document.getElementById("car-window2-img");
cnv.width = 1100;
cnv.height = 800;

// Global Variables
let numOfRaindrops = randomInt(100, 100);

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
    xAccel: 0,
    yAccel: 0,
    xSpeedResetTimer: 0,
    xSpeedResetGoal: 45,
    up: false,
    left: false,
    right: false,
    down: false,
    dashLength: 0,
    dashTimer: 0,
    dashCooldown: 30
  });
}

for (let i = 0; i < player.length; i++) {
  player[i].ySpeed = player[i].rad / 4;
  player[i].xAccel = player[i].rad;
  player[i].yAccel = player[i].rad;
  player[i].dashLength = 5 / player[i].rad;
}


let raindropsArray = [];
for (let i = 0; i < numOfRaindrops; i++) {
  newRaindrop();
}

// Update the Number of raindropss
function checkDrops() {
  if (raindropsArray.length < numOfRaindrops) {
    newRaindrop();
  } else if (raindropsArray.length > numOfRaindrops) {
    raindropsArray.pop();
  }
}

ctx.drawImage(carWindow2Img, 0, 0, cnv.width, cnv.height);


// Animation
requestAnimationFrame(drawAnimation);
function drawAnimation() {
  // Clear Canvas
  // ctx.clearRect(0, 0, cnv.width, cnv.height);

  // Car Window Image
  ctx.drawImage(carWindow2Img, 0, 0, cnv.width, cnv.height);

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
    player[0].up = true;
  }
  if (event.code === "KeyA") {
    player[0].left = true;
  }
  if (event.code === "KeyD") {
    player[0].right = true;
  }
  if (event.code === "KeyS") {
    player[0].down = true;
  }
  if (event.code === "KeyI") {
    player[1].up = true;
  }
  if (event.code === "KeyJ") {
    player[1].left = true;
  }
  if (event.code === "KeyL") {
    player[1].right = true;
  }
  if (event.code === "KeyK") {
    player[1].down = true;
  }
}

function keyupHandler(event) {
  if (event.code === "KeyW") {
    player[0].up = false;
  }
  if (event.code === "KeyA") {
    player[0].left = false;
  }
  if (event.code === "KeyD") {
    player[0].right = false;
  }
  if (event.code === "KeyS") {
    player[0].down = false;
  }
  if (event.code === "KeyI") {
    player[1].up = false;
  }
  if (event.code === "KeyJ") {
    player[1].left = false;
  }
  if (event.code === "KeyL") {
    player[1].right = false;
  }
  if (event.code === "KeyK") {
    player[1].down = false;
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
      stopTimer: randomDec(0, 480),
      stopGoal: randomDec(300, 480),
      jumpTimer: 0,
      jumpGoal: randomDec(300, 480),
      xSpeed: randomDec(-3, 4),
      ySpeed: randomDec(4, 8),
      xSpeedMax: 3,
      xSpeedMin: -3,
      ySpeedMax: 7,
      ySpeedMin: 0,
      pulse: 0,
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
    for (let i = 0; i < player.length; i++) {
      // Draw Players
      drawDrops(player, i);

      // Control Players
      movePlayer();

      // Teleport Players
      teleport(player, i);

      // Player Max Speed
      maxSpeed(player, i);
    }

    // console.log(player[0].xSpeed)
    // console.log(player[0].xSpeed, player[1].xSpeed)
  }

  // Draw raindrops (players and raindrops)
  function drawDrops(variable, n) {
    // Pulse thing (looks nice but likely to be removed)
    if (raindropsArray[n].pulse2 <= 255) {
      if (variable === raindropsArray) {
        ctx.fillStyle = `rgb(${raindropsArray[n].pulse++}, ${raindropsArray[n].pulse++}, ${raindropsArray[n].pulse})`;
        ctx.beginPath();
        ctx.arc(variable[n].x, variable[n].y, variable[n].rad, 0, 2 * Math.PI);
        ctx.fill();
      }
      raindropsArray[n].pulse2++;
    } else if (raindropsArray[n].pulse2 <= 511) {
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
      if (variable[n].dashTimer !== 0) {
      ctx.fillStyle = `red`;
      } else {
       ctx.fillStyle = `green`;
      }
      ctx.beginPath();
      ctx.arc(variable[n].x, variable[n].y, variable[n].rad, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  function movePlayer() {
    for (let i = 0; i < player.length; i++) {
      // Up Movement
      upMovement(i);

      // Left and Right Movement
      leftRightMovement(i);

      // Down Movement
      downMovement(i);

      // Updating x and y values
      player[i].x += player[i].xSpeed;
      player[i].y += player[i].ySpeed;
    }
  }

  // Upwards Movement (Stop)
  function upMovement(n) {
    if (player[n].up === true) {
      player[n].ySpeed = 0;
      } else {
      player[n].ySpeed += player[n].rad / 6;
      }
  }

  // Left and Right Movement
  function leftRightMovement (n) {
    // Left and Rigth Acceleration
    if (player[n].left === true) {
      player[n].xSpeed += -5 / player[n].xAccel;
      player[n].xSpeedResetTimer = 0;
    }
    if (player[n].right === true) {
      player[n].xSpeed += 5 / player[n].xAccel;
      player[n].xSpeedResetTimer = 0;
    }

    // Left and Right Deacceleration
    if (player[n].left !== true && player[n].right !== true && player[n].xSpeed !== 0) {
      if (player[n].xSpeed < 0) {
        player[n].xSpeed -= -player[n].xAccel / 50;
        player[n].xSpeedResetTimer++;
      } else if (player[n].xSpeed > 0) {
        player[n].xSpeed -= player[n].xAccel / 50;
        player[n].xSpeedResetTimer++;
      }
      if (player[n].xSpeedResetTimer === player[n].xSpeedResetGoal) {
        player[n].xSpeedResetTimer = 0;
        player[n].xSpeed = 0;
      }
    }
  }

  // Downwards Movement (dash)
  function downMovement(n) {
    if (player[n].down === true) {
      if (player[n].dashTimer === 0) {
        player[n].ySpeed += player[n].rad;
        player[n].dashTimer = player[n].dashCooldown;
      }
    }

    player[n].dashTimer -= 0.5;
    if (player[n].dashTimer <= 0) {
      player[n].dashTimer = 0;
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
      if (raindropsArray[n].stopTimer > raindropsArray[n].stopGoal + randomDec(300, 400)) {
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
      if (variable[n].ySpeed > variable[n].rad / 4) {
        variable[n].ySpeed = variable[n].rad / 4;
      }
    }
  }