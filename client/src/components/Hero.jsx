import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

const Hero = () => {
    const navigate = useNavigate();
    const { connectWallet, isConnected } = useWeb3();

    const handleStartGiving = () => {
        const element = document.getElementById('role-selection');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    const handleLearnMore = () => {
        const element = document.getElementById('how-it-works');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-pattern">
            {/* Background Decor Elements - Subtle faint shapes */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-1.5 rounded-full mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-sm font-medium text-primary-dark">Powered by Blockchain Technology</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold font-serif text-primary-dark mb-6 leading-tight"
                >
                    Transparent <span className="text-accent italic">Zakaat</span> <br />
                    for the Modern Ummah
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-arabic text-2xl text-accent mb-6"
                >
                    الزكاة الشفافة للأمة الحديثة
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Give your Zakaat with confidence. Track every donation from wallet to beneficiary with immutable blockchain records and verified NGO partners.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={handleStartGiving}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Start Giving <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={handleLearnMore}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-primary/20 hover:border-primary text-primary-dark px-8 py-4 rounded-xl font-semibold transition-all hover:bg-custom-offwhite"
                    >
                        Learn More
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
