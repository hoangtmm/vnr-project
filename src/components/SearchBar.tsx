import { Search } from 'lucide-react'


export default function SearchBar({value,onChange,placeholder}:{value:string,onChange:(v:string)=>void,placeholder:string}){
return (
<div className="flex items-center gap-2 card px-4 py-2">
<Search className="w-4 h-4"/>
<input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
className="w-full bg-transparent outline-none"/>
</div>
)
}