// src/ui/sticky-scroll-reveal.js
import React, { useRef, useEffect } from 'react';

export function StickyScroll({ content }) {
  const revealRef = useRef(null);

  useEffect(() => {
    const revealElement = revealRef.current;
    if (!revealElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          } else {
            entry.target.classList.remove('revealed');
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    observer.observe(revealElement);

    return () => {
      observer.unobserve(revealElement);
    };
  }, []);

  return (
    <div className="sticky-scroll-container">
      {content.map((item, index) => (
        <div key={index} ref={revealRef} className="sticky-scroll-item">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          {item.content}
        </div>
      ))}
    </div>
  );
}
