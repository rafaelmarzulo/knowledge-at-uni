import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Server, 
  Database, 
  Wifi, 
  HardDrive, 
  Cpu, 
  Activity,
  Plus,
  Search,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export default function Servers() {
  const servers = [
    {
      id: 1,
      name: "servidor-web-01",
      type: "Web Server",
      ip: "192.168.1.10",
      os: "Ubuntu 22.04 LTS",
      status: "online",
      cpu: "85%",
      memory: "62%",
      storage: "45%",
      uptime: "99.9%",
      lastUpdate: "2 horas atrás",
      services: ["Apache", "MySQL", "PHP"]
    },
    {
      id: 2,
      name: "servidor-db-01",
      type: "Database Server",
      ip: "192.168.1.11",
      os: "CentOS 8",
      status: "online",
      cpu: "45%",
      memory: "78%",
      storage: "62%",
      uptime: "99.8%",
      lastUpdate: "30 min atrás",
      services: ["PostgreSQL", "Redis", "Backup Service"]
    },
    {
      id: 3,
      name: "servidor-email-01",
      type: "Mail Server",
      ip: "192.168.1.12",
      os: "Ubuntu 20.04 LTS",
      status: "manutencao",
      cpu: "25%",
      memory: "45%",
      storage: "35%",
      uptime: "95.2%",
      lastUpdate: "1 hora atrás",
      services: ["Postfix", "Dovecot", "SpamAssassin"]
    },
    {
      id: 4,
      name: "servidor-backup-01",
      type: "Backup Server",
      ip: "192.168.1.13",
      os: "Ubuntu 22.04 LTS",
      status: "online",
      cpu: "15%",
      memory: "32%",
      storage: "82%",
      uptime: "100%",
      lastUpdate: "5 min atrás",
      services: ["Bacula", "rsync", "AWS CLI"]
    }
  ];

  const applications = [
    {
      name: "Portal do Aluno",
      url: "https://portal.metodista.br",
      server: "servidor-web-01",
      status: "online",
      version: "v2.4.1",
      lastDeploy: "1 semana atrás"
    },
    {
      name: "Moodle EAD",
      url: "https://ead.metodista.br",
      server: "servidor-web-01",
      status: "online",
      version: "v4.1.2",
      lastDeploy: "3 dias atrás"
    },
    {
      name: "Sistema RH",
      url: "https://rh.metodista.br",
      server: "servidor-web-01",
      status: "manutencao",
      version: "v1.8.5",
      lastDeploy: "2 semanas atrás"
    },
    {
      name: "Webmail",
      url: "https://mail.metodista.br",
      server: "servidor-email-01",
      status: "online",
      version: "v3.2.1",
      lastDeploy: "1 mês atrás"
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return CheckCircle;
      case "manutencao": return AlertTriangle;
      case "offline": return AlertTriangle;
      default: return Clock;
    }
  };

  const getUsageColor = (percentage: string) => {
    const value = parseInt(percentage);
    if (value >= 80) return "text-red-600";
    if (value >= 60) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Servidores e Sistemas</h1>
          <p className="text-muted-foreground">Monitoramento e gerenciamento da infraestrutura TI</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Servidor
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar servidores ou aplicações..."
            className="w-full"
          />
        </div>
        <Button variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="servers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="servers">Servidores</TabsTrigger>
          <TabsTrigger value="applications">Aplicações</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
        </TabsList>

        <TabsContent value="servers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {servers.map((server) => {
              const StatusIcon = getStatusIcon(server.status);
              return (
                <Card key={server.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Server className="h-5 w-5 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{server.name}</CardTitle>
                          <CardDescription>{server.type} • {server.ip}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-5 w-5 ${getStatusColor(server.status)}`} />
                        <Badge variant={server.status === "online" ? "default" : "secondary"}>
                          {server.status === "online" ? "Online" : 
                           server.status === "manutencao" ? "Manutenção" : "Offline"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sistema Operacional</p>
                        <p className="font-medium">{server.os}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Uptime</p>
                        <p className="font-medium">{server.uptime}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">CPU</span>
                        </div>
                        <span className={`text-sm font-medium ${getUsageColor(server.cpu)}`}>
                          {server.cpu}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Memória</span>
                        </div>
                        <span className={`text-sm font-medium ${getUsageColor(server.memory)}`}>
                          {server.memory}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Armazenamento</span>
                        </div>
                        <span className={`text-sm font-medium ${getUsageColor(server.storage)}`}>
                          {server.storage}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Serviços Ativos</p>
                      <div className="flex flex-wrap gap-1">
                        {server.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        Última atualização: {server.lastUpdate}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {applications.map((app, index) => {
              const StatusIcon = getStatusIcon(app.status);
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Database className="h-5 w-5 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{app.name}</CardTitle>
                          <CardDescription>{app.url}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-5 w-5 ${getStatusColor(app.status)}`} />
                        <Badge variant={app.status === "online" ? "default" : "secondary"}>
                          {app.status === "online" ? "Online" : 
                           app.status === "manutencao" ? "Manutenção" : "Offline"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Servidor</p>
                        <p className="font-medium">{app.server}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Versão</p>
                        <p className="font-medium">{app.version}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        Último deploy: {app.lastDeploy}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento em Tempo Real</CardTitle>
              <CardDescription>
                Métricas de performance e disponibilidade dos sistemas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Dashboard de Monitoramento</h3>
                <p className="text-muted-foreground mb-4">
                  Integração com ferramentas de monitoramento como Grafana, Zabbix ou Nagios
                </p>
                <Button>Configurar Monitoramento</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}