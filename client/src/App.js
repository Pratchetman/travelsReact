import { TravelsApp } from "./routes/TravelsApp";
import "bootstrap/dist/css/bootstrap.min.css";
import { TravelsProvider } from "./context/TravelsContext";

function App() {
  return (
    <div>
      <TravelsProvider>
        <TravelsApp />
      </TravelsProvider>
    </div>
  );
}

export default App;
