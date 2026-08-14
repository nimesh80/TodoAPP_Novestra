import { useAuth0 } from "@auth0/auth0-react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {

    const {
        user,
        isAuthenticated,
        isLoading
    } = useAuth0();

    console.log(user);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!isAuthenticated) {
        return <Login />;
    }

    return <Dashboard />;
}

export default App;