let currentIndex = 0;
let currentStage = 0;
let combinedTimesGlobal = [];

let stage4Questions = [];
let stage4Index = 0;

const homePage = document.getElementById("home");
const stagePage = document.getElementById("stage");

const hour = [
  { text: "1:00", speech: "한 시" },
  { text: "2:00", speech: "두 시" },
  { text: "3:00", speech: "세 시" },
  { text: "4:00", speech: "네 시" },
  { text: "5:00", speech: "다섯 시" },
  { text: "6:00", speech: "여섯 시" },
  { text: "7:00", speech: "일곱 시" },
  { text: "8:00", speech: "여덟 시" },
  { text: "9:00", speech: "아홉 시" },
  { text: "10:00", speech: "열 시" },
  { text: "11:00", speech: "열한 시" },
  { text: "12:00", speech: "열두 시" }
];

const minute = [
  { text: "0:05", speech: "오 분" },
  { text: "0:10", speech: "십 분" },
  { text: "0:15", speech: "십오 분" },
  { text: "0:20", speech: "이십 분" },
  { text: "0:25", speech: "이십오 분" },
  { text: "0:30", speech: "삼십 분" },
  { text: "0:35", speech: "삼십오 분" },
  { text: "0:40", speech: "사십 분" },
  { text: "0:45", speech: "사십오 분" },
  { text: "0:50", speech: "오십 분" },
  { text: "0:55", speech: "오십오 분" },
];

let targetHour = null;

document.addEventListener("DOMContentLoaded", () => {
  // URL에서 week 파라미터 읽기
  const params = new URLSearchParams(window.location.search);
  const weekParam = params.get("week"); // "Week01" ~ "Week12"

  if (weekParam) {
    targetHour = parseInt(weekParam.replace("Week", ""), 10); // 1 ~ 12
  }

  // 이제 targetHour는 전역 변수처럼 사용 가능
  // showStage3, showStage4, showStage5 안에서 targetHour를 참조하면 됨
});

function warmUpSpeechEngine() {
  const dummy = new SpeechSynthesisUtterance("준비");
  dummy.lang = "ko-KR";
  speechSynthesis.speak(dummy);
  speechSynthesis.cancel();
}

function speakWord(text) {
  warmUpSpeechEngine();
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    const voices = speechSynthesis.getVoices();
    const koreanVoice = voices.find(v => v.lang === "ko-KR");
    if (koreanVoice) utterance.voice = koreanVoice;
    setTimeout(() => speechSynthesis.speak(utterance), 500);
  }
}

function startStage(stageNumber) {
  homePage.classList.add("hidden");
  stagePage.classList.remove("hidden");
  currentStage = stageNumber;

  if (stageNumber === 1) {
    document.getElementById("stage-main-title").textContent = "1단계: 시 학습";
    document.getElementById("stage-subtitle").textContent = "시계를 보고 몇 시인지 들어보세요";
    currentIndex = 0;
    showStage1();
  }

  if (stageNumber === 2) {
    document.getElementById("stage-main-title").textContent = "2단계: 분 학습";
    document.getElementById("stage-subtitle").textContent = "시계를 보고 몇 분인지 들어보세요";
    currentIndex = 0;
    showStage2();
  }

  if (stageNumber === 3) {
    document.getElementById("stage-main-title").textContent = "3단계: 시, 분 학습";
    document.getElementById("stage-subtitle").textContent = "시계를 보고 몇 시 몇 분인지 들어보세요";
    currentIndex = 0;
    showStage3();
  }

  if (stageNumber === 4) {
    document.getElementById("stage-main-title").textContent = "4단계: 정답 찾기";
    document.getElementById("stage-subtitle").textContent = "시계를 보고 맞는 시간을 골라보세요";
    showStage4();
  }

  if (stageNumber === 5) {
    document.getElementById("stage-main-title").textContent = "5단계: 시계 맞추기";
    document.getElementById("stage-subtitle").textContent = "소리를 듣고 맞는 시계를 골라보세요";
    showStage5();
  }
}

function goHome() {
  stagePage.classList.add("hidden");
  homePage.classList.remove("hidden");

  const progressDiv = document.getElementById("progress");
  if (progressDiv) {
    progressDiv.remove();
  }
}

function showCurrentStage() {
  if (currentStage === 1) {
    showStage1();
  } else if (currentStage === 2) {
    showStage2();
  } else if (currentStage === 3) {
    showStage3();
  } else if (currentStage === 4) {
    showStage4();
  } else if (currentStage === 5) {
    showStage5();
  }
}

