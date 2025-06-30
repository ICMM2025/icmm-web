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

export function formatDateTimeThaiYear(iso) {
  const date = new Date(iso);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear().toString().slice(-2); // last 2 digits of year

  const time = date.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  });

  return `${d}/${m}/${y}, ${time}`;
}
