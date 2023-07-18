import {Routes,Route} from 'react-router-dom';
import Home from './components/home/home.jsx';
import Header from './components/header/header.jsx';
import Register from './components/register/register.jsx';
import Login from './components/login/login.jsx';
import Layout from './components/layout.jsx';
import RequiredAuth from './components/requiredAuth.jsx';
import Course from './components/course/course.jsx';
import EnrolledCourses from './components/enrolledCourses/enrolledCourses.jsx';
import Video from './components/video/video.jsx';
function App(){
  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/course/:identifier' element={<Course/>}></Route>
          <Route path='/video/:ytId' element={<Video/>}></Route>
          <Route element={<RequiredAuth/>}>
            <Route path='/enrolledCourses' element={<EnrolledCourses/>}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
export default App;