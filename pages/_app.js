import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";

import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
} 

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

 

export default wrapper.withRedux(MyApp);