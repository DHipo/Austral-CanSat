import React from 'react';
import { cn } from '../../lib/cn';

/**
 * Renderizador de Markdown chico y seguro: arma elementos de React (nunca
 * inyecta HTML). Soporta títulos, párrafos, listas, citas, bloques de código,
 * tablas simples, separadores, **negrita**, *cursiva*, `código` y enlaces http(s).
 * Hereda el color del contenedor, así sirve en pantalla y en la hoja impresa.
 */

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*|_[^_\s][^_]*_)/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key}>{renderInline(part.slice(2, -2), key)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={key} className="rounded bg-current/10 px-1 py-0.5 font-mono text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const href = link[2];
      return /^https?:\/\//i.test(href) ? (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">
          {link[1]}
        </a>
      ) : (
        <React.Fragment key={key}>{link[1]}</React.Fragment>
      );
    }
    if (/^(\*[^*].*\*|_[^_].*_)$/.test(part) && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

const isTableRow = (line: string) => /^\s*\|.*\|\s*$/.test(line);
const splitRow = (line: string) => line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

export function Markdown({ source, className }: { source: string; className?: string }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = `b${i}`;

    if (!line.trim()) {
      i++;
      continue;
    }

    // Bloque de código
    if (line.trimStart().startsWith('```')) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) code.push(lines[i++]);
      i++;
      blocks.push(
        <pre key={key} className="overflow-x-auto rounded-lg bg-current/[0.06] p-3 font-mono text-[0.85em] leading-relaxed">
          <code>{code.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const Tag = (['h3', 'h3', 'h4', 'h5'] as const)[level - 1];
      blocks.push(
        <Tag key={key} className={cn('font-bold leading-snug', level <= 2 ? 'text-[1.15em]' : 'text-[1.05em]')}>
          {renderInline(heading[2], key)}
        </Tag>,
      );
      i++;
      continue;
    }

    if (/^\s*(-\s*){3,}$|^\s*(\*\s*){3,}$|^\s*(_\s*){3,}$/.test(line)) {
      blocks.push(<hr key={key} className="border-current/15" />);
      i++;
      continue;
    }

    // Tabla: fila de encabezado + separador |---|
    if (isTableRow(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
      const header = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) rows.push(splitRow(lines[i++]));
      blocks.push(
        <div key={key} className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.92em]">
            <thead>
              <tr>
                {header.map((h, c) => (
                  <th key={c} className="border-b border-current/20 px-2 py-1.5 font-semibold">
                    {renderInline(h, `${key}h${c}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c} className="border-b border-current/10 px-2 py-1.5 align-top">
                      {renderInline(cell, `${key}r${r}c${c}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // Listas
    const listMatch = line.match(/^\s*([-*+]|\d+[.)])\s+/);
    if (listMatch) {
      const ordered = /\d/.test(listMatch[1]);
      const items: string[] = [];
      while (i < lines.length) {
        const m = lines[i].match(/^\s*([-*+]|\d+[.)])\s+(.*)$/);
        if (!m || /\d/.test(m[1]) !== ordered) break;
        items.push(m[2]);
        i++;
      }
      const ListTag = ordered ? 'ol' : 'ul';
      blocks.push(
        <ListTag key={key} className={cn('space-y-1 pl-5', ordered ? 'list-decimal' : 'list-disc')}>
          {items.map((item, n) => (
            <li key={n}>{renderInline(item, `${key}-${n}`)}</li>
          ))}
        </ListTag>,
      );
      continue;
    }

    if (line.startsWith('>')) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) quote.push(lines[i++].replace(/^>\s?/, ''));
      blocks.push(
        <blockquote key={key} className="border-l-2 border-current/25 pl-3 opacity-90">
          {renderInline(quote.join(' '), key)}
        </blockquote>,
      );
      continue;
    }

    // Párrafo: líneas seguidas hasta una vacía o un bloque nuevo
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4}\s|```|>|\s*([-*+]|\d+[.)])\s+)/.test(lines[i]) &&
      !isTableRow(lines[i])
    ) {
      para.push(lines[i++]);
    }
    if (para.length === 0) {
      // Línea que no encaja en ningún bloque: se muestra tal cual.
      para.push(lines[i++]);
    }
    blocks.push(
      <p key={key} className="whitespace-pre-line">
        {renderInline(para.join('\n'), key)}
      </p>,
    );
  }

  return <div className={cn('space-y-3', className)}>{blocks}</div>;
}