function hideArrows() {
  document.getElementById("prevArrow").style.visibility = "hidden";
  document.getElementById("nextArrow").style.visibility = "hidden";
}

function showArrows() {
  updateArrows(); // 현재 인덱스/스테이지에 맞게 다시 표시
}

function updateArrows() {
  const prevArrow = document.getElementById("prevArrow");
  const nextArrow = document.getElementById("nextArrow");

  if (currentStage === 1) {
    // 1단계: 시 학습
    if (currentIndex > 0) {
      prevArrow.style.visibility = "visible";
      prevArrow.onclick = () => {
        currentIndex--;
        showCurrentStage();
      };
    } else {
      prevArrow.style.visibility = "hidden";
      prevArrow.onclick = null;
    }

    if (currentIndex < hour.length - 1) {
      nextArrow.style.visibility = "visible";
      nextArrow.onclick = () => {
        currentIndex++;
        showCurrentStage();
      };
    } else {
      nextArrow.style.visibility = "hidden";
      nextArrow.onclick = null;
    }

  } else if (currentStage === 2) {
    // 2단계: 분 학습
    if (currentIndex > 0) {
      prevArrow.style.visibility = "visible";
      prevArrow.onclick = () => {
        currentIndex--;
        showCurrentStage();
      };
    } else {
      prevArrow.style.visibility = "hidden";
      prevArrow.onclick = null;
    }

    if (currentIndex < minute.length - 1) {
      nextArrow.style.visibility = "visible";
      nextArrow.onclick = () => {
        currentIndex++;
        showCurrentStage();
      };
    } else {
      nextArrow.style.visibility = "hidden";
      nextArrow.onclick = null;
    }

  } else if (currentStage === 3) {
    // ✅ 3단계: 시+분 학습 (페이지네이션)
    if (stage3PageIndex > 0) {
      prevArrow.style.visibility = "visible";
      prevArrow.onclick = () => {
        stage3PageIndex--;
        renderStage3Page(); // 함수명 수정
      };
    } else {
      prevArrow.style.visibility = "hidden";
      prevArrow.onclick = null;
    }

    if (stage3PageIndex < stage3Pages.length - 1) {
      nextArrow.style.visibility = "visible";
      nextArrow.onclick = () => {
        stage3PageIndex++;
        renderStage3Page(); // 함수명 수정
      };
    } else {
      nextArrow.style.visibility = "hidden";
      nextArrow.onclick = null;
    }
    
  } else if (currentStage === 4) {
    // 4단계: 정답 찾기 → stage4Index 기준
    if (stage4Index > 0) {
      prevArrow.style.visibility = "visible";
      prevArrow.onclick = () => {
        stage4Index--;
        showStage4Question();
      };
    } else {
      prevArrow.style.visibility = "hidden";
      prevArrow.onclick = null;
    }

    if (stage4Index < stage4Questions.length - 1) {
      nextArrow.style.visibility = "visible";
      nextArrow.onclick = () => {
        stage4Index++;
        showStage4Question();
      };
    } else {
      nextArrow.style.visibility = "hidden";
      nextArrow.onclick = null;
    }
  } else if (currentStage === 5) {
    // ✅ 5단계: 음성 → 시계 맞추기 → stage5Index 기준
    if (stage5Index > 0) {
      prevArrow.style.visibility = "visible";
      prevArrow.onclick = () => {
        stage5Index--;
        showStage5Question();
      };
    } else {
      prevArrow.style.visibility = "hidden";
      prevArrow.onclick = null;
    }

    if (stage5Index < stage5Questions.length - 1) {
      nextArrow.style.visibility = "visible";
      nextArrow.onclick = () => {
        stage5Index++;
        showStage5Question();
      };
    } else {
      nextArrow.style.visibility = "hidden";
      nextArrow.onclick = null;
    }
  }
}

function createSpeakerIcon(word, delay = 2000) {
  const speakerIcon = document.createElement("div");
  speakerIcon.textContent = "🔊";
  speakerIcon.className = "speaker-icon";
  speakerIcon.style.visibility = "hidden";

  speakerIcon.onclick = () => {
    // 스피커 숨김 + 화살표 숨김
    speakerIcon.style.visibility = "hidden";
    hideArrows();

    // 발음 출력
    speakWord(word);

    // 일정 시간 후 다시 표시
    setTimeout(() => {
      speakerIcon.style.visibility = "visible";
      showArrows();
    }, delay);
  };

  return speakerIcon;
}

