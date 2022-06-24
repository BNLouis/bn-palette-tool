import React, { useRef, useState } from "react";
import ColorObject from "../core/ColorObject";
import "./SelectedColor.css";

export function SelectedColor(props: any) {
  const inputCustomColor: any = useRef<HTMLInputElement | null>(null);
  const selectedColor = props.color as ColorObject;
  const secondaryColor = props.secondaryColor as ColorObject;
  const updateColor: Function = props.updateColor;
  const swapColor: Function = props.swapColor;

  const setCustomColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = ColorObject.fromHex(event.target.value);
    updateColor(newColor);
  };
  return (
    <div className="selectedColor">
      <div className="color-display" style={{ backgroundColor: "rgba(" + selectedColor.toRgba() + ")" }}>
        <p> Base Color </p>
      </div>
      <div className="color-display" style={{ backgroundColor: "rgba(" + secondaryColor.toRgba() + ")" }}>
        <p> Replacement Color </p>
      </div>
      <button
        onClick={() => {
          inputCustomColor.current.click();
        }}
      >
        Select Custom Color
      </button>
      <input type="color" className="file-display" ref={inputCustomColor} onChange={setCustomColor}></input>
      <button
        onClick={() => {
          swapColor(secondaryColor);
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
