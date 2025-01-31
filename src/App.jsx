import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";
import CaseIndex from "./pages/CaseIndex.jsx";
import CaseDetail from "./pages/CaseDetail.jsx";
import GameIndex from "./pages/GameIndex.jsx";
import GameDetail from "./pages/GameDetail.jsx";
import EvidenceIndex from "./pages/EvidenceIndex.jsx";
import EvidenceDetail from "./pages/EvidenceDetail.jsx";
import ProfileIndex from "./pages/ProfileIndex.jsx";
import ProfileDetail from "./pages/ProfileDetail.jsx";

function App() {

  const router = createBrowserRouter([{
    element: <Layout/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/cases',
        element: <CaseIndex/>
      },
      {
        path: '/cases/:id',
        element: <CaseDetail/>
      },
      {
        path: '/games',
        element: <GameIndex/>
      },
      {
        path: '/games/:id',
        element: <GameDetail/>
      },
      {
        path: '/evidence',
        element: <EvidenceIndex/>
      },
      {
        path: '/evidence/:id',
        element: <EvidenceDetail/>
      },
      {
        path: '/profiles',
        element: <ProfileIndex/>
      },
      {
        path: '/profiles/:id',
        element: <ProfileDetail/>
      },

    ]
  }]);

  return <RouterProvider router={router}/>;
}

export default App
