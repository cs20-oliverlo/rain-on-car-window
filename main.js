// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 1080;
cnv.height = 600;

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
    xSpeedResetTimer: 0,
    xSpeedResetGoal: 45
  });
}

let raindropsArray = [];
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
  // ctx.clearRect(0, 0, cnv.width, cnv.height);

  raindrops();
  players();

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
      pulse: 0,
      pulse2: 0
      }
    );
  }

  // Drawing Stuff
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
        raindropsArray[i].ySpeed += randomDec(-2, 3);
    
        // Stop & Jump Timers
        // raindropTimers(i);
    
        // Max Speed
        maxSpeed(raindropsArray, i);
      }
    }

    // Draw Players
    function players() {
      // Draw players
      for (let i = 0; i < player.length; i++) {
        drawDrops(player, i);
      }

      // Move players
      movePlayer();
      for (let i = 0; i < player.length; i++) {
        player[i].x += player[i].xSpeed;
        player[i].y += player[i].rad;
      }

      // Teleport players!
      for (let i = 0; i < player.length; i++) {
        teleport(player, i);
      }

      // Player Max Speed
      for (let i = 0; i < player.length; i++) {
       maxSpeed(player, i);
      }

      // console.log(player[0].xSpeed)
      console.log(player[0].xSpeed, player[1].xSpeed)
    }
    
    // Draw raindrops (players and raindrops)
    function drawDrops(variable, num) {
      if (raindropsArray[num].pulse2 <= 255) {
        if (variable === raindropsArray) {
          ctx.fillStyle = `rgb(${raindropsArray[num].pulse++}, ${raindropsArray[num].pulse++}, ${raindropsArray[num].pulse})`;
          ctx.beginPath();
          ctx.arc(variable[num].x, variable[num].y, variable[num].rad, 0, 2 * Math.PI);
          ctx.fill();
        }
        raindropsArray[num].pulse2++;
      } else if (raindropsArray[num].pulse2 <= 510) {
        if (variable === raindropsArray) {
          ctx.fillStyle = `rgb(${raindropsArray[num].pulse--}, ${raindropsArray[num].pulse--}, ${raindropsArray[num].pulse})`;
          ctx.beginPath();
          ctx.arc(variable[num].x, variable[num].y, variable[num].rad, 0, 2 * Math.PI);
          ctx.fill();
        }
        raindropsArray[num].pulse2++;
      } else {
        raindropsArray[num].pulse2 = 0;
      }


      if (variable === player) {
        ctx.fillStyle = `red`;
        ctx.beginPath();
        ctx.arc(variable[num].x, variable[num].y, variable[num].rad, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Player Movement
    function movePlayer() {
      // Player 1 Movement (acceleration and deacceleration)
      if (keyA === true) {
        player[0].xSpeed += -5 / player[0].rad;
        player[0].xSpeedResetTimer = 0;
      }
      if (keyD === true) {
        player[0].xSpeed += 5 / player[0].rad;
        player[0].xSpeedResetTimer = 0;
      }

      if (keyA !== true && keyD !== true && player[0].xSpeed !== 0) {
        if (player[0].xSpeed < 0) {
          player[0].xSpeed -= -player[0].rad / 50;
          player[0].xSpeedResetTimer++;
        } else if (player[0].xSpeed > 0) {
          player[0].xSpeed -= player[0].rad / 50;
          player[0].xSpeedResetTimer++;
        }
        if (player[0].xSpeedResetTimer === player[0].xSpeedResetGoal) {
          player[0].xSpeedResetTimer = 0;
          player[0].xSpeed = 0;
        }
      }

      // Player 2 Movement (acceleration and deacceleration)
      if (arrowLeft === true) {
        player[1].xSpeed += -5 / player[1].rad;
      }
      if (arrowRight === true) {
        player[1].xSpeed += 5 / player[1].rad;
      }

      if (arrowLeft !== true && arrowRight !== true && player[1].xSpeed !== 0) {
        if (player[1].xSpeed < 0) {
          player[1].xSpeed -= -player[1].rad / 50;
          player[1].xSpeedResetTimer++;
        } else if (player[1].xSpeed > 0) {
          player[1].xSpeed -= player[1].rad / 50;
          player[1].xSpeedResetTimer++;
        }
        if (player[1].xSpeedResetTimer === player[1].xSpeedResetGoal) {
          player[1].xSpeedResetTimer = 0;
          player[1].xSpeed = 0;
        }
      }
    }

    // Teleport raindrops
    function teleport(variable, num) {
      if (variable === raindropsArray) {
        if (variable[num].x > cnv.width + 25) {
          variable[num].x = 0;
        } else if (variable[num].x < -25) {
          variable[num].x = cnv.width;
        }
        if (variable[num].y > cnv.height + 15) {
          variable[num].y = -20;
        } else if (variable[num].y < -25) {
          variable[num].x = randomDec(0,cnv.width);
          variable[num].y = -20;
        }
      }
      if (variable === player) {
        if (variable[num].x > cnv.width + 25) {
          variable[num].x = 0;
        } else if (variable[num].x < -25) {
          variable[num].x = cnv.width;
        }
        if (variable[num].y > cnv.height) {
          variable[num].y = -20;
        }
      }
    }

    // Raindrop Timers
    function raindropTimers(num) {
      raindropsArray[num].stopTimer++;
        raindropsArray[num].jumpTimer++;
        if (raindropsArray[num].stopTimer > raindropsArray[num].stopGoal) {
          raindropsArray[num].xSpeed = 0;
          raindropsArray[num].ySpeed = 0;
        }
        if (raindropsArray[num].stopTimer > raindropsArray[num].stopGoal + randomDec(15, 21)) {
          raindropsArray[num].x += randomDec(-1, 1) * raindropsArray[num].rad;
          raindropsArray[num].y += randomDec(-0.5, 0.5) * raindropsArray[num].rad;
          raindropsArray[num].stopTimer = randomDec(0, 31);
          raindropsArray[num].stopGoal = randomDec(300, 480);
        }
        if (raindropsArray[num].jumpTimer > raindropsArray[num].jumpGoal) {
          raindropsArray[num].xSpeed += randomDec(-5, 6);
          raindropsArray[num].ySpeed += randomDec(0, 8);
          raindropsArray[num].jumpTimer = randomDec(0, 31);
          raindropsArray[num].jumpGoal = randomDec(300, 480);
        }
    }

    // Raindrop Max Speed
    function maxSpeed(variable, num) {
      if (variable === raindropsArray) {
        // Raindrop
        if (variable[num].xSpeed > variable[num].xSpeedMax) {
          variable[num].xSpeed = variable[num].xSpeedMax;
        }
        if (variable[num].ySpeed > variable[num].ySpeedMax) {
          variable[num].ySpeed = variable[num].ySpeedMax;
        }
        if (variable[num].xSpeed < variable[num].xSpeedMin) {
          variable[num].xSpeed = variable[num].xSpeedMin;
        }
        if (variable[num].ySpeed < variable[num].ySpeedMin) {
          variable[num].ySpeed = 1;
        }
      } else if (variable === player) {
        // Players
        if (variable[num].xSpeed > 30 / variable[num].rad) {
          variable[num].xSpeed = 30 / variable[num].rad;
        }
        if (variable[num].xSpeed < -30 / variable[num].rad) {
          variable[num].xSpeed = -30 / variable[num].rad;
        }
      }
    }