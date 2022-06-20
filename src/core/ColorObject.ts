export default class ColorObject {

    paletteIndex: number = -1
    paletteArray: Uint8ClampedArray = new Uint8ClampedArray;
    constructor(index:number, paletteArray: Uint8ClampedArray) {
        this.paletteIndex =index;
        this.paletteArray = paletteArray;
    }

    toRgba() {

        return this.paletteArray[0] + ", " + this.paletteArray[1] + ", " + this.paletteArray[2] +", 255"
    }

    /**
     * Takes a hex color, transforms it into rgb, and saves it in this colorobject.
     * @param hexColor 
     */
    importColor(hexColor: string) {
        //Hex to Rgb!
        var bigint = parseInt(hexColor, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        this.paletteArray[0] = r;
        this.paletteArray[1] =g;
        this.paletteArray[2]=b;
    }

}