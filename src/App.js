import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Configuration from "./pages/Configuration";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Game />} />
          <Route path="/config" element={<Configuration />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
