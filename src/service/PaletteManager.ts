import ColorObject from "../core/ColorObject"

let instance: PaletteManager
export class PaletteManager {




    static getInstance() {
        if(instance == null) {
            instance = new PaletteManager()
        } 
        return instance
    }


    importPalette(file: File, callback: Function) {
        let paletteData = new Array<ColorObject>()
        let canvas =  document.getElementById("palette-canvas") as HTMLCanvasElement
        let context = canvas.getContext("2d") as CanvasRenderingContext2D
        var img = new Image;
        img.src = URL.createObjectURL(file);
        this.parsePaletteImg(img, context, paletteData, callback);
    }

    importExtraPalette(file: File, callback: Function) {
        let paletteData = new Array<ColorObject>()
        let canvas =  document.getElementById("imported-colors") as HTMLCanvasElement
        let context = canvas.getContext("2d") as CanvasRenderingContext2D
        var img = new Image;
        img.src = URL.createObjectURL(file);
        this.parsePaletteImg(img, context, paletteData, callback);
    }

    parsePaletteImg(img: HTMLImageElement, context: CanvasRenderingContext2D, paletteData: any, callback: Function) {
        img.onload = function() {
            context.drawImage(img, 0, 0, 256, 1);
            let zeroesFound = 0
            for(let x = 0; x<256; x++) {
                var data = context.getImageData(x, 0, 1, 1).data;
                if(data[0]==0 && data[1]==0 && data[2]==0 && data[3]==0) {
                        zeroesFound++;
                    }
                if(zeroesFound>1) {
                         callback(paletteData)
                         return
                }
                //the color index is the index in which this color appears in the palette..
                let paletteColor = new ColorObject(x, data)
                paletteData.push(paletteColor)
                }
            }
    }

    /**
     * replaces a color
     * @param newColor 
     */
    replaceColor(newColor:ColorObject) {
        let canvas =  document.getElementById("palette-canvas") as HTMLCanvasElement
        let context = canvas.getContext("2d") as CanvasRenderingContext2D

        // pull the entire image into an array of pixel data
        var imageData = context.getImageData(0, 0, 256, 1);
        let index = newColor.paletteIndex*4
        let paletteArray = newColor.paletteArray
        imageData.data[index]=paletteArray[0];
        imageData.data[index+1]=paletteArray[1];
        imageData.data[index+2]=paletteArray[2];
        imageData.data[index+3]=paletteArray[3];
        // put the altered data back on the canvas  
        context.putImageData(imageData,0,0);
        }
    
}