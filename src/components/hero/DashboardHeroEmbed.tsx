
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Lazy load the dashboard component - handle named export
const Dashboard = React.lazy(() => 
  import('../webapp/CustomizableDashboard').then(module => ({
    default: module.CustomizableDashboard
  }))
);

interface DashboardHeroEmbedProps {
  className?: string;
  onClick?: () => void;
}

export const DashboardHeroEmbed: React.FC<DashboardHeroEmbedProps> = ({ 
  className = "",
  onClick 
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/dashboard');
    }
  };

  // Mock dashboard props for the embed
  const mockDashboardProps = {
    widgets: [
      {
        id: '1',
        title: 'Compliance Status',
        type: 'metric' as const,
        size: 'small' as const,
        position: { x: 0, y: 0 },
        visible: true,
        customizable: true,
      },
      {
        id: '2',
        title: 'Regulatory Calendar',
        type: 'calendar' as const,
        size: 'medium' as const,
        position: { x: 1, y: 0 },
        visible: true,
        customizable: true,
      },
      {
        id: '3',
        title: 'Risk Insights',
        type: 'chart' as const,
        size: 'large' as const,
        position: { x: 0, y: 1 },
        visible: true,
        customizable: true,
      },
    ],
    isCustomizing: false,
    onToggleCustomize: () => {},
    onWidgetUpdate: () => {},
    onAddWidget: () => {},
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onClick={handleClick}
      style={{
        width: '60%',
        height: 'auto',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        background: 'white'
      }}
    >
      <Suspense 
        fallback={
          <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading Dashboard...</div>
          </div>
        }
      >
        {!imageError ? (
          <div className="transform scale-75 origin-top-left" style={{ width: '133.33%', height: 'auto' }}>
            <Dashboard {...mockDashboardProps} />
          </div>
        ) : (
          <img 
            src="/lovable-uploads/f88a2e71-50de-4711-83ef-4788c6f169fa.png"
            alt="Synapses Dashboard Preview"
            className="w-full h-auto object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </Suspense>
      
      {/* Click overlay indicator */}
      <div className="absolute inset-0 bg-blue-600/0 hover:bg-blue-600/5 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
        <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
          <span className="text-sm font-medium text-gray-900">Click to explore →</span>
        </div>
      </div>
    </motion.div>
  );
};
