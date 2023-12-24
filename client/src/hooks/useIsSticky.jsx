import { useEffect, useRef, useState } from "react";

export default function useIsSticky() {
    const [isSticky, setIsSticky] = useState(false);
    const stickyDom = useRef(null)
    const [coords, setCoords] = useState(null);
    useEffect(() => {
        setCoords(stickyDom.current?.getBoundingClientRect())
        const topCommentDom = stickyDom.current?.getBoundingClientRect().top
        const handleScrollbar = () => {
            setIsSticky(window.pageYOffset >= topCommentDom);
        }
        window.addEventListener('scroll', handleScrollbar)
        return () => {
            window.removeEventListener('scroll', handleScrollbar)
        }
    }, []);
    return { isSticky, stickyDom, coords }
}