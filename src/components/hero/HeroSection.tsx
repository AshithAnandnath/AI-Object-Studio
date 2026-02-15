import React from 'react';
import { Container } from '../layout/Container';
import { Button } from '../common/Button';
import { Box, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
    return (
        <section className="py-20 text-center relative overflow-hidden" style={{ padding: '5rem 0' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background opacity-20" style={{ pointerEvents: 'none' }} />
            <Container className="relative z-10 flex flex-col items-center gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-sm font-medium mb-4" style={{ borderRadius: '9999px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', padding: '0.25rem 0.75rem' }}>
                    <Box size={16} />
                    <span>AI-Powered 3D Generation</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4" style={{ fontSize: '3rem', lineHeight: 1.2 }}>
                    Turn Images into <span style={{ color: 'var(--primary)' }}>3D Models</span>
                </h1>

                <p className="text-lg text-muted max-w-2xl mb-8" style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', maxWidth: '42rem' }}>
                    Instantly capture objects using your camera or upload images to generate high-quality 3D assets for your projects. Powered by advanced computer vision.
                </p>

                <div className="flex flex-col sm:flex-row gap-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button size="lg" icon={ArrowRight}>Start Generating</Button>
                    <Button size="lg" variant="outline">View Gallery</Button>
                </div>
            </Container>
        </section>
    );
};
