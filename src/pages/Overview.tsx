import Section from '../components/Section';
import { useLang } from '../context/LangContext';
import * as VI from '../data/vi';
import * as EN from '../data/en';
import { motion } from 'framer-motion';
import { stagger, item } from '../anim';

export default function Overview(){
  const {lang} = useLang();
  const data = lang==='vi' ? VI : EN;

  return (
    <div>
      <Section
        title={lang==='vi'?'Tổng quan':'Overview'}
        subtitle={lang==='vi'?'Mục tiêu, nguyên tắc, nhiệm vụ trong giai đoạn hậu chiến':'Objectives, principles and tasks in the post-war era'}
      >
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          <motion.div className="card p-6" variants={item}>
            <h3 className="h3 mb-3">{lang==='vi'?'Mục tiêu cốt lõi':'Core objectives'}</h3>
            <ul className="list-disc pl-5 space-y-2">
              {data.objectives.map((o, i)=> <li key={i}>{o}</li>)}
            </ul>
          </motion.div>
          <motion.div className="card p-6" variants={item}>
            <h3 className="h3 mb-3">{lang==='vi'?'Nguyên tắc hoạt động':'Operating principles'}</h3>
            <ol className="list-decimal pl-5 space-y-2">
              {data.principles.map((p, i)=> <li key={i}>{p}</li>)}
            </ol>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}
