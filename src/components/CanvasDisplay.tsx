import { ZoomControls } from "./ZoomControls";

export function CanvasDisplay(props: any) {
  let onClick = props.onClick;
  let canvasId = props.canvasId;
  return (
    <>
      <ZoomControls canvasId={canvasId}></ZoomControls>
      <div className="sprite-container">
        <div className="sprite-inner-container">
          <canvas className="canvas-sharp-edges" onClick={onClick} id={canvasId} />
        </div>
      </div>
    </>
  );
}
