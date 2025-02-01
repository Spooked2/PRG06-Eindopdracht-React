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
import CaseCreate from "./pages/case/CaseCreate.jsx";
import CaseUpdate from "./pages/case/CaseUpdate.jsx";
import CaseDelete from "./pages/case/CaseDelete.jsx";
import GameCreate from "./pages/game/GameCreate.jsx";
import GameUpdate from "./pages/game/GameUpdate.jsx";
import GameDelete from "./pages/game/GameDelete.jsx";
import EvidenceCreate from "./pages/evidence/EvidenceCreate.jsx";
import EvidenceUpdate from "./pages/evidence/EvidenceUpdate.jsx";
import EvidenceDelete from "./pages/evidence/EvidenceDelete.jsx";
import ProfileCreate from "./pages/profile/ProfileCreate.jsx";
import ProfileUpdate from "./pages/profile/ProfileUpdate.jsx";
import ProfileDelete from "./pages/profile/ProfileDelete.jsx";

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
        path: '/create/cases',
        element: <CaseCreate/>
      },
      {
        path: '/update/cases/:id',
        element: <CaseUpdate/>
      },
      {
        path: '/delete/cases/:id',
        element: <CaseDelete/>
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
        path: '/create/games',
        element: <GameCreate/>
      },
      {
        path: '/update/games/:id',
        element: <GameUpdate/>
      },
      {
        path: '/delete/games/:id',
        element: <GameDelete/>
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
        path: '/create/evidence',
        element: <EvidenceCreate/>
      },
      {
        path: '/update/evidence/:id',
        element: <EvidenceUpdate/>
      },
      {
        path: '/delete/evidence/:id',
        element: <EvidenceDelete/>
      },
      {
        path: '/profiles',
        element: <ProfileIndex/>
      },
      {
        path: '/profiles/:id',
        element: <ProfileDetail/>
      },
      {
        path: '/create/profiles',
        element: <ProfileCreate/>
      },
      {
        path: '/update/profiles/:id',
        element: <ProfileUpdate/>
      },
      {
        path: '/delete/profiles/:id',
        element: <ProfileDelete/>
      },
    ]
  }]);

  return <RouterProvider router={router}/>;
}

export default App
