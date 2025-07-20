interface ContactInfoLineProps {
  icon: React.ReactNode;
  value: string;
  onCopy: () => void;
  showCopy?: boolean;
}

export function ContactInfoLine({
  icon,
  value,
}: ContactInfoLineProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {icon}
      <span>{value}</span>
    </div>
  );
}
