import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainLayout from "./components/Layout/MainLayout.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
const App = lazy(() => import("./App"));
const New = lazy(() => import("./pages/new"));
const Edit = lazy(() => import("./pages/edit"));
const Detail = lazy(() => import("./pages/detail"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <App />
                </Suspense>
              }
            />
            <Route
              path="/new"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <New />
                </Suspense>
              }
            />
            <Route
              path="/details/:noteId"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Detail />
                </Suspense>
              }
            />
            <Route
              path="/details/:noteId/edit"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Edit />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
