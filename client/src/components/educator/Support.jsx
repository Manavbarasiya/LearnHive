const SupportPage = () => {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Support</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">FAQs</h2>
          <p className="text-gray-600 mb-4">
            Find answers to common questions about our platform.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            View FAQs
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
          <p className="text-gray-600 mb-4">
            Need help? Reach out to our support team.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Contact Us
          </button>
        </div>
      </div>
    );
  };
  
  export default SupportPage;