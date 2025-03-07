'use client';

import { FC, ReactNode } from 'react';
import Card from '@/components/ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

const StatCard: FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
              <dd className="mt-1 text-3xl font-semibold text-indigo-600">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;