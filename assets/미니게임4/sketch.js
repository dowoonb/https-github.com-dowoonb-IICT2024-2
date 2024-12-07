let mini4_stopwatchImage;
let mini4_heartsScoreImage;
let mini4_explanationImage;
let mini4_rabbit0Image, mini4_rabbit1Image, mini4_rabbit2Image;
let mini4_countdown = 7; // 7 seconds countdown
let mini4_timerRunning = false; // Flag to control the timer
let mini4_currentRabbitImage;
let mini4_customFont;
let mini4_lastTime = 0; // To keep track of time for countdown
let mini4_pressCount = 0; // Variable to keep track of spacebar presses
let mini4_countdownFinished = false; // Flag to stop further changes to pressCount and countdown
let mini4_completeImage;
let mini4_bgImageWithNothing;
let mini4_nextButtonImage;
let mini4_nextButtonHoverImage; // Add hover state image
let mini4_basket;
let mini4_hearts = []; // Array to store heart objects
let mini4_heartImages = []; // Array to store the heart images

let mini4_preGameBgImage;
let mini4_preGameButtonImage;
let mini4_gameStarted = false;

function preload() {
  // Load images and assets
  mini4_bgImage = loadImage('assets/MiniGame4_Background.png');
  mini4_bgImageWithNothing = loadImage('assets/MiniGame4_Background_withNothing.png');
  mini4_stopwatchImage = loadImage('assets/MiniGame4_Asset_Stopwatch.png');
  mini4_heartsScoreImage = loadImage('assets/MiniGame4_Asset_HeartsScore.png');
  mini4_explanationImage = loadImage('assets/MiniGame4_Asset_Explanation.png');
  mini4_rabbit0Image = loadImage('assets/MiniGame4_Asset_Rabbit_0.png');
  mini4_rabbit1Image = loadImage('assets/MiniGame4_Asset_Rabbit_1.png');
  mini4_rabbit2Image = loadImage('assets/MiniGame4_Asset_Rabbit_2.png');
  mini4_completeImage = loadImage('assets/MiniGame4_Asset_Complete.png');
  mini4_nextButtonImage = loadImage('assets/MiniGame4_Asset_result_Nextbtn.png');
  mini4_nextButtonHoverImage = loadImage('assets/MiniGame4_Asset_result_Nextbtn2.png'); // Hover state image
  mini4_basket = loadImage('assets/MiniGame4_Asset_Basket.png');
  mini4_customFont = loadFont('assets/a두드림E.otf');

  // Load heart images
  for (let i = 1; i <= 5; i++) {
    mini4_heartImages.push(loadImage(`assets/MiniGame4_Asset_Heart_${i}.png`));
  }

  // Pre-game assets
  mini4_preGameBgImage = loadImage('assets/MiniGame4_Background_PreGame.png');
  mini4_preGameButtonImage = loadImage('assets/MiniGame4_Asset_PreGame_PressStart.png');
}

function setup() {
  createCanvas(960, 540);
  textFont(mini4_customFont);
  textSize(48);
  mini4_currentRabbitImage = mini4_rabbit0Image;
}

