import React from "react";
import './App.css'
import Provider from "./component/contextAPI/Provider";
import ProviderPost from "./component/contextAPI/ProviderPost";
import ProviderRoom from "./component/contextAPI/ProviderRoom";
import ProviderSwitchMode from "./component/contextAPI/ProviderSwitchMode";
import { Route, Routes } from "react-router-dom";
import StartPage from "./component/startPage/StartPage";
import Home from "./component/Event/Home";
import Dashboard from "./component/Dashboard/Dashboard";
import RoomManager from "./component/RoomManager/RoomManager";
import About from "./component/about/About";
import Notification from './component/Notification/Notification'
import ProtectedRoutes from './ProtectedRoutes'
import ProviderSocket from "./component/contextAPI/ProviderSocket";

function App() {
  return (
    <Provider>
      <ProviderSocket>
        <ProviderPost>
          <ProviderRoom>
            <ProviderSwitchMode>
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/Home" element={<Home />} />
                  <Route path='/Dashboard/*' element={<Dashboard />} />
                  <Route path="/Room/*" element={<RoomManager />} />
                  <Route path="/About" element={<About />} />
                  <Route path="/Notification" element={<Notification />} />
                </Route>
              </Routes>
            </ProviderSwitchMode>
          </ProviderRoom>
        </ProviderPost>
      </ProviderSocket>
    </Provider>
  );
}

export default App;
