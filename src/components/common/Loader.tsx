import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
    size?: number;
    className?: string;
    text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 24, className = '', text }) => {
    return (
        <div className={`flex flex-col items-center justify-center ${className}`} style={{ gap: '0.5rem' }}>
            <Loader2
                size={size}
                className="animate-spin"
                style={{ animation: 'spin 1s linear infinite' }}
            />
            {text && <p className="text-sm text-muted">{text}</p>}
            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};
