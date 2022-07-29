import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./app.css";

import { HomePage } from "./pages/HomePage";
import { ContentPage } from "./pages/ContentPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path=":entryId" element={<ContentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
