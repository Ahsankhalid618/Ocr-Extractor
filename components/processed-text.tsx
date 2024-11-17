import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ProcessedMarkdownProps {
  markdown: string;
}

export function ProcessedMarkdown({ markdown }: ProcessedMarkdownProps) {
  return (
    <Card className="p-4">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        className="prose dark:prose-invert max-w-none"
        components={{
          table: ({ children }) => (
            <div className="my-4 w-full overflow-y-auto">
              <table className="w-full border-collapse border border-border">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2">
              {children}
            </td>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Card>
  );
}