function updateProgress() {
  let progressDiv = document.getElementById("progress");
  if (!progressDiv) {
    progressDiv = document.createElement("div");
    progressDiv.id = "progress";
    progressDiv.className = "progress-indicator";
    document.body.appendChild(progressDiv);
  }

  let text = "";

  switch (currentStage) {
    case 1: {
      const total = Array.isArray(hour) ? hour.length : 0;
      const current = Math.min(Math.max(currentIndex, 0), Math.max(total - 1, 0)) + 1;
      text = `${current}/${total}`;
      break;
    }
    case 2: {
      const total = Array.isArray(minute) ? minute.length : 0;
      const current = Math.min(Math.max(currentIndex, 0), Math.max(total - 1, 0)) + 1;
      text = `${current}/${total}`;
      break;
    }
    case 3: {
      // 3단계는 페이지네이션 기준으로 표시
      const totalPages = stage3Pages?.length || 0;
      const currentPage = stage3PageIndex + 1; // 0부터 시작하므로 +1
      text = `${currentPage}/${totalPages}`;
      break;
    }
    case 4: {
      const total = stage4Questions?.length || 0;
      const current = stage4Index + 1; // 인덱스는 0부터 시작하므로 +1
      text = `${current}/${total}`;
      break;
    }
    case 5: {
      const total = stage5Questions?.length || 0;
      const current = stage5Index + 1;
      text = `${current}/${total}`;
      break;
    }
    default:
      text = `Stage ${currentStage}`;
  }

  progressDiv.textContent = text;
}

// 1단계: 시 학습
function showStage1() {
  const analogClock = document.getElementById("analogClock");
  const speakerArea = document.getElementById("speaker-icon");
  const stage3 = document.getElementById("stage3"); // 3단계 그리드
  const optionsContainer = document.getElementById("options"); // ✅ 추가

  // 3단계 그리드 숨기기 + 내용 초기화
  stage3.classList.add("hidden");
  stage3.innerHTML = "";

  // ✅ 4,5단계에서 남아있던 후보 버튼 제거
  optionsContainer.innerHTML = "";

  analogClock.style.display = "block";

  const current = hour[currentIndex];

  // 시작 시 화살표 숨김
  hideArrows();

  // ✅ 아날로그 시계 바늘 회전
  const hourValue = parseInt(current.text.split(":")[0], 10);
  updateAnalogClock(hourValue, 0);

  // 음성 출력
  speakWord(current.speech);

  // 스피커 아이콘 생성 및 표시
  speakerArea.style.display = "block";
  speakerArea.innerHTML = ""; // 기존 아이콘 제거
  const speakerIcon = createSpeakerIcon(current.speech);
  speakerArea.appendChild(speakerIcon);

  setTimeout(() => {
    // 스피커 표시
    speakerIcon.style.visibility = "visible";

    // 모든 표시가 끝난 뒤 화살표 다시 보여주기
    showArrows();
  }, 2000);

  updateProgress();
}

// 2단계: 분 학습
function showStage2() {
  const analogClock = document.getElementById("analogClock");
  const speakerArea = document.getElementById("speaker-icon");
  const stage3 = document.getElementById("stage3");
  const optionsContainer = document.getElementById("options"); // ✅ 추가

  // 3단계 그리드 숨기기 + 내용 초기화
  stage3.classList.add("hidden");
  stage3.innerHTML = "";

  // ✅ 4,5단계에서 남아있던 후보 버튼 제거
  optionsContainer.innerHTML = "";

  analogClock.style.display = "block";

  const current = minute[currentIndex];

  // 시작 시 화살표 숨김
  hideArrows();

  // ✅ 아날로그 시계 바늘 회전
  const minuteValue = parseInt(current.text.split(":")[1], 10);
  updateAnalogClock(0, minuteValue);

  // 음성 출력
  speakWord(current.speech);

  // 스피커 아이콘 생성 및 표시
  speakerArea.style.display = "block";
  speakerArea.innerHTML = ""; // 기존 아이콘 제거
  const speakerIcon = createSpeakerIcon(current.speech);
  speakerArea.appendChild(speakerIcon);

  setTimeout(() => {
    // 스피커 표시
    speakerIcon.style.visibility = "visible";

    // 모든 표시가 끝난 뒤 화살표 다시 보여주기
    showArrows();
  }, 2000);

  updateProgress();
}

