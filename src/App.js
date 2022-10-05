import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AllEmployees from "./Components/AllEmployees";
// import Carousel from "./UI/carousel";
import Navbar from "./UI/Navbar";
import CreateEmployee from "./Components/CreateEmployee";
import UpdateEmployee from "./Components/UpdateEmployee";
function App() {
  return (
      <div>
          <Router>
              <Navbar />
              {/*<Carousel />*/}
              <Routes>
                  <Route path='/' element={<AllEmployees/>}/>
                  <Route path='/create' element={<CreateEmployee />}/>
                  <Route path='/update' element={<UpdateEmployee />}/>
              </Routes>
          </Router>
      </div>
  );
}

export default App;
