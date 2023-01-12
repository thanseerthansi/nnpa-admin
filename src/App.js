import logo from './logo.svg';
import './App.css';
import {BrowserRouter as  Router,Route,Routes } from 'react-router-dom';
import Text from './Components.js/Text';
import Header from './Components.js/Header';
import Category from './Components.js/Category';
import Home from './Components.js/Home';
import News from './Components.js/News';
import Login from './Components.js/Login';
import Simplecontextprovider from './Components.js/Simplecontext';

function App() {
  return (
    <div className="App">
    
      <Router>
        <Simplecontextprovider>
        <Routes>
        <Route exact path="/text" element={<Text/>}/>
        <Route exact path="/header" element={<Header/>}/>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/news" element={< Home/>}>
          <Route  path='category' element={<Category />}/>
          <Route  index element={<News />}/>
        
        
      </Route>
      
        </Routes>
        </Simplecontextprovider>
      </Router>
    </div>
  );
}

export default App;
