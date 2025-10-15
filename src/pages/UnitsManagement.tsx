import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, MapPin, Users, Package, ChevronLeft, ChevronRight, Settings} from 'lucide-react';


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

const UnitsManagement = () => {
  const [units, setUnits] = useState<Unit[]>([
    {
      id: 1,
      name: 'Unidade Olinda',
      city: 'Olinda - PE',
      address: 'Rua do Amparo, 567',
      responsible: 'João dos Santos Filho',
      phone: '(81) 99999-9999',
      email: 'olinda@defesacivil-pe.gov.br',
      equipments: 394,
      users: 20,
      status: 'Operacional'
    },
    {
      id: 2,
      name: 'Unidade Olinda',
      city: 'Olinda - PE',
      address: 'Rua do Amparo, 567',
      responsible: 'João dos Santos Filho',
      phone: '(81) 99999-9999',
      email: 'olinda@defesacivil-pe.gov.br',
      equipments: 394,
      users: 20,
      status: 'Operacional'
    },
    {
      id: 3,
      name: 'Unidade Olinda',
      city: 'Olinda - PE',
      address: 'Rua do Amparo, 567',
      responsible: 'João dos Santos Filho',
      phone: '(81) 99999-9999',
      email: 'olinda@defesacivil-pe.gov.br',
      equipments: 394,
      users: 20,
      status: 'Operacional'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);

  const stats = {
    total: 9,
    operational: 8,
    unavailable: 1
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta unidade?')) {
      setUnits(units.filter(u => u.id !== id));
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

  const filteredUnits: Unit[] = units.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b flex items-center gap-2">
          <img src="public/defesa-civil.svg" alt="Logo" className="w-15 h-11 object-contain mx-auto" />
        </div>

        <div className="p-4">
          <div className="text-xs text-gray-500 mb-2 font-semibold">MENU PRINCIPAL</div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <MapPin size={18} />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded font-medium">
              <MapPin size={18} />
              <span>Unidades</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <Package size={18} />
              <span>Produtos</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <Package size={18} />
              <span>Estoque</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <Users size={18} />
              <span>Usuários</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <MapPin size={18} />
              <span>Movimentações</span>
            </a>
          </nav>

          <div className="text-xs text-gray-500 mb-2 mt-6 font-semibold">CONFIGURAÇÕES</div>
          <nav>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <Settings size={18} />
              <span>Sistema</span>
            </a>
          </nav>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <div className="font-medium text-sm">João Santos</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Pesquisar em Unidades"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded">
              <span className="text-xl">🔔</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-sm">Total de unidades</div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-sm">Unidades Operacionais</div>
                  <div className="text-2xl font-bold">{stats.operational}</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-sm">Unidades Indisponíveis</div>
                  <div className="text-2xl font-bold">{stats.unavailable}</div>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-sm">Ultima Adicionada</div>
                  <div className="text-lg font-bold">Unidade Olinda</div>
                </div>
                <button 
                  onClick={handleAdd}
                  className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Units List */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Lista de Unidades</h2>
                <p className="text-gray-500 text-sm">Crie e Gerencie as unidades</p>
              </div>
              <button 
                onClick={handleAdd}
                className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Criar Nova Unidade
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {filteredUnits.map((unit) => (
                <div key={unit.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MapPin className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{unit.name}</h3>
                        <p className="text-sm text-gray-500">{unit.city}</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                      {unit.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div>
                      <div className="font-semibold text-gray-700">Endereço:</div>
                      <div className="text-gray-600">{unit.address}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Responsável:</div>
                      <div className="text-gray-600">{unit.responsible}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Contato:</div>
                      <div className="text-gray-600">{unit.phone}</div>
                      <div className="text-gray-600">{unit.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
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
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Edit2 size={16} className="text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(unit.id)}
                        className="p-2 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <button className="p-2 hover:bg-gray-100 rounded">
                <ChevronLeft size={18} />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded ${
                    page === currentPage
                      ? 'bg-blue-900 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button className="p-2 hover:bg-gray-100 rounded">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold">
                {editingUnit ? 'Editar Unidade' : 'Cadastrar Unidade'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Informações Gerais */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Informações Gerais</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome da Unidade<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nome"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      defaultValue={editingUnit?.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Responsável<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nome"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      defaultValue={editingUnit?.responsible}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      defaultValue={editingUnit?.phone}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="exemplo@gmail.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      defaultValue={editingUnit?.email}
                    />
                  </div>
                </div>
              </div>

              {/* Informações de Endereço */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Informações de Endereço</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Rua exemplo, número 62"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      defaultValue={editingUnit?.address}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado<span className="text-red-500">*</span>
                    </label>
                    <span className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800">
                    Pernambuco 
                    </span>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complemento
                    </label>
                    <input
                      type="text"
                      placeholder="Perto do posto de saúde"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <span>✕</span>
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('Unidade salva com sucesso!');
                  setShowModal(false);
                }}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
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

export default UnitsManagement;