import React, { useRef, useState } from "react";
import "./App.css";
import { PaletteManager } from "./service/PaletteManager";
import PaletteDisplay from "./ui/PaletteDisplay";
import { SpriteManager } from "./service/SpriteManager";
import { SelectedColor } from "./ui/SelectedColor";
import ColorObject from "./core/ColorObject";

let paletteManager = PaletteManager.getInstance();
let spriteManager = SpriteManager.getInstance();

function App() {
  const defaultPalette = new Array<ColorObject>();
  const defaultSprite = {};
  const defaultSprite2 = {};
  const defaultColor = ColorObject.default();
  const [currentPalette, setCurrentPalette] = useState(defaultPalette);
  const [currentSprite, setCurrentSprite] = useState(defaultSprite);
  const [extraPalette, setExtraPalette] = useState(defaultPalette);
  const [currentColor, setCurrentColor] = useState(defaultColor);
  const [secondaryColor, setSecondaryColor] = useState(defaultColor);
  const [refSprite, setReferenceSprite] = useState(defaultSprite2);
  const inputPalette: any = useRef<HTMLInputElement | null>(null);
  const inputSprite: any = useRef<HTMLInputElement | null>(null);
  const inputExtra: any = useRef<HTMLInputElement | null>(null);
  const inputReferenceSprite: any = useRef<HTMLInputElement | null>(null);

  //filedialog handlers
  const onImportPalette = () => {
    inputPalette.current.click();
  };

  /**
   * Runs when a sprite is imported. Requires pallete to be imported first.
   */
  const onImportSprite = () => {
    if (currentPalette.length !== 0) {
      inputSprite.current.click();
    } else {
      alert("Import base palette first.");
    }
  };

  const onImportExtra = () => {
    inputExtra.current.click();
  };

  const onImportReference = () => {
    inputReferenceSprite.current.click();
  };

  const selectColor = (color: ColorObject) => {
    setCurrentColor(color);
  };

  const selectSecondaryColor = (color: ColorObject) => {
    setSecondaryColor(color);
  };

  const importPalette = (event: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = event.target.files;
    if (fileList != null) {
      const file = fileList[0];
      paletteManager.importPalette(file, completePaletteImport);
      event.target.value = "";
    }
  };

  const importSprite = (event: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = event.target.files;
    if (fileList != null) {
      const file = fileList[0];

      spriteManager.importSprite(file, completeSpriteImport);
    }
  };

  const completeSpriteImport = () => {
    spriteManager.recolorSprite(currentPalette);
  };

  /**
   * Handles errors in palette parsing. For now, only accepts 256x1 images.
   * @param paletteData
   */
  const completePaletteImport = (paletteData: Array<ColorObject>) => {
    if (paletteData == null) {
      alert("Problem parsing palette. Ensure the file was a 256x1 image.");
    } else {
      setCurrentPalette(paletteData);
    }
  };

  const importReferenceSprite = (event: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = event.target.files;
    if (fileList != null) {
      const file = fileList[0];
      spriteManager.importRefSprite(file, setReferenceSprite);
    }
  };

  const importExtraPalette = (event: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = event.target.files;
    if (fileList != null) {
      const file = fileList[0];
      paletteManager.importExtraPalette(file, addMoreColors);
    }
  };

  const addMoreColors = (newColors: Array<ColorObject>) => {
    if (newColors == null) {
      alert("Problem parsing palette");
      return;
    }
    setExtraPalette(extraPalette.concat(newColors));
  };

  /**
   * supports retrieving colors by clicking on sprite.
   * @param e Event
   * @param index Index
   */
  const selectColorFromSprite = (e: any, index: number) => {
    //primary color
    if (index === 1) {
      let targetColor = spriteManager.getColorFromSprite(e, "sprite-canvas");
      //now we need to look up what maps to this..
      let index = findColorInCurrentPalette(currentPalette, targetColor);
      targetColor.paletteIndex = index;
      console.log(targetColor);
      setCurrentColor(targetColor);
    } else {
      //secondary color
      let sourceColor = spriteManager.getColorFromSprite(e, "refsprite-canvas");
      selectSecondaryColor(sourceColor);
    }
  };

  /**
   * ColorSwap function
   *
   * @param color New color to change
   */
  const updateCurrentColor = (newColorObj: ColorObject) => {
    // let newColor = new ColorObject(currentColor.paletteIndex, currentColor.paletteArray);
    // newColor.importColor(color)
    setCurrentColor(newColorObj);
    newColorObj.paletteIndex = currentColor.paletteIndex;
    currentPalette[currentColor.paletteIndex] = newColorObj;
    setCurrentPalette(currentPalette);
    spriteManager.recolorSprite(currentPalette);
    paletteManager.replaceColor(newColorObj);
  };

  return (
    <div className="App">
      BattleNetwork Palette Tool
      <div className="canvas-containers">
        <div className="palette-containers">
          <PaletteDisplay title="Main Palette" palette={currentPalette} selectColorFunc={selectColor}></PaletteDisplay>
          <PaletteDisplay title="Imported Colors" palette={extraPalette} selectColorFunc={selectSecondaryColor}></PaletteDisplay>
        </div>
        <div className="canvas-box ">
          Base Sprite
          <canvas
            className="canvas-sharp-edges"
            onClick={(e) => {
              selectColorFromSprite(e, 1);
            }}
            id="sprite-canvas"
          />
        </div>
        <div className="canvas-box">
          Reference Sprite
          <canvas
            className="canvas-sharp-edges"
            onClick={(e) => {
              selectColorFromSprite(e, 2);
            }}
            id="refsprite-canvas"
          />
        </div>
        <SelectedColor
          color={currentColor}
          secondaryColor={secondaryColor}
          swapColor={updateCurrentColor}
          updateColor={selectSecondaryColor}
        ></SelectedColor>
      </div>
      <div className="canvas-containers">
        <p>Result Palette: right click to save</p>
        <canvas className="canvas-sharp-edges" width="256" height="1px" id="palette-canvas" />
      </div>
      <input type="file" accept=".png" className="file-display" ref={inputPalette} onChange={importPalette}></input>
      <button onClick={onImportPalette}>Import Main Palette</button>
      <input type="file" accept=".png" className="file-display" ref={inputSprite} onChange={importSprite}></input>
      <button onClick={onImportSprite}>Import GrayScaled Sprite</button>
      <input type="file" accept=".png" className="file-display" ref={inputReferenceSprite} onChange={importReferenceSprite}></input>
      <button onClick={onImportReference}>Import Reference Sprite</button>
      <input type="file" accept=".png" className="file-display" ref={inputExtra} onChange={importExtraPalette}></input>
      <button onClick={onImportExtra}>Import Extra Colors</button>
      <canvas width="256" height="1px" id="imported-colors" />
      <a href="https://github.com/BNLouis/bn-palette-tool#readme">readme</a>
    </div>
  );
}

/**
 *
 * @param palette The palette to search
 * @param targetColor The color we are searching for
 * @returns
 */
function findColorInCurrentPalette(palette: ColorObject[], targetColor: ColorObject): number {
  let colorIndex = -1;
  palette.some((colorobj) => {
    if (colorobj.toRgba() === targetColor.toRgba()) {
      colorIndex = colorobj.paletteIndex;
      return true;
    }
    return false;
  });
  return colorIndex;
}

export default App;
