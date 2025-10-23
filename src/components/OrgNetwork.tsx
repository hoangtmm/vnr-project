import { useEffect, useRef } from "react";
import { DataSet, Network, Node, Edge } from "vis-network/standalone";

type Block = { title: string; points: string[] };

export default function OrgNetwork({ blocks }: { blocks: Block[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // ---- Nodes & Edges có kiểu rõ ràng ----
    const nodeItems: Node[] = [
      {
        id: "root",
        label: "Tổ chức",
        shape: "hexagon",
        color: { background: "#3b5bdb", border: "#3b5bdb" },
        font: { color: "#fff" },
      },
      ...blocks.map((b, i) => ({
        id: `b${i}`,
        label: b.title,
        shape: "box",
      })),
    ];

    const edgeItems: Edge[] = blocks.map((_, i) => ({
      from: "root",
      to: `b${i}`,
    }));

    const nodes = new DataSet<Node>(nodeItems);
    const edges = new DataSet<Edge>(edgeItems);

    const net = new Network(
      ref.current,
      { nodes, edges },
      {
        physics: { stabilization: true },
        nodes: {
          shape: "box",
          color: { background: "#0b1220", border: "#223", highlight: "#3b5bdb" },
          font: { color: "#fff" },
        },
        edges: { color: { color: "#445" }, smooth: true },
      }
    );

    return () => net.destroy();
  }, [blocks]);

  return <div ref={ref} style={{ height: 420 }} />;
}
