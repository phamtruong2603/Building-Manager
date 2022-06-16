import React from "react";
import './App.css'
import Provider from "./component/contextAPI/Provider";
import ProviderPost from "./component/contextAPI/ProviderPost";
import ProviderRoom from "./component/contextAPI/ProviderRoom";
import ProviderSwitchMode from "./component/contextAPI/ProviderSwitchMode";
import ProviderNotification from "./component/contextAPI/ProviderNotification";
import ProviderSocket from "./component/contextAPI/ProviderSocket";
import SwitchMode from "./SwitchMode/SwitchMode";

function App() {
  return (
    <Provider>
      <ProviderSocket>
        <ProviderPost>
          <ProviderRoom>
            <ProviderNotification>
              <ProviderSwitchMode>
                <SwitchMode />
              </ProviderSwitchMode>
            </ProviderNotification>
          </ProviderRoom>
        </ProviderPost>
      </ProviderSocket>
    </Provider>
  );
}

export default App;
