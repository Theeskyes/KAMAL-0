import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import emailjs from '@emailjs/browser';
import GradientText from './GradientText';

const SERVICE_ID = 'service_kamalclient';
const TEMPLATE_ID = 'template_ex8pyrh';
const PUBLIC_KEY = 'hadHeQEWn_CVtP-Ob';

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('loading');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section ref={ref} id="contact" className="py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle,#5227FF,transparent)', filter: 'blur(80px)' }} />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#B19EEF' }}>Contact</span>
            <div className="section-line" style={{ transform: 'scaleX(-1)' }} />
          </div>

          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-tight mb-5">
            <GradientText colors={['#ffffff', '#888888', '#444444']} animationSpeed={10}>Let's work</GradientText>
            <br />
            <span style={{ color: '#1e1e1e' }}>together.</span>
          </h2>

          <p className="text-lg mb-10" style={{ color: '#555' }}>
            Saya terbuka untuk kolaborasi, belajar bareng, dan proyek seru!
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono" style={{ color: '#888' }}>Full Name</label>
              <input
                name="from_name"
                type="text"
                placeholder="Input Name..."
                required
                className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#ccc' }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono" style={{ color: '#888' }}>Email</label>
              <input
                name="from_email"
                type="email"
                placeholder="Input Email..."
                required
                className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#ccc' }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono" style={{ color: '#888' }}>Message</label>
              <textarea
                name="message"
                placeholder="Message..."
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none resize-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#ccc' }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-xl font-semibold font-display text-sm text-white mt-2"
              style={{ background: 'linear-gradient(135deg,#5227FF,#B19EEF)', boxShadow: '0 0 30px rgba(82,39,255,0.3)', opacity: status === 'loading' ? 0.7 : 1 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              {status === 'loading' ? 'Mengirim...' : 'Send'}
            </motion.button>

            {status === 'success' && (
              <p className="text-center text-sm font-mono" style={{ color: '#B19EEF' }}>✓ Pesan berhasil dikirim!</p>
            )}
            {status === 'error' && (
              <p className="text-center text-sm font-mono" style={{ color: '#ff6b6b' }}>✗ Gagal kirim, coba lagi.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-8 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold"
            style={{ background: 'rgba(177,158,239,0.1)', color: '#B19EEF', border: '1px solid rgba(177,158,239,0.2)' }}>
            {'<>'}
          </div>
          <span className="text-sm font-display font-semibold gradient-text">Muhammad Kamaluddin</span>
        </div>
        <p className="text-xs font-mono" style={{ color: '#333' }}>
          © {new Date().getFullYear()} Muhammad Kamaluddin · Built with React, TypeScript & GSAP · All rights reserved
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#B19EEF', animation: 'pulse 2s infinite' }} />
          <span className="text-xs font-mono" style={{ color: '#444' }}>Available for hire</span>
        </div>
      </div>
    </footer>
  );
}