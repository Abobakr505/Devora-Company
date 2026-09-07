import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Star,
} from "lucide-react";
import { gsap } from "gsap";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "Founder & CEO",
    company: "Lumira",
    initials: "AH",
    text: "Devora transformed our idea into a digital experience that exceeded our expectations. The attention to detail, performance and overall quality were exceptional.",
  },
  {
    id: 2,
    name: "Mohamed Ali",
    role: "Business Owner",
    company: "Easy Orders",
    initials: "MA",
    text: "Working with Devora was one of the best decisions we made. The team understood our vision and delivered a product that feels truly premium.",
  },
  {
    id: 3,
    name: "Omar Khaled",
    role: "Product Manager",
    company: "Nexa",
    initials: "OK",
    text: "From the first meeting to the final delivery, everything was handled professionally. The result was fast, polished and exactly what we needed.",
  },
  {
    id: 4,
    name: "Youssef Adel",
    role: "Creative Director",
    company: "Mira Studio",
    initials: "YA",
    text: "Devora brought our brand to life in a way we didn't expect. Every interaction feels intentional, smooth and beautifully crafted.",
  },
  {
    id: 5,
    name: "Karim Mostafa",
    role: "Co-Founder",
    company: "Orbit",
    initials: "KM",
    text: "The level of communication and technical execution was impressive. We didn't just get a website, we got a digital product we are proud of.",
  },
];

