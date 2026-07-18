import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Music, Users, Trophy, ArrowRight, Sparkles, Star, Zap } from 'lucide-react';

/* ── Feature card data ─────────────────────────────────────────── */
const features = [
  {
    icon: <Users className="w-10 h-10 text-[#6F1D1B]" />,
    title: 'Attendees',
    description:
      'Browse and book tickets for your favourite events. Get exclusive early-bird prices and personalised recommendations.',
    delay: 'animation-delay-100',
  },
  {
    icon: <Music className="w-10 h-10 text-[#6F1D1B]" />,
    title: 'Artists',
    description:
      'Showcase your talent, connect with organisers, and manage event invitations — all in one beautiful dashboard.',
    delay: 'animation-delay-200',
  },
  {
    icon: <Trophy className="w-10 h-10 text-[#6F1D1B]" />,
    title: 'Organisers',
    description:
      'Create and manage events effortlessly. Track real-time ticket sales and analyse audience demographics.',
    delay: 'animation-delay-300',
  },
  {
    icon: <Calendar className="w-10 h-10 text-[#6F1D1B]" />,
    title: 'Admins',
    description:
      'Monitor platform health, manage sponsorships, and ensure seamless operations across every event.',
    delay: 'animation-delay-400',
  },
];

/* ── Stats data ─────────────────────────────────────────────────── */
const stats = [
  { value: '10K+', label: 'Events Hosted', icon: <Calendar size={20} /> },
  { value: '500K+', label: 'Happy Attendees', icon: <Users size={20} /> },
  { value: '4.9★', label: 'Average Rating', icon: <Star size={20} /> },
  { value: '50+', label: 'Cities', icon: <Zap size={20} /> },
];

/* ── Intersection observer hook for scroll animations ──────────── */
function useScrollReveal(className = 'animate-card-entrance') {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('[data-reveal]').forEach((child, i) => {
            child.style.animationDelay = `${i * 100}ms`;
            child.classList.add(className);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [className]);
  return ref;
}

/* ── LandingPage ─────────────────────────────────────────────────── */
const LandingPage: React.FC = () => {
  const featuresRef = useScrollReveal();
  const statsRef = useScrollReveal();

  return (
    <div className="min-h-screen overflow-x-hidden font-sans">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#432818] via-[#6F1D1B] to-[#99582A] overflow-hidden">

        {/* Animated background blobs */}
        <div
          className="animate-float-blob absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20
                     bg-gradient-to-br from-[#FFE6A7] to-[#BB9457] blur-3xl pointer-events-none"
        />
        <div
          className="animate-float-blob absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-15
                     bg-gradient-to-tl from-[#FFE6A7] to-[#6F1D1B] blur-3xl pointer-events-none"
          style={{ animationDelay: '2.5s' }}
        />

        {/* Nav */}
        <nav className="relative z-10 flex justify-between items-center px-6 md:px-16 py-6">
          <div className="flex items-center gap-2 animate-fade-slide-up">
            <Calendar className="w-8 h-8 text-[#FFE6A7]" />
            <span className="text-2xl font-bold text-[#FFE6A7] tracking-tight">EventMaster</span>
          </div>
          <Link
            to="/auth"
            className="animate-fade-slide-up animation-delay-100 animate-pulse-ring
                       bg-[#FFE6A7] text-[#6F1D1B] px-6 py-2.5 rounded-full font-semibold
                       hover:bg-white transition-colors text-sm"
          >
            Get Started
          </Link>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 py-16">
          {/* Pill badge */}
          <div
            className="animate-fade-slide-up animation-delay-100 inline-flex items-center gap-2
                       bg-[#FFE6A7]/10 border border-[#FFE6A7]/20 rounded-full px-4 py-1.5 mb-8"
          >
            <Sparkles size={14} className="text-[#FFE6A7]" />
            <span className="text-[#FFE6A7]/90 text-sm font-medium">Your ultimate event platform</span>
          </div>

          <h1
            className="animate-fade-slide-up animation-delay-200
                       text-5xl md:text-7xl font-bold text-[#FFE6A7] mb-6 leading-tight max-w-4xl"
          >
            Discover, Book &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE6A7] to-[#BB9457]">
              Experience
            </span>{' '}
            Events
          </h1>

          <p
            className="animate-fade-slide-up animation-delay-300
                       text-lg md:text-xl text-[#FFE6A7]/80 mb-12 max-w-2xl leading-relaxed"
          >
            Connect artists, organisers, and attendees in one seamless platform. Create, manage, and
            experience events like never before — powered by smart recommendations.
          </p>

          <div className="animate-fade-slide-up animation-delay-400 flex flex-col sm:flex-row gap-4">
            <Link
              to="/auth"
              className="animate-pulse-ring inline-flex items-center gap-2 bg-[#FFE6A7] text-[#6F1D1B]
                         px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors"
            >
              Join Now
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 border-2 border-[#FFE6A7]/40 text-[#FFE6A7]
                         px-8 py-4 rounded-full font-semibold text-lg hover:border-[#FFE6A7] transition-colors"
            >
              Explore Events
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 flex justify-center pb-8 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[#FFE6A7]/40 flex justify-center pt-2">
            <div className="w-1 h-3 bg-[#FFE6A7]/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section className="bg-[#FFE6A7] py-14">
        <div ref={statsRef} className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon }) => (
              <div
                key={label}
                data-reveal
                className="opacity-0 text-center p-6 bg-white rounded-2xl shadow-sm
                           hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center text-[#6F1D1B] mb-2">{icon}</div>
                <div className="text-3xl font-bold text-[#6F1D1B]">{value}</div>
                <div className="text-sm text-[#99582A] mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#432818] mb-4">
              For Everyone in the Event Industry
            </h2>
            <p className="text-[#99582A] text-lg max-w-xl mx-auto">
              One platform built for all four pillars of the event ecosystem.
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon, title, description, delay }) => (
              <div
                key={title}
                data-reveal
                className={`opacity-0 group bg-[#FFF8E7] p-8 rounded-2xl border border-[#FFE6A7]
                            hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${delay}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FFE6A7] flex items-center justify-center mb-6
                                group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-[#432818] mb-3">{title}</h3>
                <p className="text-[#99582A] leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="bg-gradient-to-r from-[#6F1D1B] to-[#432818] py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FFE6A7] mb-6">
            Ready to Find Your Next Experience?
          </h2>
          <p className="text-[#FFE6A7]/80 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of attendees, artists, and organisers already on EventMaster.
          </p>
          <Link
            to="/auth"
            className="animate-pulse-ring inline-flex items-center gap-2 bg-[#FFE6A7] text-[#6F1D1B]
                       px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-[#432818] text-[#FFE6A7]/60 py-10 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-[#FFE6A7]" />
          <span className="text-lg font-bold text-[#FFE6A7]">EventMaster</span>
        </div>
        <p className="text-sm">© 2025 EventMaster. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;