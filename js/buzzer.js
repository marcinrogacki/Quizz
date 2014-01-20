function Buzzer() {
}

Buzzer.getButtonSequence = function(buttonId) {

  switch (buttonId) {
    case Buzzer.BTN_BLUE:
      return 0;
    case Buzzer.BTN_ORANGE:
      return 1;
    case Buzzer.BTN_GREEN:
      return 2;
    case Buzzer.BTN_YELLOW:
      return 3;
    default:
      return -1;
  }
}

Buzzer.BTN_BUZZ = 0;
Buzzer.BTN_BLUE = 4;
Buzzer.BTN_ORANGE = 3;
Buzzer.BTN_GREEN = 2;
Buzzer.BTN_YELLOW = 1;

Buzzer.BTN_UP = Buzzer.BTN_BLUE;
Buzzer.BTN_DOWN = Buzzer.BTN_ORANGE;