export default function Testimonials() {
  const { t, lang } = useLanguage();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sliderRef = useRef(null);
  const contentRef = useRef(null);
  const autoPlayRef = useRef(null);

  const total = testimonials.length;

  const activeTestimonial = testimonials[activeIndex];

  /* =========================
     SLIDE ANIMATION
  ========================= */
  const animateTo = (nextIndex, direction = 1) => {
    if (nextIndex === activeIndex) return;

    const content = contentRef.current;

    if (!content) {
      setActiveIndex(nextIndex);
      return;
    }

    gsap.killTweensOf(content);

    gsap.to(content, {
      opacity: 0,
      x: direction * -35,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(nextIndex);

        gsap.fromTo(
          content,
          {
            opacity: 0,
            x: direction * 35,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      },
    });
  };

  const nextSlide = () => {
    const next = (activeIndex + 1) % total;
    animateTo(next, 1);
  };

  const prevSlide = () => {
    const prev = (activeIndex - 1 + total) % total;
    animateTo(prev, -1);
  };

  /* =========================
     AUTO PLAY
  ========================= */
  useEffect(() => {
    if (isPaused) return;

    autoPlayRef.current = setInterval(() => {
      const next = (activeIndex + 1) % total;
      animateTo(next, 1);
    }, 5500);

    return () => {
      clearInterval(autoPlayRef.current);
    };
  }, [activeIndex, isPaused]);

  /* =========================
     KEYBOARD
  ========================= */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-ink-950 py-28 md:py-36"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 start-1/3 h-[500px] w-[500px] rounded-full bg-emerald-400/[0.035] blur-[150px]" />

        <div className="absolute bottom-0 end-0 h-[450px] w-[450px] rounded-full bg-emerald-500/[0.025] blur-[140px]" />

        <div className="absolute inset-0 bg-grid opacity-[0.13]" />
      </div>

      <div className="container-devora relative z-10">

        {/* ================= HEADER ================= */}
        <div
          data-reveal
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-emerald-400" />

            <p className="section-label !mb-0">
              {t.testimonials?.label ||
                (lang === "ar" ? "آراء العملاء" : "Testimonials")}
            </p>

            <span className="h-px w-10 bg-emerald-400" />
          </div>

          <h2
            className="
              font-display
              text-4xl
              leading-[0.95]
              tracking-tight
              text-mist-100
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            {t.testimonials?.title ||
              (lang === "ar"
                ? "ماذا يقول عملاؤنا؟"
                : "What our clients say")}
          </h2>

          <p
            className="
              mx-auto
              mt-7
              max-w-2xl
              text-sm
              leading-7
              text-mist-500
              sm:text-base
            "
          >
            {t.testimonials?.description ||
              (lang === "ar"
                ? "تجارب حقيقية من أشخاص وشركات وثقوا بنا لتحويل أفكارهم إلى تجارب رقمية."
                : "Real experiences from people and businesses who trusted us to turn their ideas into digital experiences.")}
          </p>
        </div>

        {/* ================= SLIDER ================= */}
        <div
          ref={sliderRef}
          className="relative mx-auto max-w-5xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Side decoration */}
          <div className="pointer-events-none absolute -start-20 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full border border-emerald-400/[0.04] lg:block" />

          <div className="pointer-events-none absolute -end-20 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full border border-emerald-400/[0.04] lg:block" />

          {/* Main card */}
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[2.5rem]
              border
              border-white/[0.08]
              bg-white/[0.018]
              shadow-[0_35px_100px_-45px_rgba(52,211,153,0.25)]
            "
          >
            {/* Top glow */}
            <div
              className="
                pointer-events-none
                absolute
                -top-32
                start-1/2
                h-72
                w-72
                -translate-x-1/2
                rounded-full
                bg-emerald-400/[0.07]
                blur-[100px]
              "
            />

            {/* Giant quote */}
            <Quote
              size={220}
              strokeWidth={0.7}
              className="
                pointer-events-none
                absolute
                -end-8
                -top-10
                text-emerald-400/[0.035]
                transition-all
                duration-700
                group-hover:text-emerald-400/[0.055]
              "
            />

            <div
              ref={contentRef}
              className="relative z-10 px-7 py-10 sm:px-12 sm:py-14 md:px-16 md:py-16"
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill="currentColor"
                      className="text-emerald-400"
                    />
                  ))}

                  <span className="ms-2 text-xs text-mist-600">
                    5.0
                  </span>
                </div>

                <span
                  className="
                    font-display
                    text-xs
                    tracking-[0.25em]
                    text-mist-600
                  "
                >
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
              </div>

              {/* Quote */}
              <div className="mx-auto max-w-4xl py-12 text-center sm:py-14 md:py-16">
                <span
                  className="
                    mb-6
                    inline-block
                    font-display
                    text-5xl
                    leading-none
                    text-emerald-400/40
                  "
                >
                  “
                </span>

                <p
                  className="
                    font-display
                    text-2xl
                    leading-relaxed
                    text-mist-100
                    sm:text-3xl
                    md:text-[2.35rem]
                    md:leading-[1.45]
                  "
                >
                  {activeTestimonial.text}
                </p>
              </div>

              {/* Client */}
              <div className="flex flex-col items-center justify-between gap-6 border-t border-white/[0.07] pt-7 sm:flex-row">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="
                      relative
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      border
                      border-emerald-400/25
                      bg-emerald-400/[0.08]
                    "
                  >
                    <span
                      className="
                        relative
                        z-10
                        font-display
                        text-sm
                        text-emerald-300
                      "
                    >
                      {activeTestimonial.initials}
                    </span>

                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-emerald-400/10
                        blur-lg
                      "
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-mist-200">
                      {activeTestimonial.name}
                    </h3>

                    <p className="mt-1 text-xs text-mist-600">
                      {activeTestimonial.role}
                      <span className="mx-1.5 text-mist-700">·</span>
                      {activeTestimonial.company}
                    </p>
                  </div>
                </div>

                {/* Company badge */}
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    px-4
                    py-2
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

                  <span className="text-xs text-mist-500">
                    {activeTestimonial.company}
                  </span>

                  <ArrowUpRight
                    size={13}
                    className="text-mist-600 rtl:-scale-x-100"
                  />
                </div>
              </div>
            </div>

            {/* Bottom progress */}
            <div className="h-[2px] w-full bg-white/[0.04]">
              <div
                className="h-full bg-emerald-400 transition-all duration-500"
                style={{
                  width: `${((activeIndex + 1) / total) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* ================= CONTROLS ================= */}
          <div className="mt-8 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() =>
                    animateTo(index, index > activeIndex ? 1 : -1)
                  }
                  className="
                    group
                    flex
                    h-6
                    items-center
                    justify-center
                  "
                >
                  <span
                    className={`
                      block
                      h-1
                      rounded-full
                      transition-all
                      duration-500
                      ${
                        index === activeIndex
                          ? "w-8 bg-emerald-400"
                          : "w-2 bg-white/15 group-hover:w-4 group-hover:bg-white/30"
                      }
                    `}
                  />
                </button>
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  text-mist-500
                  transition-all
                  duration-300
                  hover:border-emerald-400/30
                  hover:bg-emerald-400
                  hover:text-ink-950
                "
              >
                <ArrowLeft
                  size={17}
                  className="rtl:-scale-x-100"
                />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  text-mist-500
                  transition-all
                  duration-300
                  hover:border-emerald-400/30
                  hover:bg-emerald-400
                  hover:text-ink-950
                "
              >
                <ArrowRight
                  size={17}
                  className="rtl:-scale-x-100"
                />
              </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-white/10" />

          <div className="flex items-center gap-2">
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-emerald-400
                shadow-[0_0_12px_rgba(52,211,153,0.7)]
              "
            />

            <span className="text-xs text-mist-600 sm:text-sm">
              {t.testimonials?.bottom ||
                (lang === "ar"
                  ? "ثقة نبنيها مع كل مشروع"
                  : "Trust built with every project")}
            </span>
          </div>

          <span className="h-px w-12 bg-white/10" />
        </div>
      </div>
    </section>
  );
}
