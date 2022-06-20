import React, {useRef, useState} from 'react';
import './App.css';
import { PaletteManager } from './service/PaletteManager';
import PaletteDisplay from './ui/PaletteDisplay';
import { SpriteManager } from './service/SpriteManager';
import { SelectedColor } from './ui/SelectedColor';
import ColorObject from './core/ColorObject';

let paletteManager = PaletteManager.getInstance()
let spriteManager = SpriteManager.getInstance()

function App() {
  const defaultPalette = new Array<ColorObject>()
  const defaultSprite = {}
  const defaultSprite2 = {}
  const defaultColor = new ColorObject(-1, new Uint8ClampedArray);
  const [currentPalette, setCurrentPalette] = useState(defaultPalette)
  const [currentSprite, setCurrentSprite] = useState(defaultSprite)
  const [extraPalette, setExtraPalette] = useState(defaultPalette)
  const [currentColor, setCurrentColor] = useState(defaultColor)
  const [secondaryColor, setSecondaryColor] = useState(defaultColor)
  const [refSprite, setReferenceSprite] = useState(defaultSprite2)
  const inputPalette:any = useRef<HTMLInputElement | null>(null)
  const inputSprite:any = useRef<HTMLInputElement | null>(null)
  const inputExtra:any = useRef<HTMLInputElement | null>(null)
  const inputReferenceSprite:any = useRef<HTMLInputElement | null>(null)

  //filedialog handlers
  const onImportPalette = () => {
    inputPalette.current.click()
  }

  const onImportSprite = () => {
    inputSprite.current.click()
  }

  const onImportExtra = () => {
    inputExtra.current.click()
  }

  const onImportReference = () => {
    inputReferenceSprite.current.click()
  }

  const selectColor = (color: ColorObject) => {
    setCurrentColor(color)
  }

  const selectSecondaryColor = (color: ColorObject) => {
    setSecondaryColor(color)
  }

  const importPalette = (event: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = event.target.files
    if(fileList != null)
    {
      const file = fileList[0]
      paletteManager.importPalette(file, setCurrentPalette)
    }
  }

  const importSprite = (event: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = event.target.files
    if(fileList != null)
    {
      const file = fileList[0]
      let newPalette = spriteManager.importSprite(file, setCurrentSprite)
    }
  }

  const importReferenceSprite = (event: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = event.target.files
    if(fileList != null)
    {
      const file = fileList[0]
      spriteManager.importRefSprite(file, setReferenceSprite)
    }
  }

  const importExtraPalette = (event: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = event.target.files
    if(fileList != null)
    {
      const file = fileList[0]
      paletteManager.importExtraPalette(file, addMoreColors)
    }
  }

  const addMoreColors = (newColors: Array<ColorObject>) => {
    setExtraPalette(extraPalette.concat(newColors))
  }

  const onRecolorSprite = () => {
    spriteManager.recolorSprite(currentPalette);
  }

/**
 * Recieves a new color from the SelectedColor Box.
 * 
 * @param color New color to change
 */
  const updateCurrentColor = (newColorObj: ColorObject) => {
    // let newColor = new ColorObject(currentColor.paletteIndex, currentColor.paletteArray); 
    // newColor.importColor(color)
    setCurrentColor(newColorObj);
    newColorObj.paletteIndex=currentColor.paletteIndex
    currentPalette[currentColor.paletteIndex]=newColorObj
    setCurrentPalette(currentPalette)
    spriteManager.recolorSprite(currentPalette);
    paletteManager.replaceColor(newColorObj)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Bn Palette Tool!
        </p>
      </header>
      
      <div className="canvas-containers">
      <div className="palette-containers">
        <PaletteDisplay title="Main Palette" palette={currentPalette} selectColorFunc={selectColor}></PaletteDisplay>
        <PaletteDisplay title="Imported Colors" palette={extraPalette} selectColorFunc={selectSecondaryColor}></PaletteDisplay>
      </div>
      <canvas width="100px" height="64px" id="sprite-canvas"/>
      <canvas width="100px" height="64px" id="refsprite-canvas"/>
      <SelectedColor color={currentColor} secondaryColor={secondaryColor} updateColorFunc={updateCurrentColor}></SelectedColor>
      </div>
      <div className='canvas-containers'>
      <p>Source Palette: right click to save</p>
      <canvas width="256" height="1px" id="palette-canvas"/>
      </div>
      <input type="file" className="file-display" ref={inputPalette} onChange={importPalette}></input>
      <button onClick={onImportPalette}>Import Main Palette</button>
      <input type="file" className="file-display" ref={inputSprite} onChange={importSprite}></input>
      <button onClick={onImportSprite}>Import Sprite
      </button>
      <input type="file" className="file-display" ref={inputReferenceSprite} onChange={importReferenceSprite}></input>
      <button onClick={onImportReference}>Import Reference Sprite
      </button>
      <input type="file" className="file-display" ref={inputExtra} onChange={importExtraPalette}></input>
      <button onClick={onImportExtra}>Import Extra Colors
      </button>
      <button onClick={onRecolorSprite}>Recolor Sprite
      </button>
      <canvas width="256" height="1px" id="imported-colors"/>
    </div>
  );
}

export default App;


function hexToRgb(hex: string) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return r + "," + g + "," + b;
}