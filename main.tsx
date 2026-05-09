import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { useThemeStore } from "./store/theme";

import "react-toastify/dist/ReactToastify.css";
import "./tailwind.css";
import "./styles/index.scss";

import { createBrowserRouter, href, Outlet, RouterProvider, useLocation } from "react-router";

import LandingPage from "./pages";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactPage from "./pages/contact";
import FeaturesPage from "./pages/features";
import ProjectsPage from "./pages/projects";
import TopLoadingBar from "./components/TopLoadingBar";

function ThemeSync() {
  const isDark = useThemeStore((s) => s.isDark);
  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <TopLoadingBar />
      <ThemeSync />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const rootElement = document.getElementById("root");

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: href("/"), element: <LandingPage /> },
      { path: href("/features"), element: <FeaturesPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: href("/about"), element: <AboutPage /> },
      { path: href("/contact"), element: <ContactPage /> },
    ],
  },
]);

if (rootElement == null) { throw new Error("Root element not found"); }

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="bottom-right" autoClose={4000} />
  </StrictMode>,
);

if ((import.meta as { hot?: { dispose: (cb: () => void) => void } }).hot != null) {
  (import.meta as { hot?: { dispose: (cb: () => void) => void } }).hot?.dispose(() => { root.unmount(); });
}

