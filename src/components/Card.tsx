import { Link } from 'react-router-dom'
import Tag from './Tag'


export default function Card({id,title,excerpt,tags}:{id:string,title:string,excerpt:string,tags:string[]}){
return (
<Link to={`/documents/${id}`} className="block card p-5 hover:shadow-lg transition">
<h3 className="h3 mb-2">{title}</h3>
<p className="muted mb-4">{excerpt}</p>
<div className="flex flex-wrap gap-2">{tags.map(t=> <Tag key={t} label={t} />)}</div>
</Link>
)
}