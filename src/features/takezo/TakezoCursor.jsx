import { useEffect, useRef } from "react";
import { createCursorMotion } from "./cursor/cursorMotion";
import "./takezoCursor.css";

export default function TakezoCursor({ host, waiting, reduced }) {
  const controller = useRef(null);

  useEffect(() => {
    controller.current = createCursorMotion({ root: host.current });
    return () => {
      controller.current?.dispose();
      controller.current = null;
    };
  }, [host]);

  useEffect(() => { controller.current?.setReduced(reduced); }, [reduced]);
  useEffect(() => { controller.current?.setWaiting(waiting); }, [waiting]);

  return null;
}
