import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem 0', marginTop: 'auto' }}>
            <div className="container text-center">
                <p className="text-sm text-muted">
                    &copy; {new Date().getFullYear()} AI 3D Gen. Built with React, Three.js & TypeScript.
                </p>
            </div>
        </footer>
    );
};
