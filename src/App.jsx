import axios from "axios";
import AppRouter from "./routes/AppRouter";
import GlobalModal from "./components/modal/GlobalModal";

function App() {
  axios.interceptors.request.use(
    (config) => {
      if (config.url.includes("localhost:8001")) {
        config.url = config.url.replace("localhost:8001", "192.168.1.120:8001");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="relative w-screen min-w-[360px] min-h-svh text-[13px] text-m-dark font-quicksand bg-m-gray">
      <AppRouter />
      <GlobalModal />
    </div>
  );
}

export default App;
