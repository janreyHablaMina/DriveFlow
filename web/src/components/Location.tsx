'use client';

export default function Location() {
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert("[VIP Viewing Booked]\nThank you for choosing DriveFlow Motors! A dedicated client advisor will contact you within 15 minutes to confirm your private showroom viewing.");
  };

  return (
    <>
      <section className="px-6 lg:px-16 py-14 border-b border-white/10 bg-carbon">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-black uppercase text-red-500 tracking-widest">// SHOWROOM LOCATION</span>
            <h2 className="text-3xl font-black italic uppercase mt-1 mb-4">DriveFlow Motors Showroom</h2>
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <p><strong className="text-white">Flagship Showroom:</strong> Circuit Makati Tarmac, Makati City, Metro Manila</p>
              <p><strong className="text-white">BGC Delivery Center:</strong> 5th Avenue, Bonifacio Global City, Taguig</p>
              <p><strong className="text-white">Sales Inquiries:</strong> +63 (2) 8877-CARS (2277) / sales@driveflow.ph</p>
              <p><strong className="text-white">Operating Hours:</strong> Monday – Saturday: 09:00 – 19:00 | Sunday: 10:00 – 17:00</p>
            </div>
          </div>
          <div className="h-64 bg-slate-900 border border-white/10 p-2">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.646849909244!2d121.0189!3d14.5756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c99dbec6370f%3A0x6a0f443b3b4fb553!2sCircuit%20Makati!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph" 
              width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(80%) contrast(120%)' }} 
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <section id="section-cta" className="px-6 lg:px-16 py-20 bg-black text-center relative overflow-hidden border-b-4 border-red-600">
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest skew-12 inline-block mb-4">
            <span className="unskew-12 inline-block">VIP PRIVATE SHOWROOM APPOINTMENT</span>
          </span>
          <h2 className="text-4xl sm:text-6xl font-black italic uppercase text-white mb-4">
            READY TO DRIVE <br /><span className="text-red-600">THE EXTRAORDINARY?</span>
          </h2>
          <p className="font-body text-xs sm:text-sm text-slate-400 mb-8 max-w-md mx-auto">
            Experience our premium inventory in person. Reserve your dedicated automotive advisor and vehicle test drive today.
          </p>
          <form onSubmit={handleBooking} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto font-body">
            <input type="text" placeholder="Your Full Name" required className="flex-1 bg-[#161622] border border-white/20 p-3 text-xs text-white outline-none focus:border-red-500" />
            <input type="tel" placeholder="+63 Mobile Number" required className="flex-1 bg-[#161622] border border-white/20 p-3 text-xs text-white outline-none focus:border-red-500" />
            <button type="submit" className="bg-racing-red hover:bg-red-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-white skew-12 whitespace-nowrap">
              <span className="unskew-12 inline-block">Book Private Viewing</span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
