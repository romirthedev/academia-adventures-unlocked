import React, { useRef, useEffect } from 'react';

const tags = [
  'AI',
  'Scholarships',
  'IvyLeague',
  'STEM',
  'LiberalArts',
  'FinancialAid',
  'CampusLife',
  'Research',
  'StudyAbroad',
  'Internships',
  'Diversity',
  'Athletics',
  'Rankings',
  'Admissions',
  'Professors',
  'Opportunities',
];

const TagCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let animationFrame: number;
    const speed = 1.2; // px per frame, increased for more visible movement

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += speed;
      }
      animationFrame = requestAnimationFrame(scroll);
    };
    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Duplicate tags for seamless looping
  const tagList = [...tags, ...tags];

  return (
    <div className="w-full overflow-x-hidden py-2">
      <div
        ref={containerRef}
        className="flex gap-3 whitespace-nowrap no-scrollbar"
        style={{ scrollBehavior: 'auto' }}
      >
        {tagList.map((tag, idx) => (
          <span
            key={idx}
            className="inline-block bg-orange-100 text-orange-700 font-semibold px-4 py-1 rounded-full shadow-sm border border-orange-200 text-sm hover:bg-orange-200 transition-colors duration-200 cursor-pointer select-none"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagCarousel; 