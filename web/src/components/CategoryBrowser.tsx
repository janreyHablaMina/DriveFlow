'use client';

import AnimateOnScroll from './AnimateOnScroll';

export default function CategoryBrowser() {
  const selectCategory = (category: string) => {
    const el = document.getElementById('section-inventory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    window.dispatchEvent(new CustomEvent('filter-inventory', { detail: category }));
  };

  const categories = [
    {
      name: 'Family SUVs',
      desc: 'Spacious, safe, and ready for weekend road trips or school runs.',
      stock: '24 In Stock',
      img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Daily Commuters',
      desc: 'Fuel-efficient sedans and hatchbacks perfect for city driving.',
      stock: '18 In Stock',
      img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Work & Utility',
      desc: 'Tough, reliable pickup trucks built for business and heavy lifting.',
      stock: '12 In Stock',
      img: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Premium Collection',
      desc: 'Luxury and sports vehicles for when you want to make a statement.',
      stock: '8 In Stock',
      img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="section-categories" className="px-6 lg:px-12 py-14 border-b border-white/10 bg-carbon">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll direction="up">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-black text-red-500 uppercase tracking-widest">// SHOP BY LIFESTYLE</span>
              <h2 className="text-3xl font-black italic uppercase mt-1">Browse Inventory</h2>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <AnimateOnScroll key={cat.name} delay={idx * 100} direction="up">
              <div 
                onClick={() => selectCategory(cat.name)} 
                className="relative h-[280px] overflow-hidden group cursor-pointer border border-white/10 hover:border-red-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-sm"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" 
                  style={{ backgroundImage: `url('${cat.img}')` }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 opacity-90 group-hover:opacity-100 transition duration-500" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-red-500 font-black text-[10px] tracking-widest mb-1 drop-shadow-md">CATEGORY //</span>
                  <h3 className="font-black text-xl uppercase text-white group-hover:text-red-500 transition-colors drop-shadow-md">{cat.name}</h3>
                  <p className="font-body text-xs text-slate-300 mt-2 line-clamp-2">{cat.desc}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-bold text-white bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">{cat.stock}</span>
                    <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 font-black text-xs flex items-center gap-1">
                      EXPLORE <span className="transition-transform group-hover:translate-x-1 duration-300">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
