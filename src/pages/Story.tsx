import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Section from "../components/Section";
import { useLang } from "../context/LangContext";
import * as VI from "../data/vi";
import * as EN from "../data/en";
import { fadeInUp } from "../anim";

type Step = { title: string; text: string };

export default function Story() {
  const { lang } = useLang();
  const t = lang === "vi";

  // Nội dung các "bước" kể chuyện
  const steps: Step[] = [
    {
      title: t ? "Sau 1975: Ổn định an ninh" : "Post-1975: Stabilization",
      text: t
        ? "Thiết lập bộ máy, rà soát mạng lưới, ưu tiên trật tự xã hội."
        : "Establish apparatus, review networks, stabilize public order.",
    },
    {
      title: t ? "Thập niên 80: Bảo vệ biên giới" : "1980s: Border defense",
      text: t
        ? "Chuẩn hoá phản gián, phối hợp liên ngành."
        : "Standardize counterintelligence, inter-agency coordination.",
    },
    {
      title: t ? "Đổi mới – Hội nhập" : "Reform & Integration",
      text: t
        ? "Phân tích chiến lược, hợp tác quốc tế có chọn lọc."
        : "Strategic analysis, selective international cooperation.",
    },
    {
      title: t ? "Kỷ nguyên số" : "Digital era",
      text: t
        ? "An ninh mạng, mật mã, big data, cảnh báo sớm."
        : "Cyber defense, cryptography, big-data, early warning.",
    },
  ];

  // index bước đang active để đổi nội dung panel sticky
  const [active, setActive] = useState(0);

  // thanh tiến độ cuộn theo toàn bộ vùng story
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  return (
    <div ref={wrapRef}>
      {/* progress bar cố định bên trên */}
      <motion.div
        style={{ scaleX: bar }}
        className="fixed left-0 right-0 top-16 h-1 origin-left bg-gradient-to-r from-brand-500 to-brand-700 z-40"
      />

      <Section
        title={t ? "Hành trình hậu chiến" : "Post-war journey"}
        subtitle={t ? "Kể chuyện theo cuộn trang" : "Scrollytelling"}
      >
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Panel trái: sticky, đổi nội dung theo bước */}
          <div className="lg:sticky lg:top-24 self-start">
            <motion.div
              key={active}
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              className="card p-6 aurora"
            >
              <h2 className="h2 mb-2">{steps[active].title}</h2>
              <p className="muted">{steps[active].text}</p>

              {/* hint cuộn */}
              <div className="mt-6 text-xs muted">
                {t ? "Cuộn xuống để tiếp tục…" : "Scroll to continue…"}
              </div>
            </motion.div>
          </div>

          {/* Cột phải: các step cao gần full màn hình để trigger */}
          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.section
                key={i}
                className="card p-6 min-h-[70vh] flex items-center"
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.6 }}
                variants={fadeInUp}
                initial="hidden"
                whileInView="show"
              >
                <div>
                  <div className="text-sm muted mb-2">
                    {t ? "Bước" : "Step"} {i + 1} / {steps.length}
                  </div>
                  <h3 className="h3 mb-2">{s.title}</h3>
                  <p className="muted">{s.text}</p>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
