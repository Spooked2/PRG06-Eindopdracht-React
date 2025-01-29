import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Error404 from "./pages/Error404.jsx";

function App() {

  const router = createBrowserRouter([{
    element: <Layout/>,
    errorElement: <Error404/>,
    children: [
      {
        path: '/',
        element: <Home/>
      }
    ]
  }]);

  return <RouterProvider router={router}/>;
}

export default App
