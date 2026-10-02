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
      question: "Are all vehicles officially registered and road-legal in the Philippines?",
      answer: "Yes. Every car in our inventory is sold with complete and verified LTO NCR registration, BIR tax payment certificates, and clear title documentation."
    },
    {
      question: "Do you accept vehicle trade-ins or consignments?",
      answer: "Yes! We provide fast, complimentary 60-minute trade-in appraisals. The appraised value can be immediately credited toward the down payment of your chosen vehicle."
    },
    {
      question: "Which banks and financing options are supported?",
      answer: "We partner with major Philippine commercial banks including BDO, BPI, Metrobank, Security Bank, and RCBC to offer tailored payment tenures with low down payments and competitive rates."
    },
    {
      question: "What is included in DriveFlow's certified vehicle warranty?",
      answer: "Every certified vehicle comes with a 12-month comprehensive powertrain warranty (covering engine and transmission) alongside 24/7 complimentary nationwide roadside assistance."
    }
  ];

  return (
    <section id="section-faq" className="px-6 lg:px-16 py-14 border-b border-white/10 bg-[#0a0a0e]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase text-red-500 tracking-widest">// COMMON QUESTIONS</span>
          <h2 className="text-3xl font-black italic uppercase mt-1">Frequently Asked Questions</h2>
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
