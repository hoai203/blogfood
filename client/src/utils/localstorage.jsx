// Khi lưu đối tượng vào localStorage
const saveObjectToLocalStorage = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
}

// Khi truy xuất đối tượng từ localStorage
const getObjectFromLocalStorage = (key) => {
    const jsonString = localStorage.getItem(key);
    return JSON.parse(jsonString);
}

// Khi xóa đối tượng từ localStorage
const removeObjectFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export { saveObjectToLocalStorage, getObjectFromLocalStorage, removeObjectFromLocalStorage }