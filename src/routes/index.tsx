import { DashboardPage } from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
            </Routes>
        </BrowserRouter>
    )
}