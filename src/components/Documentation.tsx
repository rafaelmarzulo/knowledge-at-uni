import { useState } from "react";
import { Search, Plus, FileText, Calendar, User, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarkdownEditor } from "./MarkdownEditor";

interface Document {
  id: string;
  title: string;
  category: string;
  lastModified: string;
  author: string;
  content?: string;
}

export function Documentation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"list" | "edit" | "create">("list");
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Configuração do Servidor Web",
      category: "Infraestrutura",
      lastModified: "2024-01-15",
      author: "João Silva",
      content: `# Configuração do Servidor Web

## Nginx Configuration

\`\`\`nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
}
\`\`\`

## Comandos úteis
- \`sudo systemctl restart nginx\`
- \`sudo nginx -t\` (testar configuração)`
    },
    {
      id: "2", 
      title: "Política de Backup",
      category: "Segurança",
      lastModified: "2024-01-10",
      author: "Maria Santos",
      content: `# Política de Backup

## Frequência
- **Diário**: Dados críticos
- **Semanal**: Sistemas completos
- **Mensal**: Arquivos históricos

## Checklist
- [ ] Verificar logs de backup
- [ ] Testar restauração
- [ ] Validar integridade`
    },
    {
      id: "3",
      title: "Guia de Desenvolvimento",
      category: "Desenvolvimento", 
      lastModified: "2024-01-05",
      author: "Pedro Costa",
      content: `# Guia de Desenvolvimento

## Stack Tecnológico
- React + TypeScript
- Node.js + Express
- PostgreSQL
- Docker

## Boas Práticas
1. Code review obrigatório
2. Testes unitários
3. Documentação atualizada`
    },
    {
      id: "4",
      title: "Procedimentos de Emergência",
      category: "Operações",
      lastModified: "2024-01-01", 
      author: "Ana Oliveira",
      content: `# Procedimentos de Emergência

## Contatos de Emergência
- **Coordenador TI**: (11) 9999-9999
- **Suporte 24h**: (11) 8888-8888

## Procedimentos
### Queda do sistema
1. Verificar status dos serviços
2. Analisar logs
3. Contatar equipe responsável

### Ataque de segurança
1. **IMEDIATO**: Isolar sistemas
2. Documentar evidências
3. Acionar CERT-BR`
    }
  ]);

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveDocument = (title: string, content: string) => {
    if (currentView === "create") {
      const newDoc: Document = {
        id: Date.now().toString(),
        title,
        content,
        category: "TI",
        lastModified: new Date().toISOString().split('T')[0],
        author: "Usuário Atual"
      };
      setDocuments([...documents, newDoc]);
    } else if (selectedDoc) {
      setDocuments(documents.map(doc => 
        doc.id === selectedDoc.id 
          ? { ...doc, title, content, lastModified: new Date().toISOString().split('T')[0] }
          : doc
      ));
    }
    setCurrentView("list");
    setSelectedDoc(null);
  };

  if (currentView === "create") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView("list")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold text-primary">Novo Documento</h2>
        </div>
        <MarkdownEditor 
          isNew={true}
          onSave={handleSaveDocument}
        />
      </div>
    );
  }

  if (currentView === "edit" && selectedDoc) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => { setCurrentView("list"); setSelectedDoc(null); }}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold text-primary">Editar Documento</h2>
        </div>
        <MarkdownEditor 
          title={selectedDoc.title}
          content={selectedDoc.content}
          onSave={handleSaveDocument}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Documentação Técnica</h2>
          <Button 
            onClick={() => setCurrentView("create")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Documento
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar documentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 
                          className="font-semibold text-lg text-primary hover:text-primary/80 cursor-pointer"
                          onClick={() => {
                            setSelectedDoc(doc);
                            setCurrentView("edit");
                          }}
                        >
                          {doc.title}
                        </h3>
                        <Badge variant="secondary" className="mt-1">
                          {doc.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Modificado em {new Date(doc.lastModified).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {doc.author}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhum documento encontrado com os critérios de busca." : "Nenhum documento disponível."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}