let mini3_mini3_bgImage; // 현재 배경 이미지
let mini3_mini3_preGameBg, mini3_mini3_gameBg, mini3_mini3_nextBg, mini3_mini3_finalBg, mini3_mini3_postGameBg; // 다섯 배경 이미지
let mini3_mini3_pressStartBtn; // 시작 버튼 이미지
let mini3_mini3_noticeImg, mini3_mini3_toggleImg, mini3_mini3_toggleRecImg, mini3_mini3_halfBallImage, mini3_mini3_explanationImage, mini3_mini3_gcloverImage, mini3_mini3_confettiGif; // 추가 이미지
let mini3_completeImages = []; // 랜덤 complete 이미지 배열
let mini3_nextBtn, mini3_nextBtn2; // 다음 버튼 이미지

let mini3_mini3_btnX, mini3_mini3_btnY, mini3_mini3_btnWidth, mini3_mini3_btnHeight; // 버튼 위치와 크기
let mini3_noticeVisible = false; // 알림 이미지 가시성
let mini3_toggleVisible = false; // 토글 이미지 가시성
let mini3_buttonVisible = true; // 시작 버튼 가시성
let mini3_toggleLastChangeTime = 0; // 토글 상태 변경 시점
let mini3_toggleInterval = 500; // 토글 상태 변경 간격 (0.5초)
let mini3_gameStarted = false; // 게임이 시작되었는지 여부

let mini3_balls = []; // 공 이미지 배열
let mini3_halfBalls = []; // 반쪽 공 이미지 배열
let mini3_objects = []; // 공과 반쪽 공 객체 배열
let mini3_isMixing = false; // 뒤섞이는 모션 여부
let mini3_mixingStartTime = 0; // 섞이는 시작 시간
let mini3_showHalfBall = false; // MiniGame3_Asset_HalfBall_1 등장 여부
let mini3_halfBallScale = 0; // 반쪽 공 확장 비율
let mini3_explanationStartTime = 0; // 설명 문구 출력 타이머
let mini3_halfBallClicks = 0; // 공 클릭 횟수
let mini3_bounceY = 0; // 공 튀는 효과 Y좌표
let mini3_isBouncing = false; // 튀는 상태
let mini3_showComplete = false; // complete 이미지 표시 여부
let mini3_selectedCompleteImage; // 랜덤 선택된 complete 이미지
let mini3_gcloverStartTime; // gclover 표시 시작 시간

// ToggleRec 관련 변수
let mini3_rotationAngle = 0; // 현재 회전 각도
let mini3_rotationSpeed = 5; // 회전 속도

// Step 1: 추가된 변수
let mini3_explanationVisible = false;  // 설명 이미지 표시 여부
let mini3_explanationDelayTime = 2000; // 2초 후 설명 이미지 표시
let mini3_showGclover = false; // gclover 표시 여부

// 공 관련 추가 변수
let mini3_ballOpacity = 0; // 공의 투명도 (서서히 나타나게)
let mini3_ballAppearSpeed = 2.3; // 공이 나타나는 속도 (수정하여 빠르게 나타나도록 설정)
let mini3_ballIsVisible = false; // 공이 완전히 나타났는지 여부

// 클로버 관련 추가 변수
let mini3_gcloverScale = 0; // 클로버 이미지의 크기 (서서히 커지도록 설정)
let mini3_gcloverAppearSpeed = 0.03; // 클로버가 커지는 속도
let mini3_isGcloverVisible = false; // 클로버가 완전히 나타났는지 여부

// 변수: 마우스가 Next 버튼 위에 있는지 여부
let mini3_isOverNextBtn = false; // 마우스가 nextBtn 위에 있는지 여부
let mini3_nextBtnState = mini3_nextBtn; // 버튼 상태, 기본 nextBtn

