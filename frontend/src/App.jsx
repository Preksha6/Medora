import {
    BrowserRouter,
    Routes,
    Route,Navigate
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route element={<ProtectedRoute />}>
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
                </Route>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route path="*" element={<Navigate to="/" replace />} />

                <Route path="/logout" element={<Navigate to="/" replace />} />


            </Routes>

        </BrowserRouter>
    );
}

export default App;