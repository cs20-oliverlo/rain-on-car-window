// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 1080;
cnv.height = 600;

// Global Variables
let numOfRaindrops = randomInt(0, 0);

let player1 = {
  x: randomDec(0, cnv.width),
  y: 0,
  rad: randomDec(5, 11),
  xSpeed: 0
};

let player2 = {
  x: randomDec(0, cnv.width),
  y: 0,
  rad: randomDec(5, 11),
  xSpeed: 0
};

let raindrops = [];
for (let i = 0; i < numOfRaindrops; i++) {
  newRaindrop();
}

// Controls
let keyA = false;
let keyD = false;
let arrowLeft = false;
let arrowRight = false;


// Update the Number of raindropss
function checkDrops() {
  if (raindrops.length < numOfRaindrops) {
    newRaindrop();
  } else if (raindrops.length > numOfRaindrops) {
    raindrops.pop();
  }
}


// Animation
requestAnimationFrame(drawAnimation);
function drawAnimation() {
  // Clear Canvas
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  drawRaindrops();
  drawPlayers();

  // Request Animation Frame
  requestAnimationFrame(drawAnimation);
}

// EVENT STUFF
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  if (event.code === "KeyA") {
    keyA = true;
  }
  if (event.code === "KeyD") {
    keyD = true;
  }
  if (event.code === "ArrowLeft") {
    arrowLeft = true;
  }
  if (event.code === "ArrowRight") {
    arrowRight = true;
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
    raindrops.push(
      {
      x: randomDec(0, cnv.width),
      y: randomDec(0, cnv.height),
      rad: randomDec(5, 11),
      stopTimer: randomDec(0, 301),
      stopGoal: randomDec(180, 301),
      jumpTimer: 0,
      jumpGoal: randomDec(90, 121),
      xSpeed: randomDec(-3, 4),
      ySpeed: randomDec(4, 8),
      xSpeedMax: 3,
      xSpeedMin: -3,
      ySpeedMax: 7,
      ySpeedMin: 0
      }
    );
  }

  // Drawing Stuff
    // Raindrops
    function drawRaindrops() {
      for (let i = 0; i < raindrops.length; i++) {
        // Draw raindrops
        drops(raindrops, i);

        // Move raindrops
        raindrops[i].x += raindrops[i].xSpeed;
        raindrops[i].y += raindrops[i].ySpeed;
    
        // Teleport dropsies!
        teleport(raindrops, i);
    
        // Flutteryness (adds some spice)
        raindrops[i].xSpeed += randomDec(-1, 1);
        raindrops[i].ySpeed += randomDec(-2, 3);
    
        // Stop & Jump Timers
        raindropTimers(i);
    
        // Max Speed
        maxSpeed(i);
      }
    }

    // Draw Players
    function drawPlayers() {
      // Draw players
      drops(player1, -1);

      // Move players
      movePlayer();
      player1.x += player1.xSpeed;
      player1.y += player1.rad;

      // Teleport players!
      teleport(player1, -1);

      // Player Max Speed
      maxSpeed(-1);
    }
    
    // Draw raindrops (players and raindrops)
    function drops(variable, num) {
      if (num > -1) {
        ctx.fillStyle = `aqua`;
        ctx.beginPath();
        ctx.arc(variable[num].x, variable[num].y, variable[num].rad, 0, 2 * Math.PI);
        ctx.fill();
      } else if (num = -1) {
        ctx.fillStyle = `aqua`;
        ctx.beginPath();
        ctx.arc(variable.x, variable.y, variable.rad, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Player Movement
    function movePlayer() {
      if (keyA === true) {
        player1.xSpeed += -5 / player1.rad;
      } else if (player1.xSpeed < 0) {
        player1.xSpeed -= -player1.rad / 50;
      }
      if (keyD === true) {
        player1.xSpeed += 5 / player1.rad;
      } else if (player1.xSpeed > 0) {
        player1.xSpeed -= player1.rad / 50;
      }
      if (arrowLeft === true) {

      }
      if (arrowRight === true) {

      }
    }

    // Teleport raindrops
    function teleport(variable, num) {
      if (num > -1) {
        if (raindrops[num].x < -50 || variable[num].x > cnv.width + 50 || variable[num].y > cnv.height + 15) {
          variable[num].x = randomDec(0,cnv.width);
          variable[num].y = -20;
        } else if (variable[num].y < -25) {
          variable[num].x = randomDec(0,cnv.width);
          variable[num].y = -20;
        }
      } else if (num = -1) {
        if (variable.x > cnv.width + 25) {
          variable.x = 0;
        } else if (variable.x < - 25) {
          variable.x = cnv.width;
        }
        if (variable.y > cnv.height) {
          variable.y = -20;
        }
      }
    }

    // Raindrop Timers
    function raindropTimers(num) {
      raindrops[num].stopTimer++;
        raindrops[num].jumpTimer++;
        if (raindrops[num].stopTimer > raindrops[num].stopGoal) {
          raindrops[num].xSpeed = 0;
          raindrops[num].ySpeed = 0;
        }
        if (raindrops[num].stopTimer > raindrops[num].stopGoal + randomDec(15, 21)) {
          raindrops[num].x += randomDec(-1, 2) * 5;
          raindrops[num].stopTimer = randomDec(0, 31);
          raindrops[num].stopGoal = randomDec(180, 301);
        }
        if (raindrops[num].jumpTimer > raindrops[num].jumpGoal) {
          raindrops[num].xSpeed += randomDec(-5, 6);
          raindrops[num].ySpeed += randomDec(0, 8);
          raindrops[num].jumpTimer = randomDec(0, 31);
          raindrops[num].jumpGoal = randomDec(90, 121);
        }
    }

    // Raindrop Max Speed
    function maxSpeed(num) {
      if (num === 1) {
        // Raindrop
        if (raindrops[num].xSpeed > raindrops[num].xSpeedMax) {
          raindrops[num].xSpeed = raindrops[num].xSpeedMax;
        }
        if (raindrops[num].ySpeed > raindrops[num].ySpeedMax) {
          raindrops[num].ySpeed = raindrops[num].ySpeedMax;
        }
        if (raindrops[num].xSpeed < raindrops[num].xSpeedMin) {
          raindrops[num].xSpeed = raindrops[num].xSpeedMin;
        }
        if (raindrops[num].ySpeed < raindrops[num].ySpeedMin) {
          raindrops[num].ySpeed = 1;
        }
      }
      if (num === -1) {
        // Players
        if (player1.xSpeed > player1.rad / 2) {
          player1.xSpeed = player1.rad / 2;
        }
        if (player1.xSpeed < -player1.rad / 2) {
          player1.xSpeed = -player1.rad /2;
        }
      }
    }