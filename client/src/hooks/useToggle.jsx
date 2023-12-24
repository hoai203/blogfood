import { useState } from "react";

export default function useToggle(initialState = false) {
    const [toggle, setToggle] = useState(initialState);
    const handleToggle = () => {
        setToggle(!toggle)
    }
    const handleToggleFalse = () => {
        setToggle(false)
    }
    const handleToggleTrue = () => {
        setToggle(true)
    }
    return { toggle, handleToggle, handleToggleFalse, handleToggleTrue }
}