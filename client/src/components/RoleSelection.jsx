import React from 'react';
import { Heart, Building2, ShieldCheck } from 'lucide-react';

const RoleCard = ({ icon: Icon, title, arabicTitle, description, color }) => (
    <div className="bg-cream-dark/50 p-8 rounded-2xl border border-gray-200 hover:border-primary/30 transition-all hover:bg-white hover:shadow-lg group cursor-pointer">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white ${color} group-hover:scale-110 transition-transform`}>
            <Icon size={28} />
        </div>
        <div className="flex items-baseline gap-3 mb-3">
            <h3 className="text-2xl font-serif font-bold text-primary-dark">{title}</h3>
            <span className="font-arabic text-accent text-lg">{arabicTitle}</span>
        </div>
        <p className="text-gray-600">{description}</p>
    </div>
);

const RoleSelection = () => {
    return (
        <section className="py-24 bg-cream">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-accent font-bold tracking-widest text-sm uppercase mb-2 block">Get Started</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-4">Choose Your Role</h2>
                    <p className="font-arabic text-2xl text-accent/80 mb-6">اختر دورك</p>
                    <p className="text-gray-600 text-lg">Select how you want to participate in the ZakaatChain ecosystem.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <RoleCard
                        icon={Heart}
                        title="Donor"
                        arabicTitle="متبرع"
                        description="Give Zakaat with full transparency"
                        color="bg-primary"
                    />
                    <RoleCard
                        icon={Building2}
                        title="NGO"
                        arabicTitle="منظمة"
                        description="Receive and distribute funds"
                        color="bg-accent"
                    />
                    <RoleCard
                        icon={ShieldCheck}
                        title="Validator"
                        arabicTitle="مدقق"
                        description="Verify and approve distributions"
                        color="bg-primary-dark"
                    />
                </div>
            </div>
        </section>
    );
};

export default RoleSelection;
