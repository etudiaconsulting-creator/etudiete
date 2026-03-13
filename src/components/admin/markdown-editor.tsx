"use client";

import { useRef, useMemo } from "react";
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Link2 } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  rows?: number;
}

function markdownToHtml(md: string): string {
  let html = md;
  // Headers (must be before bold)
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  // Bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");
  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");
  // Paragraphs: non-empty lines not already wrapped
  html = html
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (/^<(h[23]|ul|ol|li|p|div|blockquote)/.test(trimmed)) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join("\n");
  return html;
}

export function MarkdownEditor({ value, onChange, label, rows = 16 }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after: string = "") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.substring(start, end);
    const replacement = `${before}${selected || "texte"}${after}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);
    // Restore focus
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, start + before.length + (selected.length || 5));
    }, 0);
  };

  const preview = useMemo(() => markdownToHtml(value), [value]);

  const tools = [
    { icon: Bold, action: () => insertMarkdown("**", "**"), title: "Gras" },
    { icon: Italic, action: () => insertMarkdown("*", "*"), title: "Italique" },
    { icon: Heading2, action: () => insertMarkdown("## ", ""), title: "Titre H2" },
    { icon: Heading3, action: () => insertMarkdown("### ", ""), title: "Titre H3" },
    { icon: List, action: () => insertMarkdown("- ", ""), title: "Liste à puces" },
    { icon: ListOrdered, action: () => insertMarkdown("1. ", ""), title: "Liste numérotée" },
    { icon: Link2, action: () => insertMarkdown("[", "](url)"), title: "Lien" },
  ];

  return (
    <div>
      {label && (
        <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      {/* Toolbar */}
      <div className="flex items-center gap-1 border border-b-0 border-gray-200 dark:border-gray-700 rounded-t-lg px-2 py-1.5 bg-gray-50 dark:bg-gray-800/50">
        {tools.map((tool, i) => (
          <button
            key={i}
            type="button"
            onClick={tool.action}
            title={tool.title}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
          >
            <tool.icon className="w-4 h-4" />
          </button>
        ))}
      </div>
      {/* Split view */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border border-gray-200 dark:border-gray-700 rounded-b-lg overflow-hidden">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-mono resize-none focus:outline-none border-r border-gray-200 dark:border-gray-700"
          placeholder="Écris en Markdown..."
        />
        <div
          className="p-3 bg-gray-50 dark:bg-[#0f1117] overflow-y-auto prose dark:prose-invert max-w-none text-sm leading-relaxed
            prose-headings:font-medium prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3
            prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-2
            prose-li:text-gray-700 dark:prose-li:text-gray-300
            prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-medium
            prose-ul:space-y-1"
          style={{ minHeight: `${rows * 1.5}rem` }}
          dangerouslySetInnerHTML={{ __html: preview || '<p class="text-gray-400">Aperçu...</p>' }}
        />
      </div>
    </div>
  );
}
