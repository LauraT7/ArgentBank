import React from "react";
import ReactDOM from "react-dom/client";

// Importation Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";

import App from "./App.jsx";
import "./style/style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* Le composant Provider rend le store Redux disponible pour tous les composants enfant qui sont enveloppés dedans. */}
        <Provider store={store}>
            {/* PersistGate est un composant qui attend le chargement complet du state persisté avant de rendre l'application.
            Cela évite tout rendu initial où le state n'est pas encore complètement chargé.
            Le prop "loading" peut être utilisé pour afficher un indicateur de chargement, mais ici il est défini sur null, donc rien n'est affiché pendant le chargement. */}
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);