let stage3PageIndex = 0; // 현재 페이지 인덱스 (0~2)
let stage3Pages = [];    // 페이지 배열

// ✅ 3단계: 시, 분 학습 (아날로그 시계)
function showStage3() {
  const analogClock = document.getElementById("analogClock");
  const stage3 = document.getElementById("stage3");
  const speakerArea = document.getElementById("speaker-icon");
  const optionsContainer = document.getElementById("options");

  if (analogClock) analogClock.style.display = "none";
  stage3.innerHTML = "";
  stage3.classList.remove("hidden");

  if (speakerArea) {
    speakerArea.innerHTML = "";
    speakerArea.style.visibility = "hidden";
    speakerArea.style.display = "none";
  }
  if (optionsContainer) optionsContainer.innerHTML = "";

  // ✅ targetHour 반영
  let currentHour;
  if (targetHour) {
    currentHour = hour.find(h => parseInt(h.text.split(":")[0], 10) === targetHour);
  } else {
    currentHour = hour[currentIndex];
  }

  const combinedTimesLocal = [
    {
      text: `${String(targetHour || currentHour.text.split(":")[0]).padStart(2,"0")}:00`,
      speech: currentHour.speech
    },
    ...minute.map(m => {
      const [_, mText] = m.text.split(":");
      const newText = `${String(targetHour || currentHour.text.split(":")[0]).padStart(2,"0")}:${mText}`;
      const newSpeech = `${currentHour.speech} ${m.speech}`;
      return { text: newText, speech: newSpeech };
    })
  ];

  // ✅ 4개씩 잘라서 3페이지 구성
  stage3Pages = [];
  for (let i = 0; i < combinedTimesLocal.length; i += 3) {
    stage3Pages.push(combinedTimesLocal.slice(i, i + 3));
  }
  stage3PageIndex = 0;

  renderStage3Page();
  showArrows();
  updateProgress();
}

// ✅ 현재 페이지 렌더링
function renderStage3Page() {
  const stage3 = document.getElementById("stage3");
  stage3.innerHTML = "";
  stage3.classList.add("grid-container");

  const pageItems = stage3Pages[stage3PageIndex];

  pageItems.forEach(item => {
    const clockDiv = document.createElement("div");
    clockDiv.className = "clock-item";

    const miniClock = document.createElement("div");
    miniClock.className = "miniClock";

    const hourHand = document.createElement("div");
    hourHand.className = "hand hour";
    const minuteHand = document.createElement("div");
    minuteHand.className = "hand minute";
    const centerDot = document.createElement("div");
    centerDot.className = "center-dot";

    for (let i = 1; i <= 12; i++) {
      const num = document.createElement("div");
      num.className = "number";
      num.style.setProperty("--i", i);
      num.textContent = i;
      miniClock.appendChild(num);
    }

    miniClock.appendChild(hourHand);
    miniClock.appendChild(minuteHand);
    miniClock.appendChild(centerDot);

    clockDiv.appendChild(miniClock);

    const h = parseInt(item.text.split(":")[0], 10);
    const m = parseInt(item.text.split(":")[1], 10);
    const hourDeg = (h % 12) * 30 + m * 0.5 - 90;
    const minuteDeg = m * 6 - 90;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;

    clockDiv.onclick = () => speakWord(item.speech);

    stage3.appendChild(clockDiv);
  });

  updateArrows();
  updateProgress();
}

// ✅ 4단계: 정답 찾기 (아날로그 시계)
function showStage4() {
  const analogClock = document.getElementById("analogClock");
  const optionsContainer = document.getElementById("options");
  const stage3 = document.getElementById("stage3");

  stage3.classList.add("hidden");
  stage3.innerHTML = "";
  analogClock.style.display = "block";
  optionsContainer.innerHTML = "";

  // ✅ 여기서 className 대신 classList.add 사용
  optionsContainer.classList.add("stage4");

  if (combinedTimesGlobal.length === 0) {
    hour.forEach(h => {
      combinedTimesGlobal.push({ text: h.text, speech: h.speech });
      minute.forEach(m => {
        const [_, mText] = m.text.split(":");
        const newText = `${h.text.split(":")[0]}:${mText}`;
        const newSpeech = `${h.speech} ${m.speech}`;
        combinedTimesGlobal.push({ text: newText, speech: newSpeech });
      });
    });
  }

  // ✅ targetHour 필터링
  let filteredTimes = combinedTimesGlobal;
  if (targetHour) {
    filteredTimes = combinedTimesGlobal.filter(t =>
      parseInt(t.text.split(":")[0], 10) === targetHour
    );
  }

  // ✅ 중복 제거 + 문제 개수 제한
  const totalQuestions = targetHour ? 5 : 10;
  const shuffled = [...filteredTimes].sort(() => Math.random() - 0.5);
  stage4Questions = shuffled.slice(0, totalQuestions);
  stage4Index = 0;

  showStage4Question();
  showArrows();
  updateProgress();
}

