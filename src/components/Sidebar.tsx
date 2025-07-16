import { useState } from "react";
import { Home, FileText, Server, Users, Settings, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import logoMetodista from "../assets/logo-metodista.png";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "documentation", label: "Documentação", icon: FileText },
    { id: "servers", label: "Servidores", icon: Server },
    { id: "team", label: "Equipe", icon: Users },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <div className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
      isCollapsed ? "w-16" : "w-64"
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <img src={logoMetodista} alt="Universidade Metodista" className="h-8 w-auto" />
                <div>
                  <h2 className="text-sidebar-foreground font-semibold text-sm">Intranet TI</h2>
                  <p className="text-sidebar-foreground/70 text-xs">Metodista</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-3 ${
                      isActive 
                        ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    } ${isCollapsed ? "px-2" : "px-3"}`}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <Icon className={`${isCollapsed ? "h-5 w-5" : "h-4 w-4"} flex-shrink-0`} />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          {!isCollapsed && (
            <div className="text-center">
              <p className="text-xs text-sidebar-foreground/60">
                © 2024 Universidade Metodista
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}