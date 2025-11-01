import React from 'react'

export default function Footer() {
  return (
    <footer className="py-10">
      <div className="container text-sm text-slate-500 dark:text-slate-400">
        <div className="border-t border-brand-100 dark:border-slate-800 pt-6">
          <p>
            Nội dung tóm lược từ chuyên đề: “Tổ chức và hoạt động tình báo dưới sự lãnh đạo của Đảng trong thời kì sau chiến tranh, củng cố đất nước”.
          </p>
          <p className="mt-1">© {new Date().getFullYear()} — Landing page phục vụ học tập & trình bày.</p>
        </div>
      </div>
    </footer>
  )
}
