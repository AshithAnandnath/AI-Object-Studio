import React from 'react';
import { Container } from '../layout/Container';
import { Card } from '../common/Card';
import { Box, Scan, Download, Zap } from 'lucide-react';

const features = [
    {
        icon: Scan,
        title: 'Object Detection',
        description: 'Advanced CV algorithms automatically detect and mask objects from your images.',
    },
    {
        icon: Box,
        title: '3D Generation',
        description: 'Convert 2D images into textured 3D meshes ready for use in web and AR.',
    },
    {
        icon: Download,
        title: 'Instant Export',
        description: 'Download your models in standard formats like OBJ and STL for 3D printing or rendering.',
    },
    {
        icon: Zap,
        title: 'Real-time Preview',
        description: 'Interact with your generated models instantly in our high-performance web viewer.',
    },
];

export const FeaturesSection: React.FC = () => {
    return (
        <section id="features" className="py-20 bg-secondary/20" style={{ padding: '5rem 0', backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        Everything you need to bring physical objects into the digital world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {features.map((feature, index) => (
                        <Card key={index} className="hover:border-primary transition-colors" title={feature.title}>
                            <feature.icon className="text-primary mb-4" size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                            <p className="text-muted text-sm">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
};
