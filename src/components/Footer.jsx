import React from "react";

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="container text-sm text-[var(--muted)]">
        <div className="border-t border-[var(--border)] pt-6">
          <p>
            Nội dung tóm lược chuyên đề “Tổ chức và hoạt động tình báo dưới sự lãnh đạo của Đảng trong thời kì sau
            chiến tranh củng cố đất nước Việt Nam”.
          </p>
          <p className="mt-2 opacity-80">
            © {new Date().getFullYear()} · Landing page phục vụ học tập & trình bày.
          </p>
        </div>
      </div>
    </footer>
  );
}
