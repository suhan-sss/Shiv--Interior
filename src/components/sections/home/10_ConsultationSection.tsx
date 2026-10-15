'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useState } from 'react';

import consultationData from '@/data/home/consultation.json';

/**
 * Contact / Consultation section.
 *
 * Matches the Luneo "Contact Us" reference: a single cream band
 * split into two columns — the LEFT column carries the heading, a
 * short subtext, and a 2x2 contact-info grid (Email, Phone, Location,
 * Response Time); the RIGHT column carries the inquiry form.
 *
 *   ┌─────────────────────────┬─────────────────────────────────┐
 * │ Contact Us       [ 10 ]  │   [ Full Name  ][ Email Addr ] │
 * │                          │                                 │
 * │ <short subtext>          │   [ Location   ][ Project  T  ] │
 * │                          │                                 │
 * │ Email     │ Phone        │   [ Timeline   ][ Your Budget ] │
 * │ hello@..  │ +91 ...      │                                 │
 * │                          │   [ Message (full-width)         ]│
 * │ Location  │ Response     │                                 │
 * │ Mumbai    │ Within 24h   │   [       Submit  ●       ]    │
 * └─────────────────────────┴─────────────────────────────────┘
 *
 * Form rows pair up the first six inputs (3 rows of 2), then the
 * Message textarea goes full-width below them, and the dark Submit
 * pill spans the full form width.
 *
 * The form does NOT post to a backend — it swaps to a thank-you
 * panel via AnimatePresence on submit. Honeypot field included for
 * bot protection.
 *
 * All content lives in `src/data/consultation.json`.
 */

type Field = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea';
  placeholder: string;
  options?: string[];
  required?: boolean;
};

type ContactItem = {
  label: string;
  value: string;
};

const {
  sectionNumber,
  heading,
  subtext,
  contact,
  fields,
  submit,
} = consultationData as {
  sectionNumber: string;
  heading: string;
  subtext: string;
  contact: ContactItem[];
  fields: Field[];
  submit: string;
};

/* ------------------------------ Pieces ------------------------------ */

/**
 * One form row — label on top, then text/select field with a 1px
 * bottom border that turns amber on focus. Matches the Luneo
 * reference's underline-style input aesthetic.
 */
function FormField({ field, delay = 0 }: { field: Field; delay?: number }) {
  const baseClasses =
    'w-full bg-transparent border-b border-black/15 py-3 text-base text-black placeholder-neutral-400 focus:outline-none focus:border-amber-700 transition-colors duration-300';

  return (
    <motion.label
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="block"
      htmlFor={`field-${field.name}`}
    >
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 md:text-sm">
        {field.label}
      </span>

      {field.type === 'textarea' ? (
        <textarea
          id={`field-${field.name}`}
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          rows={4}
          className={`${baseClasses} min-h-[120px] resize-none`}
        />
      ) : field.type === 'select' ? (
        <div className="relative">
          <select
            id={`field-${field.name}`}
            name={field.name}
            required={field.required}
            defaultValue=""
            className={`${baseClasses} cursor-pointer appearance-none pr-8`}
          >
            <option value="" disabled>
              {field.placeholder}
            </option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt} className="bg-white text-black">
                {opt}
              </option>
            ))}
          </select>
          {/* Chevron — decorative, hides the native select arrow so the
              cream-on-cream line aesthetic stays clean. */}
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
          >
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <input
          id={`field-${field.name}`}
          name={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          className={baseClasses}
        />
      )}
    </motion.label>
  );
}

/**
 * One contact-info cell — small muted label, then the value underneath.
 * Used in the 2x2 grid on the left side of the section.
 */
function ContactCell({
  item,
  delay = 0,
}: {
  item: ContactItem;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 md:text-sm">
        {item.label}
      </p>
      <p className="mt-3 text-base font-light text-black md:text-lg md:leading-[1.5]">
        {item.value}
      </p>
    </motion.div>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function ConsultationSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this to a real API when ready — for now it just swaps to the
    // thank-you panel.
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20"
    >
      <div className=" px-6 lg:px-10">
        {/* ============================== TOP HEADER ============================== */}
        {/* Main page header — "Contact Us" on the left, [10] tag on the
            right, same pattern as the other sections (02–08). Spans the
            full section width above the two-column body. */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:text-7xl"
          >
            {heading}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="flex items-center gap-2 text-2xl font-medium text-black/60 sm:text-3xl md:text-4xl"
            aria-label={`Section ${sectionNumber}`}
          >
            <span>[</span>
            <span>{sectionNumber}</span>
            <span>]</span>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
          {/* ============================== LEFT ============================== */}
          <div className="md:col-span-5">
            {/* Short subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-base font-light leading-relaxed text-neutral-700 md:ml-auto  md:text-xl md:leading-[1.7]"
            >
              {subtext}
            </motion.p>

            {/* Contact info 2x2 grid */}
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-16">
              {contact.map((item, i) => (
                <ContactCell key={item.label} item={item} delay={0.25 + i * 0.08} />
              ))}
            </div>
          </div>

          {/* ============================== RIGHT ============================== */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* Row 1 — Full Name | Email Address */}
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
                    <FormField field={fields[0]} delay={0.15} />
                    <FormField field={fields[1]} delay={0.2} />
                  </div>

                  {/* Row 2 — Location | Project Type */}
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
                    <FormField field={fields[2]} delay={0.25} />
                    <FormField field={fields[3]} delay={0.3} />
                  </div>

                  {/* Row 3 — Timeline | Your Budget */}
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
                    <FormField field={fields[4]} delay={0.35} />
                    <FormField field={fields[5]} delay={0.4} />
                  </div>

                  {/* Message — full width */}
                  <FormField field={fields[6]} delay={0.45} />

                  {/* Honeypot — hidden field that real users never fill in.
                      If a bot fills it, the submission can be ignored. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute h-0 w-0 opacity-0"
                  />

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                    className="group flex h-14 w-full items-center justify-center gap-4 rounded-full bg-black px-6 text-[#F2EDE4] transition-colors duration-300 hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
                  >
                    <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                      {submit}
                    </span>
                    <span
                      aria-hidden
                      className="block h-6 w-6 rounded-full border-[1.5px] border-[#F2EDE4] transition-transform duration-500 ease-out group-hover:rotate-45"
                    />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="rounded-2xl border border-black/10 bg-white p-10 text-center md:p-14"
                >
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                    className="font-serif text-3xl font-light leading-tight md:text-5xl"
                  >
                    Thank you.
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    className="mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-neutral-700 md:text-lg"
                  >
                    We've received your inquiry and will be in touch within 24
                    hours to schedule your consultation.
                  </motion.p>
                  <motion.button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-700 underline-offset-4 transition-colors duration-300 hover:text-amber-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
                  >
                    Send Another Inquiry
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}