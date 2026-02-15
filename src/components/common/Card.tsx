import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
    const cardStyle: React.CSSProperties = {
        backgroundColor: 'var(--secondary)',
        borderRadius: 'var(--radius)',
        padding: '1.5rem',
        border: '1px solid var(--border)',
        color: 'var(--secondary-foreground)',
    };

    return (
        <div style={cardStyle} className={className}>
            {title && (
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};
