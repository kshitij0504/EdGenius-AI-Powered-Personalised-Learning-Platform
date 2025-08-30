import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CourseContextProvider from "./context/CourseContextProvider.jsx";
import { PersistGate } from "redux-persist/integration/react";
import MyCourseContextProvider from "./context/MyCourseContextProvider.jsx";
import { OrchestratorProvider } from "./context/OrchestratorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="987073033254-ncio94d9j7ls25lkos2esp8p824l26ta.apps.googleusercontent.com">
          <AuthContextProvider>
            <CourseContextProvider>
              <MyCourseContextProvider>
                <OrchestratorProvider>
                  <App />
                </OrchestratorProvider>
              </MyCourseContextProvider>
            </CourseContextProvider>
          </AuthContextProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
