import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FileText, Copy, Download, Split, Edit3, Eye, Bold, Italic, Code, Link2, List, Hash, Quote } from 'lucide-react';

// Main Application Component
export default function App() {
  // Sample markdown content to show on initial load
  const sampleMarkdown = `# Welcome to Markdown Pro
This is a **professional** Markdown to HTML converter with a *live preview*.

## Key Features
- ✅ Real-time, instant conversion as you type.
- ✅ Sleek, modern, and responsive design.
- ✅ Full support for standard Markdown syntax.
- ✅ Easy export to HTML file or copy to clipboard.

### Code Block Example
\`\`\`javascript
// A simple function to greet a user.
function greet(name) {
  return \`Hello, \${name}! Welcome to the app.\`;
}

console.log(greet('Developer'));
\`\`\`

### Quick Reference Table
| Element | Syntax |
|---|---|
| Heading | \`# H1\` |
| Bold | \`**text**\` |
| Italic | \`*text*\` |
| Link | \`[title](https://...)\` |

> "The best way to predict the future is to create it."
>
> – Abraham Lincoln

Happy coding! 🚀
`;

  // State to hold the markdown text from the editor
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  // State to manage the view mode: 'split', 'edit', or 'preview'
  const [viewMode, setViewMode] = useState('split');

  /**
   * Copies the rendered HTML from the preview pane to the user's clipboard.
   */
  const copyToClipboard = async () => {
    const previewElement = document.getElementById('preview-content');
    if (previewElement) {
      try {
        await navigator.clipboard.writeText(previewElement.innerHTML);
        // In a real app, you'd use a more elegant toast notification
        alert('HTML content copied to clipboard!');
      } catch (err) {
        alert('Failed to copy content.');
        console.error('Clipboard copy failed:', err);
      }
    }
  };

  /**
   * Downloads the rendered HTML as a self-contained .html file.
   */
  const downloadHtml = () => {
    const previewElement = document.getElementById('preview-content');
    if (!previewElement) return;

    // Basic CSS to make the exported HTML look good
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Converted Markdown</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
    h1, h2, h3 { color: #222; }
    code { background-color: #f0f0f0; padding: 0.2em 0.4em; margin: 0; font-size: 85%; border-radius: 6px; }
    pre { background: #2d2d2d; color: #f8f8f2; padding: 1em; border-radius: 8px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    blockquote { border-left: 4px solid #ccc; margin: 1.5em 0; padding: 0 1.5em; color: #666; }
  </style>
</head>
<body>
${previewElement.innerHTML}
</body>
</html>`;

    // Create a blob and trigger a download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                Markdown Pro
              </h1>
              <p className="text-slate-600 text-lg">
                Instantly Convert Markdown to Elegant HTML
              </p>
            </div>
          </div>
          <ExportToolbar
            onCopy={copyToClipboard}
            onDownload={downloadHtml}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </header>

        {/* Main Editor and Preview Layout */}
        <main className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 220px)' }}>
            {/* Editor Pane */}
            <div className={`
              ${viewMode === 'preview' ? 'hidden' : 'flex flex-col'}
              ${viewMode === 'split' ? 'w-full lg:w-1/2' : 'w-full'}
              border-b lg:border-b-0 lg:border-r border-slate-200
            `}>
              <MarkdownEditor value={markdown} onChange={setMarkdown} />
            </div>

            {/* Preview Pane */}
            <div className={`
              ${viewMode === 'edit' ? 'hidden' : 'flex flex-col'}
              ${viewMode === 'split' ? 'w-full lg:w-1/2' : 'w-full'}
            `}>
              <PreviewPane markdown={markdown} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Built for Developers & Writers • Supports Standard Markdown</p>
        </footer>
      </div>
    </div>
  );
}

// Sub-component for the top toolbar with view and export actions
function ExportToolbar({ onCopy, onDownload, viewMode, onViewModeChange }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
      <div className="flex bg-slate-100 rounded-full p-1">
        <ToolbarButton icon={Edit3} label="Edit" isActive={viewMode === 'edit'} onClick={() => onViewModeChange('edit')} />
        <ToolbarButton icon={Split} label="Split" isActive={viewMode === 'split'} onClick={() => onViewModeChange('split')} />
        <ToolbarButton icon={Eye} label="Preview" isActive={viewMode === 'preview'} onClick={() => onViewModeChange('preview')} />
      </div>
      <div className="flex gap-3">
        <button onClick={onCopy} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50 transition-colors shadow-sm">
          <Copy className="w-4 h-4" /> Copy HTML
        </button>
        <button onClick={onDownload} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl">
          <Download className="w-4 h-4" /> Download
        </button>
      </div>
    </div>
  );
}

// Reusable button for the view mode toggle
function ToolbarButton({ icon: Icon, label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-full transition-colors ${isActive ? 'bg-white shadow-md text-emerald-600' : 'text-slate-600 hover:bg-slate-200'}`}>
      <Icon className="w-4 h-4" /> {label}
    </button>
  );
}

// Sub-component for the Markdown text area
function MarkdownEditor({ value, onChange }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full p-6 resize-none border-none outline-none font-mono text-sm leading-relaxed text-slate-800 bg-transparent placeholder:text-slate-400"
          placeholder="Start typing your Markdown here..."
          spellCheck="false"
        />
      </div>
    </div>
  );
}

// Sub-component for rendering the HTML preview
function PreviewPane({ markdown }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center gap-2 sticky top-0">
        <Eye className="w-4 h-4 text-slate-600" />
        <h3 className="font-semibold text-slate-700 text-sm">Live Preview</h3>
      </div>
      <div className="flex-1 overflow-auto">
        <article id="preview-content" className="prose prose-slate p-6 max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
