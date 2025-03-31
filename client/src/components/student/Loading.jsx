import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loading = () => {
  const { path } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (path) {
      const timer = setTimeout(() => {
        navigate(`/${path}`);
      }, 3000); // Reduced delay for better UX
      return () => clearTimeout(timer);
    }
  }, [path, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-gray-700">Redirecting...</p>
      </div>
      <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
    </div>
  );
};

export default Loading;
