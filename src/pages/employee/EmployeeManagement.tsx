import React, { useState } from 'react';
import { X, Users, UserPlus, ShieldCheck, Edit, Trash2, Search, Bell } from 'lucide-react';

const EmployeeManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees] = useState([
    { id: 1, name: 'João Santos', email: 'joao.santos@defesacivil.pe.gov.br', role: 'Gerente Geral', permission: 'Admin Geral', lastAccess: '26/04/2025', status: 'Ativo', avatar: 'JS' },
    { id: 2, name: 'Pedro Costa', email: 'pedro.costa@defesacivil.pe.gov.br', role: 'Gerente Unidade', permission: 'Admin Unidade', lastAccess: '26/04/2025', status: 'Inativo', avatar: 'PC' },
    { id: 3, name: 'Ana Lima', email: 'ana.lima@defesacivil.pe.gov.br', role: 'Analista', permission: 'Usuário', lastAccess: '26/04/2025', status: 'Ativo', avatar: 'AL' },
    { id: 4, name: 'João Santos', email: 'joao.santos@defesacivil.pe.gov.br', role: 'Gerente Geral', permission: 'Admin Geral', lastAccess: '26/04/2025', status: 'Ativo', avatar: 'JS' },
    { id: 5, name: 'Pedro Costa', email: 'pedro.costa@defesacivil.pe.gov.br', role: 'Gerente Unidade', permission: 'Admin Unidade', lastAccess: '26/04/2025', status: 'Inativo', avatar: 'PC' },
    { id: 6, name: 'Ana Lima', email: 'ana.lima@defesacivil.pe.gov.br', role: 'Analista', permission: 'Usuário', lastAccess: '26/04/2025', status: 'Ativo', avatar: 'AL' },
    { id: 7, name: 'João Santos', email: 'joao.santos@defesacivil.pe.gov.br', role: 'Gerente Geral', permission: 'Admin Geral', lastAccess: '26/04/2025', status: 'Ativo', avatar: 'JS' },
    { id: 8, name: 'Pedro Costa', email: 'pedro.costa@defesacivil.pe.gov.br', role: 'Gerente Unidade', permission: 'Admin Unidade', lastAccess: '26/04/2025', status: 'Inativo', avatar: 'PC' },
    { id: 9, name: 'Ana Lima', email: 'ana.lima@defesacivil.pe.gov.br', role: 'Analista', permission: 'Usuário', lastAccess: '26/04/2025', status: 'Ativo', avatar: 'AL' },
  ]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    employeeId: '',
    role: '',
    roleType: '',
    locationId: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setShowModal(false);
    setFormData({
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      employeeId: '',
      role: '',
      roleType: '',
      locationId: ''
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar em Usuários"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="ml-4 p-2 hover:bg-gray-100 rounded">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total de Usuários</div>
                  <div className="text-2xl font-bold text-gray-800">121</div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total de Ativos</div>
                  <div className="text-2xl font-bold text-gray-800">109</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total de Admins</div>
                  <div className="text-2xl font-bold text-gray-800">10</div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total de Inativos</div>
                  <div className="text-2xl font-bold text-gray-800">111</div>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Lista de Usuários</h2>
                <p className="text-sm text-gray-500">Gerencie usuários</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <span>Filtro</span>
                  <span>▼</span>
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-2"
                >
                  <span>+</span>
                  <span>Criar Usuário</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Usuário</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contato</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Cargo</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Permissão</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Últ. Acesso</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                            employee.avatar === 'JS' ? 'bg-gray-700' : employee.avatar === 'PC' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}>
                            {employee.avatar}
                          </div>
                          <span className="font-medium text-gray-800">{employee.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{employee.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{employee.role}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{employee.permission}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{employee.lastAccess}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          employee.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-2">
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">‹</button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">2</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">3</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">4</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">5</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Adicionar novo usuário</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-orange-500 mb-2">Cadastro de Funcionário</h3>
                <p className="text-sm text-gray-600">Preencha os dados abaixo para registrar um novo colaborador</p>
              </div>

              <div className="w-full h-1 bg-gradient-to-r from-orange-400 to-orange-500 mb-6"></div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Digite o nome completo"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="exemplo@empresa.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CPF <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      placeholder="000.000.000-00"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID do Funcionário
                    </label>
                    <input
                      type="text"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      placeholder="ID"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cargo <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Analista</option>
                      <option value="analista">Analista</option>
                      <option value="gerente">Gerente</option>
                      <option value="coordenador">Coordenador</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="roleType"
                      value={formData.roleType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Selecione uma role</option>
                      <option value="admin-geral">Admin Geral</option>
                      <option value="admin-unidade">Admin Unidade</option>
                      <option value="usuario">Usuário</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID do Polo <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="locationId"
                    value={formData.locationId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Selecione o Polo</option>
                    <option value="recife">Recife</option>
                    <option value="caruaru">Caruaru</option>
                    <option value="petrolina">Petrolina</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 border-2 border-orange-500 text-orange-500 rounded hover:bg-orange-50 font-medium"
                  >
                    CANCELAR
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 font-medium"
                  >
                    CADASTRAR FUNCIONÁRIO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;