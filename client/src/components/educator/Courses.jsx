const CoursesPage = () => {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Teaching Strategies</h2>
            <p className="text-gray-600 mb-4">
              Learn effective teaching strategies to engage students.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Enroll Now
            </button>
          </div>
          {/* Add more course cards */}
        </div>
      </div>
    );
  };
  
  export default CoursesPage;