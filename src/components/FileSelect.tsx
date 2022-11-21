import { FileInputProps } from "../core/FileInputProps";

function FileSelect(props: any) {
  const paletteProps: FileInputProps = props.paletteProps;
  const spriteProps: FileInputProps = props.spriteProps;
  const refSpriteProps: FileInputProps = props.refProps;
  const extraColorProps: FileInputProps = props.extraProps;
  const spritesheetProps: FileInputProps = props.spritesheetProps;

  return (
    <>
      <input type="file" accept=".png" className="file-display" ref={spritesheetProps.ref} onChange={spritesheetProps.importFile}></input>
      <button onClick={spritesheetProps.onClick}>Create Grayscaled Sprite</button>
      <input type="file" accept=".png" className="file-display" ref={paletteProps.ref} onChange={paletteProps.importFile}></input>
      <button onClick={paletteProps.onClick}>Import Palette to Edit</button>
      <input type="file" accept=".png" className="file-display" ref={spriteProps.ref} onChange={spriteProps.importFile}></input>
      <button onClick={spriteProps.onClick}>Import Grayscaled Sprite</button>
      <input type="file" accept=".png" className="file-display" ref={refSpriteProps.ref} onChange={refSpriteProps.importFile}></input>
      <button onClick={refSpriteProps.onClick}>Import Reference Sprite</button>
      {/* <input type="file" accept=".png" className="file-display" ref={extraColorProps.ref} onChange={extraColorProps.importFile}></input>
      <button onClick={extraColorProps.onClick}>Import Extra Colors</button> */}
    </>
  );
}

export default FileSelect;
