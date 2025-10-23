import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'


export default function ScrollTop(){
const [show, setShow] = useState(false)
useEffect(()=>{
const fn = ()=> setShow(window.scrollY>220)
window.addEventListener('scroll', fn)
fn(); return ()=>window.removeEventListener('scroll', fn)
},[])
if(!show) return null
return (
<button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
className="fixed bottom-6 right-6 btn btn-primary rounded-full" aria-label="Back to top">
<ArrowUp className="w-4 h-4"/>
</button>
)
}