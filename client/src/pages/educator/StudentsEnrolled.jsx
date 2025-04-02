import React, { useContext, useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets';
import Loading from '../../components/student/Loading';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentsEnrolled = () => {
  const{backendUrl,getToken,isEducator}=useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      const token=await getToken();
      const{data}=await axios.get(backendUrl+'/api/educator/enrolled-students',{headers:{Authorization:`Bearer ${token}`}});
      if(data.success){
        setEnrolledStudents(data.enrolledStudents.reverse());
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if(isEducator){
      fetchEnrolledStudents();
      
    }
  }, [isEducator]);

  if (!enrolledStudents) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h2 className="pb-4 text-lg font-medium">Students Enrolled</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {enrolledStudents.map((student, index) => (
              <tr key={student.student._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={student.student.imageURL}
                      alt={student.student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {student.student.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.courseTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(student.purchaseData).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsEnrolled;