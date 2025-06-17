
import React from 'react';

const UniversityLogosCarousel = () => {
  const universities = [
    { name: "Harvard University", shortName: "Harvard" },
    { name: "Stanford University", shortName: "Stanford" },
    { name: "Massachusetts Institute of Technology", shortName: "MIT" },
    { name: "California Institute of Technology", shortName: "Caltech" },
    { name: "University of California Berkeley", shortName: "UC Berkeley" },
    { name: "Princeton University", shortName: "Princeton" },
    { name: "Yale University", shortName: "Yale" },
    { name: "Columbia University", shortName: "Columbia" },
    { name: "University of Chicago", shortName: "UChicago" },
    { name: "Cornell University", shortName: "Cornell" },
    { name: "University of Pennsylvania", shortName: "UPenn" },
    { name: "Johns Hopkins University", shortName: "Johns Hopkins" },
    { name: "Northwestern University", shortName: "Northwestern" },
    { name: "Duke University", shortName: "Duke" },
    { name: "University of Michigan", shortName: "Michigan" },
  ];

  // Duplicate the array to create seamless scrolling
  const duplicatedUniversities = [...universities, ...universities];

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm border-b border-orange-200 py-4 overflow-hidden">
      <div className="relative">
        <div className="flex logo-carousel whitespace-nowrap">
          {duplicatedUniversities.map((university, index) => (
            <div
              key={`${university.name}-${index}`}
              className="inline-flex items-center mx-8 flex-shrink-0"
            >
              <div className="bg-gradient-to-br from-orange-600 to-amber-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <span className="font-semibold text-sm whitespace-nowrap">
                  {university.shortName}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>
      
      <div className="text-center mt-2">
        <span className="text-xs text-gray-600 font-medium tracking-wider uppercase">
          Featuring Professors From Leading Universities
        </span>
      </div>
    </div>
  );
};

export default UniversityLogosCarousel;
