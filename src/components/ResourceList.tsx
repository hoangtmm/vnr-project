import { Link } from 'react-router-dom';
import Tag from './Tag';
import { motion } from 'framer-motion';
import { stagger, item } from '../anim';

export default function ResourceList({items}:{items:{id:string,title:string,type:string,tags:string[],summary:string}[]}) {
  return (
    <motion.div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {items.map((r) => (
        <motion.div key={r.id} className="card p-5" variants={item}>
          <div className="text-sm muted mb-2">{r.type}</div>
          <h3 className="h3 mb-2">{r.title}</h3>
          <p className="muted mb-4">{r.summary}</p>
          <div className="flex flex-wrap gap-2 mb-4">{r.tags.map(t=> <Tag key={t} label={t} />)}</div>
          <Link to={`/documents/${r.id}`} className="btn btn-primary">Xem chi tiết</Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
