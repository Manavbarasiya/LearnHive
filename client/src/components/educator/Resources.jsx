const ResourcesPage = () => {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Resource Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Lesson Plans</h2>
            <p className="text-gray-600 mb-4">
              Download ready-to-use lesson plans for various subjects.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Download
            </button>
          </div>
          {/* Add more resource cards */}
        </div>
      </div>
    );
  };
  
  export default ResourcesPage;