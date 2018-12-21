export type HandlerButtonClick = (b: IButton) => any;
export interface IButton {
  getName(): string;
  getHandlerClick(): HandlerButtonClick;
  setHandlerClick(handler: HandlerButtonClick);
}
