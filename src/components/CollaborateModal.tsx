import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface CollaborateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollaborateModal: React.FC<CollaborateModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Brand Identity & Logo Design');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
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

  const validate = () => {
    const errors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      errors.name = 'Please enter your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@company.com).';
    }

    if (!message.trim()) {
      errors.message = 'Please tell me about your project goals and vision.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Primary: Direct Serverless Function with Nodemailer & Gmail App Password
      let success = false;
      let errorMsg: string | null = null;

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            service,
            message: message.trim(),
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok && (data.success === true || data.success === 'true')) {
          success = true;
        } else {
          errorMsg = data.message;
        }
      } catch (backendErr) {
        // Fallback to FormSubmit if /api/contact is unavailable (e.g. static dev preview)
        console.warn('Backend endpoint unreached, attempting fallback dispatch:', backendErr);
      }

      if (!success) {
        const fallbackEndpoint =
          import.meta.env.VITE_FORMSPREE_ID
            ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
            : (import.meta.env.VITE_CONTACT_ENDPOINT || 'https://formsubmit.co/ajax/arjunchougale1541@gmail.com');

        const fallbackPayload = {
          _subject: `New Portfolio Inquiry – ${name.trim()}`,
          _replyto: email.trim(),
          _template: 'table',
          _captcha: 'false',
          'New Collaboration Request Received!': '----------------------------------------',
          'Client Name': name.trim(),
          'Client Email': email.trim(),
          'Service Interested In': service,
          'Project Summary': message.trim(),
          name: name.trim(),
          email: email.trim(),
          service: service,
          message: message.trim(),
        };

        const fallbackRes = await fetch(fallbackEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(fallbackPayload),
        });

        const fallbackData = await fallbackRes.json().catch(() => ({}));
        if (
          fallbackRes.ok &&
          (fallbackData.success === 'true' ||
            fallbackData.success === true ||
            fallbackData.ok ||
            (fallbackData.message && fallbackData.message.toLowerCase().includes('activation')))
        ) {
          success = true;
        } else {
          errorMsg = fallbackData.message || errorMsg;
        }
      }

      if (success) {
        setSubmitted(true);
        setErrorMessage(null);
      } else {
        setErrorMessage(
          errorMsg ||
            'Failed to deliver inquiry. Please try again or reach out directly at arjunchougale1541@gmail.com.'
        );
      }
    } catch (err) {
      setErrorMessage(
        'A network connection error occurred while submitting. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    setErrorMessage(null);
    setValidationErrors({});
    handleSmoothClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md ${
        isClosing ? 'animate-portfolio-backdrop-out' : 'animate-portfolio-backdrop-in'
      }`}
    >
      <div className="fixed inset-0 -z-10" onClick={handleSmoothClose} />

      <div
        className={`relative w-full max-w-lg max-h-[92vh] bg-[#0c0c16] border border-indigo-900/60 rounded-2xl shadow-2xl overflow-y-auto p-5 sm:p-8 text-gray-100 ${
          isClosing ? 'animate-portfolio-modal-out' : 'animate-portfolio-modal-in'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleSmoothClose}
          disabled={isSubmitting}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer disabled:opacity-40"
          aria-label="Close dialog"
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

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (validationErrors.name) {
                      setValidationErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border text-white text-sm transition-colors focus:outline-none ${
                    validationErrors.name
                      ? 'border-rose-500/80 focus:border-rose-400'
                      : 'border-indigo-950 focus:border-indigo-500'
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                />
                {validationErrors.name && (
                  <p className="text-[11px] text-rose-400 mt-1 font-medium">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  disabled={isSubmitting}
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validationErrors.email) {
                      setValidationErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border text-white text-sm transition-colors focus:outline-none ${
                    validationErrors.email
                      ? 'border-rose-500/80 focus:border-rose-400'
                      : 'border-indigo-950 focus:border-indigo-500'
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                />
                {validationErrors.email && (
                  <p className="text-[11px] text-rose-400 mt-1 font-medium">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Service Interested In
                </label>
                <select
                  value={service}
                  disabled={isSubmitting}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#141324] border border-indigo-950 focus:border-indigo-500 focus:outline-none text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <option value="Brand Identity & Logo Design">Brand Identity &amp; Logo Design</option>
                  <option value="Packaging & Visual Merchandising">Packaging &amp; Visual Merch</option>
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
                  disabled={isSubmitting}
                  placeholder="Tell me about your goals, timeline, and vision..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (validationErrors.message) {
                      setValidationErrors((prev) => ({ ...prev, message: undefined }));
                    }
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border text-white text-sm resize-none transition-colors focus:outline-none ${
                    validationErrors.message
                      ? 'border-rose-500/80 focus:border-rose-400'
                      : 'border-indigo-950 focus:border-indigo-500'
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                />
                {validationErrors.message && (
                  <p className="text-[11px] text-rose-400 mt-1 font-medium">{validationErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-6 rounded-full bg-[#4757fe] hover:bg-[#3848ec] text-white font-bold text-sm tracking-wide uppercase shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Sending Request...</span>
                  </>
                ) : (
                  <>
                    <span>Send Collaboration Request</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 animate-scaleIn">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Inquiry Sent!</h3>
            <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out! Your inquiry has been sent successfully. I'll get back to you soon.
            </p>
            <div className="text-xs text-gray-400 bg-white/5 py-2.5 px-4 rounded-xl max-w-sm mx-auto border border-white/5 space-y-1">
              <div>
                <span className="text-gray-400">Client:</span>{' '}
                <strong className="text-white font-semibold">{name}</strong>
              </div>
              <div>
                <span className="text-gray-400">Service:</span>{' '}
                <span className="text-indigo-400 font-semibold">{service}</span>
              </div>
              <div>
                <span className="text-gray-400">Email:</span>{' '}
                <span className="text-white font-semibold">{email}</span>
              </div>
            </div>
            <div className="pt-2">
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

