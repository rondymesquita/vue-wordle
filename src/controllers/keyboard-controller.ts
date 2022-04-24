type EventFunction = (key: string) => void;
export class KeyboardController {
  public onKeyPress: EventFunction | undefined;
  public onDelPress: Function | undefined;
  public onEnterPress: Function | undefined;

  addListeners() {
    document.addEventListener('keydown', this.onType.bind(this));
  }

  removeListeners() {
    document.removeEventListener('keydown', this.onType.bind(this));
  }

  onType(event: KeyboardEvent) {
    const ENTER = 13;
    const DEL = 46;
    const BACKSPACE = 8;

    const letter = String.fromCharCode(event.keyCode);
    if (
      !this.isAllowedLetter(letter) &&
      ![ENTER, DEL, BACKSPACE].includes(event.keyCode)
    ) {
      // console.log(`letter ${letter} not allowed`);
      return;
    }

    const events: { [key: string]: EventFunction | Function | undefined } = {
      [ENTER]: this.onEnterPress,
      [DEL]: this.onDelPress,
      [BACKSPACE]: this.onDelPress,
    };

    const eventFunction = events[event.keyCode] || this.onKeyPress;
    eventFunction!(letter);
  }

  private isAllowedLetter(letter: string) {
    return [
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
    ].includes(letter.toLowerCase());
  }
}
