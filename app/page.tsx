"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-sm tracking-widest text-stone-600">
            FINE VISUAL STORYTELLING COMPANY
          </div>

          {/* Hamburger Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-stone-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-sm tracking-wide text-stone-600 hover:text-stone-800"
            >
              ABOUT
            </a>
            <a
              href="#portfolio"
              className="text-sm tracking-wide text-stone-600 hover:text-stone-800"
            >
              PORTFOLIO
            </a>
            <div className="text-2xl font-serif tracking-wider">FAABS</div>
            <a
              href="#services"
              className="text-sm tracking-wide text-stone-600 hover:text-stone-800"
            >
              SERVICES
            </a>
            <a
              href="#contact"
              className="text-sm tracking-wide text-stone-600 hover:text-stone-800"
            >
              CONTACT
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 text-center">
            <a
              href="#about"
              className="text-sm tracking-wide text-stone-600 hover:text-stone-800"
            >
              ABOUT
            </a>
            <a
              href="#portfolio"
              className="text-sm tracking-wide text-stone-600 hover:text-stone-800"
            >
              PORTFOLIO
            </a>
            <a
              href="#services"
              className="text-sm tracking-wide text-stone-600 hover:text-stone-800"
            >
              SERVICES
            </a>
            <a
              href="#contact"
              className="text-sm tracking-wide text-stone-600 hover:text-stone-800"
            >
              CONTACT
            </a>
          </div>
        )}
      </div>
    </nav>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(/images/fabb-hero-image.jpg)`,
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-light tracking-[0.3em] mb-4">TELLING YOUR STORY</h1>
            <p className="text-lg tracking-wide font-light mb-8">IN FRAMES AND MOTION</p>
            <div className="w-16 h-px bg-white mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-[#ede5da]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light tracking-wide text-stone-800 mb-4">WEDDING & LIFESTYLE PHOTOGRAPHER</h2>
            <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Faabs Production is a Ghana-based photography and videography brand committed to capturing unforgettable
              moments through creative visuals.
            </p>
          </div>
        </div>
      </section>

      {/* About Section - Asymmetrical Layout */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-5">
              <div className="pr-8">
                <h2 className="text-4xl font-light tracking-wide text-stone-800 mb-8">HERE&#39;S TO LIFE</h2>
                <p className="text-stone-600 leading-relaxed mb-6">
                  At Faabs Production, we believe that every moment tells a story worth preserving. With years of
                  experience in weddings, events, portraits, and commercial shoots, we tell your story with style and
                  emotion.
                </p>
                <p className="text-stone-600 leading-relaxed mb-8">
                  From intimate ceremonies to grand celebrations, we capture the essence of your special moments with
                  artistic vision and technical excellence.
                </p>
                <div className="w-12 h-px bg-stone-400"></div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="relative">
                <Image
                  src="/images/photography.jpg"
                  alt="Wedding photography"
                  width={800}
                  height={600}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-6 shadow-lg">
                  <p className="text-sm tracking-wide text-stone-600 italic">Capture the magic &</p>
                  <p className="text-sm tracking-wide text-stone-600 italic">live the moment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <section className="py-16  bg-[#ede5da]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-8 opacity-30">
            <div className="w-16 h-16 border border-[#c6b2a0] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border border-[#c6b2a0] rounded-full"></div>
            </div>
            <div className="w-16 h-16 border border-[#c6b2a0] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border border-[#c6b2a0] rounded-full"></div>
            </div>
            <div className="w-16 h-16 border border-[#c6b2a0] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border border-[#c6b2a0] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Masonry Layout */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-light tracking-wide text-stone-800 text-center mb-4">OUR SERVICES</h2>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Large image left */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="relative h-96">
                <Image
                  src="/images/wedding-photo1.jpg"
                  alt="Wedding Photography"
                  width={400}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2">
                  <p className="text-sm tracking-wide text-stone-800">WEDDING PHOTOGRAPHY</p>
                </div>
              </div>
            </div>

            {/* Two smaller images right */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="space-y-6">
                <div className="relative h-44">
                  <Image
                    src="/images/event-coverage.jpg"
                    alt="Event Coverage"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2">
                    <p className="text-sm tracking-wide text-stone-800">EVENT COVERAGE</p>
                  </div>
                </div>
                <div className="relative h-44">
                  <Image
                    src="/images/portrait.jpg"
                    alt="Portrait Sessions"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2">
                    <p className="text-sm tracking-wide text-stone-800">PORTRAIT SESSIONS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium image right */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="relative h-96">
                <Image
                  src="/images/drone-footage.jpg"
                  alt="Drone Footage"
                  width={400}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-stone-800/90 px-4 py-2">
                  <p className="text-sm tracking-wide text-white">DRONE FOOTAGE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services List */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-stone-600">
                <p className="text-sm tracking-wide">WEDDING VIDEOGRAPHY</p>
              </div>
              <div className="text-stone-600">
                <p className="text-sm tracking-wide">SOCIAL MEDIA REELS</p>
              </div>
              <div className="text-stone-600">
                <p className="text-sm tracking-wide">OUTDOOR SHOOTS</p>
              </div>
              <div className="text-stone-600">
                <p className="text-sm tracking-wide">INDOOR STUDIO</p>
              </div>
              <div className="text-stone-600">
                <p className="text-sm tracking-wide">COMMERCIAL</p>
              </div>
              <div className="text-stone-600">
                <p className="text-sm tracking-wide">LIFESTYLE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="relative py-32">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{
            backgroundImage: `linear-gradient(rgba(139, 128, 109, 0.8), rgba(139, 128, 109, 0.8)), url(/images/camera.jpg) `,
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <p className="text-sm tracking-widest mb-4 opacity-90">THIS IS THE PERFECT PLACE FOR</p>
          <h2 className="text-4xl font-light tracking-wide mb-8">MISSION STATEMENT</h2>
          <p className="text-lg leading-relaxed opacity-90 max-w-2xl mx-auto">
            Our mission is to create timeless visual narratives that celebrate life&#39;s most precious moments. We believe
            in the power of authentic storytelling through the lens.
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-[#ede5da]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden">
              <Image
                src="/images/wedding-photo3.jpg"
                alt="Client testimonial"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-sm tracking-widest text-stone-600 mb-4">IT WAS JUST DIVINE WORKING WITH THEM</p>
            <p className="text-lg text-stone-700 leading-relaxed italic mb-8">
              &quotFaabs Production made our wedding day unforgettable. Every photo was magical! Their attention to detail
              and ability to capture emotions is truly remarkable.&quot
            </p>
            <p className="text-sm tracking-wide text-stone-600">AKUA & KWAME</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-6">
              <h2 className="text-3xl font-light tracking-wide text-stone-800 mb-8">OH, HELLO</h2>
              <p className="text-stone-600 leading-relaxed mb-8">
                Ready to tell your story? We&#39;d love to hear about your vision and create something beautiful together.
              </p>

              <div className="space-y-4 mb-8">
                <p className="text-stone-700">
                  <span className="text-sm tracking-wide text-stone-500">CALL/WHATSAPP:</span>
                  <br />
                  +233 24 000 0000
                </p>
                <p className="text-stone-700">
                  <span className="text-sm tracking-wide text-stone-500">EMAIL:</span>
                  <br />
                  faabsproduction@gmail.com
                </p>
                <p className="text-stone-700">
                  <span className="text-sm tracking-wide text-stone-500">INSTAGRAM:</span>
                  <br />
                  @faabs.production
                </p>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <form className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="border-0 border-b border-stone-300 rounded-none bg-transparent px-0 py-3 focus:border-stone-600 focus:ring-0"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="border-0 border-b border-stone-300 rounded-none bg-transparent px-0 py-3 focus:border-stone-600 focus:ring-0"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={4}
                    className="border-0 border-b border-stone-300 rounded-none bg-transparent px-0 py-3 focus:border-stone-600 focus:ring-0 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3 tracking-wide text-sm"
                >
                  SEND MESSAGE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-serif tracking-wider text-stone-800 mb-4">FAABS PRODUCTION</div>
          <p className="text-sm tracking-wide text-stone-600 mb-6">TELLING YOUR STORY IN FRAMES AND MOTION</p>
          <div className="w-16 h-px bg-stone-400 mx-auto mb-6"></div>
          <p className="text-xs tracking-wide text-stone-500">© 2024 FAABS PRODUCTION. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  )
}
