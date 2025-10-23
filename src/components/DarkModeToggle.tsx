import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'


export default function DarkModeToggle(){
const {theme, toggle} = useTheme()
return (
<button className="btn" aria-label="Toggle theme" onClick={toggle}>
{theme==='dark' ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
<span className="hidden sm:inline">{theme==='dark'?'Light':'Dark'}</span>
</button>
)
}