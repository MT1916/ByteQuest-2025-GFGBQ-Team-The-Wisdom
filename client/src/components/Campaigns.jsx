import React from 'react';
import { MapPin, Clock, Users, CheckCircle2 } from 'lucide-react';

// Using placeholder images that match the context
const campaigns = [
    {
        id: 1,
        title: "Emergency Food Aid - Gaza",
        organization: "Islamic Relief",
        location: "Palestine",
        raised: 3850000,
        target: 5000000,
        donors: 245,
        daysLeft: 15,
        imageUrl: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Child smiling
        verified: true
    },
    {
        id: 2,
        title: "Clean Water Wells - Somalia",
        organization: "Muslim Aid",
        location: "Somalia",
        raised: 1820000,
        target: 2500000,
        donors: 156,
        daysLeft: 22,
        imageUrl: "https://images.unsplash.com/photo-1584824388179-8e4f8e0d6a9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Water well context
        verified: true
    },
    {
        id: 3,
        title: "Orphan Education Fund",
        organization: "Helping Hand",
        location: "Bangladesh",
        raised: 1280000,
        target: 1500000,
        donors: 89,
        daysLeft: 30,
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Children studying
        verified: true
    }
];

const CampaignCard = ({ data }) => {
    const progress = (data.raised / data.target) * 100;

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={data.imageUrl}
                    alt={data.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {data.verified && (
                    <div className="absolute top-4 right-4 bg-accent text-primary-dark text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <CheckCircle2 size={12} /> Verified
                    </div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white/90 text-sm font-medium">{data.organization}</p>
                    <h3 className="text-white text-xl font-bold font-serif">{data.title}</h3>
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <MapPin size={16} className="text-accent" />
                    <span>{data.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    Providing essential support to families in need. Your Zakaat can make a real difference today.
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-bold text-primary-dark">₹{data.raised.toLocaleString()}</span>
                        <span className="text-gray-500">of ₹{data.target.toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{data.donors} donors</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{data.daysLeft} days left</span>
                    </div>
                </div>

                <button className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-xl transition-colors">
                    Donate Zakaat
                </button>
            </div>
        </div>
    );
};

const Campaigns = () => {
    return (
        <section id="campaigns" className="py-24 bg-cream-dark/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-accent font-bold tracking-widest text-sm uppercase mb-2 block">Active Campaigns</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-4">Verified Causes</h2>
                    <p className="font-arabic text-2xl text-accent/80 mb-6">قضايا موثقة</p>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        All campaigns are verified by our validator network to ensure your Zakaat reaches those in need.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {campaigns.map(campaign => (
                        <CampaignCard key={campaign.id} data={campaign} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Campaigns;
