export default function Story() {
  return (
    <section id="section-story" className="px-6 lg:px-16 py-16 border-b border-white/10 bg-[#0a0a0e]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="h-80 bg-slate-900 border border-red-600/40 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80" alt="Paddock Garage" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-xs font-black uppercase text-red-500 tracking-widest">// PADDOCK ROOTS</span>
          <h2 className="text-3xl font-black italic uppercase mt-1 mb-4">Born in the Pit Lanes of Asia</h2>
          <p className="font-body text-xs text-slate-300 leading-relaxed mb-4">
            Founded in 2017 by Philippine national touring car and formula champions, Scuderia Corse Manila was built to eliminate boring, dishonest dealership experiences.
          </p>
          <p className="font-body text-xs text-slate-400 leading-relaxed mb-6">
            We speak throttle response, apex trail-braking, and mechanical honesty. Our Circuit Makati facility and Clark Speedway Bay 14 ensure your machine stays in race-ready form.
          </p>
          <span className="font-black text-lg text-white">THE RACE DIRECTORATE // SCUDERIA CORSE</span>
        </div>
      </div>
    </section>
  );
}
