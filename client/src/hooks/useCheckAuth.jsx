import { useEffect } from "react";
import { getInfoAuth } from "../sagas/auth/authSlice";
import { useDispatch } from 'react-redux'

export default function useCheckAuth() {
    const dispatch = useDispatch()
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'infoAuth') {
                dispatch(getInfoAuth())
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
}