function preload() {
  // 이미지 로드
  mini3_mini3_preGameBg = loadImage('assets/MiniGame3_Background_PreGame.png');
  mini3_mini3_gameBg = loadImage('assets/MiniGame3-1_Background.png');
  mini3_mini3_nextBg = loadImage('assets/MiniGame3-2_Background.png');
  mini3_mini3_finalBg = loadImage('assets/MiniGame3-3_Background.png');
  mini3_mini3_postGameBg = loadImage('assets/MiniGame3_Background_PostGame.png');
  mini3_mini3_pressStartBtn = loadImage('assets/MiniGame3_Asset_PreGame_PressStart.png');
  mini3_mini3_noticeImg = loadImage('assets/MiniGame3_Asset_pre_notice.png');
  mini3_mini3_toggleImg = loadImage('assets/MiniGame3_Asset_Toggle.png');
  mini3_mini3_toggleRecImg = loadImage('assets/MiniGame3_Asset_ToggleRec.png');
  mini3_mini3_halfBallImage = loadImage('assets/MiniGame3_Asset_HalfBall_1.png');
  mini3_mini3_explanationImage = loadImage('assets/MiniGame3_Asset_Explanation2.png');
  mini3_mini3_gcloverImage = loadImage('assets/MiniGame3_Asset_gclover.png');

  // complete 이미지 배열
  mini3_completeImages = [
    loadImage('assets/MiniGame3_Asset_Complete_ProfC.png'),
    loadImage('assets/MiniGame3_Asset_Complete_Poop.png'),
    loadImage('assets/MiniGame3_Asset_Complete_Perf.png'),
    loadImage('assets/MiniGame3_Asset_Complete_Diamond.png'),
    loadImage('assets/MiniGame3_Asset_Complete_Bomb.png'),
    loadImage('assets/MiniGame3_Asset_Complete_A.png'),
  ];

  // Confetti GIF 로드
  mini3_mini3_confettiGif = loadImage('assets/Confetti.gif'); // Confetti GIF 경로 설정

  // 다음 버튼 이미지
  mini3_nextBtn = loadImage('assets/MiniGame3_Asset_result_Nextbtn.png');
  mini3_nextBtn2 = loadImage('assets/MiniGame3_Asset_result_Nextbtn2.png');

  // 공과 반쪽 공 이미지 로드
  for (let i = 1; i <= 5; i++) {
    mini3_balls.push(loadImage(`assets/MiniGame3_Asset_Ball_${i}.png`));
    mini3_halfBalls.push(loadImage(`assets/MiniGame3_Asset_HalfBall_${i}.png`));
  }
}

function setup() {
  createCanvas(960, 540);
  mini3_mini3_bgImage = mini3_mini3_preGameBg; // 초기 배경 설정

  // 버튼 위치와 크기 설정
  mini3_mini3_btnWidth = 200; // 버튼 너비
  mini3_mini3_btnHeight = 60; // 버튼 높이
  mini3_mini3_btnX = 480 - mini3_mini3_btnWidth / 2; // 버튼 중앙 위치 조정
  mini3_mini3_btnY = 490 - mini3_mini3_btnHeight / 2; // 버튼 중앙 위치 조정
}

