import { Provider } from "react-redux";
import "../styles/app.scss";
import '../styles/index.scss';
import { store } from "../src/app";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../src/components/ProtectedRoute";

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster toastOptions={{
        style: {
          fontWeight: "bold",
        },
      }} />
    </Provider>
  );
}

export default MyApp;