function showStage4Question() {
  const analogClock = document.getElementById("analogClock");
  const optionsContainer = document.getElementById("options");
  const speakerArea = document.getElementById("speaker-icon");
  optionsContainer.innerHTML = "";

  const current = stage4Questions[stage4Index];

  const h = parseInt(current.text.split(":")[0], 10);
  const m = parseInt(current.text.split(":")[1], 10);
  updateAnalogClock(h, m);

  speakerArea.style.display = "block";
  speakerArea.innerHTML = "";
  const speakerIcon = createSpeakerIcon(current.speech);
  speakerArea.appendChild(speakerIcon);
  speakerIcon.style.visibility = "visible";
  speakerIcon.onclick = () => speakWord(current.speech);

  let filteredTimes = combinedTimesGlobal;
  if (targetHour) {
    filteredTimes = combinedTimesGlobal.filter(t =>
      parseInt(t.text.split(":")[0], 10) === targetHour
    );
  }

  const choices = [current.speech];
  while (choices.length < 3) {
    const randomChoice = filteredTimes[Math.floor(Math.random() * filteredTimes.length)].speech;
    if (!choices.includes(randomChoice)) choices.push(randomChoice);
  }
  choices.sort(() => Math.random() - 0.5);

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;

    btn.onclick = () => {
      if (choice === current.speech) {
        btn.classList.add("correct-circle");
        setTimeout(() => {
          if (stage4Index < stage4Questions.length - 1) {
            stage4Index++;
            showStage4Question();
          } else {
            showArrows();
          }
        }, 1500);
      } else {
        btn.classList.add("wrong-square");
      }
    };

    optionsContainer.appendChild(btn);
  });

  updateArrows();
  updateProgress();
}

// ✅ 5단계: 시계 맞추기 (아날로그 시계)
function showStage5() {
  const optionsContainer = document.getElementById("options");
  optionsContainer.className = "stage5"; // 5단계용 레이아웃 적용

  const stage3 = document.getElementById("stage3");
  const analogClock = document.getElementById("analogClock");

  stage3.classList.add("hidden");
  stage3.innerHTML = "";
  if (analogClock) analogClock.style.display = "none";
  optionsContainer.innerHTML = "";

  if (combinedTimesGlobal.length === 0) {
    hour.forEach(h => {
      combinedTimesGlobal.push({ text: h.text, speech: h.speech });
      minute.forEach(m => {
        const [_, mText] = m.text.split(":");
        const newText = `${h.text.split(":")[0]}:${mText}`;
        const newSpeech = `${h.speech} ${m.speech}`;
        combinedTimesGlobal.push({ text: newText, speech: newSpeech });
      });
    });
  }

  let filteredTimes = combinedTimesGlobal;
  if (targetHour) {
    filteredTimes = combinedTimesGlobal.filter(t =>
      parseInt(t.text.split(":")[0], 10) === targetHour
    );
  }

  const totalQuestions = targetHour ? 5 : 10;
  const shuffled = [...filteredTimes].sort(() => Math.random() - 0.5);
  stage5Questions = shuffled.slice(0, totalQuestions);
  stage5Index = 0;

  showStage5Question();
  showArrows();
  updateProgress();
}

