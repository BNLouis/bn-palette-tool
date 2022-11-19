import React from "react";
import ColorObject from "../core/ColorObject";

let instance: SpriteManager;
let sourceFile: File;
let canvasWidth = 64;
let spriteWidth = -1;
let spriteHeight = -1;
export class SpriteManager {
  static getInstance() {
    if (instance == null) {
      instance = new SpriteManager();
    }
    return instance;
  }

  importSpriteSheet(file: File, callback: Function) {
    sourceFile = file;
    let canvas = document.getElementById("sprite-canvas") as HTMLCanvasElement;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    var img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
      callback();
    };
  }

  importSprite(file: File, canvasId: string, isSourceFile: boolean, callback: Function) {
    if (isSourceFile) {
      sourceFile = file;
    }
    let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    canvas.style.width = "200%";
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    var img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      spriteWidth = img.width;
      spriteHeight = img.height;

      context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
      callback();
    };
  }

  /**
   * Function to recolor a sprite, also calls warning callback if error happens
   * @param palette
   */
  recolorSprite(palette: Array<ColorObject>) {
    //reload the grayscale file
    var img = new Image();
    img.src = URL.createObjectURL(sourceFile);
    img.onload = function () {
      let canvas = document.getElementById("sprite-canvas") as HTMLCanvasElement;
      let context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
      context.imageSmoothingEnabled = false;

      // pull the entire image into an array of pixel data
      var imageData = context.getImageData(0, 0, img.width, img.height);
      // examine every pixel,
      // change any old rgb to the new-rgb
      for (var i = 0; i < imageData.data.length; i += 4) {
        let index = imageData.data[i];
        if (index < palette.length) {
          let paletteArray = palette[index].paletteArray;
          imageData.data[i] = paletteArray[0];
          imageData.data[i + 1] = paletteArray[1];
          imageData.data[i + 2] = paletteArray[2];
          imageData.data[i + 3] = paletteArray[3];
        }
      }
      // put the altered data back on the canvas
      context.putImageData(imageData, 0, 0);
    };
  }

  getColorFromSprite(e: React.MouseEvent, canvasId: string) {
    let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    let mousePos = this.getMousePosition(canvas, e);
    // pull the entire image into an array of pixel data
    let imageData = context.getImageData(0, 0, spriteWidth, spriteHeight);
    let colorArr = new Uint8ClampedArray(4);
    //get the pixel at mouse pos.
    console.log(mousePos);
    var index = (Math.floor(mousePos.y) * spriteWidth + Math.floor(mousePos.x)) * 4;
    colorArr[0] = imageData.data[index];
    colorArr[1] = imageData.data[index + 1];
    colorArr[2] = imageData.data[index + 2];
    colorArr[3] = imageData.data[index + 3];
    let recievedColor = new ColorObject(-1, colorArr);
    return recievedColor;
  }

  getMousePosition(canvas: HTMLCanvasElement, evt: React.MouseEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
  }
}
