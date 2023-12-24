import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { EllipsisIcon } from "../components/Icon";
import { useEffect, useState } from "react";

export function PopoverDrop({
  children,
  x = 0,
  icon = <></>,
  placement = "right",
  x_sm = -80,
}) {
  const [xValue, setXValue] = useState(x);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 640) {
        setXValue(x);
      } else {
        setXValue(x_sm);
      }
    };
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <Popover
      animate={{
        mount: { scale: 1, x: 0 },
        unmount: { scale: 0, x: xValue },
      }}
      placement={placement}
    >
      <PopoverHandler>
        <div className="cursor-pointer">{icon}</div>
      </PopoverHandler>
      <PopoverContent className="z-[1000]">{children}</PopoverContent>
    </Popover>
  );
}
