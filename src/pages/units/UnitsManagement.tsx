import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, MapPin, Users, Package, ChevronLeft, ChevronRight, Bell } from 'lucide-react';

type UnitStatus = 'Operacional' | 'Indisponível' | 'Manutenção';

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
  status: UnitStatus; 
}

const UNITS_PER_PAGE = 6; 

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
      name: 'Unidade Recife Sul',
      city: 'Recife - PE',
      address: 'Av. Boa Viagem, 1000',
      responsible: 'Maria da Silva',
      phone: '(81) 98888-8888',
      email: 'recifesul@defesacivil-pe.gov.br',
      equipments: 120,
      users: 15,
      status: 'Operacional'
    },
    {
      id: 3,
      name: 'Unidade Caruaru',
      city: 'Caruaru - PE',
      address: 'Rua 15 de Novembro, 22',
      responsible: 'Pedro Alvares',
      phone: '(81) 97777-7777',
      email: 'caruaru@defesacivil-pe.gov.br',
      equipments: 50,
      users: 5,
      status: 'Indisponível'
    },
    {
      id: 4,
      name: 'Unidade Garanhuns',
      city: 'Garanhuns - PE',
      address: 'Praça da Bandeira, s/n',
      responsible: 'Ana Clara',
      phone: '(81) 96666-6666',
      email: 'garanhuns@defesacivil-pe.gov.br',
      equipments: 80,
      users: 10,
      status: 'Operacional'
    },
    {
      id: 5,
      name: 'Unidade Paulista',
      city: 'Paulista - PE',
      address: 'Av. Dr. Cláudio José Gueiros Leite, 35',
      responsible: 'Carlos Nogueira',
      phone: '(81) 95555-5555',
      email: 'paulista@defesacivil-pe.gov.br',
      equipments: 210,
      users: 18,
      status: 'Manutenção' 
    },
    {
      id: 6,
      name: 'Unidade Petrolina',
      city: 'Petrolina - PE',
      address: 'Rua das Acácias, 10',
      responsible: 'Luciana Queiroz',
      phone: '(87) 94444-4444',
      email: 'petrolina@defesacivil-pe.gov.br',
      equipments: 95,
      users: 12,
      status: 'Operacional'
    },
    
    {
      id: 7,
      name: 'Unidade Jaboatão',
      city: 'Jaboatão - PE',
      address: 'Av. Barreto de Menezes, 50',
      responsible: 'Roberto Cordeiro',
      phone: '(81) 93333-3333',
      email: 'jaboatao@defesacivil-pe.gov.br',
      equipments: 150,
      users: 25,
      status: 'Operacional'
    },
    {
      id: 8,
      name: 'Unidade Cabo',
      city: 'Cabo de Sto. Agostinho - PE',
      address: 'Rod. PE-60, Km 35',
      responsible: 'Fernanda Lima',
      phone: '(81) 92222-2222',
      email: 'cabo@defesacivil-pe.gov.br',
      equipments: 75,
      users: 8,
      status: 'Operacional'
    },
    {
      id: 9,
      name: 'Unidade Serra Talhada',
      city: 'Serra Talhada - PE',
      address: 'Rua do Comércio, 123',
      responsible: 'Marcos Silveira',
      phone: '(87) 91111-1111',
      email: 'serra@defesacivil-pe.gov.br',
      equipments: 40,
      users: 4,
      status: 'Operacional'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);

  const stats = {
    total: units.length,
    operational: units.filter(u => u.status === 'Operacional').length,
    unavailable: units.filter(u => u.status === 'Indisponível').length
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta unidade?')) {
      setUnits(units.filter(u => u.id !== id));
      setCurrentPage(1); 
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

  const totalPages = Math.ceil(filteredUnits.length / UNITS_PER_PAGE);
  const startIndex = (currentPage - 1) * UNITS_PER_PAGE;
  const endIndex = startIndex + UNITS_PER_PAGE;
  const unitsOnPage = filteredUnits.slice(startIndex, endIndex);
  
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getStatusClasses = (status: UnitStatus) => {
    switch (status) {
      case 'Operacional':
        return 'bg-green-100 text-green-700';
      case 'Indisponível':
        return 'bg-red-100 text-red-700';
      case 'Manutenção':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <> 
      {/* 1. Main Content e Layout Principal */}
      <div className="flex h-screen bg-gray-50">

        {/* Conteúdo Principal (que ocupa a tela) */}
        <div className="flex-1 overflow-auto">
          
          {/* Header/Search Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Pesquisar em Unidades"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm} 
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
              <button className="ml-4 p-2 hover:bg-gray-100 rounded">
                <Bell className="w-5 h-5 text-gray-600" />
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
                    <div className="text-gray-500 text-sm">Última Adicionada</div>
                    <div className="text-lg font-bold">{units[0]?.name || '-'}</div>
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

              {filteredUnits.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    Nenhuma unidade encontrada.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Renderiza APENAS as unidades da página atual */}
                    {unitsOnPage.map((unit) => (
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
                          {/* Aplica a classe de cor baseada no status tipado */}
                          <span className={`${getStatusClasses(unit.status)} text-xs px-2 py-1 rounded`}>
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
                          <div className="flex gap-1">
                            <button 
                              onClick={() => handleEdit(unit)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <Edit2 size={16} className="text-gray-600" />
                            </button>
                            <button 
                              onClick={() => handleDelete(unit.id)}
                              className="p-1 hover:bg-red-50 rounded transition-colors"
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
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    
                    {pageNumbers.map((page) => (
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
                    
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Modal */}
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
                      Cidade e Estado<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Pernambuco"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      defaultValue={editingUnit?.city}
                    />
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

              {/* Informações de Estoque/Recursos */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Estoque e Usuários</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipamentos (Total)<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      defaultValue={editingUnit?.equipments}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usuários Ativos<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      defaultValue={editingUnit?.users}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status da Unidade<span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      defaultValue={editingUnit?.status}
                    >
                      <option value="Operacional">Operacional</option>
                      <option value="Indisponível">Indisponível</option>
                      <option value="Manutenção">Em Manutenção</option>
                    </select>
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
                  alert(`Unidade ${editingUnit ? 'atualizada' : 'criada'} com sucesso! (Lógica a ser implementada)`);
                  setShowModal(false);
                }}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                {editingUnit ? 'Salvar Alterações' : 'Criar Unidade'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UnitsManagement;