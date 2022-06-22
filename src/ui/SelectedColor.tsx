import { useState } from "react";
import ColorObject from "../core/ColorObject";
import "./SelectedColor.css";

export function SelectedColor(props: any) {
  const [color, setUpdateColor] = useState("ffffffff");
  const selectedColor = props.color as ColorObject;
  const secondaryColor = props.secondaryColor as ColorObject;
  return (
    <div className="selectedColor">
      <div style={{ backgroundColor: "rgba(" + selectedColor.toRgba() + ")" }}>
        <p> Base Color </p>
        <p>{selectedColor.toRgba()}</p>
      </div>
      <div style={{ backgroundColor: "rgba(" + secondaryColor.toRgba() + ")" }}>
        <p> Replacement Color </p>
        <p>{selectedColor.toRgba()}</p>
      </div>
      <button
        onClick={() => {
          props.updateColorFunc(secondaryColor);
        }}
      >
        Swap Colors
      </button>
    </div>
  );
}

function updateColor(event: React.ChangeEvent<HTMLInputElement>, updateColorFunction: Function) {
  updateColorFunction(event.target.value);
}
