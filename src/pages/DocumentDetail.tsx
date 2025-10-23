import { useParams, Link } from 'react-router-dom';
import Section from '../components/Section';
import { useLang } from '../context/LangContext';
import * as VI from '../data/vi';
import * as EN from '../data/en';
import { motion } from 'framer-motion';
import { fadeInUp } from '../anim';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { useEffect, useState } from 'react';
import { fetchDocMarkdown } from '../utils/markdown';

export default function DocumentDetail(){
  const {id} = useParams();
  const {lang} = useLang();
  const list = lang==='vi'?VI.resources:EN.resources;
  const doc = list.find(x=>x.id===id);

  const [md, setMd] = useState<string | null>(null);
  useEffect(()=>{ if(id) fetchDocMarkdown(id).then(setMd); },[id]);

  if(!doc) return (
    <Section title={lang==='vi'? 'Không tìm thấy':'Not found'}>
      <Link className="btn" to="/documents">{lang==='vi'? 'Quay lại tư liệu':'Back to documents'}</Link>
    </Section>
  );

  return (
    <Section title={doc.title} subtitle={doc.type}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[2fr,1fr] gap-8">
        <motion.div className="prose dark:prose-invert" variants={fadeInUp} initial="hidden" animate="show">
          {md
            ? <ReactMarkdown rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]}>{md}</ReactMarkdown>
            : <p>{doc.summary}</p>}
          <Link to="/documents" className="btn mt-6">{lang==='vi'? '← Trở lại':'← Back'}</Link>
        </motion.div>

        {/* TOC tự động từ H2/H3 nếu md có */}
        {md && (
          <aside className="card p-4 h-fit sticky top-20">
            <h4 className="font-semibold mb-2">{lang==='vi'?'Mục lục':'Contents'}</h4>
            <Toc markdown={md}/>
          </aside>
        )}
      </div>
    </Section>
  );
}

/** TOC đơn giản: parse heading markdown */
function Toc({ markdown }: { markdown: string }) {
  const lines = markdown.split('\n').filter(l => l.startsWith('## ' ) || l.startsWith('### '));
  return (
    <ul className="space-y-2 text-sm">
      {lines.map((l, i) => {
        const level = l.startsWith('###') ? 3 : 2;
        const text = l.replace(/^#+\s*/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g,'');
        return <li key={i} className={level===3?'pl-4 opacity-80':''}><a href={`#${id}`} className="hover:underline">{text}</a></li>;
      })}
    </ul>
  );
}
