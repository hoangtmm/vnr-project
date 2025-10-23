import Section from '../components/Section';
import { useLang } from '../context/LangContext';
import { motion } from 'framer-motion';
import { fadeInUp } from '../anim';

export default function About(){
  const {lang} = useLang();
  return (
    <Section title={lang==='vi'? 'Giới thiệu':'About'} subtitle={lang==='vi'? 'Mục đích học thuật & tham khảo':'Academic and reference purpose'}>
      <motion.div className="prose dark:prose-invert max-w-3xl mx-auto"
        variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <p>{lang==='vi'
          ? 'Website phục vụ mục tiêu nghiên cứu lịch sử, trình bày cấu trúc tổ chức và phương thức hoạt động tình báo trong giai đoạn hậu chiến với thiết kế tối giản, dễ đọc và dễ mở rộng.'
          : 'This website supports historical study, presenting organizational structures and tradecraft in the post-war era with a minimalist, readable, and extensible design.'}
        </p>
      </motion.div>
    </Section>
  );
}
