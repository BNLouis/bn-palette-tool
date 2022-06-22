import { ElementFlags } from "typescript";
import ColorObject from "../core/ColorObject";
import "./PaletteColor.css";

function PaletteDisplay(props: any) {
  let palette = props.palette as Array<ColorObject>;
  let selectColorFunc = props.selectColorFunc;

  return <div>{renderPaletteColors(palette, selectColorFunc, props)}</div>;
}

function renderPaletteColors(palette: Array<ColorObject>, selectColorFunc: Function, props: any) {
  return (
    <div>
      {props.title}
      <div className="palette-div">
        {palette.map((e) => {
          let rgba = e.paletteArray[0] + ", " + e.paletteArray[1] + ", " + e.paletteArray[2] + ", 255";
          return (
            <div
              onClick={() => selectColorFunc(e)}
              className="palette-color"
              key={e.paletteIndex}
              style={{ backgroundColor: "rgba(" + rgba + ")" }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default PaletteDisplay;
