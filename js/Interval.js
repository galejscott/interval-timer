
let inputSeconds, inputRest, inputCounter;


class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      control: root.querySelector(".timer__btn--control"),
      rest_minutes: root.querySelector(".timer__part--rest--minutes"),
      rest_seconds: root.querySelector(".timer__part--rest--seconds"),
      reset: root.querySelector(".timer__btn--reset"),
      repeat_counter: root.querySelector(".timer__part--counter")
    };

    this.interval = null;
    this.remainingSeconds = 0;
    this.restInterval = null;
    this.remainingRestSeconds = 0;
    this.counter = 0;

  
    this.el.control.addEventListener("click", () => {
      if (this.interval === null && this.remainingSeconds !== 0 && this.restInterval === null) {
        this.start();
      } else if (this.interval !== null && this.remainingSeconds !== 0 && this.restInterval === null) {
        this.stop();
      } else if (this.interval === null && this.remainingSeconds === 0 && this.restInterval !== null && this.remainingRestSeconds !== 0) {
        this.stopRest();
      } else if (this.interval === null && this.remainingSeconds === 0 && this.restInterval === null && this.remainingRestSeconds !== 0) { 
        this.startRest();
      }
    });

    this.el.reset.addEventListener("click", () => {
      inputSeconds = prompt("Enter number of seconds:");

      if (0 < inputSeconds < 3600) {
        this.stop();
        this.remainingSeconds = inputSeconds
        this.updateInterfaceTime();
      }

      inputRest = prompt("Enter number of rest seconds:");

      if (0 < inputRest < 3600) {
        this.stopRest();
        this.remainingRestSeconds = inputRest;
        this.updateInterfaceRestTime();
      }
      
      inputCounter = prompt("Enter number of repetitions:");

      if (inputCounter > 0) {
        this.counter = inputCounter;
        this.updateInterfaceCounter();
      } 
    });
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceRestTime() {
    const restMinutes = Math.floor(this.remainingRestSeconds / 60);
    const restSeconds = this.remainingRestSeconds % 60;

    this.el.rest_minutes.textContent = restMinutes.toString().padStart(2, "0");
    this.el.rest_seconds.textContent = restSeconds.toString().padStart(2, "0");
  }


  updateInterfaceControls() {
    if (this.interval === null && this.restInterval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
  }

  updateInterfaceCounter() {
    this.el.repeat_counter.textContent = this.counter;
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
        this.startRest();
      }
    }, 1000);

    this.updateInterfaceControls();
    this.colorGo();
  }

  startRest() {
    if (this.remainingRestSeconds === 0) return;

    this.restInterval = setInterval(() => {
      this.remainingRestSeconds--;
      this.updateInterfaceRestTime();

      if (this.remainingRestSeconds === 0) {
        this.stopRest();
        this.remainingSeconds = inputSeconds;
        this.remainingRestSeconds = inputRest;
        this.start();
      }
    }, 1000);

    
    this.updateInterfaceControls();
    this.colorRest();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  stopRest() {
    clearInterval(this.restInterval);

    this.restInterval = null;

    this.updateInterfaceControls();
  }

// to sort out, can't stop the timer when the count reaches 0
  repeat() {
    if (this.counter === 0) {
      return;
    } else if (this.counter > 0) {
      this.counter--;
      console.log(this.counter);
      this.start();
      this.remainingSeconds = inputSeconds;
      this.remainingRestSeconds = inputRest;
      this.updateInterfaceTime();
      this.updateInterfaceRestTime();
      this.updateInterfaceCounter();
    } 
  }


  colorGo() {
    document.body.style.backgroundColor = "green";
  }

  colorRest() {
    document.body.style.backgroundColor = "red";
  }

  


  static getHTML() {
    return `
            <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
            <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                <span class="material-icons">play_arrow</span>
            </button>
            <span class="timer__part timer__part--rest--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--rest--seconds">00</span>
            <button type="button" class="timer__btn timer__btn--reset">
                <span class="material-icons">timer</span>
            </button>
            <span class="timer__part timer__part--counter">0</span>
        `;
  }
}

new Timer(
    document.querySelector(".timer")
);