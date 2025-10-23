import { useLang } from "../context/LangContext";
import * as VI from "../data/vi";
import * as EN from "../data/en";
import Section from "../components/Section";
import Timeline from "../components/Timeline";
import GlareCard from "../components/GlareCard";
import SectionDivider from "../components/SectionDivider";
import { motion } from "framer-motion";
import StatBadges from "../components/StatBadges";

export default function Home() {
  const { lang } = useLang();
  const cfg = lang === "vi" ? VI : EN;

  return (
    <div>
      {/* Hero aurora (không cần ảnh) */}
      <section className="relative aurora">
        <div className="h-[46vh] sm:h-[58vh] w-full bg-gradient-to-br from-brand-600 to-brand-900" />
        <div className="absolute inset-0 container-px flex flex-col items-start justify-center">
          <motion.h1
            className="h1 text-white drop-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {cfg.site.title}
          </motion.h1>
          <motion.p
            className="text-white/90 mt-3 max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
          >
            {cfg.site.slogan}
          </motion.p>
          <div className="mt-6"><StatBadges /></div>
        </div>
      </section>

      <SectionDivider />

      <Section title={lang === "vi" ? "Các chuyên mục" : "Featured areas"}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cfg.cards.map((c) => <GlareCard key={c.id} {...c} />)}
        </div>
      </Section>

      <Section
        title={lang === "vi" ? "Mốc phát triển" : "Development milestones"}
        subtitle={lang === "vi" ? "Khái quát tiến trình sau chiến tranh" : "Post-war trajectory at a glance"}
      >
        <Timeline items={cfg.timeline} />
      </Section>
    </div>
  );
}
