document.addEventListener("DOMContentLoaded", function() {
    let countdownInterval;
    let countdownTime = 150; // Thời gian đếm ngược ban đầu (đơn vị: giây)
  
    // Update the countdown display
    function updateCountdownDisplay() {
      const hours = Math.floor(countdownTime / 3600);
      const minutes = Math.floor((countdownTime % 3600) / 60);
      const seconds = countdownTime % 60;
  
      const countdownElement = document.getElementById("countdown");
      countdownElement.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }
  
    // Function to add leading zero to single-digit numbers
    function formatTime(time) {
      return time < 10 ? `0${time}` : time;
    }
  
    // Event listener for the start button
    document.getElementById("startButton").addEventListener("click", function() {
      if (!countdownInterval) {
        // Start the countdown only if it's not already running
        countdownInterval = setInterval(function() {
          if (countdownTime > 0) {
            countdownTime--;
            updateCountdownDisplay();
          } else {
            clearInterval(countdownInterval);
            countdownInterval = null;
            document.getElementById("countdown").textContent = "EXPIRED";
          }
        }, 1000);
      }
    });
  
    // Event listener for the reset button
    document.getElementById("resetButton").addEventListener("click", function() {
      clearInterval(countdownInterval);
      countdownInterval = null;
      countdownTime = 150;
      updateCountdownDisplay();
      document.getElementById("countdown").textContent = "START";
    });
  });
  