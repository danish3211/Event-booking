import React from 'react';

interface ProfileCardProps {
    name: string;
    subtitle: string;
    image: string;
    onFollow?: () => void;
    onClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, subtitle, image, onFollow, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center p-4 transition-transform hover:scale-105 cursor-pointer"
        >
            <div className="relative w-40 h-40 mb-4 group">
                <div className="absolute inset-0 rounded-full bg-primary/20 group-hover:bg-primary/30 blur-xl transition-all" />
                <img
                    src={image}
                    alt={name}
                    className="relative w-full h-full object-cover rounded-full border-2 border-primary/50 group-hover:border-primary shadow-lg"
                />
            </div>
            <h3 className="text-xl font-bold text-background mb-1">{name}</h3>
            <p className="text-surface font-medium mb-4">{subtitle}</p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onFollow?.();
                }}
                className="px-8 py-2 border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-colors"
            >
                Follow
            </button>
        </div>
    );
};

export default ProfileCard;
