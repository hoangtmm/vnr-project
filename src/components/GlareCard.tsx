import ParallaxTilt from "./ParallaxTilt";
import Tag from "./Tag";

export default function GlareCard({
  id, title, excerpt, tags,
}: { id: string; title: string; excerpt: string; tags: string[] }) {
  return (
    <ParallaxTilt>
      <div className="card glass p-6 rounded-2xl">
        <h3 className="h3 mb-2">{title}</h3>
        <p className="muted mb-4">{excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>
    </ParallaxTilt>
  );
}
