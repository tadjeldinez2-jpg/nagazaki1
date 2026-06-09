import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Send, CheckCircle, Clock, MapPin, Sparkles, MessageSquare, User, ArrowUpRight } from "lucide-react";
import Hls from "hls.js";
import { FadeIn } from "./FadeIn";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    const streamUrl = "https://stream.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE.m3u8";

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(err => {
          console.log("Auto-play was prevented by browser security rules:", err);
        });
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(err => {
          console.log("Auto-play was prevented by browser security rules:", err);
        });
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate premium submission with nice timeline delays
    await new Promise(resolve => setTimeout(resolve, 1400));
    
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Auto reset success status after 6s
    setTimeout(() => {
      setSubmitStatus("idle");
    }, 6000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-[#070709] border-t border-zinc-900/60 text-[#D7E2EA] px-6 sm:px-12 py-24 pb-36 overflow-hidden flex flex-col justify-center"
    >
      {/* Dynamic Streaming Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          muted
          loop
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-3xl mx-auto w-full relative z-10 flex flex-col items-center justify-center">
        
        {/* Centered Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none text-center mb-10">
          LET&apos;S TALK
        </h2>

        {/* Interactive interactive lead capture widget */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full bg-[#0b0b0f] border border-zinc-900 rounded-[28px] p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Submit Success Overlay */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-[#0b0b0f]/98 min-h-full w-full z-30 flex flex-col items-center justify-center text-center p-8 backdrop-blur"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6"
                  >
                    <CheckCircle className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-2">
                    THANK YOU FOR THE TRANSMISSION
                  </h3>
                  <p className="text-zinc-400 max-w-sm text-sm sm:text-base mb-8">
                    Your request was received successfully. Filip will review and contact you shortly. Keep an eye on your inbox!
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 hover:border-zinc-700 active:scale-95 transition-all cursor-pointer"
                  >
                    Send another line
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="font-display font-medium text-xl sm:text-2xl text-white uppercase tracking-tight mb-8">
              Send Filip a direct inquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name-input" className="block text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-zinc-600" />
                    Full name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 text-sm focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/30 transition-all font-sans font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="email-input" className="block text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-600" />
                    Email address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@domain.com"
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 text-sm focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/30 transition-all font-sans font-medium"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject-input" className="block text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
                  Subject/Topic
                </label>
                <input
                  id="subject-input"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. 3D Project, Music Album, Consulting"
                  className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 text-sm focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/30 transition-all font-sans font-medium"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="message-input" className="block text-zinc-500 text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-600" />
                    How can I help? <span className="text-amber-400">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-zinc-700">
                    {formData.message.length} chars
                  </span>
                </div>
                <textarea
                  id="message-input"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about the project goals, budget timeline, and resources..."
                  className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 text-sm focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/30 transition-all font-sans font-medium resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  className={`w-full group px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-300 transform active:scale-98 cursor-pointer ${
                    isSubmitting
                      ? "bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-wait"
                      : "bg-amber-400 text-black hover:bg-amber-300 shadow-xl"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span>Transmitting Grid...</span>
                      <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
