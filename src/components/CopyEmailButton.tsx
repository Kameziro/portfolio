"use client";

import { useEffect, useState } from "react";
import { copyText } from "@/lib/copy-text";

type Props = {
  email: string;
  label: string;
  copiedLabel: string;
};

export function CopyEmailButton({ email, label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      className="pixel-btn pixel-btn-fill"
      onClick={async () => {
        if (await copyText(email)) setCopied(true);
        else window.location.href = `mailto:${email}`;
      }}
    >
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
