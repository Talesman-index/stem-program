'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  year: '2025' | '2026';
  discipline: 'robotics' | 'chemistry' | 'biology' | 'vr' | 'math' | 'ceremony' | 'campus';
  title: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 'g-1',
    src: '/assets/images/children-learn-about-robotics-with-robotics-kit-2026-03-05-11-56-52-utc.jpg',
    alt: 'Robotics learning',
    year: '2026',
    discipline: 'robotics',
    title: 'Robotics Kits Exploration'
  },
  {
    id: 'g-2',
    src: '/assets/images/VR_stem.png',
    alt: 'Student using VR headset',
    year: '2026',
    discipline: 'vr',
    title: 'Virtual Reality Immersion'
  },
  {
    id: 'g-3',
    src: '/assets/images/Labo_stem.png',
    alt: 'Chemistry experiments in lab',
    year: '2025',
    discipline: 'chemistry',
    title: 'Chemistry Lab in Action'
  },
  {
    id: 'g-4',
    src: '/assets/images/girl-writing-math-problems-on-a-whiteboard-2026-01-07-02-11-58-utc.jpg',
    alt: 'Calculations on whiteboard',
    year: '2025',
    discipline: 'math',
    title: 'Geometric Challenges'
  },
  {
    id: 'g-5',
    src: '/assets/images/children-studying-science-using-microscope-in-clas-2026-04-13-23-13-15-utc.jpg',
    alt: 'Observation under microscope',
    year: '2026',
    discipline: 'biology',
    title: 'Micro-Biology Laboratory'
  },
  {
    id: 'g-6',
    src: '/assets/images/portrait-of-happy-group-of-high-school-student-wit-2026-01-09-12-10-31-utc.jpg',
    alt: 'Proud group of students at the closing ceremony',
    year: '2026',
    discipline: 'ceremony',
    title: 'Closing Graduation Ceremony'
  },
  {
    id: 'g-7',
    src: '/assets/images/multiethnic-schoolkids-building-robots-at-stem-eng-2026-01-08-00-20-01-utc.jpg',
    alt: 'Robots construction in team',
    year: '2025',
    discipline: 'robotics',
    title: 'Automata Team Project'
  },
  {
    id: 'g-8',
    src: '/assets/images/kids-learning-with-vr-headsets-in-classroom-2026-03-19-09-30-28-utc.jpg',
    alt: 'Students with virtual reality headsets',
    year: '2025',
    discipline: 'vr',
    title: 'Group 3D Visualization'
  },
  {
    id: 'g-9',
    src: '/assets/images/children-studying-a-model-solar-system-at-school-2026-03-25-01-24-35-utc.jpg',
    alt: 'Study of the solar system',
    year: '2025',
    discipline: 'biology',
    title: 'Earth Sciences Workshop'
  },
  {
    id: 'g-10',
    src: '/assets/images/livingstone college.jpg',
    alt: 'Livingstone College Campus',
    year: '2026',
    discipline: 'campus',
    title: 'Livingstone Campus'
  },
  {
    id: 'g-11',
    src: '/assets/images/diverse-female-teacher-and-school-children-doing-a-2026-01-09-09-28-54-utc.jpg',
    alt: 'Scientific experiment',
    year: '2025',
    discipline: 'biology',
    title: 'Pedagogical Observations'
  },
  {
    id: 'g-12',
    src: '/assets/images/smiling-boys-roasting-marshmallows-over-campfire-i-2026-04-22-19-48-44-utc.jpg',
    alt: 'Relaxation time around the campfire',
    year: '2026',
    discipline: 'ceremony',
    title: 'Friendly Outdoor Moments'
  }
];

