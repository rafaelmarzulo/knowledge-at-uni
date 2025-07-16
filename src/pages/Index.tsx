import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Documentation from "../components/Documentation";
import Servers from "../components/Servers";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "documentation":
        return <Documentation />;
      case "servers":
        return <Servers />;
      case "team":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Equipe TI</h1>
            <p className="text-muted-foreground">Gerenciamento da equipe de tecnologia da informação.</p>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Configurações</h1>
            <p className="text-muted-foreground">Configurações do sistema e preferências.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
