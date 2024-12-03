export const useBase64 = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => reader.onload = () => resolve(reader.result));
};
