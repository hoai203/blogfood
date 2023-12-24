import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

export default function useScrollToCenter(type) {
    const location = useLocation();
    const hashValue = new URLSearchParams(location.hash.substring(1)).get(type);
    useEffect(() => {
        const scrollToCenter = () => {
            if (hashValue) {
                const element = document.getElementById(hashValue);
                if (element) {
                    const elementRect = element.getBoundingClientRect();
                    const className = element.getAttribute('class')
                    const absoluteElementTop = elementRect.top + window.scrollY;
                    const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
                    window.scrollTo({ top: middle, behavior: 'smooth' });
                    element.className = `${className} bg-primary/10 transition-all rounded-lg`
                    setTimeout(() => {
                        element.className = `${className} relative`
                    }, 1500);
                }
            }
        };
        if (hashValue) {
            setTimeout(scrollToCenter, 1200);
        }
    }, [hashValue]);
    return null;
}