function draw() {
  // 현재 배경 이미지 그리기
  imageMode(CORNER);
  image(mini3_mini3_bgImage, 0, 0, width, height);

  // 시작 버튼이 보이는 경우 버튼 이미지 그리기
  if (mini3_buttonVisible) {
    image(mini3_mini3_pressStartBtn, mini3_mini3_btnX, mini3_mini3_btnY, mini3_mini3_btnWidth, mini3_mini3_btnHeight);
  }

  // 알림 이미지 표시
  if (mini3_noticeVisible) {
    image(mini3_mini3_noticeImg, 250, height / 2, 500, 65);
  }

  // Toggle 이미지 표시
  if (mini3_gameStarted && millis() - mini3_toggleLastChangeTime > mini3_toggleInterval) {
    mini3_toggleVisible = !mini3_toggleVisible;
    mini3_toggleLastChangeTime = millis();
  }

  if (mini3_toggleVisible) {
    image(mini3_mini3_toggleImg, width / 2 - 39, 249 + 120 - 13, 52, 52);
  }

  // 회전하는 ToggleRec 표시
  if (mini3_mini3_bgImage === mini3_mini3_nextBg && !mini3_showHalfBall) {
    push();
    translate(449, height / 2 + 202);
    rotate(radians(mini3_rotationAngle));
    imageMode(CENTER);
    image(mini3_mini3_toggleRecImg, 0, 0, 60, 55); // 회전 이미지 크기
    pop();

    mini3_rotationAngle += mini3_rotationSpeed;
    if (mini3_rotationAngle >= 360) {
      mini3_rotationAngle = 0;
    }
  }

  // 공과 반쪽 공 애니메이션 처리
  if (mini3_mini3_bgImage === mini3_mini3_nextBg) {
    if (!mini3_showHalfBall) {
      for (let obj of mini3_objects) {
        obj.update();
        obj.display();
      }
    }

    // 3초가 지나면 배경 변경 및 반쪽 공 등장
    if (millis() - mini3_mixingStartTime > 5000) {
      mini3_mini3_bgImage = mini3_mini3_finalBg;
      mini3_showHalfBall = true;
      mini3_explanationStartTime = millis();  // 설명 문구 타이머 시작
    }
  }

  // 반쪽 공 확장 애니메이션
  if (mini3_showHalfBall) {
    imageMode(CENTER);

    if (mini3_isBouncing) {
      mini3_bounceY = sin(frameCount * 0.3) * 10; // 튀는 효과
    }

    if (mini3_halfBallClicks < 3) {
      mini3_halfBallScale += 1.8; // 확장 속도 조절
      image(mini3_mini3_halfBallImage, width / 2 + 8, height / 2 - mini3_bounceY, mini3_halfBallScale, mini3_halfBallScale);
    } else {
      // 클로버 서서히 커지는 효과
      if (mini3_gcloverScale < 1) {
        mini3_gcloverScale += mini3_gcloverAppearSpeed; // 서서히 커짐
      } else {
        if (!mini3_gcloverStartTime) {
          mini3_gcloverStartTime = millis(); // 클로버가 완전히 나타날 때 타이머 시작
        }
        mini3_isGcloverVisible = true; // 클로버가 완전히 나타났을 때
      }
      
      // 클로버 이미지 그리기
      image(mini3_mini3_gcloverImage, 492, 270, 130 * mini3_gcloverScale, 130 * mini3_gcloverScale); // 클로버 크기 적용
      mini3_showGclover = true;
      
      // gclover 표시 후 2초 뒤에 complete 화면으로 전환
      if (mini3_isGcloverVisible && millis() - mini3_gcloverStartTime > 2000 && !mini3_showComplete) {
        mini3_mini3_bgImage = mini3_mini3_postGameBg; // 결과 화면으로 전환
        mini3_selectedCompleteImage = random(mini3_completeImages); // 랜덤 complete 이미지 선택
        mini3_showComplete = true; // complete 화면 표시
      }
    }

    // 2초 후에 설명 이미지 표시
    if (millis() - mini3_explanationStartTime > 1000 && !mini3_showGclover) {
      mini3_explanationVisible = true;
      image(mini3_mini3_explanationImage, width / 2, height / 2 +100, 500, 60); // 설명 이미지
    }

    // gclover 이미지가 나타나면 설명 이미지 숨김
    if (mini3_showGclover && millis() - mini3_gcloverStartTime > 3000) {
      mini3_explanationVisible = false; // gclover가 표시된 후 설명 이미지를 숨김
    }

    // Confetti GIF 표시
    if (mini3_showGclover) {
      image(mini3_mini3_confettiGif, 500,300, 960, 540); // Confetti GIF 위치 조정
    }
  }

  // complete 화면 표시
  if (mini3_showComplete) {
    image(mini3_selectedCompleteImage, width / 2 , height / 2-50 , 350, 460);
    
    // Next 버튼 겹치게 표시 (마우스 오버 상태에 따라 nextBtn2가 보이도록)
    image(mini3_nextBtnState, width / 2, height - 149, 125, 50); 
  }
}

function mouseMoved() {
  // 버튼 위에 마우스가 있을 때 nextBtn2로 변경
  if (
    mouseX > width / 2 - 62.5 && mouseX < width / 2 + 62.5 &&
    mouseY > height - 199 && mouseY < height - 149
  ) {
    mini3_isOverNextBtn = true;
    mini3_nextBtnState = mini3_nextBtn2; // 마우스가 버튼 위에 있을 때 nextBtn2로 변경
  } else {
    mini3_isOverNextBtn = false;
    mini3_nextBtnState = mini3_nextBtn; // 마우스가 버튼 위에 없을 때 기본 nextBtn으로 변경
  }
}

