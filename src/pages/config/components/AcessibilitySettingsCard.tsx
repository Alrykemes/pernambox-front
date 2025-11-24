import { Card } from "@/components/ui/card";
import { SwitchItem } from "./SwitchItem";

export function AccessibilityCard({values, setValues}:any) {
  return (
    <Card className="p-6" title="Acessibilidade">

      <SwitchItem
        label="Filtro de Luz Azul"
        description="Reduz a emissão de luz azul da tela"
        value={values.blueLight}
        onChange={v=>setValues({...values, blueLight:v})}
      />

      <SwitchItem
        label="Alto Contraste"
        description="Aumenta o contraste entre texto e fundo"
        value={values.highContrast}
        onChange={v=>setValues({...values, highContrast:v})}
      />

      <SwitchItem
        label="Fonte Ampliada"
        description="Aumenta o tamanho dos textos"
        value={values.bigFont}
        onChange={v=>setValues({...values, bigFont:v})}
      />

      <SwitchItem
        label="Cursor Ampliado"
        description="Aumenta o tamanho do cursor do mouse"
        value={values.bigCursor}
        onChange={v=>setValues({...values, bigCursor:v})}
      />

      <SwitchItem
        label="Foco Ampliado"
        description="Destaca elementos focados"
        value={values.focusMode}
        onChange={v=>setValues({...values, focusMode:v})}
      />
    </Card>
  );
}
