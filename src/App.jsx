import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Error404 from "./pages/Error404.jsx";

function App() {

  const router = createBrowserRouter([{
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/404',
        element: <Error404/>
      }
    ]
  }]);

  return <RouterProvider router={router}/>;
}

export default App
