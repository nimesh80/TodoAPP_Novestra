    import { StrictMode } from "react";
    import { createRoot } from "react-dom/client";
    import { ToastContainer } from "react-toastify";
    import { Auth0Provider } from "@auth0/auth0-react";

    import "react-toastify/dist/ReactToastify.css";

    import "./index.css";
    import App from "./App.tsx";
console.log(import.meta.env);
    createRoot(document.getElementById("root")!).render(
        <StrictMode>

            <Auth0Provider
                domain={import.meta.env.VITE_AUTH0_DOMAIN}
                clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                    audience: "https://todoapi"
                }}
            >
                <App />
            </Auth0Provider>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="colored"
            />
        </StrictMode>
    );