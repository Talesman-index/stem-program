import Link from 'next/link';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { Target, Eye, ShieldAlert, Heart } from 'lucide-react';

const team = [
  {
    name: "Dr. Sarah Smith",
    role: "STEM Program Director",
    image: "/assets/images/african-american-female-teacher-teaching-caucasian-2026-03-25-01-39-13-utc.jpg",
    bio: "Professor of Education Sciences at Livingstone College, passionate about democratizing access to scientific fields."
  },
  {
    name: "Marcus Tatum",
    role: "Robotics Workshop Coordinator",
    image: "/assets/images/portrait-of-male-and-female-students-building-robo-2026-03-10-04-49-54-utc.jpg",
    bio: "Industrial automation engineer. He designs and oversees robot building and programming projects."
  },
  {
    name: "Elena Rostova",
    role: "Pedagogical Lead",
    image: "/assets/images/diverse-female-teacher-and-school-children-doing-a-2026-01-09-09-28-54-utc.jpg",
    bio: "Physics and chemistry teacher with over 10 years of experience. Specialist in project-based hands-on learning."
  }
];

export const metadata = {
  title: "About Us | Summer STEM Camp",
  description: "Discover our history, our mission to democratize sciences, and the passionate team behind the Livingstone College Summer STEM Camp."
};

