import { Copy } from "lucide-react";

interface ContactInfoLineProps {
  icon: React.ReactNode;
  value: string;
  onCopy: () => void;
  showCopy?: boolean;
}

export function ContactInfoLine({
  icon,
  value,
  onCopy,
  showCopy = true,
}: ContactInfoLineProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {icon}
      <span>{value}</span>
      {showCopy && value !== "-" && (
        <button
          onClick={onCopy}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          title="Copiar"
        >
          <Copy size={12} color="#888888" />
        </button>
      )}
    </div>
  );
}
