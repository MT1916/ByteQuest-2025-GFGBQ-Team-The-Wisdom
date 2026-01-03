import React from 'react';
import { Wallet, Send, CheckCircle, FileText } from 'lucide-react';

const Step = ({ number, icon: Icon, title, arabicTitle, description }) => (
    <div className="relative flex flex-col items-center text-center max-w-xs mx-auto mb-12 md:mb-0 group">
        {/* Step Number Badge */}
        <div className="absolute -top-6 bg-accent text-primary-dark font-bold w-10 h-10 rounded-full flex items-center justify-center border-4 border-cream z-10 shadow-sm">
            0{number}
        </div>

        {/* Icon Circle */}
        <div className="w-24 h-24 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:bg-primary-dark transition-colors duration-300">
            <Icon size={40} className="stroke-[1.5]" />
        </div>

        <h3 className="text-xl font-serif font-bold text-primary-dark mb-1">{title}</h3>
        <span className="font-arabic text-accent text-sm mb-3 block">{arabicTitle}</span>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
);

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-cream relative overflow-hidden">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[45%] left-0 w-full h-0.5 bg-accent/20 -z-0" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-accent font-bold tracking-widest text-sm uppercase mb-2 block">Simple Process</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-4">How ZakaatChain Works</h2>
                    <p className="font-arabic text-2xl text-accent/80 mb-6">كيف تعمل زكاة بلوكشين</p>
                    <p className="text-gray-600 text-lg">A seamless journey from donation to impact, secured by blockchain technology.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    <Step
                        number="1"
                        icon={Wallet}
                        title="Connect Wallet"
                        arabicTitle="اتصل بالمحفظة"
                        description="Link your MetaMask wallet to access the platform securely."
                    />
                    <Step
                        number="2"
                        icon={Send}
                        title="Select & Donate"
                        arabicTitle="اختر وتبرع"
                        description="Choose verified campaigns and send Zakaat directly via smart contracts."
                    />
                    <Step
                        number="3"
                        icon={CheckCircle}
                        title="Validators Verify"
                        arabicTitle="التحقق"
                        description="Independent validators confirm the legitimate use of funds."
                    />
                    <Step
                        number="4"
                        icon={FileText}
                        title="Receive Receipt"
                        arabicTitle="استلم الإيصال"
                        description="Get an immutable IPFS receipt as proof of your donation."
                    />
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
