import './App.css';
import Header from './components/header/Header';
import SearchBar from './pages/main/SearchBar';
import Footer from './components/footer/Footer';



function App() {

  // 일반적인 js 코드 쓰는곳 

  return (

    // JSX라는 HTML코드쓰는곳이라 보면됨
    
    // {} 중괄호 안에서 js 표현식들을 쓸 수 있음(변수 접근, 
    // 함수 호출, 삼항 연산자를 통한 조건부 렌더링, .map()을 통한 
    // 배열 처리와 같은 표현식 기반의 코드)

    <div className="App">

      <Header></Header>
      <SearchBar></SearchBar>
      <Footer></Footer>
    
    </div>
  );
}

export default App;
