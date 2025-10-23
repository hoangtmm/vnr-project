import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'


export type Lang = 'vi'|'en'
const LangCtx = createContext<{lang:Lang, setLang:(l:Lang)=>void}>({lang:'vi', setLang:()=>{}})


export const LangProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
const [lang, setLang] = useLocalStorage<Lang>('lang','vi')
return <LangCtx.Provider value={{lang, setLang}}>{children}</LangCtx.Provider>
}
export const useLang = ()=>useContext(LangCtx)