enum Zoom {
  In,
  Out,
}

export function ZoomControls(props: any) {
  let canvasId = props.canvasId;
  let handleClick = (zoomType: Zoom) => {
    let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    let W = parseInt(canvas.style.width);
    if (Number.isNaN(W)) {
      W = 100;
    }
    if (zoomType == Zoom.In) {
      W *= 1.2;
    } else if (zoomType == Zoom.Out) {
      W *= 0.8;
    }
    canvas.style.width = W + "%";
  };
  return (
    <>
      <div>
        <button className="image-button" onClick={() => handleClick(Zoom.In)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="32">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
            />
          </svg>
        </button>
        <button className="image-button" onClick={() => handleClick(Zoom.Out)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="32">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
