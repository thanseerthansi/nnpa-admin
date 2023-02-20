// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Components.js/Header';
import Category from './Components.js/Category';
import Home from './Components.js/Home';
import News from './Components.js/News';
import Login from './Components.js/Login';
import Simplecontextprovider from './Components.js/Simplecontext';
import Text from './Components.js/Text';
import Joeditor from './Components.js/Joeditor';
import Rsfeed from './Components.js/Rsfeed';
import Topics from './Components.js/Topics';
import Privacypolicy from './Components.js/Privacypolicy';
import Rss_News_List from './Components.js/Rss_News_List';
import Feedly from './Components.js/Feedly';

function App() {
  return (
    <div className="App">

      <Router>
        <Simplecontextprovider>
          <Routes>

            <Route exact path="/privacypolicy" element={<Privacypolicy />} />
            <Route exact path="/editor" element={<Joeditor />} />
            <Route exact path="/text" element={<Text />} />
            <Route exact path="/header" element={<Header />} />
            <Route exact path="/" element={<Login />} />
            <Route path="/news" element={< Home />}>
              <Route path='category' element={<Category />} />
              <Route index element={<News />} />
              <Route path='rssfeed' element={<Rsfeed />} />
              <Route path='topics' element={<Topics />} />
              <Route path='feedly' element={<Feedly />} />
              <Route path='Rss-News/:url_name' element={<Rss_News_List />} />


            </Route>

          </Routes>
        </Simplecontextprovider>
      </Router>
    </div>
  );
}

export default App;
