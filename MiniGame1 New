let bgImage;
let preGameBgImage;
let startButtonImage;
let images = [];
let currentImageIndex = 0;
let lastChangeTime = 0;
let changeInterval = 100;
let questionMarkImage;
let userChoiceImages = [];
let clickedImages = [];
let selectedIndex = -1;
let gameResultImage = null;
let gameEnded = false;
let gameStarted = false;
let explanationImage;
let explanationStartTime = -1;
let explanationDuration = 5000; // 설명 화면 표시 시간
let gifBackground;

// 결과 이미지를 저장할 변수
let resultImages = {
  Win: null,
  Lose: null,
  Draw: null
};

// 결과 PNG를 저장할 변수
let resultGifImages = {
  Win: null,
  Lose: null,
  Draw: null
};
let resultGifStartTime = -1;
let showResultGif = false;

// 시계 관련 변수
let stopwatchImage;
let countdown = 7; // 7초 카운트다운
let countdownFontSize = 30;
let countdownStartTime = -1;

let isHoveringChoice = [false, false, false];
let customFont;
let gameResult = ""; // 게임 결과

function preload() {
  bgImage = loadImage('assets/미니게임1_Background.png');
  preGameBgImage = loadImage('assets/MiniGame1_Background_PreGame.png');
  startButtonImage = loadImage('assets/MiniGame1_Asset_PreGame_PressStart-2.png');
  images[0] = loadImage('assets/미니게임1_Asset_화면중앙용_보.png');
  images[1] = loadImage('assets/미니게임1_Asset_화면중앙용_가위.png');
  images[2] = loadImage('assets/미니게임1_Asset_화면중앙용_바위.png');
  questionMarkImage = loadImage('assets/미니게임1_Asset_이용자선택전!!!_물음표.png');
  userChoiceImages[0] = loadImage('assets/미니게임1_Asset_이용자선택용_보.png');
  userChoiceImages[1] = loadImage('assets/미니게임1_Asset_이용자선택용_가위.png');
  userChoiceImages[2] = loadImage('assets/미니게임1_Asset_이용자선택용_바위.png');
  clickedImages[0] = loadImage('assets/미니게임1_Asset_이용자선택용(클릭됐을때)_보.png');
  clickedImages[1] = loadImage('assets/미니게임1_Asset_이용자선택용(클릭됐을때)_가위.png');
  clickedImages[2] = loadImage('assets/미니게임1_Asset_이용자선택용(클릭됐을때)_바위.png');
  resultImages.Win = loadImage('assets/미니게임1_Background_결과_YouWin.png');
  resultImages.Lose = loadImage('assets/미니게임1_Background_결과_YouLose.png');
  resultImages.Draw = loadImage('assets/미니게임1_Background_결과_Draw.png');
  stopwatchImage = loadImage('assets/미니게임1_Asset_타이머_타이머내숫자카운트다운할것.png');
  customFont = loadFont('assets/a두드림E.otf');
  explanationImage = loadImage('assets/MiniGame1_Asset_Explanation.png');
  gifBackground = loadImage('assets/MiniGame1_Asset_MovingRabbit.gif');
  resultGifImages.Win = loadImage('assets/MiniGame1_Asset_RabbitWin.png');
  resultGifImages.Lose = loadImage('assets/MiniGame1_Asset_RabbitLose.png');
  resultGifImages.Draw = loadImage('assets/MiniGame1_Asset_RabbitDraw.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (!gameStarted) {
    // 시작 화면
    background(preGameBgImage);
    let startButtonWidth = width * 0.2;
    let startButtonHeight = height * 0.09;
    let startButtonX = (width - startButtonWidth) / 2;
    let startButtonY = height * 0.88;

    if (
      mouseX > startButtonX &&
      mouseX < startButtonX + startButtonWidth &&
      mouseY > startButtonY &&
      mouseY < startButtonY + startButtonHeight
    ) {
      startButtonWidth *= 1.14;
      startButtonHeight *= 1.14;
      startButtonX = (width - startButtonWidth) / 2;
      startButtonY = height * 0.88;
    }

    image(startButtonImage, startButtonX, startButtonY, startButtonWidth, startButtonHeight);
  } else if (millis() - explanationStartTime < explanationDuration) {
    // 설명 화면
    background(bgImage);

    // 설명 이미지
    image(
      explanationImage,
      width / 2 - explanationImage.width * 0.65,
      height / 2 - explanationImage.height * 0.5,
      explanationImage.width * 1.3,
      explanationImage.height * 1.3
    );

    // 토끼 gif
    image(gifBackground, -20, 70, width / 1.5, height / 1.5);
  } else if (showResultGif) {
    // 결과 PNG 화면
  
    if (gameResult === "Lose") resultGif = resultGifImages.Win;
    if (gameResult === "Win") resultGif = resultGifImages.Lose;
    if (gameResult === "Draw") resultGif = resultGifImages.Draw;

    image(resultGif, width / 2 - 570, height / 2 - 245, 330, 430);

    // 3초 후 결과 화면 종료
    if (millis() - resultGifStartTime >= 3000) {
      showResultGif = false;
      gameEnded = true;
    }
  } else if (!gameEnded) {
    // 게임 화면
    background(bgImage);
    

    // gifBackground는 showResultGif가 true일 때만 그리지 않음
    if (!showResultGif) {
      image(gifBackground, -20, 70, width / 1.5, height / 1.5);
    }

    image(stopwatchImage, windowWidth / 2 - 40, windowHeight - 120, 80, 90);

    if (millis() - lastChangeTime > changeInterval) {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      lastChangeTime = millis();
    }

    if (millis() - countdownStartTime >= 1000) {
      if (countdown > 0) {
        countdown--;
        countdownStartTime = millis();
      } else if (!gameEnded) {
        gameResultImage = { image: resultImages.Lose, width: windowWidth, height: windowHeight };
        gameEnded = true;
      }
    }

    fill(0);
    textFont(customFont);
    textSize(countdownFontSize);
    textAlign(CENTER, CENTER);
    text(countdown, width / 2, height * 0.85);

    displayGameImages();
  }

  if (gameEnded) {
    // 최종 결과 화면
    let resultWidth = gameResultImage.width;
    let resultHeight = gameResultImage.height;
    image(
      gameResultImage.image,
      width * 0.5 - resultWidth * 0.5,
      height * 0.5 - resultHeight * 0.5,
      resultWidth,
      resultHeight
    );
  }
}

