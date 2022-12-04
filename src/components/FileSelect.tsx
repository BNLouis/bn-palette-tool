import { FileInputProps } from "../core/FileInputProps";

function FileSelect(props: any) {
  const spriteProps: FileInputProps = props.spriteProps;
  const refSpriteProps: FileInputProps = props.refProps;
  const extraColorProps: FileInputProps = props.extraProps;
  const spritesheetProps: FileInputProps = props.spritesheetProps;
  const exportMenuHandler = props.exportMenuHandler;
  return (
    <>
      <input type="file" accept=".png" className="file-display" ref={spritesheetProps.ref} onChange={spritesheetProps.importFile}></input>
      <button onClick={spritesheetProps.onClick}>Import Spritesheet</button>
      <input type="file" accept=".png" className="file-display" ref={spriteProps.ref} onChange={spriteProps.importFile}></input>
      <button onClick={spriteProps.onClick}>Import Grayscaled Sprite</button>

      <input type="file" accept=".png" className="file-display" ref={refSpriteProps.ref} onChange={refSpriteProps.importFile}></input>
      <button onClick={refSpriteProps.onClick}>Import Reference Sprite</button>
      <button onClick={exportMenuHandler.toggle_show}>Export</button>
      {/* <input type="file" accept=".png" className="file-display" ref={extraColorProps.ref} onChange={extraColorProps.importFile}></input>
      <button onClick={extraColorProps.onClick}>Import Extra Colors</button> */}
    </>
  );
}

export default FileSelect;
