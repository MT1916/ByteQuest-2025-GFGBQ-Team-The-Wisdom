import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import RoleSelection from '../components/RoleSelection';
import HowItWorks from '../components/HowItWorks';
import Campaigns from '../components/Campaigns';

const Home = () => {
    return (
        <div className="min-h-screen bg-cream font-sans">
            <Navbar />
            <Hero />
            <Features />
            <Stats />
            <RoleSelection />
            <HowItWorks />
            <Campaigns />

            {/* Simple Footer */}
            <footer className="bg-primary-dark text-white py-12 border-t border-white/10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-serif font-bold mb-4">ZakaatChain</h2>
                    <p className="text-white/60 mb-6">Transparent Zakat for the Modern Ummah</p>
                    <div className="text-sm text-white/40">
                        &copy; {new Date().getFullYear()} ZakaatChain. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
