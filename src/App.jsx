import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Error404 from "./pages/Error404.jsx";
import CaseIndex from "./pages/CaseIndex.jsx";

function App() {

  const router = createBrowserRouter([{
    element: <Layout/>,
    errorElement: <Error404/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/cases',
        element: <CaseIndex/>
      }
    ]
  }]);

  return <RouterProvider router={router}/>;
}

export default App
