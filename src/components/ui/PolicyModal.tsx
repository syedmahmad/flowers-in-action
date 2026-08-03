"use client";

import { Modal } from "@/components/ui/Modal";
import { policies } from "@/data/policies";

type PolicyKey = keyof typeof policies;

interface PolicyModalProps {
  policy: PolicyKey | null;
  onClose: () => void;
}

export function PolicyModal({ policy, onClose }: PolicyModalProps) {
  if (!policy) return null;
  const content = policies[policy];

  return (
    <Modal isOpen={!!policy} onClose={onClose} title={content.title}>
      <ul className="space-y-3 text-base leading-relaxed text-charcoal/90">
        {content.content.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
