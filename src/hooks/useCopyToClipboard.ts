import { useState } from "react";

export function useCopyToClipboard() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  function handleCopy(value: string, field: string) {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  return { copiedField, handleCopy };
}
