import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const targetText = "MoJo Repairs";
  const [displayText, setDisplayText] = useState<string>("");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  
  useEffect(() => {
    let currentIndex = 0;
    const scrambleIntervals: number[] = [];
    
    const getRandomChar = (): string => 
      characters[Math.floor(Math.random() * characters.length)];
    
    const getScrambledText = (revealedCount: number): string => {
      return targetText
        .split('')
        .map((char, index) => {
          if (index < revealedCount) return char;
          return getRandomChar();
        })
        .join('');
    };

    const revealInterval = window.setInterval(() => {
      if (currentIndex <= targetText.length) {
        setDisplayText(getScrambledText(currentIndex));
        currentIndex++;
      } else {
        clearInterval(revealInterval);
        scrambleIntervals.forEach(clearInterval);
        if (onComplete) onComplete();
      }
    }, 200);

    for (let i = 0; i < targetText.length; i++) {
      const interval = window.setInterval(() => {
        if (i >= currentIndex) {
          setDisplayText(prev => {
            const chars = prev.split('');
            chars[i] = getRandomChar();
            return chars.join('');
          });
        }
      }, 50);
      
      scrambleIntervals.push(interval);
    }

    return () => {
      clearInterval(revealInterval);
      scrambleIntervals.forEach(clearInterval);
    };
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <h1 className="loading-text">{displayText}</h1>
    </div>
  );
};

export default LoadingScreen;