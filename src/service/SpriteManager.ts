import ColorObject from "../core/ColorObject"

let instance: SpriteManager
let sourceFile: File
export class SpriteManager {

    static getInstance() {
        if(instance == null) {
            instance = new SpriteManager()
        } 
        return instance
    }


    importSprite(file: File, callback: Function) {
        sourceFile=file
        let canvas =  document.getElementById("sprite-canvas") as HTMLCanvasElement
        let context = canvas.getContext("2d") as CanvasRenderingContext2D
        var img = new Image;
        img.src = URL.createObjectURL(file);
        img.onload = function() {
        context.drawImage(img, 0, 0, 64, 64);
        callback()
        }
    }

    importRefSprite(file: File, callback: Function) {
        console.log("we in ref sprite.")
        let canvas =  document.getElementById("refsprite-canvas") as HTMLCanvasElement
        let context = canvas.getContext("2d") as CanvasRenderingContext2D
        var img = new Image;
        img.src = URL.createObjectURL(file);
        img.onload = function() {
        context.drawImage(img, 0, 0, 64, 64);
        callback()
        }
    }

    recolorSprite(palette: Array<ColorObject>) {
        //lets reload the grayscale file for now..
        var img = new Image; 
        img.src = URL.createObjectURL(sourceFile);
        img.onload = function() {
        let canvas =  document.getElementById("sprite-canvas") as HTMLCanvasElement
        let context = canvas.getContext("2d") as CanvasRenderingContext2D
        context.drawImage(img, 0, 0, 64, 64);
        context.imageSmoothingEnabled= false;
        
        // pull the entire image into an array of pixel data
        var imageData = context.getImageData(0, 0, 64, 64);
        // examine every pixel, 
        // change any old rgb to the new-rgb
        for (var i=0;i<imageData.data.length;i+=4)
        {
                let index = imageData.data[i]
                let paletteArray = palette[index].paletteArray
                if(index < palette.length) {
                    imageData.data[i]=paletteArray[0];
                    imageData.data[i+1]=paletteArray[1];
                    imageData.data[i+2]=paletteArray[2];
                    imageData.data[i+3]=paletteArray[3];
                }
            
        }
        // put the altered data back on the canvas  
        context.putImageData(imageData,0,0);
        }

    }
}