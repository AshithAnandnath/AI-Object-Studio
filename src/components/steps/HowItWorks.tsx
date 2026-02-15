import React from 'react';
import { Container } from '../layout/Container';
import { Camera, Cpu, Box } from 'lucide-react';

const steps = [
    {
        icon: Camera,
        title: 'Capture',
        description: 'Take a photo of an object or upload an existing image.',
    },
    {
        icon: Cpu,
        title: 'Process',
        description: 'Our AI analyzes the object and reconstructs its 3D geometry.',
    },
    {
        icon: Box,
        title: 'Interact',
        description: 'View, rotate, and export your new 3D model.',
    },
];

export const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="py-20" style={{ padding: '5rem 0' }}>
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                    <p className="text-muted">Three simple steps to go from photo to 3D model.</p>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center max-w-xs relative z-10">
                            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6 text-primary border border-border" style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid var(--border)', color: 'var(--primary)' }}>
                                <step.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted">{step.description}</p>

                            {/* Connector line simplified for this version */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border -z-10 transform translate-x-1/2" style={{ display: 'none' }}></div>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
