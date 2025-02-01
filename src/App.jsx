import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";
import CaseIndex from "./pages/case/CaseIndex.jsx";
import CaseDetail from "./pages/case/CaseDetail.jsx";
import GameIndex from "./pages/game/GameIndex.jsx";
import GameDetail from "./pages/game/GameDetail.jsx";
import EvidenceIndex from "./pages/evidence/EvidenceIndex.jsx";
import EvidenceDetail from "./pages/evidence/EvidenceDetail.jsx";
import ProfileIndex from "./pages/profile/ProfileIndex.jsx";
import ProfileDetail from "./pages/profile/ProfileDetail.jsx";

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
