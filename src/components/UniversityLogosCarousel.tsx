import React from 'react';

const UniversityLogosCarousel = () => {
  const universities = [
    { 
      name: "Harvard University", 
      shortName: "Harvard",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/1200px-Harvard_University_coat_of_arms.svg.png",
      size: "h-16 w-16"
    },
    { 
      name: "Stanford University", 
      shortName: "Stanford",
      logo: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png",
      size: "h-12 w-12"
    },
    { 
      name: "Massachusetts Institute of Technology", 
      shortName: "MIT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
      size: "h-14 w-14"
    },
    { 
      name: "California Institute of Technology", 
      shortName: "Caltech",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Seal_of_the_California_Institute_of_Technology.svg/250px-Seal_of_the_California_Institute_of_Technology.svg.png",
      size: "h-16 w-16"
    },
    { 
      name: "University of California Berkeley", 
      shortName: "UC Berkeley",
      logo: "https://images.seeklogo.com/logo-png/31/2/university-of-california-berkeley-athletic-logo-png_seeklogo-317333.png",
      size: "h-16 w-16"
    },
    { 
      name: "Princeton University", 
      shortName: "Princeton",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Princeton_seal.svg",
      size: "h-16 w-16"
    },
    { 
      name: "Yale University", 
      shortName: "Yale",
      logo: "https://1000logos.net/wp-content/uploads/2019/06/Yale-Logo.png",
      size: "h-14 w-14"
    },
    { 
      name: "Columbia University", 
      shortName: "Columbia",
      logo: "https://media.licdn.com/dms/image/v2/D4E22AQF-W1iJO0GIww/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1719211835866?e=2147483647&v=beta&t=iEWr0oou59q5xqfeSTbkcDGAuQKJCurF11OE4sAmSeY",
      size: "h-20 w-20"
    },
    { 
      name: "University of Chicago", 
      shortName: "UChicago",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/1200px-University_of_Chicago_shield.svg.png",
      size: "h-16 w-16"
    },
    { 
      name: "Cornell University", 
      shortName: "Cornell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/2048px-Cornell_University_seal.svg.png",
      size: "h-16 w-16"
    },
    { 
      name: "University of Pennsylvania", 
      shortName: "UPenn",
      logo: "https://branding.web-resources.upenn.edu/sites/default/files/styles/card_3x2/public/2022-03/UniversityofPennsylvania_Shield_RGB-2.png?h=3c287ac3&itok=HgG1DNc-",
      size: "h-20 w-20"
    },
    { 
      name: "Johns Hopkins University", 
      shortName: "Johns Hopkins",
      logo: "https://logos-world.net/wp-content/uploads/2023/02/Johns-Hopkins-University-Symbol.png",
      size: "h-20 w-20"
    },
    { 
      name: "Northwestern University", 
      shortName: "Northwestern",
      logo: "https://1000logos.net/wp-content/uploads/2019/12/Northwestern-Wildcats-Logo.jpg",
      size: "h-20 w-20"
    },
    { 
      name: "Duke University", 
      shortName: "Duke",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Duke_University_seal.svg/1200px-Duke_University_seal.svg.png",
      size: "h-16 w-16"
    },
    { 
      name: "University of Michigan", 
      shortName: "Michigan",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/University_of_Michigan_seal.svg/1200px-University_of_Michigan_seal.svg.png",
      size: "h-16 w-16"
    },
  ];

  // Duplicate the array to create seamless scrolling
  const duplicatedUniversities = [...universities, ...universities];

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm border-b border-orange-200 py-4 overflow-hidden">
      <div className="relative w-full overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex animate-carousel">
          {universities.map((university, index) => (
            <div
              key={index}
              className="relative mx-4 flex h-20 w-20 items-center justify-center image-hover"
            >
              <img
                src={university.logo}
                alt={university.name}
                className="h-full w-full object-contain transition-all duration-300 hover:scale-110"
                style={{
                  maxWidth: university.size || '100%',
                  maxHeight: university.size || '100%',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
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
