import { Edit, HomePage } from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Edit/:id" element={<Edit />} />
            </Routes>
        </BrowserRouter>
    )
}