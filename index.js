let score = 1;
let highestScore = 1;
let playerName = "";
let histories = [];
let countdownInterval;
let countdownTime = 150;
let time = ''

function start() {
  playerName = prompt("Please enter your name:");
  if (playerName !== '') {
    document.getElementById('playerName').innerText = playerName;
    startCountdown()
  }
}


function updateScore() {
  if (!playerName || playerName.trim().length === 0) {
    alert("Vui lòng chọn bắt đầu");
  }
  document.getElementById('scoreValue').innerText = score;
}

function updateHighScore() {
  document.getElementById('highScoreValue').innerText = highestScore;

}

function upScore() {
  if (playerName === '') {
    alert("Vui lòng chọn bắt đầu");
    return
  }
  if (score < 10) {
    score++;
    if (score > highestScore) {
      highestScore = score;
      updateHighScore();
    }
    updateScore();
    showItem();
    if (highestScore === 10) {
      setTimeout(() => {
        refreshScore()
      }, 2000);
      return
    }

  }
}

function downScore() {
  if (playerName === '') {
    alert("Vui lòng chọn bắt đầu");
    return
  }
  score = 1;
  hideAllItems(9);
  updateScore();
}

function refreshScore() {
  if (playerName !== '') {
    saveToLeaderboard(playerName, highestScore, time);
  }
  score = 1;
  hideAllItems(9);
  highestScore = 1;
  updateScore();
  updateHighScore();
  if (playerName !== '') {
    displayRankTable();
    resetCountdown()
    playerName = ''
  }
}

function saveToLeaderboard(playerName, highestScore, time) {
  histories.push({ playerName, highestScore, time });
}

function displayRankTable() {
  let table = document.getElementById("rankTable");
  let tbody = document.getElementById("dataRank");

  tbody.innerHTML = '';
  histories.forEach((item) => {
    let row = tbody.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerText = item.playerName;
    cell2.innerText = item.highestScore;
    cell3.innerText = item.time;
  });

  table.appendChild(tbody);
}

displayRankTable();

function resetRankTable() {
  histories = [];
  displayRankTable();
  score = 1;
  hideAllItems(9);
  updateScore();
}

function showItem() {
  let itemIndex = 11 - score;
  let item = document.querySelector(`.item:nth-child(${itemIndex})`);

  // Ẩn tất cả các items
  // hideAllItems();

  if (item) {
    item.classList.add("active");
  }
}
showItem()

function hideAllItems(itemIndex) {
  document.querySelectorAll(".item").forEach((item, index) => {
    if (itemIndex === 9 && index === itemIndex) {
      return
    }
    item.classList.remove("active");
  });
}

function startCountdown() {
  if (!countdownInterval) {
    countdownInterval = setInterval(updateCountdown, 1000);
  }
}

// Hàm reset đồng hồ đếm ngược
function resetCountdown() {
  clearInterval(countdownInterval);
  countdownInterval = null;
  countdownTime = 150;
  updateCountdownDisplay();
  document.getElementById("countdown").textContent = "START";
}

// Hàm cập nhật hiển thị đồng hồ đếm ngược
function updateCountdown() {
  if (countdownTime > 0) {
    countdownTime--;
    updateCountdownDisplay();
  } else {
    clearInterval(countdownInterval);
    countdownInterval = null;
    document.getElementById("countdown").textContent = "EXPIRED";
  }
}

// Hàm cập nhật hiển thị đồng hồ đếm ngược
function updateCountdownDisplay() {
  const hours = Math.floor(countdownTime / 3600);
  const minutes = Math.floor((countdownTime % 3600) / 60);
  const seconds = countdownTime % 60;

  const countdownElement = document.getElementById("countdown");
  subtractTimes('00:02:30', `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`)
  countdownElement.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Hàm định dạng thời gian (thêm số 0 đằng trước nếu là số một chữ số)
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}



function subtractTimes(time1, time2) {
  // Chuyển đổi thời gian thành số giây
  const seconds1 = convertToSeconds(time1);
  const seconds2 = convertToSeconds(time2);
  // Trừ giá trị thời gian thứ hai từ giá trị thời gian thứ nhất
  const resultInSeconds = seconds1 - seconds2;
  // Chuyển đổi kết quả trở lại dạng "hh:mm:ss"
  time = convertToTimeFormat(resultInSeconds);

}

// Hàm chuyển đổi thời gian thành số giây
function convertToSeconds(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

// Hàm chuyển đổi số giây thành dạng "hh:mm:ss"
function convertToTimeFormat(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(remainingSeconds)}`;
}