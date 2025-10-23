import Section from '../components/Section';
import { useLang } from '../context/LangContext';
import SearchBar from '../components/SearchBar';
import ResourceList from '../components/ResourceList';
import * as VI from '../data/vi';
import * as EN from '../data/en';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../anim';

export default function Documents(){
  const {lang} = useLang();
  const data = lang==='vi'?VI.resources:EN.resources;
  const [q,setQ] = useState('');
  const filtered = useMemo(()=> data.filter(d=> (d.title+d.summary+d.tags.join(' ')).toLowerCase().includes(q.toLowerCase())),[q,data]);

  return (
    <Section title={lang==='vi'? 'Tư liệu':'Documents'} subtitle={lang==='vi'? 'Tổng hợp quy trình, tiêu chuẩn, báo cáo':'Processes, standards, and reports'}>
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SearchBar value={q} onChange={setQ} placeholder={lang==='vi'? 'Tìm kiếm tư liệu...':'Search documents...'} />
        </motion.div>
        <ResourceList items={filtered}/>
      </div>
    </Section>
  );
}
