
import React from 'react';

const UniversityLogosCarousel = () => {
  const universities = [
    { 
      name: "Harvard University", 
      shortName: "Harvard",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Harvard-Logo.png"
    },
    { 
      name: "Stanford University", 
      shortName: "Stanford",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Stanford-Logo.png"
    },
    { 
      name: "Massachusetts Institute of Technology", 
      shortName: "MIT",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/MIT-Logo.png"
    },
    { 
      name: "California Institute of Technology", 
      shortName: "Caltech",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Caltech-Logo.png"
    },
    { 
      name: "University of California Berkeley", 
      shortName: "UC Berkeley",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/UC-Berkeley-Logo.png"
    },
    { 
      name: "Princeton University", 
      shortName: "Princeton",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Princeton-Logo.png"
    },
    { 
      name: "Yale University", 
      shortName: "Yale",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Yale-Logo.png"
    },
    { 
      name: "Columbia University", 
      shortName: "Columbia",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Columbia-Logo.png"
    },
    { 
      name: "University of Chicago", 
      shortName: "UChicago",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/University-of-Chicago-Logo.png"
    },
    { 
      name: "Cornell University", 
      shortName: "Cornell",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Cornell-Logo.png"
    },
    { 
      name: "University of Pennsylvania", 
      shortName: "UPenn",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/University-of-Pennsylvania-Logo.png"
    },
    { 
      name: "Johns Hopkins University", 
      shortName: "Johns Hopkins",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Johns-Hopkins-Logo.png"
    },
    { 
      name: "Northwestern University", 
      shortName: "Northwestern",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Northwestern-Logo.png"
    },
    { 
      name: "Duke University", 
      shortName: "Duke",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Duke-Logo.png"
    },
    { 
      name: "University of Michigan", 
      shortName: "Michigan",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/University-of-Michigan-Logo.png"
    },
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
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 p-4 min-w-[120px] h-16 flex items-center justify-center">
                <img
                  src={university.logo}
                  alt={university.name}
                  className="max-h-8 max-w-24 object-contain filter hover:brightness-110 transition-all duration-300"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="font-semibold text-sm text-orange-600 whitespace-nowrap">${university.shortName}</span>`;
                      parent.className = "bg-gradient-to-br from-orange-600 to-amber-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center min-w-[120px] h-16";
                    }
                  }}
                />
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
