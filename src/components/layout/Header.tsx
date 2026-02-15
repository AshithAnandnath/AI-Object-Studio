import React from 'react';
import { Box } from 'lucide-react';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
    return (
        <header className="border-b" style={{ borderBottom: '1px solid var(--border)', padding: '1rem 0' }}>
            <div className="container flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Box className="text-primary" style={{ color: 'var(--primary)' }} />
                    <span className="font-bold text-xl">AI 3D Gen</span>
                </div>
                <nav className="hidden md:flex items-center gap-4" style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it works</a>
                    <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
                    <Button variant="outline" size="sm">GitHub</Button>
                </nav>
            </div>
        </header>
    );
};
