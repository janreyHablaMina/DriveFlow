'use client';

import { ArrowRight, Calendar, Clock, Car, Phone, User, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

export default function TestDriveBooking() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after 5 seconds to simulate a fresh state
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="section-testdrive" className="px-4 sm:px-6 lg:px-12 py-12 sm:py-20 border-b border-white/10 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-carbon opacity-30 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimateOnScroll direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 rounded-sm overflow-hidden shadow-2xl group">
            
            {/* Left Side: Image & Info (Desktop only) */}
            <div className="relative h-[400px] lg:h-auto hidden lg:block overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80" 
                alt="Test Drive Experience" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
              
              <div className="absolute bottom-10 left-10 right-10">
                <span className="text-xs font-black text-red-500 uppercase tracking-widest block mb-2">// VIP EXPERIENCE</span>
                <h2 className="text-3xl sm:text-4xl font-black italic uppercase text-white mb-4 leading-tight">
                  Get Behind <br/> The Wheel.
                </h2>
                <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                  Words and specs only tell half the story. Schedule a personalized test drive with our specialists to truly feel the performance, comfort, and engineering of your next vehicle.
                </p>
              </div>
            </div>

            {/* Right Side: Booking Form */}
            <div className="bg-[#0e0e14] p-5 sm:p-8 lg:p-12">
              <div className="lg:hidden mb-6">
                <span className="text-[11px] font-black text-red-500 uppercase tracking-widest block mb-1.5">// VIP EXPERIENCE</span>
                <h2 className="text-2xl sm:text-3xl font-black italic uppercase text-white mb-2">Schedule A Test Drive</h2>
                <p className="text-xs sm:text-sm text-slate-400">Experience your next vehicle with a private guided showroom drive.</p>
              </div>

              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 sm:py-20">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white mb-2">Request Received</h3>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-xs mx-auto">Our concierge team will contact you shortly to confirm your appointment time.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 sm:mb-2">First Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input required type="text" placeholder="John" className="w-full bg-black border border-white/10 text-base sm:text-sm text-white py-3 pl-11 pr-4 outline-none focus:border-red-500 transition-colors rounded-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 sm:mb-2">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input required type="text" placeholder="Doe" className="w-full bg-black border border-white/10 text-base sm:text-sm text-white py-3 pl-11 pr-4 outline-none focus:border-red-500 transition-colors rounded-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 sm:mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input required type="tel" placeholder="+63 917 000 0000" className="w-full bg-black border border-white/10 text-base sm:text-sm text-white py-3 pl-11 pr-4 outline-none focus:border-red-500 transition-colors rounded-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 sm:mb-2">Vehicle of Interest</label>
                      <div className="relative">
                        <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input required type="text" placeholder="e.g. Ford Everest" className="w-full bg-black border border-white/10 text-base sm:text-sm text-white py-3 pl-11 pr-4 outline-none focus:border-red-500 transition-colors rounded-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 sm:mb-2">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input required type="date" className="w-full bg-black border border-white/10 text-base sm:text-sm text-slate-300 py-3 pl-11 pr-4 outline-none focus:border-red-500 transition-colors rounded-sm" style={{colorScheme: 'dark'}} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 sm:mb-2">Preferred Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <select required className="w-full bg-black border border-white/10 text-base sm:text-sm text-slate-300 py-3 pl-11 pr-4 outline-none focus:border-red-500 transition-colors rounded-sm appearance-none cursor-pointer">
                          <option value="">Select Time</option>
                          <option value="morning">Morning (9AM - 12PM)</option>
                          <option value="afternoon">Afternoon (1PM - 4PM)</option>
                          <option value="late">Late Afternoon (4PM - 6PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <button type="submit" className="button-shimmer w-full bg-racing-red hover:bg-white hover:text-black active:bg-red-700 text-white font-black text-xs px-6 py-3.5 sm:py-4 uppercase transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.3)] flex items-center justify-center gap-2 group/btn rounded-sm cursor-pointer">
                      Confirm Appointment <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-center text-[10px] text-slate-500 mt-3 sm:mt-4 font-mono">
                      By booking, you agree to receive a confirmation call from our team.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
