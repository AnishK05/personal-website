import type { ReactNode } from 'react';

const LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|(https?:\/\/[^\s]+)/g;

function LinkAnchor({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 underline underline-offset-2 hover:text-gray-100 break-all"
    >
      {children}
    </a>
  );
}

export default function ExperienceBulletText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  const pattern = new RegExp(LINK_PATTERN.source, 'g');
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<span key={`text-${index}`}>{text.slice(lastIndex, match.index)}</span>);
    }

    const label = match[1];
    const markdownHref = match[2];
    const rawUrl = match[3];

    if (label && markdownHref) {
      nodes.push(
        <LinkAnchor key={`link-${index}`} href={markdownHref}>
          {label}
        </LinkAnchor>
      );
    } else if (rawUrl) {
      nodes.push(
        <LinkAnchor key={`link-${index}`} href={rawUrl}>
          {rawUrl}
        </LinkAnchor>
      );
    }

    lastIndex = match.index + match[0].length;
    index += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(<span key={`text-${index}`}>{text.slice(lastIndex)}</span>);
  }

  return <span>{nodes}</span>;
}
