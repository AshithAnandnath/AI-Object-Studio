import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={`container ${className}`} style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            {children}
        </div>
    );
};