function displayGameImages() {
  // 중앙 이미지 표시
  let img = images[currentImageIndex];
  let imgSize = width * 0.15;
  let centerX = width * 0.25;
  let centerY = height * 0.55 - imgSize * 0.5;
  image(img, centerX, centerY, imgSize, imgSize);

  // 물음표 표시
  let questionSize = width * 0.11;
  image(questionMarkImage, width * 0.6, height * 0.47, questionSize, questionSize);

  // 선택 버튼들 표시
  for (let i = 0; i < userChoiceImages.length; i++) {
    let choiceX = width * 0.8;
    let choiceY = height * (0.2 + i * 0.23);
    let choiceSize = width * 0.1;

    if (selectedIndex === i) {
      image(clickedImages[i], choiceX, choiceY, choiceSize, choiceSize);
    } else if (isHoveringChoice[i]) {
      image(clickedImages[i], choiceX, choiceY, choiceSize, choiceSize);
    } else {
      image(userChoiceImages[i], choiceX, choiceY, choiceSize, choiceSize);
    }
  }
}

function mouseMoved() {
  for (let i = 0; i < userChoiceImages.length; i++) {
    let choiceX = width * 0.8;
    let choiceY = height * (0.2 + i * 0.23);
    let choiceSize = width * 0.1;

    if (
      mouseX > choiceX &&
      mouseX < choiceX + choiceSize &&
      mouseY > choiceY &&
      mouseY < choiceY + choiceSize
    ) {
      isHoveringChoice[i] = true;
    } else {
      isHoveringChoice[i] = false;
    }
  }
}

function mousePressed() {
  if (!gameStarted) {
    let startButtonWidth = width * 0.2;
    let startButtonHeight = height * 0.09;
    let startButtonX = (width - startButtonWidth) / 2;
    let startButtonY = height * 0.88;

    if (
      mouseX > startButtonX &&
      mouseX < startButtonX + startButtonWidth &&
      mouseY > startButtonY &&
      mouseY < startButtonY + startButtonHeight
    ) {
      gameStarted = true;
      explanationStartTime = millis();
      countdownStartTime = millis();
    }
  } else {
    for (let i = 0; i < userChoiceImages.length; i++) {
      let choiceX = width * 0.8;
      let choiceY = height * (0.2 + i * 0.25);
      let choiceSize = width * 0.1;

      if (
        mouseX > choiceX &&
        mouseX < choiceX + choiceSize &&
        mouseY > choiceY &&
        mouseY < choiceY + choiceSize
      ) {
        selectedIndex = i;
        determineWinner();
        break;
      }
    }
  }
}

function determineWinner() {
  if (selectedIndex === -1) return;

  let result = "";
  if (selectedIndex === currentImageIndex) {
    result = "Draw";
  } else if (
    (selectedIndex === 0 && currentImageIndex === 2) ||
    (selectedIndex === 1 && currentImageIndex === 0) ||
    (selectedIndex === 2 && currentImageIndex === 1)
  ) {
    result = "Win";
  } else {
    result = "Lose";
  }

  gameResult = result;

  // 결과 PNG 표시 준비
  showResultGif = true;
  resultGifStartTime = millis();

  if (result === "Win") {
    gameResultImage = { image: resultImages.Win, width: windowWidth, height: windowHeight };
  } else if (result === "Lose") {
    gameResultImage = { image: resultImages.Lose, width: windowWidth, height: windowHeight };
  } else {
    gameResultImage = { image: resultImages.Draw, width: windowWidth, height: windowHeight };
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
