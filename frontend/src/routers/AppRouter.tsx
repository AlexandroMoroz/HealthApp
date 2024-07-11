import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../Context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { Dashboard } from "../page/Dashboard";
import { ErrorPage } from "../page/ErrorPage";
import { Landing } from "../pages/landing/Landing";
import SingUp from "../auth/SingUp";
import { LoginPage } from "../auth/Login";


function AppRouter() {
    return (
        <>
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<PublicRoute />}>
                            <Route index element={<LoginPage />} />
                            <Route path="/singup" element={<SingUp />} />
                            <Route path="/landing" element={<Landing></Landing>}></Route>
                        </Route>
                        <Route path="/dashboard" element={<PrivateRoute />}>
                            <Route index element={<Dashboard />} />
                            {/* <Route path="/dashboard/clients" element={<Clients />} /> */}
                            {/* <Route path="/dashboard/provider" element={<Provider />} /> */}
                            {/* <Route path="/dashboard/products" element={<Products />} /> */}
                            {/* <Route path="/dashboard/users" element={<Users></Users>} /> */}
                        </Route>
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
            {/* <Toaster richColors></Toaster> */}
        </>
    );
}

export default AppRouter;