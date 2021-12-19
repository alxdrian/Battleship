import { css, Global } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import background from "./assets/images/background.jpg";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Configuration from "./pages/Configuration";
import Scores from "./pages/Scores";

const cssGlobal = css`
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  
  * {
    font-family: 'Press Start 2P', cursive;
    margin: 0;

    a {
      text-decoration: none;
    }
  }
  
  body {
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

function App() {
  return (
    <main>
      <Global styles={cssGlobal}/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/battle" element={<Game />} />
          <Route path="/config" element={<Configuration />} />
          <Route path="/scores" element={<Scores />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
