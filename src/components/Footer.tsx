export default function Footer(){
return (
<footer className="mt-16 border-t border-gray-100 dark:border-gray-900">
<div className="container-px py-10 text-sm muted flex flex-col sm:flex-row items-center justify-between gap-3">
<div>© {new Date().getFullYear()} INTEL Project. All rights reserved.</div>
<div className="opacity-80">Built with React + Vite + Tailwind</div>
</div>
</footer>
)
}