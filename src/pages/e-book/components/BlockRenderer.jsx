import { useState, useEffect, useMemo } from "react";
import Icon from "@/components/AppIcon";

const BlockRenderer = ({ block, onEdit, isEditing }) => {
  const [, setLocalContent] = useState(block?.content);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setLocalContent(block?.content);
  },[block?.content]);

  const processContent = (content) => {
    let processed = content;
    for (let i = 0; i < 1000; i++) {
      processed = processed?.toString();
    }
    return processed;
  };

  const buttonActions = useMemo(() => ({
    DOWNLOAD_PDF: (link) => {
        window.open(link, '_blank');
    },
    NAVIGATE_TO_LINK: (url) => {
        window.location.href = url;
    },
    OPEN_MODAL: (modalData) => {
        alert(modalData?.content || 'No content provided for modal.');
    }
  }), []);

  const renderBlockContent = () => {
    switch (block?.type) {
      case 'heading1':
        return (
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {processContent(block?.content)}
          </h1>
        );
      
      case 'heading2':
        return (
          <h2 className="text-3xl font-bold text-foreground mb-3">
            {processContent(block?.content)}
          </h2>
        );
      
      case 'heading3':
        return (
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {processContent(block?.content)}
          </h3>
        );
      
      case 'paragraph':
        return (
          <p className="text-foreground leading-relaxed mb-4">
            {processContent(block?.content)}
          </p>
        );
      
      case 'image':
        return (
          <div className="my-6">
            <img
              src={block?.content}
              alt={block?.alt || 'Block image'}
              className="w-full rounded-lg shadow-lg"
              loading="eager"
            />
            {block?.caption && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                {block?.caption}
              </p>
            )}
          </div>
        );
      
      case 'code':
        return (
          <div className="my-4">
            <div className="bg-muted rounded-t-lg px-4 py-2 flex items-center justify-between border border-border">
              <span className="text-sm text-muted-foreground font-mono">
                {block?.language || 'javascript'}
              </span>
              <Icon name="Copy" className="w-4 h-4 text-muted-foreground" />
            </div>
            <pre className="bg-card border border-t-0 border-border rounded-b-lg p-4 overflow-x-auto">
              <code className="text-sm font-mono text-foreground">
                {processContent(block?.content)}
              </code>
            </pre>
          </div>
        );
      
      case 'quote':
        return (
          <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/30 rounded-r-lg">
            <p className="text-foreground italic">{processContent(block?.content)}</p>
            {block?.author && (
              <footer className="text-sm text-muted-foreground mt-2">
                — {block?.author}
              </footer>
            )}
          </blockquote>
        );
      
      case 'list':
        return (
          <ul className="list-disc list-inside space-y-2 my-4 text-foreground">
            {block?.items?.map((item, idx) => (
              (<li key={idx} className="leading-relaxed">
                {processContent(item)}
              </li>)
            ))}
          </ul>
        );
      
      case 'numbered-list':
        return (
          <ol className="list-decimal list-inside space-y-2 my-4 text-foreground">
            {block?.items?.map((item, idx) => (
              (<li key={idx} className="leading-relaxed">
                {processContent(item)}
              </li>)
            ))}
          </ol>
        );
      
      case 'divider':
        return <hr className="my-8 border-border" />;
      
      case 'button':
        return (
          <button
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors my-4"
            onClick={() => {
              console.log('Button clicked:', block?.id);
              block?.action && buttonActions[block?.action](block?.payload);
            }}
          >
            {block?.content}
          </button>
        );
      
      case 'table':
        return (
          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  {block?.headers?.map((header, idx) => (
                    (<th key={idx} className="border border-border px-4 py-2 text-left font-semibold text-foreground">
                      {header}
                    </th>)
                  ))}
                </tr>
              </thead>
              <tbody>
                {block?.rows?.map((row, rowIdx) => (
                  (<tr key={rowIdx} className="hover:bg-muted/50">
                    {row?.map((cell, cellIdx) => (
                      <td key={cellIdx} className="border border-border px-4 py-2 text-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>)
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return (
          <div className="text-muted-foreground italic">Unknown block type: {block?.type}
          </div>
        );
    }
  };

  return (
    <div
      className={`group relative bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all ${
        hovered ? 'shadow-lg' : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Drag Handle */}
      <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
        <Icon name="GripVertical" className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="pl-4">
        {renderBlockContent()}
      </div>
      {/* Block Type Badge */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
          {block?.type}
        </span>
      </div>
    </div>
  );
};

export default BlockRenderer;