
import React, { useState, useEffect } from 'react';

interface AnimatedPlaceholderProps {
  placeholders: string[];
  className?: string;
}

const AnimatedPlaceholder: React.FC<AnimatedPlaceholderProps> = ({ 
  placeholders, 
  className = "" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPlaceholder = placeholders[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing effect
        if (displayText.length < currentPlaceholder.length) {
          setDisplayText(currentPlaceholder.slice(0, displayText.length + 1));
        } else {
          // Start deleting after a pause
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting effect
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Move to next placeholder
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % placeholders.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, placeholders]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-orange-500">|</span>
    </span>
  );
};

export default AnimatedPlaceholder;
