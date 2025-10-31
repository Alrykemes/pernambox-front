import { Header } from "@/components/dashboard/Header";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  MapPin,
  Package,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

interface Unit {
  id: number;
  name: string;
  city: string;
  address: string;
  responsible: string;
  phone: string;
  email: string;
  equipments: number;
  users: number;
  status: string;
}

const Unit = () => {
  const [units, setUnits] = useState<Unit[]>([
    {
      id: 1,
      name: "Unidade Olinda",
      city: "Olinda - PE",
      address: "Rua do Amparo, 567",
      responsible: "João dos Santos Filho",
      phone: "(81) 99999-9999",
      email: "olinda@defesacivil-pe.gov.br",
      equipments: 394,
      users: 20,
      status: "Operacional",
    },
    {
      id: 2,
      name: "Unidade Olinda",
      city: "Olinda - PE",
      address: "Rua do Amparo, 567",
      responsible: "João dos Santos Filho",
      phone: "(81) 99999-9999",
      email: "olinda@defesacivil-pe.gov.br",
      equipments: 394,
      users: 20,
      status: "Operacional",
    },
    {
      id: 3,
      name: "Unidade Olinda",
      city: "Olinda - PE",
      address: "Rua do Amparo, 567",
      responsible: "João dos Santos Filho",
      phone: "(81) 99999-9999",
      email: "olinda@defesacivil-pe.gov.br",
      equipments: 394,
      users: 20,
      status: "Operacional",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);

  const stats = {
    total: 9,
    operational: 8,
    unavailable: 1,
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta unidade?")) {
      setUnits(units.filter((u) => u.id !== id));
    }
  };

  const handleEdit = (unit: Unit) => {
    setEditingUnit(unit);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingUnit(null);
    setShowModal(true);
  };

  const filteredUnits: Unit[] = units.filter(
    (unit) =>
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        <Header />
        <div className="mx-auto max-w-7xl p-6">
          {/* Stats Cards */}
          <div className="mb-6 grid grid-cols-4 gap-4">
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Total de unidades</div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <MapPin className="text-blue-600" />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">
                    Unidades Operacionais
                  </div>
                  <div className="text-2xl font-bold">{stats.operational}</div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <MapPin className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">
                    Unidades Indisponíveis
                  </div>
                  <div className="text-2xl font-bold">{stats.unavailable}</div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Users className="text-red-600" />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Ultima Adicionada</div>
                  <div className="text-lg font-bold">Unidade Olinda</div>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white transition-colors hover:bg-green-600"
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Units List */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Lista de Unidades</h2>
                <p className="text-sm text-gray-500">
                  Crie e Gerencie as unidades
                </p>
              </div>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-white transition-colors hover:bg-blue-800"
              >
                <Plus size={18} />
                Criar Nova Unidade
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {filteredUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="rounded-lg border p-4 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <MapPin className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{unit.name}</h3>
                        <p className="text-sm text-gray-500">{unit.city}</p>
                      </div>
                    </div>
                    <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                      {unit.status}
                    </span>
                  </div>

                  <div className="mb-4 space-y-2 text-sm">
                    <div>
                      <div className="font-semibold text-gray-700">
                        Endereço:
                      </div>
                      <div className="text-gray-600">{unit.address}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">
                        Responsável:
                      </div>
                      <div className="text-gray-600">{unit.responsible}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">
                        Contato:
                      </div>
                      <div className="text-gray-600">{unit.phone}</div>
                      <div className="text-gray-600">{unit.email}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Package size={16} />
                        <span>Equipamentos</span>
                        <span className="font-semibold">{unit.equipments}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users size={16} />
                        <span>Usuários</span>
                        <span className="font-semibold">{unit.users}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(unit)}
                        className="rounded p-2 transition-colors hover:bg-gray-100"
                      >
                        <Edit2 size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(unit.id)}
                        className="rounded p-2 transition-colors hover:bg-red-50"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <button className="rounded p-2 hover:bg-gray-100">
                <ChevronLeft size={18} />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`h-8 w-8 rounded ${
                    page === currentPage
                      ? "bg-blue-900 text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button className="rounded p-2 hover:bg-gray-100">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white">
            <div className="flex items-center justify-between border-b p-6">
              <h3 className="text-xl font-bold">
                {editingUnit ? "Editar Unidade" : "Cadastrar Unidade"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
              >
                ✕
              </button>
            </div>

            {/* Form Content */}
            <div className="space-y-6 p-6">
              {/* Informações Gerais */}
              <div>
                <h4 className="mb-4 text-lg font-semibold">
                  Informações Gerais
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Nome da Unidade<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nome"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      defaultValue={editingUnit?.name}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Responsável<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nome"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      defaultValue={editingUnit?.responsible}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Telefone<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="(11) 99999-9999"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      defaultValue={editingUnit?.phone}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="exemplo@gmail.com"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      defaultValue={editingUnit?.email}
                    />
                  </div>
                </div>
              </div>

              {/* Informações de Endereço */}
              <div>
                <h4 className="mb-4 text-lg font-semibold">
                  Informações de Endereço
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Endereço<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Rua exemplo, número 62"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      defaultValue={editingUnit?.address}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Estado<span className="text-red-500">*</span>
                    </label>
                    <span className="block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-800">
                      Pernambuco
                    </span>
                  </div>
                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Complemento
                    </label>
                    <input
                      type="text"
                      placeholder="Perto do posto de saúde"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t bg-gray-50 p-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-2 transition-colors hover:bg-gray-100"
              >
                <span>✕</span>
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert("Unidade salva com sucesso!");
                  setShowModal(false);
                }}
                className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-2 text-white transition-colors hover:bg-orange-600"
              >
                <Plus size={18} />
                Criar Unidade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Unit;
