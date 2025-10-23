import Section from '../components/Section';
import { useLang } from '../context/LangContext';
import * as VI from '../data/vi';
import * as EN from '../data/en';
import { motion } from 'framer-motion';
import { stagger, item } from '../anim';

export default function Operations(){
  const {lang} = useLang();
  const ops = (lang==='vi'?VI:EN).opsDetails;

  return (
    <Section title={lang==='vi'?'Hoạt động':'Operations'} subtitle={lang==='vi'?'Quy trình chuẩn hoá':'Standardized workflows'}>
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
      >
        {ops.map((o, i)=>(
          <motion.div key={i} className="card p-6" variants={item}>
            <h3 className="h3">{o.title}</h3>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              {o.bullets.map((b: string, k: number)=> <li key={k}>{b}</li>)}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
