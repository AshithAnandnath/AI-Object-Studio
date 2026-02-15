import React from 'react';
import { Button } from '../common/Button';
import { Download, RotateCcw, Share2, Maximize } from 'lucide-react';

interface ViewerControlsProps {
    onExport: (format: 'obj' | 'stl') => void;
    onReset: () => void;
}

export const ViewerControls: React.FC<ViewerControlsProps> = ({ onExport, onReset }) => {
    return (
        <div className="flex flex-wrap gap-2 justify-between items-center bg-secondary/10 p-4 rounded-lg border border-border mt-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', marginTop: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <div className="flex gap-2" style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="secondary" size="sm" icon={RotateCcw} onClick={onReset}>Reset View</Button>
                <Button variant="ghost" size="sm" icon={Maximize}>Fullscreen</Button>
            </div>

            <div className="flex gap-2" style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="outline" size="sm" icon={Share2}>Share</Button>
                <Button variant="primary" size="sm" icon={Download} onClick={() => onExport('obj')}>Export OBJ</Button>
            </div>
        </div>
    );
};
