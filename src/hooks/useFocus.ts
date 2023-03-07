import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { GameStatus } from '../types/types';

/**
 * A hook to subscribe the HTMLElement focus.
 * 
 * Focusing when both `mouseover` and left mouse button are pressed.
 * 
 * Unfocusing when `mouseleave` and `mouseUp`.
 * @param refEl - Ref object of the HTMLElement 
 * @author [Anton Fomichev](https://github.com/fluxionbeats)
 * @returns `true` if the element is focused, otherwise `false`
 */
export function useFocus(refEl: React.RefObject<HTMLElement>) {
  const [isFocused, setFocused] = useState(false);
  const gameStatus = useSelector((state: RootState) => state.game.status);

  const handleMouseOver = (evt: MouseEvent) => {
    if (
      (gameStatus === GameStatus.running ||
        gameStatus === GameStatus.stopped) &&
      evt.buttons === 1
    ) {
      setFocused(true);
    }
  };

  const handleMouseDown = (evt: MouseEvent) => {
    if (
      (gameStatus === GameStatus.running ||
        gameStatus === GameStatus.stopped) &&
      evt.buttons === 1
    ) {
      setFocused(true);
    }
  };

  const handleMouseLeave = () => setFocused(false);

  const handleMouseUp = () => setFocused(false);

  useEffect(() => {
    if (refEl) {
      const element = refEl.current;
      if (element instanceof HTMLElement) {
        element.addEventListener('mouseover', handleMouseOver);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mouseup', handleMouseUp);
        element.addEventListener('mousedown', handleMouseDown);
        return () => {
          element.removeEventListener('mouseover', handleMouseOver);
          element.removeEventListener('mouseup', handleMouseUp);
          element.removeEventListener('mouseleave', handleMouseLeave);
          element.removeEventListener('mousedown', handleMouseDown);
        };
      }
    }

  }, []);

  return isFocused;
}