import { BrowserRouter as Router, Routes, Route, Rout } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import { CharacterResults } from "./Pages/CharacterResults";
import { CharacterInfo } from "./Pages/CharacterInfo";
import { Footer } from "./Componets/Footer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/characters/search/:setSearch"
            element={<CharacterResults />}
          />
          <Route path="/characters/:id" element={<CharacterInfo />} />\
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
