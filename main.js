// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 1080;
cnv.height = 600;

// Global Variables
let numOfFlakes = randomInt(10, 11);

let raindrops = [];
for (let i = 0; i < numOfFlakes; i++) {
  newRaindrop();
}

// Update the Number of raindropss
function checkFlakes() {
  if (raindrops.length < numOfFlakes) {
    newRaindrop();
  } else if (raindrops.length > numOfFlakes) {
    raindrops.pop();
  }
}


// Drawing stuff
requestAnimationFrame(drawAnimation);
function drawAnimation() {
  // Clear Canvas
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  for (let i = 0; i < raindrops.length; i++) {
    // Draw raindrops
    ctx.fillStyle = `aqua`;
    ctx.beginPath();
    ctx.arc(raindrops[i].x, raindrops[i].y, raindrops[i].rad, 0, 2 * Math.PI);
    ctx.fill();

    // Move raindrops
    raindrops[i].x += raindrops[i].xSpeed;
    raindrops[i].y += raindrops[i].ySpeed;

    // Teleport flakies!
    if (raindrops[i].x < -50 || raindrops[i].x > cnv.width + 50 || raindrops[i].y > cnv.height + 6) {
      raindrops[i].x = randomDec(0,cnv.width);
      raindrops[i].y = -20;
    } else if (raindrops[i].y < -25) {
      raindrops[i].x = randomDec(0,cnv.width);
      raindrops[i].y = -20;
    }

    // Flutteryness (adds some spice)
    raindrops[i].xSpeed += randomDec(-1, 1);
    raindrops[i].ySpeed += randomDec(-2, 3);

    // Stop & Jump Timers
    raindrops[i].stopTimer++;
    raindrops[i].jumpTimer++;
    if (raindrops[i].stopTimer > raindrops[i].stopGoal) {
      raindrops[i].xSpeed = 0;
      raindrops[i].ySpeed = 0;
    }
    if (raindrops[i].stopTimer > raindrops[i].stopGoal + randomDec(30, 61)) {
      raindrops[i].x += randomDec(-1, 2) * 5;
      raindrops[i].stopTimer = randomDec(0, 31);
      raindrops[i].stopGoal = randomDec(180, 301);
    }
    if (raindrops[i].jumpTimer > raindrops[i].jumpGoal) {
      raindrops[i].xSpeed += randomDec(-5, 6);
      raindrops[i].ySpeed += randomDec(0, 8);
      raindrops[i].jumpTimer = randomDec(0, 31);
      raindrops[i].jumpGoal = randomDec(90, 121);
    }

    // Max Speed
    if (raindrops[i].xSpeed > 3) {
      raindrops[i].xSpeed = 3;
    }
    if (raindrops[i].ySpeed > 7) {
      raindrops[i].ySpeed = 7;
    }
    if (raindrops[i].xSpeed < -3) {
      raindrops[i].xSpeed = -3;
    }
    if (raindrops[i].ySpeed < 0) {
      raindrops[i].ySpeed = 1;
    }
  }

  // Calls function to update the number of raindropss
  checkFlakes();

  // Request Animation Frame
  requestAnimationFrame(drawAnimation);
}

// EVENT STUFF
document.addEventListener("keydown", keydownHandler);

function mousedownHandler() {
  mouseIsPressed = true;
    numOfFlakes++;
}

function mouseupHandler() {
  mouseIsPressed = false;
}

function keydownHandler(event) {
  if (event.code === "KeyA") {
    numOfFlakes--;
    console.log(numOfFlakes);
  }
  if (event.code === "KeyD") {
    numOfFlakes++;
    console.log(numOfFlakes);
  }
  if (event.code === "ArrowLeft") {
    numOfFlakes--;
    console.log(numOfFlakes);
  }
  if (event.code === "ArrowRight") {
    numOfFlakes++;
    console.log(numOfFlakes);
  }
}

// Helper Function
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
    ySpeed: randomDec(4, 8)
    }
  )
}