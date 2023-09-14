export function setItem(value) {
    localStorage.setItem('@dindin:usuario', JSON.stringify(value.usuario));
    localStorage.setItem('@dindin:token', value.token);
};

export function getItem(key) {
    return localStorage.getItem(key);
};

export function removeItem(key) {
    localStorage.removeItem(key);
};

export function clear() {
    localStorage.clear();
};