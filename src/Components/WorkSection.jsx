import { CheckCircle, Users, FileCheck, ArrowRight } from 'lucide-react';

const WorkSection = () => {
    return (
        <div>
            {/* How It Works */}
            <section className="py-20  px-10 bg-linear-to-br from-[#063A3A] via-[#0a5555] to-[#063A3A] relative overflow-hidden">
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-[#CBDCBD] rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#CBDCBD] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    
                    {/* Header */}
                    <div className="text-center mb-20">
                        <div className="inline-block px-6 py-3 bg-[#CBDCBD]/20 backdrop-blur-sm rounded-full border-2 border-[#CBDCBD]/30 mb-6">
                            <span className="text-[#CBDCBD] font-bold text-lg">⚡ Simple Process</span>
                        </div>
                        <h2 className="text-6xl font-black text-[#CBDCBD] mb-6">How It Works</h2>
                        <p className="text-2xl text-[#CBDCBD]/80">Get started in three easy steps</p>
                    </div>

                    {/* Steps Container */}
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
                        
                        {/* Animated Connection Arrows */}
                        <div className="hidden md:block absolute top-32 left-[25%] w-[20%]">
                            <div className="flex items-center justify-center">
                                <div className="flex-1 h-1 bg-gradient-to-r from-[#CBDCBD] to-transparent"></div>
                                <ArrowRight className="w-8 h-8 text-[#CBDCBD] animate-pulse" />
                                <div className="flex-1 h-1 bg-gradient-to-l from-[#CBDCBD] to-transparent"></div>
                            </div>
                        </div>
                        <div className="hidden md:block absolute top-32 right-[25%] w-[20%]">
                            <div className="flex items-center justify-center">
                                <div className="flex-1 h-1 bg-gradient-to-r from-[#CBDCBD] to-transparent"></div>
                                <ArrowRight className="w-8 h-8 text-[#CBDCBD] animate-pulse" />
                                <div className="flex-1 h-1 bg-gradient-to-l from-[#CBDCBD] to-transparent"></div>
                            </div>
                        </div>
                        
                        {[
                            { 
                                step: '01', 
                                title: 'HR Registration', 
                                desc: 'HR manager creates account, sets up company profile, and adds asset inventory to the system', 
                                icon: FileCheck,
                                color: 'from-[#CBDCBD] to-[#d4e5c7]'
                            },
                            { 
                                step: '02', 
                                title: 'Employee Requests', 
                                desc: 'Employees register, request company access, and submit asset requests through intuitive interface', 
                                icon: Users,
                                color: 'from-[#d4e5c7] to-[#e0f0d5]'
                            },
                            { 
                                step: '03', 
                                title: 'Auto Assignment', 
                                desc: 'HR approves requests, assets are assigned, and system tracks everything automatically', 
                                icon: CheckCircle,
                                color: 'from-[#e0f0d5] to-[#CBDCBD]'
                            }
                        ].map((step, i) => (
                            <div key={i} className="relative group">
                                
                                {/* Card Container with Gradient Border Effect */}
                                <div className="relative bg-gradient-to-br from-[#CBDCBD]/10 to-transparent backdrop-blur-sm rounded-3xl p-8 border-2 border-[#CBDCBD]/30 hover:border-[#CBDCBD] transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#CBDCBD]/20">
                                    
                                    {/* Step Number Badge - Top Right */}
                                    <div className="absolute -top-4 -right-4 z-20">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl border-4 border-[#063A3A] transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                                            <span className="text-3xl font-black text-[#063A3A]">{step.step}</span>
                                        </div>
                                    </div>

                                    {/* Icon Container */}
                                    <div className="relative mb-8 flex justify-center">
                                        <div className={`w-32 h-32 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 relative overflow-hidden`}>
                                            {/* Shine Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                            <step.icon className="w-16 h-16 text-[#063A3A] relative z-10" strokeWidth={2.5} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="text-center space-y-4">
                                        <h3 className="text-3xl font-black text-[#CBDCBD] group-hover:text-white transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-[#CBDCBD]/80 text-lg leading-relaxed group-hover:text-[#CBDCBD] transition-colors duration-300">
                                            {step.desc}
                                        </p>
                                    </div>

                                    
                                </div>

                                {/* Mobile Arrow */}
                                {i < 2 && (
                                    <div className="md:hidden flex justify-center my-6">
                                        <ArrowRight className="w-10 h-10 text-[#CBDCBD] rotate-90 animate-bounce" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default WorkSection;