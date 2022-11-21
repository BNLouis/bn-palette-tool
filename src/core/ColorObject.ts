export default class ColorObject {
  paletteIndex: number = -1;
  paletteArray: Uint8ClampedArray = new Uint8ClampedArray();
  constructor(index: number, paletteArray: Uint8ClampedArray) {
    this.paletteIndex = index;
    this.paletteArray = paletteArray;
  }

  static default() {
    let defaultColor = new Uint8ClampedArray(4);
    defaultColor[0] = 255;
    defaultColor[1] = 255;
    defaultColor[2] = 255;
    defaultColor[3] = 255;
    return new ColorObject(-1, defaultColor);
  }
  toRgba() {
    return this.paletteArray[0] + ", " + this.paletteArray[1] + ", " + this.paletteArray[2] + ", 255";
  }

  static fromRgb(r: number, g: number, b: number) {
    let newColor = new Uint8ClampedArray(4);
    newColor[0] = r;
    newColor[1] = g;
    newColor[2] = b;
    newColor[3] = 255;
    return new ColorObject(-1, newColor);
  }

  /**
   * returns new color from hex value
   * @param hexColor
   * @returns
   */
  static fromHex(hexColor: string) {
    let newColor = new ColorObject(-1, new Uint8ClampedArray(4));
    var bigint = parseInt(hexColor.substring(1), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    newColor.paletteArray[0] = r;
    newColor.paletteArray[1] = g;
    newColor.paletteArray[2] = b;
    newColor.paletteArray[3] = 255;
    return newColor;
  }
}
