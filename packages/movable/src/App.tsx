import React, { useState, useMemo, useLayoutEffect } from 'react';
import Mover from './Mover';
import useMouseHooks from './hooks/mouseHooks';
import './App.less';

const restricted = (x:number, y: number, offsetX: number, offsetY: number, allowed: {x: number, y: number}) => ({
  x: Math.min(Math.max(0, x + offsetX), allowed.x),
  y: Math.min(Math.max(0, y + offsetY), allowed.y),
});

const source = {x: 0, y: 0};

const App = () => {
  const [origin, setOrigin] = useState(source);
  const [position, setPosition] = useState(source);
  const [allowedArea, setAllowedArea] = useState(source);

  const mover = React.useMemo(() => {
    const m = new Mover();
    m.onMove((offsetX, offsetY) => {
      const {x, y} = origin;
      setPosition(restricted(x, y, offsetX, offsetY, allowedArea));
    }).onDone((offsetX, offsetY) => {
      const {x, y} = origin;
      setOrigin(restricted(x, y, offsetX, offsetY, allowedArea));
    });
    return m;
  }, [setPosition, setOrigin, origin, allowedArea]);

  useLayoutEffect(() => {
    const {x, y, width, height} = document.querySelector('.movable')?.getBoundingClientRect()!;
    const {innerHeight, innerWidth} = window;
    setPosition({x, y});
    setOrigin({x, y});
    setAllowedArea({x: innerWidth - width, y: innerHeight - height})
  }, [setPosition, setOrigin, setAllowedArea])
  
  const { onMouseDown, onMouseMove, onMouseUp } = useMouseHooks(mover);

  return (
    <div className="canvas">
        <div className="movable container" onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
          style={{
            left: position.x,
            top: position.y,
          }}
        ></div>
    </div>
  )
}

export default App;