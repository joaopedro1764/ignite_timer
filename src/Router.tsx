import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { History } from "./pages/History/History";
import { DefaultLayout } from "./DefaultLayout/DefaultLayout";

export function Router() {
    return (

        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
            </Route>
        </Routes>
    )
}