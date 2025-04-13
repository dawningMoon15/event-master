import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Music, Users, Trophy } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-secondary to-primary">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold text-accent">EventMaster</span>
          </div>
          <Link
            to="/auth"
            className="bg-accent text-primary px-6 py-2 rounded-full font-semibold hover:bg-primary-light hover:text-white transition-colors"
          >
            Get Started
          </Link>
        </nav>

        <div className="text-center">
          <h1 className="text-6xl font-bold text-accent mb-6">
            Your Ultimate Event Management Platform
          </h1>
          <p className="text-xl text-primary-light mb-12 max-w-2xl mx-auto">
            Connect artists, organizers, and attendees in one seamless platform. Create, manage, and experience events like never before.
          </p>
          <Link
            to="/auth"
            className="bg-secondary-light text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-secondary transition-colors inline-block"
          >
            Join Now
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-accent py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">
            For Everyone in the Event Industry
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Users className="w-12 h-12 text-primary" />}
              title="Attendees"
              description="Browse and book tickets for your favorite events. Get exclusive access to early bird prices."
            />
            <FeatureCard
              icon={<Music className="w-12 h-12 text-primary" />}
              title="Artists"
              description="Showcase your talent and connect with event organizers. Build your portfolio and grow your audience."
            />
            <FeatureCard
              icon={<Trophy className="w-12 h-12 text-primary" />}
              title="Organizers"
              description="Create and manage events effortlessly. Track sales and analyze performance in real-time."
            />
            <FeatureCard
              icon={<Calendar className="w-12 h-12 text-primary" />}
              title="Admins"
              description="Monitor and manage the platform. Ensure smooth operations and handle escalations."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-accent py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6" />
              <span className="text-xl font-bold">EventMaster</span>
            </div>
            <div className="text-sm">
              © 2025 EventMaster. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl text-center shadow-lg border border-primary-light">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
    <p className="text-secondary">{description}</p>
  </div>
);

export default LandingPage;