'use client';

import { ShieldCheck, Target, Users, ArrowRight } from 'lucide-react';

export default function AboutCompany() {
  return (
    <section className="px-6 lg:px-16 py-20 border-b border-white/10 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-carbon opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Image Layout */}
          <div className="relative">
            <div className="absolute -inset-4 bg-red-600/20 blur-2xl rounded-full"></div>
            <div className="relative h-[400px] sm:h-[500px] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80" 
                alt="DriveFlow Dealership" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 backdrop-blur-md border border-white/10 p-5 rounded-sm inline-flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600 flex items-center justify-center rounded-sm text-white font-black text-xl italic">
                    10+
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wider">Years of Trust</p>
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Serving Metro Manila</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div>
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block mb-2">// THE DRIVEFLOW DIFFERENCE</span>
            <h2 className="text-4xl sm:text-5xl font-black italic uppercase text-white mb-6 leading-[1.1]">
              Redefining the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Dealership Experience.</span>
            </h2>
            
            <p className="font-body text-slate-400 mb-8 leading-relaxed">
              Founded on the principles of absolute transparency and premium service, DriveFlow Motors Manila is not just a dealership—we are your automotive partner. Whether you are buying your first daily commuter, upgrading to a safe family SUV, or investing in a premium sports car, our team ensures every single vehicle is 200-point inspected, legally verified, and road-ready.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-sm bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 shrink-0 mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-1">Zero Compromise Inspection</h4>
                  <p className="text-xs font-body text-slate-400 leading-relaxed">Every vehicle passes a rigorous 200-point mechanical and structural audit before hitting our showroom floor.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-sm bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 shrink-0 mt-1">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-1">Transparent Pricing</h4>
                  <p className="text-xs font-body text-slate-400 leading-relaxed">No hidden fees, no gimmicks. The price you see is the price you pay, with all paperwork handled by us.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-sm bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 shrink-0 mt-1">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-1">Client-First Culture</h4>
                  <p className="text-xs font-body text-slate-400 leading-relaxed">From test drive to delivery, our dedicated specialists treat every customer with the same premium white-glove service.</p>
                </div>
              </div>
            </div>

            <button className="bg-racing-red hover:bg-white hover:text-black text-white font-black text-xs px-8 py-4 uppercase transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] inline-flex items-center gap-2 group rounded-sm skew-12">
              <span className="unskew-12 flex items-center gap-2">
                Meet The Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
