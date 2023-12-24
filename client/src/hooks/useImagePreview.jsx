import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function useImagePreview(onChange = () => { }) {
    const [preview, setPreview] = useState(null);
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    const maxFileSize = 4 * 1024 * 1024;
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            setPreview(null)
            onChange(null)
            return;
        }
        const file = files[0];
        const fileType = file["type"];
        if (!validImageTypes.includes(fileType)) {
            toast.error('Vui lòng chọn ảnh!')
            setPreview(null);
            onChange(null)
            return;
        }
        if (file.size > maxFileSize) {
            toast.warning(`Kích thước tối đa ảnh là ${maxFileSize / 1024 / 1024}mb! Vui lòng chọn ảnh nhỏ hơn.`);
            setPreview(null);
            onChange(null);
            return;
        }
        setPreview(URL.createObjectURL(file));
    };
    const clearPreview = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        onChange(null)
    };
    useEffect(() => () => URL.revokeObjectURL(preview), [preview]);
    return { preview, handleFileChange, clearPreview };
}

export default useImagePreview;
