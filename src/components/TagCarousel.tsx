
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
    const speed = 1.2;

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
            className="inline-block bg-white/10 text-white font-extralight px-4 py-1 rounded-full shadow-sm border border-white/20 text-sm hover:bg-white/20 transition-colors duration-200 cursor-pointer select-none backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagCarousel; 
