import Link from 'next/link';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';

const newsArticles = [
  {
    slug: 'registrations-open-2026',
    title: "Official opening of registrations for the June 2026 session",
    date: "May 15, 2026",
    author: "Dr. Sarah Smith",
    image: "/assets/images/portrait-of-happy-group-of-high-school-student-wit-2026-01-09-12-10-31-utc.jpg",
    excerpt: "Online registration forms for our annual Summer STEM Camp are now open. Find out how to submit and confirm applications."
  },
  {
    slug: 'new-partners-sponsors',
    title: "Duke Energy and Rowan County renew their sponsorship for 2026",
    date: "April 28, 2026",
    author: "STEM Admin",
    image: "/assets/images/livingstone.jpg",
    excerpt: "Thanks to the renewed support of our major institutional and corporate partners, the camp remains completely free for all 60 participants of this edition."
  },
  {
    slug: 'return-impact-camp-2025',
    title: "Publication of the annual impact report: looking back at the 2025 edition",
    date: "October 10, 2025",
    author: "Elena Rostova",
    image: "/assets/images/students-work-together-on-science-project-in-class-2026-03-19-21-39-18-utc.jpg",
    excerpt: "Record attendance rate of 94%, 7 disciplines taught, and 100% of families satisfied. Discover the key figures for the success of last year's camp."
  }
];

export const metadata = {
  title: "News | Summer STEM Camp",
  description: "Follow the latest news from the Livingstone College Summer STEM Camp: registrations, new partners, impact reports."
};

export default function News() {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-[#FFF9F0]">
        
        {/* ── News Hero ── */}
        <section className="bg-[#241765] text-white py-20 text-center relative overflow-hidden border-b-2 border-black/10">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/20 blur-lg pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-black/15 blur-lg pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
            <span className="section-sticker mb-4">
              News
            </span>
            <h1 className="font-accent text-4xl sm:text-6xl md:text-7xl leading-none tracking-wide text-white">
              The News Feed
            </h1>
            <p className="font-body text-white/95 text-lg max-w-xl mt-6 leading-relaxed">
              Follow the news of our program, our session announcements, and the daily life of our STEM community.
            </p>
          </div>
        </section>

        {/* ── News Grid ── */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <article
                key={article.slug}
                className="camp-card bg-white border border-black/5 flex flex-col justify-between"
              >
                {/* Image header */}
                <div className="h-52 overflow-hidden border-b-2 border-black/5 relative bg-gray-50">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>

                {/* Article Info */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs font-body font-bold text-[#7B7B9E] mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#6CAB53]" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#241765]" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#241765] leading-snug hover:text-[#241765] transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="font-body text-sm text-[#3D3D5C] mt-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/5">
                    <span
                      className="font-body font-extrabold text-sm text-[#241765] flex items-center gap-2 hover:scale-105 transition-transform w-fit cursor-pointer"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