export default function About() {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-[#FFF9F0]">
        
        {/* ── About Hero ── */}
        <section className="relative bg-[#FFF9F0] min-h-[550px] md:min-h-[650px] flex items-center justify-center overflow-hidden border-b-2 border-black/10 py-24 px-4">
          
          {/* Floating Circle 1 (Top Left) */}
          <div className="hidden lg:block absolute left-[5%] top-[12%] w-36 h-36 rounded-full border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden -rotate-6 animate-float pointer-events-none">
            <img
              src="/assets/images/students-and-teacher-constructing-robots-in-school-2026-01-08-23-48-20-utc.jpg"
              alt="STEM activities"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Circle 2 (Top Right) */}
          <div className="hidden lg:block absolute right-[8%] top-[8%] w-40 h-40 rounded-full border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden rotate-12 animate-float pointer-events-none" style={{ animationDelay: '1.5s' }}>
            <img
              src="/assets/images/diverse-female-teacher-and-school-children-doing-a-2026-01-09-09-28-54-utc.jpg"
              alt="Watering plants"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Circle 3 (Middle Right) */}
          <div className="hidden lg:block absolute right-[2%] top-[45%] w-36 h-36 rounded-full border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden -rotate-6 animate-float pointer-events-none" style={{ animationDelay: '3s' }}>
            <img
              src="/assets/images/smiling-boys-roasting-marshmallows-over-campfire-i-2026-04-22-19-48-44-utc.jpg"
              alt="Campfire"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Circle 4 (Bottom Left) */}
          <div className="hidden lg:block absolute left-[6%] bottom-[12%] w-44 h-44 rounded-full border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden rotate-6 animate-float pointer-events-none" style={{ animationDelay: '0.8s' }}>
            <img
              src="/assets/images/livingstone.jpg"
              alt="Livingstone Campus"
              className="w-full h-full object-cover"
            />
            {/* Orange leaf spray decoration */}
            <svg className="w-14 h-14 text-[#2D4589] absolute -top-10 -left-6 transform -rotate-45 opacity-90 drop-shadow-sm pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
              <path d="M20,80 C40,60 60,50 85,25 C70,45 60,65 20,80 Z" />
              <path d="M50,55 C65,40 75,35 80,25 C70,35 60,50 50,55 Z" />
              <path d="M35,68 C50,53 60,48 65,38 C55,48 45,63 35,68 Z" />
            </svg>
          </div>

          {/* Floating Circle 5 (Bottom Right) */}
          <div className="hidden lg:block absolute right-[15%] bottom-[8%] w-36 h-36 rounded-full border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden -rotate-12 animate-float pointer-events-none" style={{ animationDelay: '2.2s' }}>
            <img
              src="/assets/images/young-school-kids-eating-lunch-talking-at-a-table-2026-01-05-06-28-36-utc.jpg"
              alt="Marshmallows sitting"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main central container */}
          <div className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center gap-6 md:gap-8 px-4">
            <h1 className="font-accent text-[#162248] text-3xl sm:text-5xl md:text-6.5xl uppercase tracking-wide leading-[1.1] relative max-w-3xl">
              Discovering Wonder, Friendship, Adventure, and Life-long Memories
              
              {/* Green leaf spray branch */}
              <svg className="w-12 h-12 text-[#8CB97A] absolute -top-6 -right-10 transform rotate-12 opacity-90 drop-shadow-sm hidden md:block pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                <path d="M20,80 C40,60 60,50 85,25 C70,45 60,65 20,80 Z" />
                <path d="M50,55 C65,40 75,35 80,25 C70,35 60,50 50,55 Z" />
                <path d="M35,68 C50,53 60,48 65,38 C55,48 45,63 35,68 Z" />
              </svg>
            </h1>

            <p className="font-body text-[#3D3D5C] text-sm sm:text-base md:text-lg font-semibold max-w-2xl leading-relaxed mt-2">
              Every moment is an opportunity to explore, connect, and create memories that last a lifetime, while making friends, discovering new passions, and embracing the beauty of nature.
            </p>

            <div className="mt-4">
              <Link
                href="/programs"
                className="inline-flex bg-[#2D4589] hover:bg-[#1A315C] text-white font-body font-extrabold px-10 py-4 rounded-full shadow-[0_4px_18px_rgba(45,69,137,0.3)] transition-all hover:scale-105 active:scale-95 text-base md:text-lg"
              >
                Explore Our Programs
              </Link>
            </div>
          </div>
        </section>

        {/* ── Story Section ── */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div className="relative rounded-[32px] overflow-hidden shadow-lg border-2 border-black/10 aspect-video lg:aspect-square bg-white p-3">
                <img
                  src="/assets/images/students-work-together-on-science-project-in-class-2026-03-19-21-39-18-utc.jpg"
                  alt="Students working on science project"
                  className="w-full h-full object-cover rounded-[24px]"
                />
              </div>
              
              <div className="flex flex-col gap-6">
                <span className="section-sticker mb-4 self-start">
                  Our Journey
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4.5xl text-[#162248] leading-tight">
                  How it all started
                </h2>
                <p className="font-body text-[#3D3D5C] text-base sm:text-lg leading-relaxed">
                  Created in 2023 by the Livingstone College STEM Program team, the camp was born from a concerning observation: too few young people from our local communities were pursuing careers in science. Not from a lack of ability, but due to a lack of exposure and real opportunities.
                </p>
                <p className="font-body text-[#3D3D5C] text-base sm:text-lg leading-relaxed">
                  So we designed a week of total immersion, without traditional textbooks or lecture halls. The camp is entirely oriented towards hands-on experience, the creative right to make mistakes, and teamwork. To remove all barriers, the camp is funded by our partners and is completely free for every family.
                </p>
              </div>
              
            </div>
          </div>
        </section>

        {/* ── Mission Callout ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="camp-card text-white p-8 sm:p-14 text-center flex flex-col items-center gap-6 border-2 border-black/10" style={{ backgroundColor: '#162248' }}>
            <div className="w-14 h-14 rounded-full bg-[#FFE566] text-[#1A1A2E] flex items-center justify-center shadow-md animate-float">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">Our Vocation</h2>
            <blockquote className="font-display text-lg sm:text-2xl font-bold max-w-4xl leading-relaxed italic text-white/95">
              &ldquo;To inspire, educate, and empower youth through hands-on STEM experiences that build confidence, curiosity, innovation, and preparation for the careers of tomorrow.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* ── Values Grid ── */}
        <section className="py-20 bg-white border-y-2 border-black/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="section-sticker mb-4">
                Foundations
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4.5xl text-[#162248]">
                Our Guiding Values
              </h2>
              <p className="font-body text-[#7B7B9E] text-base mt-3 max-w-2xl mx-auto">
                The fundamental principles that guide each of our educational actions and activities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Value 1 */}
              <div className="camp-card p-8 flex flex-col items-start gap-4 border border-black/5" style={{ backgroundColor: '#FFF9F0' }}>
                <div className="w-12 h-12 rounded-2xl bg-[#8CB97A]/20 text-[#8CB97A] flex items-center justify-center shadow-inner">
                  <Heart className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-[#162248]">Equitable Access</h3>
                <p className="font-body text-sm text-[#3D3D5C] leading-relaxed">
                  The camp is and will remain entirely free for all. We eliminate financial barriers to open every possible pathway.
                </p>
              </div>

              {/* Value 2 */}
              <div className="camp-card p-8 flex flex-col items-start gap-4 border border-black/5" style={{ backgroundColor: '#FFF9F0' }}>
                <div className="w-12 h-12 rounded-2xl bg-[#9795CE]/20 text-[#9795CE] flex items-center justify-center shadow-inner">
                  <Target className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-[#162248]">Hands-on Learning</h3>
                <p className="font-body text-sm text-[#3D3D5C] leading-relaxed">
                  No theoretical lectures. We learn by testing, designing, and building with professional tools and projects.
                </p>
              </div>

              {/* Value 3 */}
              <div className="camp-card p-8 flex flex-col items-start gap-4 border border-black/5" style={{ backgroundColor: '#FFF9F0' }}>
                <div className="w-12 h-12 rounded-2xl bg-[#162248]/10 text-[#162248] flex items-center justify-center shadow-inner">
                  <Eye className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-[#162248]">Local Excellence</h3>
                <p className="font-body text-sm text-[#3D3D5C] leading-relaxed">
                  Our strength comes from the diversity of our local participants, mentored at the historic campus of Livingstone College.
                </p>
              </div>

              {/* Value 4 */}
              <div className="camp-card p-8 flex flex-col items-start gap-4 border border-black/5" style={{ backgroundColor: '#FFF9F0' }}>
                <div className="w-12 h-12 rounded-2xl bg-[#8CB97A]/20 text-[#8CB97A] flex items-center justify-center shadow-inner">
                  <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-[#162248]">Measurable Impact</h3>
                <p className="font-body text-sm text-[#3D3D5C] leading-relaxed">
                  We report our results through transparent annual impact assessments for our donors and official sponsors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Team Section ── */}
        <section className="py-20 sm:py-28 bg-[#FFF9F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="section-sticker mb-4">
                Mentors
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4.5xl text-[#162248]">
                Leadership Team
              </h2>
              <p className="font-body text-[#7B7B9E] text-base mt-3 max-w-2xl mx-auto">
                The dedicated teachers and experts who run and coordinate the pedagogical adventure every day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div key={idx} className="camp-card bg-white flex flex-col justify-between border border-black/5">
                  <div className="h-64 overflow-hidden relative border-b-2 border-black/5">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-extrabold text-2xl text-[#162248]">{member.name}</h3>
                      <span className="pill bg-[#E8F3FF] text-[#2D4589] font-body font-bold text-xs mt-2">
                        {member.role}
                      </span>
                      <p className="font-body text-sm text-[#3D3D5C] mt-4 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
