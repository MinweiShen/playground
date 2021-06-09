import { useCallback, useMemo } from 'react';
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
  const onMouseDown = useMouseDown(mover);
  const onMouseMove = useMouseMove(mover);
  const onMouseUp = useMouseUp(mover);
  return {
    onMouseDown,
    onMouseMove,
    onMouseUp
  }
}

export default useMouseHooks;