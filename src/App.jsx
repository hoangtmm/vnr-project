import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import KeyPoints from './components/KeyPoints'
import Quiz from './components/Quiz'
import Footer from './components/Footer'
import { timelinePhases, sections, quizData } from './content'
import QuizAI from './components/QuizAI'
import QuizLauncher from './components/QuizLauncher'
import TheaterStory from './components/TheaterStory.jsx'  
export default function App() {
  const [activeId, setActiveId] = useState(timelinePhases[0].id)

  return (
    <div className="font-body bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <Hero />
      <Timeline phases={timelinePhases} activeId={activeId} onSelect={setActiveId} />
<TheaterStory />

      {/* <KeyPoints id="context" title="Bối cảnh & yêu cầu" items={sections.context} />
      <KeyPoints id="principles" title="Quan điểm, nguyên tắc lãnh đạo" items={sections.principles} />
      <KeyPoints id="methods" title="Phương thức hoạt động chủ yếu" items={sections.methods} />
      <KeyPoints id="law" title="Khuôn khổ pháp lý" items={sections.law} />
      <KeyPoints id="lessons" title="Bài học kinh nghiệm cốt lõi" items={sections.lessons} /> */}
   
      <QuizLauncher
        data={quizData}
        knowledge={{
          keywords: [
            { key: 'asean', hint: 'Mốc hội nhập khu vực vào giữa thập niên 90.' },
            { key: 'biên giới', hint: 'Liên quan xung đột phía Bắc & Tây Nam.' },
          ]
        }}
      />

      <Footer />
    </div>
  )
}
