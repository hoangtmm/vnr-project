import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Organization from "./pages/Organization";
import Operations from "./pages/Operations";
import CaseStudies from "./pages/CaseStudies";
import Figures from "./pages/Figures";
import Documents from "./pages/Documents";
import DocumentDetail from "./pages/DocumentDetail";
import About from "./pages/About";
import Story from './pages/Story';
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "overview", element: <Overview /> },
      { path: "organization", element: <Organization /> },
      { path: "operations", element: <Operations /> },
      { path: "case-studies", element: <CaseStudies /> },
      { path: "figures", element: <Figures /> },
      { path: "documents", element: <Documents /> },
      { path: "documents/:id", element: <DocumentDetail /> },
      { path: "about", element: <About /> },
      { path: "story", element: <Story /> },
    ],
  },
]);
