import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function useLoadingImage(dependencies) {
    const location = useLocation();
    useEffect(() => {
        const load = (img) => {
            const url = img.getAttribute('lazy-src')
            img.setAttribute('src', url)
        }
        function ready() {
            if ('IntersectionObserver' in window) {
                const lazyImgs = document.querySelectorAll('[lazy-src]')
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            load(entry.target)
                        }
                    })
                })
                lazyImgs.forEach(img => {
                    observer.observe(img)
                })
            } else {
                //
            }
        }
        ready()
    }, [dependencies, location?.pathname]);
}