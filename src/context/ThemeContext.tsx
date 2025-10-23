import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'


type Theme = 'light'|'dark'
const ThemeCtx = createContext<{theme:Theme, toggle:()=>void}>({theme:'light', toggle:()=>{}})


export const ThemeProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
const [theme, setTheme] = useLocalStorage<Theme>('theme','light')
useEffect(()=>{
const root = document.documentElement
if (theme==='dark') root.classList.add('dark'); else root.classList.remove('dark')
},[theme])
return <ThemeCtx.Provider value={{theme, toggle:()=>setTheme(t=>t==='dark'?'light':'dark')}}>{children}</ThemeCtx.Provider>
}
export const useTheme = ()=>useContext(ThemeCtx)