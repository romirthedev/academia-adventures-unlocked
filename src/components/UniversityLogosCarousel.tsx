import React, { useRef, useEffect } from 'react';

  const universities = [
    { 
      name: "Harvard University", 
      shortName: "Harvard",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/1200px-Harvard_University_coat_of_arms.svg.png"
    },
    { 
      name: "Stanford University", 
      shortName: "Stanford",
      logo: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png"
    },
    { 
      name: "Massachusetts Institute of Technology", 
      shortName: "MIT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg"
    },
    { 
      name: "California Institute of Technology", 
      shortName: "Caltech",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Seal_of_the_California_Institute_of_Technology.svg/250px-Seal_of_the_California_Institute_of_Technology.svg.png"
    },
    { 
      name: "University of California Berkeley", 
      shortName: "UC Berkeley",
      logo: "https://images.seeklogo.com/logo-png/31/2/university-of-california-berkeley-athletic-logo-png_seeklogo-317333.png"
    },
    { 
      name: "Princeton University", 
      shortName: "Princeton",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Princeton_seal.svg"
    },
    { 
      name: "Yale University", 
      shortName: "Yale",
      logo: "https://1000logos.net/wp-content/uploads/2019/06/Yale-Logo.png"
    },
    { 
      name: "University of Chicago", 
      shortName: "UChicago",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/1200px-University_of_Chicago_shield.svg.png"
    },
    { 
      name: "Cornell University", 
      shortName: "Cornell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/2048px-Cornell_University_seal.svg.png"
    },
    { 
      name: "University of Pennsylvania", 
      shortName: "UPenn",
      logo: "https://branding.web-resources.upenn.edu/sites/default/files/styles/card_3x2/public/2022-03/UniversityofPennsylvania_Shield_RGB-2.png?h=3c287ac3&itok=HgG1DNc-"
    },
    { 
      name: "Johns Hopkins University", 
      shortName: "Johns Hopkins",
      logo: "https://logos-world.net/wp-content/uploads/2023/02/Johns-Hopkins-University-Symbol.png"
    },
    { 
      name: "Duke University", 
      shortName: "Duke",
      logo: "https://1000logos.net/wp-content/uploads/2021/06/Duke-Blue-Devils-logo.png"
    },
    { 
      name: "University of Michigan", 
      shortName: "Michigan",
      logo: "https://brand.umich.edu/assets/brand/style-guide/logo-guidelines/Block_M-Hex.png"
    },
  ];

const UniversityLogosCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let animationFrame: number;
    const speed = 1.2; // Increased speed for more visible movement

    const scroll = () => {
      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += speed;
      }
      animationFrame = requestAnimationFrame(scroll);
    };
    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Duplicate logos for seamless looping
  const logos = [...universities, ...universities];

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700 py-8 overflow-x-hidden">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Partnered Universities</h3>
        <p className="text-gray-400 text-sm">Data from leading institutions worldwide</p>
      </div>
      <div
        ref={carouselRef}
        className="flex gap-12 px-6 overflow-x-auto no-scrollbar whitespace-nowrap"
        style={{ scrollBehavior: 'auto', minHeight: '120px' }}
      >
        {logos.map((university, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[120px] group"
            >
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-3 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110 shadow-lg">
                <img
                  src={university.logo}
                  alt={university.name}
                  className="w-16 h-16 object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <p className="text-white/70 text-xs font-medium text-center group-hover:text-white transition-colors duration-300">
                {university.shortName}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UniversityLogosCarousel;
