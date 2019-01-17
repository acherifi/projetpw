import {IButton, HandlerButtonClick} from './IButton';

export class ButtonMovieDialog implements IButton {
  private name: string;
  private secondName: string;
  private movieId: Number;
  private clickHandler: HandlerButtonClick;
  private isSwapped: boolean;
  constructor (name: string, secondName: string) {
    this.name = name;
    this.secondName = secondName;
  }
  async setSwap(swap: boolean) {
    this.isSwapped = swap;
  }
  swapName() {
    this.isSwapped = !this.isSwapped;
  }
  getMovieId(): Number {
    return this.movieId;
  }
  getName(): string {
    if (!this.isSwapped) {
      return this.name;
    }
    return this.secondName;
  }
  getHandlerClick(): HandlerButtonClick {
    return this.clickHandler;
  }
  setMovieId(movieId: Number) {
    this.movieId = movieId;
  }
  setHandlerClick(handler: HandlerButtonClick) {
    this.clickHandler = handler;
  }
}
