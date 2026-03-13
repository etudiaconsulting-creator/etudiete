"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-5 py-4 text-left text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="font-normal">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-5 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Generic accordion with ReactNode content and per-section styling

export interface AccordionSection {
  title: string;
  content: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function AccordionGeneric({ sections }: { sections: AccordionSection[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden ${
            openIndex === index && section.className ? section.className : ""
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-5 py-4 text-left text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              {section.icon}
              <span className="font-normal">{section.title}</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-5 pb-4 text-sm leading-relaxed">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
