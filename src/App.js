import { BrowserRouter as
  Router, 
  Routes, 
  Route, 
 } from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contanct";
import NewProject from "./components/pages/NewProject";
import Projects from "./components/pages/Projects";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Container from "./components/layout/Container";
function App() {  
  return (
    <Router>
        <Navbar/>
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/company" element={<Company />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/newproject" element={<NewProject />} />
          </Routes>
        </Container>
        <Footer/>
    </Router>
  );
}

export default App;
