export const encodeBase64Id = (rawId) => {
    return btoa(unescape(encodeURIComponent(String(rawId))));
};

// 🔓 Safe Decoding (Use this on your destination page if decoding via JS)
export const decodeBase64Id = (base64Id) => {
    return decodeURIComponent(escape(atob(base64Id)));
};