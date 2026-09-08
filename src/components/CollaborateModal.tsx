import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, Mail, MessageSquare, ArrowRight } from 'lucide-react';

interface CollaborateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollaborateModal: React.FC<CollaborateModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Brand Identity & Logo');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (!isClosing) {
      setShouldRender(false);
    }
  }, [isOpen]);

  const handleSmoothClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setShouldRender(false);
      onClose();
    }, 420);
  };

  if (!shouldRender) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // after a short delay
    }, 1000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    handleSmoothClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md ${isClosing ? 'animate-portfolio-backdrop-out' : 'animate-portfolio-backdrop-in'}`}>
      <div className="fixed inset-0 -z-10" onClick={handleSmoothClose} />

      <div className={`relative w-full max-w-lg max-h-[92vh] bg-[#0c0c16] border border-indigo-900/60 rounded-2xl shadow-2xl overflow-y-auto p-5 sm:p-8 text-gray-100 ${isClosing ? 'animate-portfolio-modal-out' : 'animate-portfolio-modal-in'}`}>
        {/* Close Button */}
        <button
          onClick={handleSmoothClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-indigo-400 uppercase">
                START A PROJECT
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Let's collaborate
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 mb-6">
              Share details about your upcoming brand identity, logo, or video editing project.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-indigo-950 focus:border-indigo-500 focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-indigo-950 focus:border-indigo-500 focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Service Interested In
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#141324] border border-indigo-950 focus:border-indigo-500 focus:outline-none text-white text-sm"
                >
                  <option value="Brand Identity & Logo">Brand Identity &amp; Logo Design</option>
                  <option value="Packaging & Visual Merch">Packaging &amp; Visual Merch</option>
                  <option value="Video Editing & Motion Graphics">Video Editing &amp; Motion Graphics</option>
                  <option value="Full Creative Suite & Retainer">Full Creative Suite &amp; Retainer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Project Summary
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me about your goals, timeline, and vision..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-indigo-950 focus:border-indigo-500 focus:outline-none text-white text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-6 rounded-full bg-[#4757fe] hover:bg-[#3848ec] text-white font-bold text-sm tracking-wide uppercase shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Send Collaboration Request</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Inquiry Sent!</h3>
            <p className="text-sm text-gray-300 max-w-xs mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{name}</strong>. Arjun Chougale will review your project request for <span className="text-indigo-400">{service}</span> and reach out at <span className="text-white">{email}</span> within 24 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={resetForm}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
