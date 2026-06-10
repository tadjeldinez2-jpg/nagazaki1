import React, { useState } from "react";
import { Twitter, Circle, Instagram, Linkedin, MessageSquare } from "lucide-react";

// CONSTANTS
const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4";

const SERVICES = [
  "Website",
  "Mobile App",
  "Web App",
  "E-Commerce",
  "Visual Identity",
  "3D & Motion",
  "Digital Marketing",
  "Growth & Consulting",
  "Other"
];

// Helper Component for Social Buttons
interface SocialBtnProps {
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  href: string;
}

const SocialBtn: React.FC<SocialBtnProps> = ({ icon, bgColor, textColor, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${bgColor} ${textColor}`}
    >
      {icon}
    </a>
  );
};

export const ContactSection: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Toggle multi-select tags
  const handleTagToggle = (service: string) => {
    setSelected(prev =>
      prev.includes(service)
        ? prev.filter(item => item !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSending(true);
    // 1-second delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSending(false);
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-white text-black p-3 sm:p-4 md:p-6 flex flex-col justify-center font-sans"
    >
      {/* Centered LET'S TALK header matching ProjectsSection style */}
      <div className="mb-12 text-center select-none pt-4 sm:pt-6">
        <p className="text-[10px] tracking-[0.3em] font-black uppercase text-amber-500 mb-3 flex items-center justify-center gap-2">
          <MessageSquare className="w-3.5 h-3.5 animate-pulse" />
          GET IN TOUCH
        </p>
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#0C0C0C] tracking-widest">
          LET'S TALK
        </h3>
      </div>

      {/* Large Rounded Card Container */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)] bg-black shadow-inner">
        
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          src={VIDEO_URL}
        />

        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-black/40 z-1 pointer-events-none" />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between w-full p-4 sm:p-6 md:p-8 gap-6 min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-full">
          
          {/* Headline (Left) */}
          <div className="flex-1 max-w-xl text-left">
            <p className="text-white text-3xl sm:text-4xl xl:text-5xl font-medium leading-tight drop-shadow-lg lg:max-w-lg xl:max-w-2xl shrink-0">
              I craft bold ideas <br />
              and ship them as{" "}
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontWeight: 400
                }}
              >
                products
              </span>
            </p>
          </div>

          {/* Contact Form Card (Right) */}
          <div className="w-full lg:w-[min(480px,45%)] shrink-0 z-10">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 flex flex-col gap-4 text-black text-left">
              
              {/* Heading */}
              <h3 className="text-xl sm:text-2xl font-semibold text-black tracking-tight">
                Say hello! 👋
              </h3>

              {/* Email + Socials Row */}
              <div className="flex flex-row items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-2.5">
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    Drop us a line
                  </span>
                  <a
                    href="mailto:hello@forma.co"
                    className="text-blue-600 font-semibold hover:underline truncate text-sm"
                  >
                    hello@forma.co
                  </a>
                </div>

                {/* Social Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <SocialBtn
                    icon={<Twitter size={13} />}
                    bgColor="bg-gray-100"
                    textColor="text-gray-800"
                    href="https://twitter.com"
                  />
                  <SocialBtn
                    icon={<Circle size={13} />}
                    bgColor="bg-pink-100"
                    textColor="text-pink-500"
                    href="https://dribbble.com"
                  />
                  <SocialBtn
                    icon={<Instagram size={13} />}
                    bgColor="bg-orange-100"
                    textColor="text-orange-400"
                    href="https://instagram.com"
                  />
                  <SocialBtn
                    icon={<Linkedin size={13} />}
                    bgColor="bg-blue-100"
                    textColor="text-blue-600"
                    href="https://linkedin.com"
                  />
                </div>
              </div>

              {/* OR Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-gray-400 font-medium text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Conditionally Render Form or Success State */}
              {sent ? (
                <div className="py-6 gap-3 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl text-green-600 font-semibold">
                    ✓
                  </div>
                  <h4 className="text-base font-semibold text-gray-900">
                    You're all set!
                  </h4>
                  <p className="text-sm text-gray-500">
                    Expect a reply within 24 hours.
                  </p>
                  
                  {/* Subtle link to enable sending another message */}
                  <button
                    onClick={() => {
                      setSent(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                      setSelected([]);
                    }}
                    className="mt-4 text-xs text-blue-600 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-black">
                      Tell us about your vision
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition text-black"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition text-black"
                      />
                    </div>
                  </div>

                  {/* Textarea */}
                  <textarea
                    rows={4}
                    placeholder="What are you looking to build or improve..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition text-black resize-none"
                  />

                  {/* Service tags section */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-gray-500">
                      I need help with...
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {SERVICES.map((service) => {
                        const isSelected = selected.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => handleTagToggle(service)}
                            className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-gray-100 text-black border-black"
                                : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={sending || !name.trim() || !email.trim()}
                    className="w-full bg-black text-white text-sm font-semibold py-3 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-60 cursor-pointer"
                  >
                    {sending ? "Sending..." : "Send my message"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
