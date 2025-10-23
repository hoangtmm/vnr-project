import { useLang } from '../context/LangContext'


export default function LangSwitch(){
const {lang, setLang} = useLang()
return (
<div className="btn" role="radiogroup" aria-label="Language">
<button onClick={()=>setLang('vi')} className={"px-2 " + (lang==='vi'?'font-semibold text-brand-600':'muted')}>VI</button>
<span className="mx-1 opacity-40">/</span>
<button onClick={()=>setLang('en')} className={"px-2 " + (lang==='en'?'font-semibold text-brand-600':'muted')}>EN</button>
</div>
)
}