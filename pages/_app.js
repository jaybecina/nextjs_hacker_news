import Layout from "../components/Layout";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
