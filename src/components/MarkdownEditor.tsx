import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Edit, Save } from "lucide-react";

interface MarkdownEditorProps {
  title?: string;
  content?: string;
  onSave?: (title: string, content: string) => void;
  isNew?: boolean;
}

export function MarkdownEditor({ 
  title: initialTitle = "", 
  content: initialContent = "", 
  onSave,
  isNew = false 
}: MarkdownEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const handleSave = () => {
    if (onSave) {
      onSave(title, content);
    }
  };

  const defaultContent = `# Novo Documento

## Exemplo de formatação

### Lista de tarefas
- [x] Tarefa concluída
- [ ] Tarefa pendente

### Código
\`\`\`bash
sudo systemctl status nginx
\`\`\`

### Tabela de servidores
| Servidor | IP | Status |
|----------|-----|--------|
| Web01 | 192.168.1.10 | ✅ Online |
| DB01 | 192.168.1.20 | ✅ Online |
`;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="space-y-4">
          <CardTitle className="text-2xl font-bold text-primary">
            {isNew ? "Novo Documento" : "Editar Documento"}
          </CardTitle>
          
          <div className="space-y-2">
            <Label htmlFor="title">Título do documento</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do documento..."
              className="text-lg"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "edit" | "preview")}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Editar
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Visualizar
              </TabsTrigger>
            </TabsList>

            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar
            </Button>
          </div>

          <TabsContent value="edit">
            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo (Markdown)</Label>
              <Textarea
                id="content"
                value={content || (isNew ? defaultContent : "")}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Digite o conteúdo em Markdown..."
                className="min-h-[500px] font-mono text-sm"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="min-h-[500px] p-6 bg-muted/30 rounded-lg border">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                  h1: ({children}) => <h1 className="text-3xl font-bold text-primary mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-medium text-primary mt-4 mb-2">{children}</h3>,
                  code: ({children, className}) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-accent-foreground">
                        {children}
                      </code>
                    ) : (
                      <code className={className}>{children}</code>
                    );
                  },
                  pre: ({children}) => (
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto border text-sm">
                      {children}
                    </pre>
                  ),
                  table: ({children}) => (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse border border-border">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({children}) => (
                    <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({children}) => (
                    <td className="border border-border px-4 py-2">
                      {children}
                    </td>
                  ),
                }}
                  >
                  {content || (isNew ? defaultContent : "*Nenhum conteúdo para visualizar*")}
                </ReactMarkdown>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}