'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Are homologation track models street legal in the Philippines?",
      answer: "Yes. Every car is sold with official LTO NCR registration, BIR tax payment certificates, and passes all street safety requirements."
    },
    {
      question: "Do you accept luxury SUV trade-ins towards race coupés?",
      answer: "Yes, we provide instant trade-in appraisals within 60 minutes with trade-in values credited directly towards your track deposit."
    },
    {
      question: "What happens during the Clark International Speedway shakedown?",
      answer: "Our pit crew transports your machine to CIS, sets tire pressures and wing downforce, and provides 3 hot-lap coaching sessions."
    }
  ];

  return (
    <section id="section-faq" className="px-6 lg:px-16 py-14 border-b border-white/10 bg-[#0a0a0e]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase text-red-500 tracking-widest">// PIT WALL CLARIFICATIONS</span>
          <h2 className="text-3xl font-black italic uppercase mt-1">Frequently Examined Questions</h2>
        </div>

        <div className="space-y-3 font-body">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/15 bg-black/60 rounded">
              <button 
                onClick={() => toggleFaq(index)} 
                className="w-full p-4 text-left text-xs font-bold uppercase flex justify-between items-center text-white hover:text-red-500"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <div className={`p-4 pt-0 text-xs text-slate-400 border-t border-white/10 ${openIndex === index ? 'block' : 'hidden'}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
