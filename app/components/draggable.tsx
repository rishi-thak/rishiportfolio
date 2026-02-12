"use client";

import { useState, useEffect, useRef } from "react";

interface DraggableProps {
     children: React.ReactNode;
     initialPos?: { x: number; y: number };
     className?: string;
}

export default function Draggable({ children, initialPos = { x: 20, y: 20 }, className = "" }: DraggableProps) {
     const [position, setPosition] = useState(initialPos);
     const [isDragging, setIsDragging] = useState(false);
     const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
     const hasDragged = useRef(false);
     const cardRef = useRef<HTMLDivElement>(null);

     // Initialize position if provided (and handled by parent if needed, but here simple state)
     // Note: if initialPos changes, we might want to update, but usually it's just initial.

     // Center if x/y are negative/special? No, just trust inputs.

     const handleMouseDown = (e: React.MouseEvent) => {
          // Only left click
          if (e.button !== 0) return;

          setIsDragging(true);
          hasDragged.current = false;
          setDragOffset({
               x: e.clientX - position.x,
               y: e.clientY - position.y
          });
          // Don't prevent default here otherwise inputs inside won't focus, 
          // but for text selection usually we want to prevent. 
          // For now, prevent default is good for cards.
          e.preventDefault();
     };

     useEffect(() => {
          const handleMouseMove = (e: MouseEvent) => {
               if (isDragging) {
                    // If moved more than a tiny bit, count as drag
                    hasDragged.current = true;

                    let newX = e.clientX - dragOffset.x;
                    let newY = e.clientY - dragOffset.y;

                    // Clamping logic (10px margin)
                    if (cardRef.current) {
                         const rect = cardRef.current.getBoundingClientRect();
                         const margin = 10;
                         const maxX = window.innerWidth - rect.width - margin;
                         const maxY = window.innerHeight - rect.height - margin;

                         if (newX < margin) newX = margin;
                         if (newX > maxX) newX = maxX;
                         if (newY < margin) newY = margin;
                         if (newY > maxY) newY = maxY;
                    }

                    setPosition({ x: newX, y: newY });
               }
          };

          const handleMouseUp = () => {
               setIsDragging(false);
          };

          if (isDragging) {
               window.addEventListener('mousemove', handleMouseMove);
               window.addEventListener('mouseup', handleMouseUp);
          }

          return () => {
               window.removeEventListener('mousemove', handleMouseMove);
               window.removeEventListener('mouseup', handleMouseUp);
          };
     }, [isDragging, dragOffset]);

     // Intercept clicks if we dragged
     const handleClickCapture = (e: React.MouseEvent) => {
          if (hasDragged.current) {
               e.stopPropagation();
               // e.preventDefault(); // Optional, but stopPropagation is key for React events
          }
     };

     return (
          <div
               ref={cardRef}
               className={className}
               onMouseDown={handleMouseDown}
               onClickCapture={handleClickCapture}
               style={{
                    position: 'fixed',
                    left: position.x,
                    top: position.y,
                    cursor: isDragging ? 'grabbing' : 'grab',
                    zIndex: isDragging ? 999 : 50, // pop to top when dragging
                    touchAction: 'none'
               }}
          >
               {children}
          </div>
     );
}
