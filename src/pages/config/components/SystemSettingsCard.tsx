import { Card } from "@/components/ui/card";
import { SwitchItem } from "./SwitchItem";

export function SystemSettingsCard(props:{
  values: any;
  setValues: (v:any)=>void;
}) {
  const { values, setValues } = props;

  return (
    <Card className="p-6" title="Configurações do Sistema">
      <SwitchItem
        label="Tema Escuro"
        description="Muda o tema do sistema para escuro"
        value={values.darkMode}
        onChange={v=>setValues({...values, darkMode:v})}
      />

      <div className="mt-4">
        <p className="font-medium">Idioma do Sistema</p>
        <select className="border rounded px-3 py-1 mt-1">
          <option>Português (BR)</option>
        </select>
      </div>

      <div className="mt-4">
        <p className="font-medium">Fuso Horário</p>
        <select className="border rounded px-3 py-1 mt-1">
          <option>GMT-3 Brasil</option>
        </select>
      </div>

      <div className="mt-4">
        <SwitchItem
          label="Backup"
          description="Realizar Backup diariamente"
          value={values.backup}
          onChange={v=>setValues({...values, backup:v})}
        />
      </div>
    </Card>
  );
}