function draw() {
  if (!mini4_gameStarted) {
    // Show the pre-game screen
    image(mini4_preGameBgImage, 0, 0, 960, 540);
    image(mini4_preGameButtonImage, 365, 455, 230, 70);
    return;
  }

  image(mini4_bgImage, 0, 0, 960, 540);

  if (mini4_stopwatchImage) {
    image(mini4_stopwatchImage, 860, 10, 80, 90);
  }

  if (mini4_heartsScoreImage) {
    image(mini4_heartsScoreImage, 15, 15, 120, 40);
  }

  for (let i = 0; i < mini4_hearts.length; i++) {
    let heart = mini4_hearts[i];
    image(heart.image, heart.x, heart.y, heart.size, heart.size);
    heart.size -= 1;
    heart.y += heart.speedY;

    if (heart.y <= 0) {
      heart.size = 150;
      let startPos = floor(random(3));
      let newY = height;

      if (startPos === 0) {
        heart.x = 300 + random(-50, 50);
      } else if (startPos === 1) {
        heart.x = 480 + random(-50, 50);
      } else {
        heart.x = 600 + random(-50, 50);
      }

      heart.speedY = random(-30, -40);
      heart.y = newY;
    }
  }

  image(mini4_basket, 170, 410);

  if (mini4_countdown <= 0 && mini4_countdownFinished) {
    image(mini4_bgImageWithNothing, 0, 0, 960, 540);
    image(mini4_completeImage, 320, 0, 330, 420);

    fill(130, 110, 92);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(mini4_pressCount, 528, 293);

    // Change the button image when hovered
    if (mouseX > 420 && mouseX < 545 && mouseY > 342 && mouseY < 392) {
      image(mini4_nextButtonHoverImage, 420, 342, 125, 50);
    } else {
      image(mini4_nextButtonImage, 420, 342, 125, 50);
    }

    return;
  }

  if (!mini4_timerRunning && mini4_countdown === 7) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(34);
    text(mini4_countdown, 900, 60);
  }

  if (mini4_timerRunning && mini4_countdown > 0) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(34);
    text(mini4_countdown, 900, 58);

    let currentTime = millis();
    if (currentTime - mini4_lastTime >= 1000) {
      mini4_countdown--;
      mini4_lastTime = currentTime;
    }
  }

  if (mini4_countdown <= 0 && !mini4_countdownFinished) {
    mini4_timerRunning = false;
    mini4_countdown = 0;
    mini4_countdownFinished = true;
  }

  image(mini4_currentRabbitImage, 0, -20, 1000, 550);

  fill(130, 110, 92);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`X ${mini4_pressCount}`, 80, 25);

  if (mini4_explanationImage && !mini4_timerRunning) {
    image(mini4_explanationImage, 270, 300, 530, 80);
  }
}

function mousePressed() {
  // Detect if the user clicked the "Start" button to begin the game
  if (!mini4_gameStarted && mouseX > 365 && mouseX < 595 && mouseY > 455 && mouseY < 525) { // 버튼의 새로운 클릭 영역으로 변경
    mini4_gameStarted = true;
  }
}

function keyPressed() {
  if (key === ' ' && !mini4_timerRunning && !mini4_countdownFinished) {
    mini4_explanationImage = null;
    mini4_countdown = 7;
    mini4_timerRunning = true;
    mini4_countdownFinished = false;
    mini4_pressCount = 0;

    for (let i = 0; i < 13; i++) {
      let heartImage = mini4_heartImages[i % mini4_heartImages.length];
      let startPos = floor(random(3));
      let x, y, speedX, speedY;

      if (startPos === 0) {
        x = 170 + random(-50, 30);
        y = 400 + random(-50, 50);
        speedX = random(10, 20);
        speedY = random(-6, -14);
      } else if (startPos === 1) {
        x = 480 + random(-50, 30);
        y = 400 + random(-50, 50);
        speedX = random(10, 20);
        speedY = random(-6, -14);
      } else {
        x = 790 + random(-50, 30);
        y = 400 + random(-50, 50);
        speedX = random(-20, -10);
        speedY = random(-6, -14);
      }

      mini4_hearts.push({
        image: heartImage,
        x: x,
        y: y,
        size: 100,
        speedX: speedX,
        speedY: speedY
      });
    }
  }

  if (key === ' ' && mini4_timerRunning && !mini4_countdownFinished) {
    mini4_currentRabbitImage = (mini4_currentRabbitImage === mini4_rabbit1Image) ? mini4_rabbit2Image : mini4_rabbit1Image;
    mini4_pressCount++;
  }
}

function windowResized() {
  resizeCanvas(960, 540);
}
