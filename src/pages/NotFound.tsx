
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-thin mb-4 text-white">404</h1>
        <p className="text-xl text-white/80 mb-4 font-light">Oops! Page not found</p>
        <a href="/" className="text-white hover:text-white/80 underline font-light">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
