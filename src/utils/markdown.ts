export async function fetchDocMarkdown(id: string): Promise<string | null> {
  try {
    const res = await fetch(`/docs/${id}.md`);
    if (!res.ok) return null;
    return await res.text();
  } catch { return null; }
}
