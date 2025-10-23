import Section from '../components/Section';
import { useLang } from '../context/LangContext';
import * as VI from '../data/vi';
import * as EN from '../data/en';
import { motion } from 'framer-motion';
import { stagger, item } from '../anim';

export default function Figures(){
  const {lang} = useLang();
  const list = (lang==='vi'?VI:EN).figures;

  return (
    <Section title={lang==='vi'?'Nhân vật':'Figures'} subtitle={lang==='vi'?'Đóng góp tiêu biểu (ẩn danh hoá)':'Notable contributions (anonymized)'}>
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
      >
        {list.map((f, i)=>(
          <motion.div key={i} className="card p-6" variants={item}>
            <div className="flex items-baseline justify-between">
              <h3 className="h3">{f.code}</h3>
              <span className="text-xs muted">{f.period}</span>
            </div>
            <p className="mt-2"><span className="font-medium">{lang==='vi'?'Vai trò':'Role'}:</span> {f.role}</p>
            <p className="mt-1"><span className="font-medium">{lang==='vi'?'Đóng góp':'Contribution'}:</span> {f.contribution}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
