import {useState,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import Button from 'react-bootstrap/Button';
import Spinner from '../spinner/spinner.jsx';
import './course.css';
const Course = () => {
    let params = useParams();
    let id = params.identifier;
    const navigate = useNavigate();
    const [courseData,setCourseData] = useState();
    const [isLoading,setIsLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        const fetchCourse = async () => {
              setIsLoading(true);
              const response = await axiosPrivate.get(`/api/v1/courses/${id}`);
              const cData = response.data;
              setCourseData(cData);
              setIsLoading(false);
        }
        fetchCourse();
    });
    const enroll = async (identifier,courseTitle) => {
        const postEnrollData = {"courseIdentifier": identifier};
        const response = await axiosPrivate.post('/api/v1/enrollments/',postEnrollData);
        if(response.status === 200){
            alert(`Thank You for Enrolling in Our ${courseTitle} Course`);
            navigate('/enrolledCourses');
        }
    };
    return (
       <>
         <Spinner loadSpinner={isLoading}></Spinner>
         <main>
           {courseData ? (
             <div key={courseData.identifier} className="card mt-2">
               <div className="card-header-layout">
                 <p className="card-header text-secondary bg-white">
                   <span className="course-title">{courseData.title}</span>{' '}
                   &nbsp;&nbsp;{' '}
                   <span className="instructor">
                     Instructor {courseData.teacher}
                   </span>
                 </p>
                 {!courseData.enrolled ? (
                   <Button
                     variant="info"
                     onClick={() => {
                       enroll(id, courseData.title);
                     }}
                   >
                     Enroll
                   </Button>
                 ) : null}
               </div>
               <div>
                 <hr />
                 {courseData.lessons.map((l) => {
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
           ) : null}
         </main>
       </>
    );
};
export default Course;