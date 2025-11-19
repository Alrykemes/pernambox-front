import { Card } from "@/components/ui/card";
import { SwitchItem } from "./SwitchItem";

export function StockSettingsCard({values, setValues}:any) {
  return (
    <Card className="p-6" title="Configurações do Estoque">

      <SwitchItem
        label="Alerta de Vencimento"
        description="Notificações sobre produtos perto de vencer"
        value={values.stockAlert}
        onChange={v=>setValues({...values, stockAlert:v})}
      />

      <SwitchItem
        label="Receber e-mail"
        description="Permitir notificações por e-mail"
        value={values.stockEmail}
        onChange={v=>setValues({...values, stockEmail:v})}
      />

      <SwitchItem
        label="Notificar Alterações"
        description="Alertar mudanças no estoque"
        value={values.stockNotify}
        onChange={v=>setValues({...values, stockNotify:v})}
      />
    </Card>
  );
}
