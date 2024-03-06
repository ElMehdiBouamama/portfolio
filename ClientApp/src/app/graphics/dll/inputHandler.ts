export class InputHandler {
  private keys: Record<string, boolean> = {};

  constructor() {
    document.addEventListener('keydown', (event) => this.handleKeyDown(event), false);
    document.addEventListener('keyup', (event) => this.handleKeyUp(event), false);
  }

  private handleKeyDown(event: KeyboardEvent) {
    this.keys[event.key] = true;
  }

  private handleKeyUp(event: KeyboardEvent) {
    this.keys[event.key] = false;
  }

  isKeyPressed(key: string): boolean {
    return !!this.keys[key];
  }
}
