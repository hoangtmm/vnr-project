import Section from '../components/Section';
import { useLang } from '../context/LangContext';
import * as VI from '../data/vi';
import * as EN from '../data/en';
import { motion } from 'framer-motion';
import { stagger, item } from '../anim';
import OrgNetwork from '../components/OrgNetwork';
export default function Organization(){
  const {lang} = useLang();
  const blocks = (lang==='vi'?VI:EN).orgStructure;

  return (
    <Section title={lang==='vi'?'Tổ chức':'Organization'} subtitle={lang==='vi'?'Mô hình khung & chức năng':'Reference model & functions'}>
      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {blocks.map((b,i)=>(
          <motion.div key={i} className="card p-6" variants={item}>
            <h3 className="h3 mb-2">{b.title}</h3>
            <ul className="list-disc pl-5 space-y-2">{b.points.map((t:string,idx:number)=><li key={idx}>{t}</li>)}</ul>
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-5xl mx-auto mt-10 card p-4">
        <h3 className="h3 mb-3">{lang==='vi'?'Sơ đồ quan hệ':'Relationship graph'}</h3>
        <OrgNetwork blocks={blocks as any}/>
      </div>
    </Section>
  );
}