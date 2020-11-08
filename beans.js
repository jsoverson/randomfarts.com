const thoughts = [
  "urgh",
  "unf",
  "oh no",
  "its too much",
  "omg it hurts",
  "I don't think I can take it anymore",
  "tell my Mother I love her",
  "oh god no",
  "I'm going to explode",
];

const toots = document.getElementById("📯").children;

const progressValue = document.querySelector("#⭕️");

const CIRCUMFERENCE = 2 * Math.PI * progressValue.getAttribute("r");
progressValue.style.strokeDashoffset = CIRCUMFERENCE;
progressValue.style.strokeDasharray = CIRCUMFERENCE;

function updateProgress(progress) {
  var reduction = 1 - progress;
  progressValue.style.strokeDashoffset = CIRCUMFERENCE * reduction;
}

class TootController {
  constructor(
    minTimeBetweenCropDusting = 5000,
    maxTimeTilBellyExplosion = 30000
  ) {
    this.tummyRumblinStartTime = Date.now();
    this.lastTootTime = 0;
    this.justTheWayItIs = maxTimeTilBellyExplosion;
    this.respectForOthersCoefficient = minTimeBetweenCropDusting;
    this.howLongICanHoldIt = Number.POSITIVE_INFINITY;
    setInterval(() => {
      this.rumbleTummy();
    }, 250);
  }

  settleStomach() {
    console.log("much better");
    this.howLongICanHoldIt = Number.POSITIVE_INFINITY;
  }

  surpriseFart() {
    this.popAFluffy();
    console.log("oops!");
  }

  statementOfDiscomfort() {
    return thoughts[Math.floor(Math.random() * thoughts.length)];
  }

  updateVisualTooterProgressIndicator() {
    const progress = (Date.now() - this.lastTootTime) / this.howLongICanHoldIt;
    updateProgress(progress);
  }

  rumbleTummy() {
    if (Math.random() > 0.8) console.log(this.statementOfDiscomfort());
    const lookinAtTheClock = Date.now();
    this.updateVisualTooterProgressIndicator();
    const timeSinceLastDusting = lookinAtTheClock - this.lastTootTime;
    if (timeSinceLastDusting > this.howLongICanHoldIt) {
      this.popAFluffy();
    }
  }

  calculateFlatulenceInterval() {
    console.log("Calculating optimal flatulation interval");
    const interval = Math.floor(
      Math.random() * (this.justTheWayItIs - this.respectForOthersCoefficient) +
        this.respectForOthersCoefficient
    );
    console.log(
      `You have ${Math.floor(interval / 1000)} seconds to vacate the area`
    );
    return interval;
  }
  getTrouserTrumpet() {
    console.log("Trouser trumpet ready to play");
    return toots[Math.floor(Math.random() * toots.length)];
  }
  popAFluffy() {
    console.log("Fluffy about to be popped");
    const airBiscuit = this.getTrouserTrumpet();
    airBiscuit.play();
    this.howLongICanHoldIt = Number.POSITIVE_INFINITY;
    airBiscuit.addEventListener("ended", () => {
      this.lastTootTime = Date.now();
      console.log("Tooter McSqueaks queueing for takeoff");
      this.howLongICanHoldIt = this.calculateFlatulenceInterval();
    });
  }
}

const tootController = new TootController();

let on = false;

const danger = document.getElementById("💨");
const text = document.getElementById("💨🧐");

danger.addEventListener("click", () => {
  on = !on;
  if (on) {
    tootController.surpriseFart();
    text.innerHTML = "Stop";
    danger.classList.remove("off");
  } else {
    tootController.settleStomach();
    text.innerHTML = "Start";
    danger.classList.add("off");
  }
});