function showStage5Question() {
  const optionsContainer = document.getElementById("options");
  const speakerArea = document.getElementById("speaker-icon");
  optionsContainer.innerHTML = "";

  const current = stage5Questions[stage5Index];
  speakWord(current.speech);

  // 문제는 물음표 표시
  const questionDiv = document.createElement("div");
  questionDiv.textContent = "❓";
  questionDiv.className = "question-mark";
  optionsContainer.appendChild(questionDiv);

  // 스피커 아이콘
  speakerArea.style.display = "block";
  speakerArea.innerHTML = "";
  const speakerIcon = createSpeakerIcon(current.speech);
  speakerArea.appendChild(speakerIcon);
  speakerIcon.style.visibility = "visible";
  speakerIcon.onclick = () => speakWord(current.speech);

  // 후보 시계 컨테이너
  const candidatesDiv = document.createElement("div");
  candidatesDiv.className = "candidates-row";
  optionsContainer.appendChild(candidatesDiv);

  // 보기: 정답 + 오답 3개
  const choices = [current.text];
  while (choices.length < 4) {
    const randomChoice = stage5Questions[Math.floor(Math.random() * stage5Questions.length)].text;
    if (!choices.includes(randomChoice)) choices.push(randomChoice);
  }
  choices.sort(() => Math.random() - 0.5);

  choices.forEach(choice => {
    const clockDiv = document.createElement("div");
    clockDiv.className = "clock-choice";

    const h = parseInt(choice.split(":")[0], 10);
    const m = parseInt(choice.split(":")[1], 10);

    // ✅ 미니 아날로그 시계 생성
    createMiniClock(clockDiv, h, m);

    clockDiv.onclick = () => {
      if (choice === current.text) {
        clockDiv.classList.add("correct-circle");

        // 항상 두 자리 포맷
        const formatted = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
        questionDiv.textContent = formatted;

        setTimeout(() => {
          if (stage5Index < stage5Questions.length - 1) {
            stage5Index++;
            showStage5Question();
          } else {
            showArrows();
          }
        }, 1500);
      } else {
        clockDiv.classList.add("wrong-square");
      }
    };

    candidatesDiv.appendChild(clockDiv);
  });

  updateArrows();
  updateProgress();
}

// ✅ 미니 시계 생성 함수 (3단계 로직 재사용)
function createMiniClock(container, h, m) {
  const miniClock = document.createElement("div");
  miniClock.className = "miniClock";

  const hourHand = document.createElement("div");
  hourHand.className = "hand hour";
  const minuteHand = document.createElement("div");
  minuteHand.className = "hand minute";
  const centerDot = document.createElement("div");
  centerDot.className = "center-dot";

  for (let i = 1; i <= 12; i++) {
    const num = document.createElement("div");
    num.className = "number";
    num.style.setProperty("--i", i);
    num.textContent = i;
    miniClock.appendChild(num);
  }

  miniClock.appendChild(hourHand);
  miniClock.appendChild(minuteHand);
  miniClock.appendChild(centerDot);

  const hourDeg = (h % 12) * 30 + m * 0.5 - 90;
  const minuteDeg = m * 6 - 90;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;

  container.appendChild(miniClock);
}

function ensureCenterDot() {
  const analogClock = document.getElementById("analogClock");
  if (!analogClock.querySelector(".center-dot")) {
    const dot = document.createElement("div");
    dot.classList.add("center-dot");
    analogClock.appendChild(dot);
  }
}

// 이전 각도를 기억할 변수
let prevHourDeg = null;
let prevMinuteDeg = null;

function updateAnalogClock(h, m, s = 0) {
  ensureCenterDot();

  const hourHand = document.querySelector(".hand.hour");
  const minuteHand = document.querySelector(".hand.minute");
  //const secondHand = document.querySelector(".hand.second");

  // 목표 각도 (위쪽 기준 -90도 보정)
  let targetHourDeg = (h % 12) * 30 + m * 0.5 - 90;
  let targetMinuteDeg = m * 6 - 90;
  //let targetSecondDeg = s * 6 - 90;

  // 시침 보정: 이전 각도보다 작아지면 360도 더해줌 → 항상 시계 방향
  if (prevHourDeg !== null && targetHourDeg < prevHourDeg) {
    targetHourDeg += 360;
  }
  prevHourDeg = targetHourDeg;

  // 분침도 같은 방식으로 보정
  if (prevMinuteDeg !== null && targetMinuteDeg < prevMinuteDeg) {
    targetMinuteDeg += 360;
  }
  prevMinuteDeg = targetMinuteDeg;

  // 적용
  hourHand.style.transform = `rotate(${targetHourDeg}deg)`;
  minuteHand.style.transform = `rotate(${targetMinuteDeg}deg)`;
  // 필요하다면 초침도 같은 방식으로 보정 가능
  // secondHand.style.transform = `rotate(${targetSecondDeg}deg)`;
}

