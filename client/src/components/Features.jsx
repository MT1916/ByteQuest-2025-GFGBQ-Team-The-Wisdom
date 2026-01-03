import React from 'react';
import { Shield, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group"
    >
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon className="text-accent-dark stroke-[1.5]" size={32} />
        </div>
        <h3 className="text-xl font-serif font-bold text-primary-dark mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
);

const Features = () => {
    return (
        <section id="features" className="py-20 relative z-10 -mt-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Shield}
                        title="Secure"
                        description="Smart contracts ensure funds reach verified causes"
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={Eye}
                        title="Transparent"
                        description="Every transaction is recorded on the blockchain"
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Instant"
                        description="Direct transfers with minimal fees"
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
