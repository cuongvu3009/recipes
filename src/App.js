import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewRecipe from './pages/NewRecipe';
import Details from './components/Details';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/new' element={<NewRecipe />}></Route>
          <Route path='/detail/:id' element={<Details />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
