'use client';

import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`overflow-hidden rounded-lg bg-white shadow ${className}`}>
      {children}
    </div>
  );
};

export default Card;