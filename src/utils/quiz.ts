import * as VI from "../data/vi";
import * as EN from "../data/en";

export type Lang = "vi" | "en";
export type QuizItem = {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explain: string;
  tag: string; // chủ đề
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN<T>(arr: T[], n: number, except?: T[]) {
  const pool = arr.filter((x) => !(except || []).includes(x));
  return shuffle(pool).slice(0, n);
}

/** Trích “sự thật” từ dataset để biến thành câu hỏi trắc nghiệm */
function extractFacts(lang: Lang) {
  const D = lang === "vi" ? VI : EN;

  // 1) Timeline
  const timelineFacts = (D.timeline || []).map((t: any) => ({
    tag: "Timeline",
    stem:
      lang === "vi"
        ? `Giai đoạn nào gắn với nội dung: “${t.desc}”?`
        : `Which period matches: “${t.desc}”?`,
    correct: `${t.year} — ${t.title}`,
    pool: (D.timeline || []).map((x: any) => `${x.year} — ${x.title}`),
    explain:
      lang === "vi"
        ? `Theo mốc phát triển: ${t.year} – ${t.title}.`
        : `According to milestones: ${t.year} – ${t.title}.`,
  }));

  // 2) Cấu trúc tổ chức
  const orgFacts = (D.orgStructure || []).map((b: any) => ({
    tag: lang === "vi" ? "Tổ chức" : "Organization",
    stem:
      lang === "vi"
        ? `Khối nào phù hợp nhất với mô tả: “${b.points[0]}”?`
        : `Which block best fits: “${b.points[0]}”?`,
    correct: b.title,
    pool: (D.orgStructure || []).map((x: any) => x.title),
    explain:
      lang === "vi"
        ? `Điểm nhấn của khối: ${b.title}.`
        : `Key focus of block: ${b.title}.`,
  }));

  // 3) Hoạt động (opsDetails)
  const opFacts = (D.opsDetails || []).map((o: any) => ({
    tag: lang === "vi" ? "Nghiệp vụ" : "Tradecraft",
    stem:
      lang === "vi"
        ? `Nội dung nào KHÔNG thuộc nhóm “${o.title}”?`
        : `Which item does NOT belong to “${o.title}”?`,
    // chọn 1 nhiễu từ nhóm khác làm "đáp án đúng" (vì câu hỏi phủ định)
    correct: pickN(
      (D.opsDetails || [])
        .filter((x: any) => x.title !== o.title)
        .flatMap((x: any) => x.bullets),
      1
    )[0],
    pool: shuffle([
      ...pickN(o.bullets, 3), // 3 lựa chọn đúng ngữ cảnh
      ...pickN(
        (D.opsDetails || [])
          .filter((x: any) => x.title !== o.title)
          .flatMap((x: any) => x.bullets),
        3
      ),
    ]).slice(0, 6),
    explain:
      lang === "vi"
        ? `Các ý thuộc “${o.title}”: ${o.bullets.join("; ")}.`
        : `Items of “${o.title}”: ${o.bullets.join("; ")}.`,
  }));

  // 4) Case studies (năm & tiêu đề)
  const csFacts = (D.caseStudies || []).map((c: any) => ({
    tag: lang === "vi" ? "Tình huống" : "Case",
    stem:
      lang === "vi"
        ? `Tình huống nào xảy ra vào năm ${c.year}?`
        : `Which case happened in ${c.year}?`,
    correct: c.title,
    pool: (D.caseStudies || []).map((x: any) => x.title),
    explain:
      lang === "vi"
        ? `Năm ${c.year}: ${c.title}.`
        : `In ${c.year}: ${c.title}.`,
  }));

  return [...timelineFacts, ...orgFacts, ...opFacts, ...csFacts];
}

/** Sinh bộ câu hỏi trộn đáp án & kèm giải thích */
export function buildQuiz(lang: Lang, count = 10, tagFilter?: string): QuizItem[] {
  const facts = extractFacts(lang).filter((f) => !tagFilter || f.tag === tagFilter);
  const items = pickN(facts, Math.min(count, facts.length)).map((f, i) => {
    const choices = shuffle([
      f.correct,
      ...pickN(
        f.pool.filter((x: string) => x !== f.correct),
        3
      ),
    ]).slice(0, 4);
    const answerIndex = choices.findIndex((c) => c === f.correct);
    return {
      id: `${f.tag}-${i}`,
      question: f.stem,
      choices,
      answerIndex: answerIndex < 0 ? 0 : answerIndex,
      explain: f.explain,
      tag: f.tag,
    } as QuizItem;
  });

  return items;
}
