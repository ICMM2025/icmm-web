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

export function formatDateTimeThai(iso) {
  const locale = new Date(iso).toLocaleString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  });

  const parts = locale.split(",");
  if (parts.length < 2) return locale; // fallback

  const [dmy, time] = parts.map((p) => p.trim());
  const [d, m] = dmy.split("/");
  return `${d}-${m}, ${time}`;
}
