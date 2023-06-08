
class PollTimer {
  constructor() {
    if (!PollTimer.instance) {
      this.pollTimer = null;
      PollTimer.instance = this;
    }

    return PollTimer.instance;
  }

  set(callback, pollInterval) {
    setTimeout(() => callback());
    this.pollTimer = setInterval(callback, pollInterval);
  }

  clear() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }
}

const instance = new PollTimer();

export default instance;
