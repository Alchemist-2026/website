import React, { useState } from 'react';
import { BRAND_INFO } from '../data/content';
import { supabase } from '../lib/supabase';
import { Phone, Mail, MapPin, MessageSquare, Check } from 'lucide-react';

const initialFormData = {
  name: '',
  email: '',
  guests: '2',
  date: '',
  time: '',
  experience: 'cafe',
  message: '',
};

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMessage('');

    // Build the payload for Supabase and the notification service
    const booking = {
      name: formData.name.trim(),
      phone: formData.phone?.trim() || '',
      email: formData.email?.trim() || '',
      date: formData.date,
      time: formData.time,
      guests: Number(formData.guests),
      message: [
        formData.experience ? `Experience: ${formData.experience}` : '',
        formData.message?.trim() || '',
      ].filter(Boolean).join('\n'),
    };

  try {
    // 1. Save the reservation first, so it is never lost
    const { error: dbError } = await supabase
      .from('reservations')
      .insert([booking]);

    if (dbError) {
      console.error('Saving reservation failed:', dbError);
      throw new Error('Could not save your reservation. Please try again.');
    }

    // 2. Send the ntfy notification (best-effort: a failure here
    //    should not make the customer think the booking failed)
    const { data, error } = await supabase.functions.invoke(
      'send-booking-notification',
      { body: booking },
    );

    if (error) {
      // Read the real reason from the function's response body
      const details = error.context
        ? await error.context.json().catch(() => null)
        : null;
      console.error('Reservation notification failed:', details ?? error);
    } else if (!data?.success) {
      console.error('Notification not sent:', data?.error);
    }

    setSubmitted(true);
    setFormData({ ...initialFormData });
    window.setTimeout(() => setSubmitted(false), 5000);
  } catch (error) {
    console.error('Reservation submission failed:', error);
    setErrorMessage(
      error instanceof Error
        ? error.message
        : 'Unable to send your reservation. Please try again.',
    );
  } finally {
    setSubmitting(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-6 md:px-12 bg-[#050303] flex flex-col items-center overflow-hidden border-t border-white/3"
    >
      {/* Background soft glowing blur grids */}
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] rounded-full bg-accent-gold/4 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-coffee-brown/4 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 select-none">
          <span className="text-xs tracking-[0.3em] text-accent-gold uppercase font-bold mb-3">
            Secure Entry
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            RESERVATIONS & CONTACTS
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/50 max-w-xl font-light leading-relaxed">
            Reserve your lakeside table, VR gaming, or private dome screening below.
          </p>
          <div className="h-[1px] w-24 bg-accent-gold/40 mt-8" />
        </div>

        {/* Dynamic Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch w-full">

          {/* Left Column: Booking details & contacts */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left gap-10">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                GET IN TOUCH
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed font-light mb-8 max-w-sm">
                Have questions about custom catering, private Esports corporate tournaments, or private Dome viewings? Speak directly with our guest services.
              </p>

              {/* Contacts Stack */}
              <div className="flex flex-col gap-6">

                {/* Phone */}
                <a
                  href={`tel:${BRAND_INFO.phone}`}
                  className="flex items-center gap-4 group/item hover:translate-x-1 transition-transform duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-white/2 border border-white/5 flex items-center justify-center text-accent-gold group-hover/item:border-accent-gold/35 group-hover/item:bg-accent-gold/5 transition-all">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 block">Phone Desk</span>
                    <span className="text-xs sm:text-sm text-white/80 font-medium group-hover/item:text-accent-gold transition-colors">{BRAND_INFO.phone}</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="flex items-center gap-4 group/item hover:translate-x-1 transition-transform duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-white/2 border border-white/5 flex items-center justify-center text-accent-gold group-hover/item:border-accent-gold/35 group-hover/item:bg-accent-gold/5 transition-all">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 block">Guest Inquiries</span>
                    <span className="text-xs sm:text-sm text-white/80 font-medium group-hover/item:text-accent-gold transition-colors">{BRAND_INFO.email}</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={BRAND_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group/item hover:translate-x-1 transition-transform duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-white/2 border border-white/5 flex items-center justify-center text-accent-gold group-hover/item:border-accent-gold/35 group-hover/item:bg-accent-gold/5 transition-all">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 block">Instant WhatsApp</span>
                    <span className="text-xs sm:text-sm text-white/80 font-medium group-hover/item:text-accent-gold transition-colors">Chat Reservations</span>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-white/2 border border-white/5 flex items-center justify-center text-accent-gold shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 block">Lakeside Address</span>
                    <span className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">{BRAND_INFO.address}</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="h-[1px] w-full bg-white/10" />
          </div>

          {/* Right Column: Glassmorphic Booking Form Card */}
          <div className="lg:col-span-7">
            <div className="glass-card border border-white/5 rounded-sm p-8 sm:p-12 shadow-2xl relative">
              {submitted ? (
                // Success screen
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center text-accent-gold mb-6 animate-scale-in">
                    <Check size={28} />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                    RESERVATION REQUESTED
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/55 leading-relaxed font-light max-w-sm">
                    Thank you. We have saved your luxury slot for {formData.date} at {formData.time}. A guest relations agent will call or email you shortly.
                  </p>
                </div>
              ) : (
                // Standard Form
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                  <h4 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                    BOOK AN EXPERIENCE
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-semibold">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/2 border border-white/8 rounded-sm px-4 py-3 text-xs tracking-wider text-white focus:outline-none focus:border-accent-gold/40 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-semibold">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/2 border border-white/8 rounded-sm px-4 py-3 text-xs tracking-wider text-white focus:outline-none focus:border-accent-gold/40 transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-semibold">Target Date</label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-white/2 border border-white/8 rounded-sm px-4 py-3 text-xs tracking-wider text-white/80 focus:outline-none focus:border-accent-gold/40 transition-colors"
                      />
                    </div>

                    {/* Time */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-semibold">Target Time</label>
                      <input
                        type="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full bg-white/2 border border-white/8 rounded-sm px-4 py-3 text-xs tracking-wider text-white/80 focus:outline-none focus:border-accent-gold/40 transition-colors"
                      />
                    </div>

                    {/* Guests count */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-semibold">Guests Count</label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full bg-[#0d0706] border border-white/8 rounded-sm px-4 py-3 text-xs tracking-wider text-white/80 focus:outline-none focus:border-accent-gold/40 transition-colors"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8">8+ Guests</option>
                      </select>
                    </div>
                  </div>

                  {/* Experience Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-semibold">Target Experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full bg-[#0d0706] border border-white/8 rounded-sm px-4 py-3 text-xs tracking-wider text-white/80 focus:outline-none focus:border-accent-gold/40 transition-colors"
                    >
                      <option value="cafe">Lakeside Dining & Artisan Cafe</option>
                      <option value="gaming">PlayStation 5 VIP Lounge Slot</option>
                      <option value="vr">Virtual Reality Sandbox Session</option>
                      <option value="dome">Immersive Dome Theatre Booking</option>
                      {/* <option value="vip">Full Experiential Combo Day-Pass</option> */}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-4 w-full bg-accent-gold border border-accent-gold text-deep-dark font-sans text-xs tracking-[0.25em] uppercase font-bold py-4 hover:bg-white hover:border-white transition-all duration-300 shadow-[0_4px_20px_rgba(200,164,107,0.2)]"
                  >
                    {submitting
                      ? 'Saving Reservation...'
                      : 'Confirm Luxury Reservation'}
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
