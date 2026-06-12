import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import GradientText from './GradientText';

const PROJECTS = [
  {
    title: 'Peluang Dasar pada Undian no HP digit terakhir',
    desc: 'Project matematika tentang peluang dasar menggunakan undian nomor HP digit terakhir.',
    tags: ['Matematika', 'Video'],
    year: '2024',
    color: '#B19EEF',
    ytId: 'Jk1kHtM_Xm8',
  },
  {
    title: 'Hak dan Kewajiban dalam Berteman',
    desc: 'Project video tentang hak dan kewajiban dalam berteman di lingkungan sekolah.',
    tags: ['PKN', 'Video'],
    year: '2024',
    color: '#5227FF',
    ytId: 'LZAc1wTMZ6M',
  },
  {
    title: 'Tutorial Making Straight Cable',
    desc: 'Tutorial membuat kabel straight (UTP) untuk jaringan komputer.',
    tags: ['Networking', 'Tutorial', 'TKJ'],
    year: '2024',
    color: '#38bdf8',
    ytId: 'qalZD4TLVb0',
  },
];
export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section ref={ref} id="projects" className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#B19EEF' }}>Work</span>
          </div>
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-tight">
            <GradientText colors={['#ffffff', '#888888', '#444444']} animationSpeed={12}>Selected</GradientText>
            <span className="ml-3" style={{ color: '#1e1e1e' }}>Projects.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 36 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.55, ease: 'easeOut' }}
              className="group cursor-pointer"
              onClick={() => setSelected(p)}
              data-cursor="hover">
              <div className="h-full flex flex-col rounded-2xl glass-card overflow-hidden" style={{ minHeight: 280 }}>
                {/* Thumbnail */}
                <div className="relative overflow-hidden" style={{ paddingTop: '56.25%' }}>
                  <img
                    src={`https://img.youtube.com/vi/${p.ytId}/hqdefault.jpg`}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: p.color }}>
                      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-0.5">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="flex flex-col p-5 flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-xs" style={{ color: '#3a3a3a' }}>{p.year}</span>
                    <div className="w-2 h-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}60` }} />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2 group-hover:text-white transition-colors" style={{ color: '#ccc' }}>{p.title}</h3>
                  <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: '#555' }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md text-xs font-mono"
                        style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.85)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}>
            <motion.div
              className="w-full max-w-2xl rounded-2xl overflow-hidden"
              style={{ background: '#111' }}
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}>
              <div style={{ paddingTop: '56.25%', position: 'relative' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${selected.ytId}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg mb-1" style={{ color: '#fff' }}>{selected.title}</h3>
                <p className="text-sm" style={{ color: '#888' }}>{selected.desc}</p>
                <button onClick={() => setSelected(null)}
                  className="mt-4 text-xs font-mono px-4 py-2 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#888', border: '1px solid rgba(255,255,255,0.1)' }}>
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}