function mousePressed() {
  // 시작 버튼 클릭 시
  if (
    mini3_buttonVisible &&
    mouseX > mini3_mini3_btnX &&
    mouseX < mini3_mini3_btnX + mini3_mini3_btnWidth &&
    mouseY > mini3_mini3_btnY &&
    mouseY < mini3_mini3_btnY + mini3_mini3_btnHeight
  ) {
    mini3_buttonVisible = false;
    mini3_mini3_bgImage = mini3_mini3_gameBg;
    mini3_noticeVisible = true;
    mini3_toggleVisible = true;
    mini3_gameStarted = true;
  }

  // 공 클릭 시
  if (mini3_showHalfBall && mini3_halfBallClicks < 3) {
    let distance = dist(mouseX, mouseY, width / 2, height / 2);
    if (distance < mini3_halfBallScale / 2) {
      mini3_halfBallClicks++;
      mini3_isBouncing = true;

      // 3회 클릭 후 공 제거
      if (mini3_halfBallClicks === 3) {
        mini3_isBouncing = false;
      }
    }
  }

  // 토글 이미지 클릭 시
  if (
    mini3_toggleVisible &&
    mouseX > width / 2 - 70 &&
    mouseX < width / 2 + 25 &&
    mouseY > 244 + 110  &&
    mouseY < 244 + 110 + 50
  ) {
    mini3_mini3_bgImage = mini3_mini3_nextBg;
    mini3_toggleVisible = false;
    mini3_noticeVisible = false;
    mini3_gameStarted = false;
    initializeObjects();
    mini3_mixingStartTime = millis();
  }

  // Next 버튼 클릭 시
  if (
    mouseX > width / 2 - 62.5 && mouseX < width / 2 + 62.5 && mouseY > height - 199 && mouseY < height - 149
  ) {
    mini3_nextBtnState = mini3_nextBtn2; // 클릭 시 nextBtn2로 변경
  }
}
function initializeObjects() {
  mini3_objects = [];
  for (let i = 0; i < 9; i++) { // 공의 개수를 10개로 증가시킴
    let randomSpeed = random(5, 10); // 속도를 빠르게 조정
    let startX = random(380, 550); // 고정된 x 값
    let startY = random(300, 350); // 고정된 y 값
    mini3_objects.push(new MovingObject(mini3_balls[i % mini3_balls.length], startY, randomSpeed, startX)); // mini3_balls 배열의 길이를 초과하지 않도록 설정
    mini3_objects.push(new MovingObject(mini3_halfBalls[i % mini3_halfBalls.length], startY, randomSpeed, startX)); // mini3_halfBalls 배열의 길이를 초과하지 않도록 설정
  }
}

// 공과 반쪽 공 객체
class MovingObject {
  constructor(img, startY, speed, startX) {
    this.img = img;
    this.x = startX; // 고정된 x 값
    this.y = startY; // 고정된 y 값
    this.speed = speed;
    this.isMixing = false; // 섞기 전 상태
    this.mixRangeX = [380, 550]; // 제한된 X 범위
    this.mixRangeY = [240, 340]; // 제한된 Y 범위
    this.directionX = random([-1, 1]) * random(3, 6);
    this.directionY = random([-1, 1]) * random(3, 6);

    // 불투명도 변수 초기화
    this.opacity = 0; // 불투명도 0으로 설정
    this.opacitySpeed = 3; // 불투명도 증가 속도
    
    // 회전 변수 추가
    this.angle = 0; // 초기 회전 각도
    this.rotationSpeed = random(1, 5); // 회전 속도
  }

  update() {
    // 불투명도가 100%에 도달하면 섞이기 시작
    if (this.opacity < 255) {
      this.opacity += this.opacitySpeed; // 서서히 불투명도 증가
    } else if (!this.isMixing) {
      this.isMixing = true; // 불투명도가 완전히 나타나면 섞기 시작
      // 섞기 시작할 때 현재 위치에서 섞기 시작하도록 보장
      this.directionX = random([-1, 1]) * random(3, 6);
      this.directionY = random([-1, 1]) * random(3, 6);
    }

    if (this.isMixing) {
      // X축과 Y축 방향으로 움직임
      this.x += this.directionX;
      this.y += this.directionY;

      // X축 범위 제한
      if (this.x <= this.mixRangeX[0] || this.x >= this.mixRangeX[1]) {
        this.directionX = -this.directionX + random(-0.3, 0.3); // 부드러운 방향 변경
        this.x = constrain(this.x, this.mixRangeX[0], this.mixRangeX[1]); // X축 경계에 갇히지 않게 조정
      }

      // Y축 범위 제한
      if (this.y <= this.mixRangeY[0] || this.y >= this.mixRangeY[1]) {
        this.directionY = -this.directionY + random(-0.3, 0.3); // 부드러운 방향 변경
        this.y = constrain(this.y, this.mixRangeY[0], this.mixRangeY[1]); // Y축 경계에 갇히지 않게 조정
      }

      // 속도 제한
      this.directionX = constrain(this.directionX, -6, 6);
      this.directionY = constrain(this.directionY, -6, 6);
      
      // 회전 업데이트 (회전 속도 적용)
      this.angle += this.rotationSpeed; // 회전각도 증가
    }
  }

  display() {
    // 불투명도 적용하여 공 그리기
    tint(255, this.opacity); // 공에 불투명도 적용

    // 이미지 회전
    push(); // 회전 변환 적용 전 상태 저장
    translate(this.x + 25, this.y + 25); // 공의 중심을 기준으로 회전
    rotate(radians(this.angle)); // 회전 적용
    image(this.img, -25, -25, 50, 50); // 공 이미지 표시 (이미지의 중심을 기준으로 회전)
    pop(); // 변환 상태 리셋
    
    noTint(); // 불투명도 리셋
  }
}
