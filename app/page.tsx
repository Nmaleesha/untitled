'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Camera, ChevronDown, ChevronRight, Instagram, Star } from 'lucide-react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Form State Management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    guests: '',
    location: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // TODO: Add your API route or email service integration here
    alert("Request received! We will be in touch shortly.");
  };

  // Authentic Magazine Photobooth Event Images
  const galleryImages = [
    "/images/booth-1.jpg",
    "/images/booth-2.jpg",
    "/images/booth-3.jpg",
    "/images/booth-4.jpg",
    "/images/booth-5.jpg",
    "/images/booth-6.jpg",
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 select-none p-4 md:p-6 lg:p-8 flex flex-col gap-6">
      {/* Navigation */}
      <header className="flex justify-between items-center px-4 py-4 border border-zinc-800 rounded-3xl bg-zinc-900/50 backdrop-blur-md max-w-7xl mx-auto w-full sticky top-4 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white flex items-center justify-center rounded">
            <span className="text-zinc-950 font-black text-xl">V</span>
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight uppercase">VOGUEBOOTH</span>
        </div>
        <nav className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-zinc-400 items-center">
          <a href="#about" className="hover:text-white transition-colors">EXPERIENCE</a>
          <a href="#services" className="hover:text-white transition-colors">PACKAGES</a>
          <a href="#gallery" className="hover:text-white transition-colors">GALLERY</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <Link href="/studio" className="hover:text-white transition-colors text-white font-bold">STUDIO</Link>
          <a href="#contact" className="bg-white text-zinc-950 font-bold px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-colors">
            BOOK NOW
          </a>
        </nav>
      </header>

      {/* Main Bento Grid */}
      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 flex-1 max-w-7xl mx-auto w-full">

        {/* Hero Section: The Hook */}
        <section className="col-span-1 md:col-span-7 md:row-span-2 relative min-h-[500px] flex items-end p-8 lg:p-12 bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 group">
          <motion.div style={{ y }} className="absolute inset-0 w-full h-full opacity-50">
            <Image
              src="/images/booth-3.jpg"
              alt="Life-sized Magazine Photobooth"
              fill
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
          </motion.div>

          <div className="relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold italic tracking-tighter mb-4 leading-[0.9]">
                Step Onto<br />The Cover.
              </h1>
              <p className="text-zinc-300 max-w-sm mb-8 text-sm uppercase tracking-wide">
                Elevate your event with a life-sized, fully illuminated magazine photobooth experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="px-6 py-3 bg-white text-zinc-950 font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all rounded-full inline-flex items-center justify-center gap-2 w-fit">
                  Check Availability <ChevronRight className="w-4 h-4" />
                </a>
                <Link href="/studio" className="px-6 py-3 bg-transparent border border-zinc-500 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-zinc-950 transition-all rounded-full inline-flex items-center justify-center w-fit">
                  Try The Studio
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS: 3 Steps */}
        <section id="about" className="col-span-1 md:col-span-5 md:row-span-1 bg-white text-zinc-950 rounded-3xl p-8 border border-zinc-200 flex flex-col justify-between overflow-hidden relative">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 mb-6">The Process</h2>
          <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4">More than a photo.<br />A statement.</h3>
          <p className="text-zinc-600 text-sm leading-relaxed mb-8 max-w-sm">
            A magazine booth isn&apos;t just a photobooth—it&apos;s a striking architectural centerpiece. Guests step inside a life-sized, brilliantly lit box customized to look like the cover of a high-end publication.
          </p>
          <div className="flex flex-col gap-4 mt-auto">
            {[
              { title: "Choose Your Cover", desc: "Curated editorial templates or full custom design." },
              { title: "Professional Setup", desc: "Delivery, red-carpet, and meticulous installation." },
              { title: "Strike A Pose", desc: "Step inside for flawless, instantly sharable photos." }
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                <span className="text-4xl font-serif italic text-zinc-300">0{i + 1}</span>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wide">{step.title}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PACKAGES: The Offer */}
        <section id="services" className="col-span-1 md:col-span-5 md:row-span-1 bg-zinc-800 rounded-3xl p-8 border border-zinc-700 flex flex-col relative overflow-hidden">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-400 mb-6 relative z-10">Select Packages</h2>
          <div className="grid grid-cols-1 gap-4 flex-1 relative z-10">
            {[
              { title: "Standard Package", price: "Rs 60,000", desc: "4-Hour Rental • Standard Studio Lighting • Vogue/Wedding Templates • Attendant" },
              { title: "The Custom Cover", price: "Rs 70,000", desc: "5-Hour Rental • Bespoke Branding • Custom Typography • Red Carpet" },
              { title: "Brand Activation", price: "Custom", desc: "Full Vinyl Wrapping • Logo Placements • Lead Capture • Analytics" }
            ].map((pkg, i) => (
              <div key={i} className={`flex flex-col gap-2 p-4 rounded-2xl border ${i === 1 ? 'bg-white text-zinc-950 border-white' : 'bg-zinc-900/50 border-zinc-700 text-zinc-300'}`}>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm uppercase tracking-widest font-bold">{pkg.title}</h3>
                  <span className="text-lg font-serif italic font-bold">{pkg.price}</span>
                </div>
                <p className="text-xs leading-relaxed opacity-80">{pkg.desc}</p>
              </div>
            ))}
          </div>
          <a href="#contact" className="w-full mt-4 py-3 border border-zinc-500 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-xl text-center relative z-10">
            Request Full Pricing Deck
          </a>
          <div className="absolute -bottom-24 -right-24 text-[200px] text-zinc-700/20 font-serif italic pointer-events-none">P</div>
        </section>

        {/* MINI GALLERY: The Proof */}
        <section id="gallery" className="col-span-1 md:col-span-12 md:row-span-1 bg-zinc-900 rounded-3xl border border-zinc-800 p-8 flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end z-10 relative">
            <div>
              <h2 className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">Live Events</h2>
              <h3 className="text-3xl font-serif italic">The Aesthetic.</h3>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 px-4 py-1 border border-zinc-700 rounded-full">48 Total Photos</span>
          </div>
          <div className="flex gap-4 overflow-hidden w-[200vw] sm:w-[150vw] md:w-[120vw] animate-scroll hover:[animation-play-state:paused]">
            {galleryImages.map((src, i) => (
              <div key={i} className="bg-zinc-800 h-64 md:h-80 w-48 md:w-64 rounded-2xl overflow-hidden shrink-0 relative group">
                <Image
                  src={src}
                  alt={`Live Event ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest text-white font-bold">
                    {['Wedding', 'Corporate', 'Birthday', 'Editorial', 'Gala', 'Activation'][i]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXTRAS: Customization & Features */}
        <section className="col-span-1 md:col-span-12 md:row-span-1 bg-zinc-800 rounded-3xl border border-zinc-700 p-8 lg:p-12">
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-8 text-center">Uncompromising Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            <div className="flex flex-col items-center text-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-700">
              <Camera className="w-6 h-6 mb-4 text-zinc-300" />
              <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Red Carpet Prep</h4>
              <p className="text-[10px] text-zinc-400 leading-relaxed uppercase">Stanchions, velvet ropes, and VIP floor decals.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-700">
              <Star className="w-6 h-6 mb-4 text-zinc-300" />
              <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Props & Accents</h4>
              <p className="text-[10px] text-zinc-400 leading-relaxed uppercase">Curated, high-end props. No plastic items.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-700">
              <Instagram className="w-6 h-6 mb-4 text-zinc-300" />
              <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Instant Sharing</h4>
              <p className="text-[10px] text-zinc-400 leading-relaxed uppercase">AirDrop, SMS, and QR code social delivery.</p>
            </div>
          </div>
        </section>

        {/* FAQ block */}
        <section id="faq" className="col-span-1 md:col-span-4 md:row-span-2 bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <h2 className="font-serif text-2xl font-bold tracking-tight mb-8">Details & Logistics</h2>
          <div className="space-y-3">
            {[
              { q: "How much floor space is required?", a: "The box is roughly 6x6ft, but we recommend a 9x9ft footprint for the red carpet and entry flow." },
              { q: "Do you need access to power?", a: "Yes, one dedicated 15-amp, 110v standard power outlet within 30 feet." },
              { q: "How long does setup take?", a: "Our team arrives 2 hours prior to your contracted start time." },
              { q: "Can the booth be set up outdoors?", a: "Yes, on a solid surface under an approved tent/cover. No direct rain/wind." },
            ].map((faq, i) => (
              <details key={i} className="group bg-zinc-800/50 rounded-xl overflow-hidden border border-zinc-700">
                <summary className="font-medium text-xs uppercase tracking-wider cursor-pointer p-5 flex justify-between items-center list-none custom-summary">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-zinc-700/50 mt-2 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT FORM: The Conversion */}
        <section id="contact" className="col-span-1 md:col-span-8 md:row-span-2 bg-zinc-100 text-zinc-950 rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row gap-8 relative overflow-hidden">
          <div className="flex-1 flex flex-col justify-between relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif italic mb-2">Reserve the Spotlight.</h2>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Secure your date.</p>
            </div>

            <form id="booking-form" className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  aria-label="First Name"
                  placeholder="FIRST NAME"
                  required
                  className="bg-transparent border-b border-zinc-300 py-2 text-[10px] uppercase font-bold tracking-widest outline-none focus:border-zinc-950 transition-colors"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  aria-label="Last Name"
                  placeholder="LAST NAME"
                  required
                  className="bg-transparent border-b border-zinc-300 py-2 text-[10px] uppercase font-bold tracking-widest outline-none focus:border-zinc-950 transition-colors"
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                aria-label="Email Address"
                placeholder="EMAIL ADDRESS"
                required
                className="w-full bg-transparent border-b border-zinc-300 py-2 text-[10px] uppercase font-bold tracking-widest outline-none focus:border-zinc-950 transition-colors"
              />
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  aria-label="Event Date"
                  required
                  className="bg-transparent border-b border-zinc-300 py-2 text-[10px] uppercase font-bold tracking-widest outline-none focus:border-zinc-950 transition-colors text-zinc-500"
                />
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  aria-label="Guest Count"
                  required
                  className="bg-transparent border-b border-zinc-300 py-2 text-[10px] uppercase font-bold tracking-widest outline-none focus:border-zinc-950 transition-colors text-zinc-500"
                >
                  <option value="" disabled>GUEST COUNT</option>
                  <option value="under_100">Under 100</option>
                  <option value="100_250">100 - 250</option>
                  <option value="250_500">250 - 500</option>
                  <option value="500_plus">500+</option>
                </select>
              </div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                aria-label="Event Location or Venue"
                placeholder="EVENT LOCATION / VENUE"
                required
                className="w-full bg-transparent border-b border-zinc-300 py-2 text-[10px] uppercase font-bold tracking-widest outline-none focus:border-zinc-950 transition-colors"
              />
            </form>
          </div>
          <div className="w-full md:w-1/3 flex flex-col justify-end relative z-10">
            {/* Added form="booking-form" to connect the button to the form element */}
            <button form="booking-form" type="submit" className="w-full h-16 bg-zinc-950 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors">
              Check Availability
              <span className="text-lg leading-none">→</span>
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-200 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </section>

      </main>

      {/* Footer Info */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] text-zinc-500 py-4 gap-4 px-4 md:px-0">
        <p>© {new Date().getFullYear()} Magazine Box. All Rights Reserved.</p>
        <p>Serving COLOMBO • KANDY • GALLE • NEGOMBO</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">TikTok</a>
        </div>
      </footer>
    </div>
  );
}