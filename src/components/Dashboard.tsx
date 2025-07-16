import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Users, 
  FileText, 
  Server, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Database,
  Wifi,
  HardDrive
} from "lucide-react";

export default function Dashboard() {
  // Dados mock para demonstração
  const stats = [
    {
      title: "Documentos",
      value: "142",
      change: "+12%",
      icon: FileText,
      description: "Documentos técnicos"
    },
    {
      title: "Servidores",
      value: "24",
      change: "100%",
      icon: Server,
      description: "Status operacional"
    },
    {
      title: "Equipe TI",
      value: "8",
      change: "+1",
      icon: Users,
      description: "Membros ativos"
    },
    {
      title: "Tickets",
      value: "15",
      change: "-5%",
      icon: Activity,
      description: "Pendentes hoje"
    }
  ];

  const recentDocs = [
    {
      title: "Manual do Moodle - Configuração",
      author: "João Silva",
      date: "2 horas atrás",
      status: "atualizado"
    },
    {
      title: "Backup dos Servidores - Procedimentos",
      author: "Maria Santos",
      date: "1 dia atrás",
      status: "novo"
    },
    {
      title: "Política de Segurança da Informação",
      author: "Carlos Oliveira",
      date: "3 dias atrás",
      status: "revisão"
    }
  ];

  const systemStatus = [
    {
      name: "Portal do Aluno",
      status: "online",
      uptime: "99.9%",
      icon: CheckCircle
    },
    {
      name: "Moodle EAD",
      status: "online",
      uptime: "99.5%",
      icon: CheckCircle
    },
    {
      name: "Sistema RH",
      status: "manutencao",
      uptime: "95.2%",
      icon: AlertTriangle
    },
    {
      name: "Webmail",
      status: "online",
      uptime: "100%",
      icon: CheckCircle
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "text-green-600";
      case "manutencao": return "text-yellow-600";
      case "offline": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "novo": return "bg-green-100 text-green-800";
      case "atualizado": return "bg-blue-100 text-blue-800";
      case "revisao": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard TI</h1>
          <p className="text-muted-foreground">Universidade Metodista - Tecnologia da Informação</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Último acesso</p>
          <p className="text-lg font-semibold">Hoje, 14:30</p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documentos Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentos Recentes
            </CardTitle>
            <CardDescription>
              Últimas atualizações na documentação técnica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocs.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{doc.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Por {doc.author} • {doc.date}
                    </p>
                  </div>
                  <Badge className={getStatusBadge(doc.status)}>
                    {doc.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Ver todos os documentos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Status dos Sistemas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Status dos Sistemas
            </CardTitle>
            <CardDescription>
              Monitoramento em tempo real dos serviços
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.map((system, index) => {
                const Icon = system.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${getStatusColor(system.status)}`} />
                      <div>
                        <h4 className="font-medium">{system.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Uptime: {system.uptime}
                        </p>
                      </div>
                    </div>
                    <Badge variant={system.status === "online" ? "default" : "secondary"}>
                      {system.status === "online" ? "Online" : 
                       system.status === "manutencao" ? "Manutenção" : "Offline"}
                    </Badge>
                  </div>
                );
              })}
              <Button variant="outline" className="w-full">
                Ver monitoramento completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Acesso Rápido */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Acesso Rápido aos Sistemas
          </CardTitle>
          <CardDescription>
            Links diretos para os principais sistemas da universidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Database className="h-6 w-6" />
              <span className="text-sm">Portal do Aluno</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Wifi className="h-6 w-6" />
              <span className="text-sm">Moodle</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Sistema RH</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <HardDrive className="h-6 w-6" />
              <span className="text-sm">Webmail</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}