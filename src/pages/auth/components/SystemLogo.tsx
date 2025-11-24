import logo from "@/assets/images/logo.png";

export default function SystemLogo() {
  return (
    <div className="flex flex-col items-center pb-24">
      <div className="flex gap-2">
        <img src={logo} alt="Logo da Defesa Civil" className="w-16" />
        <h1 className="text-3xl font-bold text-orange-500">PernamBox</h1>
      </div>
      <p className="text-sm text-gray-400 italic">
        Controle de Estoque Integrado
      </p>
    </div>
  );
}
