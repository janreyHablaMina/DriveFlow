import AnimateOnScroll from './AnimateOnScroll';

export default function NewArrivals() {
  const arrivals = [
    {
      name: '2026 Porsche 718 Cayman GT4 RS',
      price: '₱6,400,000',
      img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: '2026 Chevrolet Corvette Z06 3LZ',
      price: '₱8,900,000',
      img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: '2026 Alfa Romeo Giulia Quadrifoglio',
      price: '₱4,950,000',
      img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=700&q=80',
    },
  ];

  return (
    <section className="px-6 lg:px-12 py-14 border-b border-white/10 bg-[#0a0a0e]">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll direction="up">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black uppercase italic">Fresh Showroom Arrivals</h2>
            <span className="text-xs font-mono text-red-500">Inspected & Documented This Week</span>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {arrivals.map((item, idx) => (
            <AnimateOnScroll key={item.name} delay={idx * 100} direction="up">
              <div className="p-4 bg-black/60 border border-white/10 hover:border-red-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] rounded-sm group cursor-pointer">
                <div className="h-44 bg-slate-800 mb-3 overflow-hidden rounded-sm relative">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover image-hover-zoom" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-[10px] font-mono bg-red-600/20 text-red-500 px-2 py-0.5 border border-red-600/40 inline-block">OFFICIALLY DOCUMENTED</span>
                <h3 className="font-black text-sm text-white mt-2 group-hover:text-red-500 transition-colors line-clamp-1">{item.name}</h3>
                <p className="text-sm text-red-500 font-black mt-1">{item.price}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
