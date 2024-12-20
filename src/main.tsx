import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MainContext } from "./context/Context.tsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/index.tsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MainContext>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
        <ToastContainer theme="colored" />
      </BrowserRouter>
    </MainContext>
  </Provider>
);
