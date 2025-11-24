import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Accessibility, Warehouse } from "lucide-react";
import { useState } from "react";
import { SettingItem } from "@/pages/config/components/SettingItem";
import { useTheme } from "@/components/ThemeProvider";

export default function SystemConfig() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("pt-BR");
  const [timezone, setTimezone] = useState("GMT-3");
  const [backup, setBackup] = useState(false);
  const [blueLightFilter, setBlueLightFilter] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [enlargedFont, setEnlargedFont] = useState(false);
  const [enlargedCursor, setEnlargedCursor] = useState(false);
  const [enlargedFocus, setEnlargedFocus] = useState(false);
  const [expirationAlert, setExpirationAlert] = useState(false);
  const [receiveEmail, setReceiveEmail] = useState(false);
  const [notifyChanges, setNotifyChanges] = useState(false);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-orange-500" />
              Configurações do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            <SettingItem
              title="Tema Escuro"
              description="Muda o tema do sistema para escuro"
            >
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o tema" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>
            <Separator />
            <SettingItem
              title="Idioma do Sistema"
              description="Português (Brasil)"
            >
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (BR)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español (ES)</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>
            <Separator />
            <SettingItem title="Fuso Horário" description="GMT-3 (Brasília)">
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o fuso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GMT-3">GMT-3 Brasília</SelectItem>
                  <SelectItem value="GMT-5">GMT-5 Nova York</SelectItem>
                  <SelectItem value="GMT+0">GMT+0 Londres</SelectItem>
                  <SelectItem value="GMT+1">GMT+1 Paris</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>
            <Separator />
            <SettingItem
              title="Backup"
              description="Realizar Backup diariamente"
            >
              <Switch checked={backup} onCheckedChange={setBackup} />
            </SettingItem>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Accessibility className="h-5 w-5 text-orange-500" />
              Acessibilidade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            <SettingItem
              title="Filtro de Luz Azul"
              description="Reduz a emissão de luz azul da tela"
            >
              <Switch
                checked={blueLightFilter}
                onCheckedChange={setBlueLightFilter}
              />
            </SettingItem>
            <Separator />
            <SettingItem
              title="Alto Contraste"
              description="Aumenta o contraste entre texto e fundo"
            >
              <Switch checked={highContrast} onCheckedChange={setHighContrast} />
            </SettingItem>
            <Separator />
            <SettingItem
              title="Fonte Ampliada"
              description="Aumenta o tamanho de todos os textos"
            >
              <Switch checked={enlargedFont} onCheckedChange={setEnlargedFont} />
            </SettingItem>
            <Separator />
            <SettingItem
              title="Cursor Ampliado"
              description="Aumenta o tamanho do cursor do mouse"
            >
              <Switch
                checked={enlargedCursor}
                onCheckedChange={setEnlargedCursor}
              />
            </SettingItem>
            <Separator />
            <SettingItem
              title="Foco Ampliado"
              description="Destaca elementos focados na navegação"
            >
              <Switch
                checked={enlargedFocus}
                onCheckedChange={setEnlargedFocus}
              />
            </SettingItem>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Warehouse className="h-5 w-5 text-orange-500" />
              Configurações do Estoque
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            <SettingItem
              title="Alerta de Vencimento"
              description="Emite notificações para alertar sobre um produto que está próximo de atingir sua validade"
            >
              <Switch
                checked={expirationAlert}
                onCheckedChange={setExpirationAlert}
              />
            </SettingItem>
            <Separator />
            <SettingItem
              title="Receber e-mail"
              description="Permitir notificações sobre estoque no e-mail"
            >
              <Switch checked={receiveEmail} onCheckedChange={setReceiveEmail} />
            </SettingItem>
            <Separator />
            <SettingItem
              title="Notificar Alterações"
              description="Emite um alerta para alterações no estoque"
            >
              <Switch
                checked={notifyChanges}
                onCheckedChange={setNotifyChanges}
              />
            </SettingItem>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
