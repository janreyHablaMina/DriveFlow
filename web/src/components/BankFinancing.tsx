'use client';

import { ShieldCheck, Target, Users, ArrowRight } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

export default function AboutCompany() {
  return (
    <section id="section-about" className="px-4 sm:px-6 lg:px-12 py-12 sm:py-20 border-b border-white/10 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-carbon opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Image Layout */}
          <AnimateOnScroll direction="left">
            <div className="relative group">
              <div className="absolute -inset-4 bg-red-600/15 blur-2xl rounded-full group-hover:bg-red-600/25 transition-all duration-700"></div>
              <div className="relative h-[280px] sm:h-[420px] lg:h-[500px] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80" 
                  alt="DriveFlow Dealership" 
                  className="w-full h-full object-cover image-hover-zoom transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="bg-black/85 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-sm inline-flex items-center gap-3.5 sm:gap-4 transition-transform duration-500 group-hover:translate-x-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 flex items-center justify-center rounded-sm text-white font-black text-lg sm:text-xl italic shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                      10+
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Years of Trust</p>
                      <p className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">Serving Metro Manila</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right Side: Content */}
          <AnimateOnScroll direction="right" delay={150}>
            <div>
              <span className="text-[11px] sm:text-xs font-black text-red-500 uppercase tracking-widest block mb-2">// THE DRIVEFLOW DIFFERENCE</span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black italic uppercase text-white mb-4 sm:mb-6 leading-[1.15] sm:leading-[1.1]">
                Redefining the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Dealership Experience.</span>
              </h2>
              
              <p className="font-body text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8 leading-relaxed">
                Founded on the principles of absolute transparency and premium service, DriveFlow Motors Manila is not just a dealership—we are your automotive partner. Whether you are buying your first daily commuter, upgrading to a safe family SUV, or investing in a premium sports car, our team ensures every single vehicle is 200-point inspected, legally verified, and road-ready.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 mb-8 sm:mb-10">
                <div className="flex gap-3 sm:gap-4 items-start group/item">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 shrink-0 mt-0.5 transition-colors group-hover/item:border-red-500 group-hover/item:bg-red-600/20">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white uppercase tracking-wider mb-1">Zero Compromise Inspection</h4>
                    <p className="text-xs font-body text-slate-400 leading-relaxed">Every vehicle passes a rigorous 200-point mechanical and structural audit before hitting our showroom floor.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 sm:gap-4 items-start group/item">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 shrink-0 mt-0.5 transition-colors group-hover/item:border-red-500 group-hover/item:bg-red-600/20">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white uppercase tracking-wider mb-1">Transparent Pricing</h4>
                    <p className="text-xs font-body text-slate-400 leading-relaxed">No hidden fees, no gimmicks. The price you see is the price you pay, with all paperwork handled by us.</p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4 items-start group/item">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 shrink-0 mt-0.5 transition-colors group-hover/item:border-red-500 group-hover/item:bg-red-600/20">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white uppercase tracking-wider mb-1">Client-First Culture</h4>
                    <p className="text-xs font-body text-slate-400 leading-relaxed">From test drive to delivery, our dedicated specialists treat every customer with the same premium white-glove service.</p>
                  </div>
                </div>
              </div>

              <button className="button-shimmer w-full sm:w-auto bg-racing-red hover:bg-white hover:text-black text-white font-bold text-xs px-8 py-3.5 sm:py-4 uppercase transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.3)] inline-flex items-center justify-center gap-2 group rounded cursor-pointer">
                <span>Meet The Team</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
