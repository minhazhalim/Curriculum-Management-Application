import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import HeroImage from '../../images/School.jpg';
import Spinner from '../spinner/spinner.jsx';
import './home.css';
const Home = () => {
    const {auth,setAuth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [isLoading,setIsloading] = useState(false);
    const [courseData,setCourseData] = useState();
    const fetchCourses = async () => {
        setIsloading(true);
        const response = await axiosPrivate.get('/api/v1/courses/');
        const cData = response.data;
        setCourseData(cData);
        setIsloading(false);
    };
    useEffect(() => {
        if(auth?.user) setAuth(fetchCourses());
    });
    return (
       <>
         <Spinner loadSpinner={isLoading} />
         <main className="container">
           {!auth?.user ? (
             <img src={HeroImage} alt="HeroImage" />
           ) : courseData ? (
             courseData.map((d) => {
               return (
                 <div key={d.identifier} className="card mt-2">
                   <div className="card-header-layout">
                     <p className="card-header text-secondary bg-white">
                       <span className="course-title">
                         <Link to={`/Course/${d.identifier}`}>{d.title}</Link>
                       </span>
                     </p>
                   </div>
                   <div>
                     <hr />
                     {d.lessons.map((l) => {
                       return (
                         <div key={l.identifier} className="mt-2 text-center">
                           <h5 className="card-title mt-2">
                             <span className="text-dark">{l.title}</span>
                           </h5>
                         </div>
                       );
                     })}
                   </div>
                   <hr />
                 </div>
               );
             })
           ) : null}
         </main>
       </>
    );
};
export default Home;