export default function Gallery() {
  const [selectedYear, setSelectedYear] = useState<'all' | '2025' | '2026'>('all');
  const [selectedDiscipline, setSelectedDiscipline] = useState<'all' | 'robotics' | 'chemistry' | 'biology' | 'vr' | 'math' | 'ceremony'>('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filters logic
  const filteredItems = galleryData.filter(item => {
    const matchesYear = selectedYear === 'all' || item.year === selectedYear;
    const matchesDiscipline = selectedDiscipline === 'all' || item.discipline === selectedDiscipline;
    return matchesYear && matchesDiscipline;
  });

  const visibleItems = filteredItems.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handlePrevNext('next');
      if (e.key === 'ArrowLeft') handlePrevNext('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const handlePrevNext = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    const count = filteredItems.length;
    if (direction === 'prev') {
      setLightboxIndex((lightboxIndex - 1 + count) % count);
    } else {
      setLightboxIndex((lightboxIndex + 1) % count);
    }
  };

  const disciplineLabels = {
    robotics: 'Robotics',
    chemistry: 'Chemistry',
    biology: 'Biology',
    vr: 'Virtual Reality',
    math: 'Mathematics',
    ceremony: 'Ceremony & Life',
    campus: 'Campus'
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-[#FFF9F0]">
        
        {/* ── Gallery Header ── */}
        <section className="bg-[#162248] text-white py-20 text-center relative overflow-hidden border-b-2 border-black/10">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/20 blur-lg pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-black/15 blur-lg pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
            <span className="section-sticker mb-4">
              Photo Gallery
            </span>
            <h1 className="font-accent text-4xl sm:text-6xl md:text-7xl leading-none tracking-wide text-white">
              Unforgettable Moments
            </h1>
            <p className="font-body text-white/90 text-lg max-w-xl mt-6 leading-relaxed">
              Explore the key moments captured during the past editions of our science summer camps.
            </p>
          </div>
        </section>

        {/* ── Gallery Content Area ── */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters Controls */}
          <div className="flex flex-col gap-6 justify-center items-center mb-16 border-b-2 border-black/5 pb-12">
            
            {/* Year Filters */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="font-body text-xs font-extrabold text-[#162248]/60 mr-3 uppercase tracking-wider">
                Years:
              </span>
              {['all', '2025', '2026'].map((y) => (
                <button
                  key={y}
                  onClick={() => {
                    setSelectedYear(y as any);
                    setVisibleCount(6);
                  }}
                  className={`px-5 py-2 rounded-full font-body font-extrabold text-sm border-2 transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    selectedYear === y
                      ? 'bg-[#162248] border-[#162248] text-white shadow-md'
                      : 'bg-white border-[#162248]/15 text-[#162248]/80 hover:bg-[#F1F6EF]/30 hover:border-[#162248]/30 hover:text-[#162248]'
                  }`}
                >
                  {y === 'all' ? 'All' : y}
                </button>
              ))}
            </div>

            {/* Discipline Filters */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="font-body text-xs font-extrabold text-[#162248]/60 mr-3 uppercase tracking-wider">
                Sectors:
              </span>
              {['all', 'robotics', 'chemistry', 'biology', 'vr', 'math', 'ceremony'].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDiscipline(d as any);
                    setVisibleCount(6);
                  }}
                  className={`px-5 py-2 rounded-full font-body font-extrabold text-sm border-2 transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    selectedDiscipline === d
                      ? 'bg-[#162248] border-[#162248] text-white shadow-md'
                      : 'bg-white border-[#162248]/15 text-[#162248]/80 hover:bg-[#F1F6EF]/30 hover:border-[#162248]/30 hover:text-[#162248]'
                  }`}
                >
                  {d === 'all' ? 'All' : disciplineLabels[d as keyof typeof disciplineLabels]}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry CSS Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {visibleItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="camp-card break-inside-avoid bg-white border border-black/5 p-2 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group relative"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover rounded-[16px]"
                />
                
                {/* Overlay hover details */}
                <div className="absolute inset-2 bg-[#1A1A2E]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white rounded-[16px]">
                  <div className="self-end p-2.5 bg-white/10 rounded-full border border-white/20">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="pill bg-[#FFE566] text-[#1A1A2E] text-[10px] font-accent uppercase">
                      {item.year} · {disciplineLabels[item.discipline as keyof typeof disciplineLabels] || item.discipline}
                    </span>
                    <h3 className="font-display font-extrabold text-lg sm:text-xl mt-3 text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredItems.length && (
            <div className="mt-16 text-center">
              <button
                onClick={loadMore}
                className="btn-outline font-body font-extrabold text-base"
              >
                Show more images
              </button>
            </div>
          )}

          {/* No images alert */}
          {filteredItems.length === 0 && (
            <div className="camp-card py-20 bg-white border border-black/5 text-center">
              <p className="font-body text-[#7B7B9E] text-lg">
                No images match these search criteria.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#1A1A2E]/96 flex flex-col justify-between p-4 sm:p-8">
          {/* Header toolbar */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4 relative z-10">
            <div className="flex flex-col text-left">
              <span className="pill bg-[#FFE566] text-[#1A1A2E] text-[10px] font-accent uppercase w-fit mb-1">
                {filteredItems[lightboxIndex].year} · {disciplineLabels[filteredItems[lightboxIndex].discipline as keyof typeof disciplineLabels] || filteredItems[lightboxIndex].discipline}
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-2xl mt-1 text-white">
                {filteredItems[lightboxIndex].title}
              </h3>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-3 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Visual Display (Center) */}
          <div className="relative flex-grow flex items-center justify-center py-4">
            <button
              onClick={() => handlePrevNext('prev')}
              className="absolute left-2 sm:left-4 z-10 p-3.5 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>
            
            <img
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border-4 border-white/5 select-none"
            />

            <button
              onClick={() => handlePrevNext('next')}
              className="absolute right-2 sm:right-4 z-10 p-3.5 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Bottom Caption Indicator */}
          <div className="text-white/60 font-mono text-xs text-center border-t border-white/10 pt-4">
            Image {lightboxIndex + 1} of {filteredItems.length} (Use left/right arrow keys or Esc)
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
