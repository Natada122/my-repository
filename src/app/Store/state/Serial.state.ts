export interface ISerialState {
  serials: ISerial[];
  selectedSerial: ISerial;
}
export const initialSerialsState: ISerialState = {
  serials: null,
  selectedSerial: null
};
