import { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone";

type Block = { title: string; points: string[] };
export default function OrgNetwork({ blocks }: { blocks: Block[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const nodes = new DataSet(
      [{ id: "root", label: "Tổ chức", shape: "hexagon", color: "#3b5bdb" } as any]
        .concat(blocks.map((b, i) => ({ id: "b"+i, label: b.title })))
    );
    const edges = new DataSet(blocks.map((_, i) => ({ from: "root", to: "b"+i })));
    const net = new Network(ref.current, { nodes, edges }, {
      physics: { stabilization: true },
      nodes: { shape: "box", color: { background: "#0b1220", border: "#223", highlight: "#3b5bdb" }, font: { color: "#fff" } },
      edges: { color: "#445", smooth: true }
    });
    return () => net.destroy();
  }, [blocks]);

  return <div ref={ref} style={{ height: 420 }} />;
}
