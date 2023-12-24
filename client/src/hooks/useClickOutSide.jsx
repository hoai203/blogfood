import React from "react";

export default function useClickOutSide(dom = "button") {
  const [show, setShow] = React.useState(false);
  const domRef = React.useRef(null);
  React.useEffect(() => {
    function handleClickOutSide(e) {
      if (
        domRef.current &&
        !domRef.current.contains(e.target) &&
        !e.target.matches(dom)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [dom]);

  return {
    domRef,
    show,
    setShow,
  };
}
