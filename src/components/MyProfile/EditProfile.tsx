import { useState, useEffect, useRef } from 'react';
import { Camera, Check } from 'lucide-react';

export function EditProfile() {
    const [profile, setProfile] = useState({
        name: 'Danish Sheikh',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
        bio: 'Entertainment Seeker',
        location: 'Mumbai',
        website: 'https://danishsheikh.dev',
        phone: '+91 98765 43210',
        dob: '1998-05-15'
    });

    const [isSaved, setIsSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync state from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            setProfile({
                name: parsed.name || 'Danish Sheikh',
                avatar: parsed.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
                bio: parsed.bio || '',
                location: parsed.location || 'Mumbai',
                website: parsed.website || '',
                phone: parsed.phone || '',
                dob: parsed.dob || ''
            });
        }
    }, []);

    const handleChange = (field: keyof typeof profile, value: string) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    handleChange('avatar', event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify({
            name: profile.name,
            avatar: profile.avatar,
            location: profile.location,
            bio: profile.bio,
            website: profile.website,
            phone: profile.phone,
            dob: profile.dob
        }));
        
        // Notify other components (Header, Profile page) of the storage update
        window.dispatchEvent(new Event('storage'));
        
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
            window.location.reload();
        }, 1200);
    };

    return (
        <form onSubmit={handleSave} className="space-y-5 text-white">
            {/* Hidden avatar input */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                accept="image/*" 
                className="hidden" 
            />

            {/* 1. Change Image */}
            <div className="flex flex-col items-center pb-2">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 p-[3px] bg-black/40 shadow-xl transition-all group-hover:border-primary">
                        <img 
                            src={profile.avatar} 
                            alt="Avatar Preview" 
                            className="w-full h-full object-cover rounded-full" 
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Camera size={18} className="text-white" />
                    </div>
                </div>
                <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()} 
                    className="text-primary hover:text-vivid text-xs font-semibold mt-2.5 transition-colors"
                >
                    Change Photo
                </button>
            </div>

            {/* 2. Full Name */}
            <div>
                <label className="block text-xs font-semibold text-white/60 mb-2">Full Name</label>
                <input 
                    type="text" 
                    required 
                    value={profile.name} 
                    onChange={e => handleChange('name', e.target.value)}
                    placeholder="Enter your full name" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
                />
            </div>

            {/* 3. Bio */}
            <div>
                <label className="block text-xs font-semibold text-white/60 mb-2">Bio</label>
                <textarea 
                    value={profile.bio} 
                    onChange={e => handleChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-primary text-sm transition-all h-20 resize-none"
                />
            </div>

            {/* Grid for two-column items */}
            <div className="grid grid-cols-2 gap-4">
                {/* 4. Location */}
                <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2">Location</label>
                    <input 
                        type="text" 
                        value={profile.location} 
                        onChange={e => handleChange('location', e.target.value)}
                        placeholder="City, Country" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
                    />
                </div>

                {/* 5. Website */}
                <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2">Website</label>
                    <input 
                        type="text" 
                        value={profile.website} 
                        onChange={e => handleChange('website', e.target.value)}
                        placeholder="https://example.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* 6. Mobile Number */}
                <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2">Mobile Number</label>
                    <input 
                        type="tel" 
                        value={profile.phone} 
                        onChange={e => handleChange('phone', e.target.value)}
                        placeholder="+91 XXXXX XXXXX" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
                    />
                </div>

                {/* 7. DOB */}
                <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2">Date of Birth</label>
                    <input 
                        type="date" 
                        value={profile.dob} 
                        onChange={e => handleChange('dob', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-primary text-sm transition-all select-none"
                    />
                </div>
            </div>

            {/* Save Button */}
            <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-vivid text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg active:scale-95 text-xs flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
                {isSaved ? (
                  <>
                    <Check size={16} /> Saved Successfully
                  </>
                ) : (
                  "Save Changes"
                )}
            </button>
        </form>
    );
}
