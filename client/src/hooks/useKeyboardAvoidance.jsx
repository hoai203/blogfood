// useKeyboardAvoidance.js
import { useEffect } from 'react';

function useKeyboardAvoidance(ref) {
    useEffect(() => {
        const handleFocus = () => {
            window.setTimeout(() => {
                ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                });
            }, 100);
        };

        const inputElement = ref.current.querySelector('input');
        if (inputElement) {
            inputElement.addEventListener('focus', handleFocus);
        }

        // Cleanup on component unmount
        return () => {
            if (inputElement) {
                inputElement.removeEventListener('focus', handleFocus);
            }
        };
    }, [ref]);
}

export default useKeyboardAvoidance;
