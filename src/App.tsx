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
  const defaultColor = ColorObject.default();
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
   * supports retrieving colors by clicking on sprite.
   * @param e Event
   * @param index Index
   */
  const selectColorFromSprite = (e: any, index: number) => {
    //primary color
    if(index==1) {
      let targetColor = spriteManager.getColorFromSprite(e, "sprite-canvas")
      //now we need to look up what maps to this..
      let index = findColorInCurrentPalette(currentPalette, targetColor)
      targetColor.paletteIndex=index;
      console.log(targetColor)
      setCurrentColor(targetColor)
    } else {
    //secondary color
      let sourceColor = spriteManager.getColorFromSprite(e, "refsprite-canvas")
      selectSecondaryColor(sourceColor)
    }
  }

/**
 * ColorSwap function
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
      Bn Palette Tool!
      <div className="canvas-containers">
      <div className="palette-containers">
        <PaletteDisplay title="Main Palette" palette={currentPalette} selectColorFunc={selectColor}></PaletteDisplay>
        <PaletteDisplay title="Imported Colors" palette={extraPalette} selectColorFunc={selectSecondaryColor}></PaletteDisplay>
      </div>
      <canvas onClick={(e)=>{selectColorFromSprite(e,1)}} id="sprite-canvas"/>
      <canvas onClick={(e)=>{selectColorFromSprite(e,2)}} id="refsprite-canvas"/>
      <SelectedColor color={currentColor} secondaryColor={secondaryColor} updateColorFunc={updateCurrentColor}></SelectedColor>
      </div>
      <div className='canvas-containers'>
      <p>Result Palette: right click to save</p>
      <canvas width="256" height="1px" id="palette-canvas"/>
      </div>
      <input type="file" className="file-display" ref={inputPalette} onChange={importPalette}></input>
      <button onClick={onImportPalette}>Import Main Palette</button>
      <input type="file" className="file-display" ref={inputSprite} onChange={importSprite}></input>
      <button onClick={onImportSprite}>Import GrayScaled Sprite
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

/**
 * 
 * @param palette The palette to search
 * @param targetColor The color we are searching for
 * @returns 
 */
function findColorInCurrentPalette(palette: ColorObject[], targetColor: ColorObject): number {
  let colorIndex = -1
  palette.some((colorobj)=>{
    if(colorobj.toRgba() === targetColor.toRgba()) {
      colorIndex=colorobj.paletteIndex;
      return true;
    }
  })
  return colorIndex
}

export default App;

