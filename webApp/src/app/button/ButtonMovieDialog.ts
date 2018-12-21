import {IButton, HandlerButtonClick} from './IButton';

export class ButtonMovieDialog implements IButton {
  private name: string;
  private secondName: string;
  private nameToPrint: string;
  private movieId: Number;
  private clickHandler: HandlerButtonClick;
  constructor (name: string, secondName: string, movieId: Number) {
    this.name = name;
    this.secondName = secondName;
    this.nameToPrint = name;
    this.movieId = movieId;
  }
  async swapName() {
    if (this.nameToPrint === this.name) {
      this.nameToPrint = this.secondName;
    } else {
      this.nameToPrint = this.name;
    }
  }
  getSecondeName(): string {
    return this.secondName;
  }
  getMovieId(): Number {
    return this.movieId;
  }
  getName(): string {
    return this.nameToPrint;
  }
  getHandlerClick(): HandlerButtonClick {
    return this.clickHandler;
  }
  setHandlerClick(handler: HandlerButtonClick) {
    this.clickHandler = handler;
  }
}
