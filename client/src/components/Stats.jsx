import React from 'react';

const StatItem = ({ value, label, subLabel }) => (
    <div className="text-center">
        <div className="text-4xl md:text-5xl font-serif font-bold text-accent mb-2">{value}</div>
        <div className="text-white font-medium text-lg mb-1">{label}</div>
        <div className="text-white/60 font-arabic text-sm">{subLabel}</div>
    </div>
);

const Stats = () => {
    return (
        <section className="bg-primary py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    <StatItem value="2,500+" label="Verified Donors" subLabel="متبرعون موثقون" />
                    <StatItem value="150 ETH" label="Total Distributed" subLabel="إجمالي التوزيع" />
                    <StatItem value="45" label="Active NGOs" subLabel="منظمات نشطة" />
                    <StatItem value="100%" label="Transparency" subLabel="شفافية تامة" />
                </div>
            </div>
        </section>
    );
};

export default Stats;
