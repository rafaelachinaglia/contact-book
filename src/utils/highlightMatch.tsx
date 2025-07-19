import React from "react";

export function highlightMatch(text: string, term: string) {
  if (!term) return text;

  const regex = new RegExp(`(${term})`, "ig");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark key={index} style={{ backgroundColor: "#61b448ff" }}>
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}
