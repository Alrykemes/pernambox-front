import { Card } from "@/components/ui/card";


export function SystemInfoCard() {
  return (
    <Card className="p-6" title="Informações do Sistema">

      <div className="mb-3">
        <p className="font-medium">Versão</p>
        <input value="Pernambox v1.0.0" disabled
               className="border rounded px-3 py-1 w-full mt-1 bg-gray-100" />
      </div>

      <div className="mb-3">
        <p className="font-medium">Última Atualização</p>
        <input value="29/04/2025" disabled
               className="border rounded px-3 py-1 w-full mt-1 bg-gray-100" />
      </div>

      <div className="mb-3">
        <p className="font-medium">Licença</p>
        <input value="Licença Empresarial (Válida até 29/05/2026)" disabled
               className="border rounded px-3 py-1 w-full mt-1 bg-gray-100" />
      </div>

      <div className="mb-3">
        <p className="font-medium">Status</p>
        <div className="px-3 py-2 bg-green-100 rounded text-green-700 mt-1">
          Sistema Atualizado
        </div>
      </div>

      <div className="mb-3">
        <p className="font-medium">Último Backup</p>
        <input value="29/05/2026 15:30" disabled
               className="border rounded px-3 py-1 w-full mt-1 bg-gray-100" />
      </div>

      <button className="bg-blue-800 text-white py-2 px-4 rounded w-full mt-4">
        Fazer Backup Agora
      </button>
    </Card>
  );
}
