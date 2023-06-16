import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Topics from './components/Topics';
import BlogEditor from './components/BlogEditor';

function App() {
  return (
    <div className="App">
      <Header/>
      <Topics/>
      {/* <BlogEditor/> */}
    </div>
  );
}

export default App;
