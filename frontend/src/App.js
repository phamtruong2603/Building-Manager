import React from "react";
import './App.css'
import Provider from "./component/contextAPI/Provider";
import ProviderUser from "./component/contextAPI/ProviderUser";
import ProviderPost from "./component/contextAPI/ProviderPost";
import ProviderRoom from "./component/contextAPI/ProviderRoom";
import ProviderSwitchMode from "./component/contextAPI/ProviderSwitchMode";
import SwitchMode from "./SwitchMode/SwitchMode";

function App() {
  return (
    <Provider>
      <ProviderUser>
        <ProviderPost>
          <ProviderRoom>
            <ProviderSwitchMode>

              {/* Thay đổi giao diện sáng tối */}
              <SwitchMode />

            </ProviderSwitchMode>
          </ProviderRoom>
        </ProviderPost>
      </ProviderUser>
    </Provider>

  );
}

export default App;
