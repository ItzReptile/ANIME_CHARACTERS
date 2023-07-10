import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage.jsx";
import { CharacterResults } from "./Pages/CharacterResults.jsx";
import { CharacterInfo } from "./Pages/CharacterInfo.jsx";
import { Footer } from "./Componets/Footer.jsx";

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
