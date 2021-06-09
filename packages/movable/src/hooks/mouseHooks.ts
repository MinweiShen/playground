import React, { useCallback, useMemo } from 'react';
import Mover from '../Mover';


function useMouseDown(mover: Mover) {
  return useCallback((e: MouseEvent) => {
    const { screenX, screenY } = e;
    mover.setOrigin(screenX, screenY).activate();
  }, [mover]);
}


function useMouseMove(mover: Mover) {
  return useCallback((e: MouseEvent) => {
    const { screenX, screenY } = e;
    mover.move(screenX, screenY);
  }, [mover]);
}

function useMouseUp(mover: Mover) {
  return useCallback((e: MouseEvent) => {
    const { screenX, screenY } = e;
    mover.done(screenX, screenY);
  }, [mover]);
}

function useMouseHooks(mover: Mover) {
  const onMouseDown = useMouseDown(mover) as unknown as React.MouseEventHandler<HTMLDivElement>;
  const onMouseMove = useMouseMove(mover) as unknown as React.MouseEventHandler<HTMLDivElement>;
  const onMouseUp = useMouseUp(mover) as unknown as React.MouseEventHandler<HTMLDivElement>;
  return {
    onMouseDown,
    onMouseMove,
    onMouseUp
  }
}

export default useMouseHooks;