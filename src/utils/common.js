export const hdlCloseModalById = (id, setIsModalFadingOut, cb = () => {}) => {
  setIsModalFadingOut(true);
  setTimeout(() => {
    setIsModalFadingOut(false);
    document.getElementById(id)?.close();
    cb(false);
  }, 200);
};

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}
