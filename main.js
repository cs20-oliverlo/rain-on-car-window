// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 1080;
cnv.height = 600;

// Global Variables
let numOfRaindrops = randomInt(100, 100);

let player = [{
  x: randomDec(0, cnv.width),
  y: 0,
  rad: randomInt(5, 11),
  xSpeed: 0,
  xSpeedResetTimer: 0,
  xSpeedResetGoal: 45
}, {
  x: randomDec(0, cnv.width),
  y: 0,
  rad: randomDec(5, 11),
  xSpeed: 0,
  xSpeedResetTimer: 0,
  xSpeedResetGoal: 45
}];

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
  // ctx.clearRect(0, 0, cnv.width, cnv.height);

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
      stopGoal: randomDec(300, 480),
      jumpTimer: 0,
      jumpGoal: randomDec(300, 480),
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
        maxSpeed(raindrops, i);
      }
    }

    // Draw Players
    function drawPlayers() {
      // Draw players
      for (let i = 0; i < player.length; i++) {
        drops(player, i);
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
      console.log(player[1].xSpeed)
    }
    
    // Draw raindrops (players and raindrops)
    function drops(variable, num) {
      if (variable === raindrops) {
        ctx.fillStyle = `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
        ctx.beginPath();
        ctx.arc(variable[num].x, variable[num].y, variable[num].rad, 0, 2 * Math.PI);
        ctx.fill();
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
      if (variable === raindrops) {
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
      raindrops[num].stopTimer++;
        raindrops[num].jumpTimer++;
        if (raindrops[num].stopTimer > raindrops[num].stopGoal) {
          raindrops[num].xSpeed = 0;
          raindrops[num].ySpeed = 0;
        }
        if (raindrops[num].stopTimer > raindrops[num].stopGoal + randomDec(15, 21)) {
          raindrops[num].x += randomDec(-1, 2) * 5;
          raindrops[num].stopTimer = randomDec(0, 31);
          raindrops[num].stopGoal = randomDec(300, 480);
        }
        if (raindrops[num].jumpTimer > raindrops[num].jumpGoal) {
          raindrops[num].xSpeed += randomDec(-5, 6);
          raindrops[num].ySpeed += randomDec(0, 8);
          raindrops[num].jumpTimer = randomDec(0, 31);
          raindrops[num].jumpGoal = randomDec(300, 480);
        }
    }

    // Raindrop Max Speed
    function maxSpeed(variable, num) {
      if (variable === raindrops) {
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
        if (variable[num].xSpeed > variable[num].rad / 2) {
          variable[num].xSpeed = variable[num].rad / 2;
        }
        if (variable[num].xSpeed < -variable[num].rad / 2) {
          variable[num].xSpeed = -variable[num].rad /2;
        }
      }
    }