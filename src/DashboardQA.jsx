import React, { useState } from 'react';
import { Upload, BarChart3, TrendingUp, Target, Clock, CheckCircle, Users, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState('proyecto1');
  const [selectedSprint, setSelectedSprint] = useState('todos');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Datos de ejemplo para Proyecto 1
  const datosProyecto1 = {
    metricas: {
      defectDensity: 0.57,
      coberturaDefectos: 86,
      csatScore: 3.2,
      velocidadEquipo: 9,
      predictibilidad: 90.9,
      leadTime: 10
    },
    sprints: {
      sprint1: { velocidad: 5, predictibilidad: 90, defectos: 0.12 },
      sprint2: { velocidad: 2, predictibilidad: 93, defectos: 0.10 },
      sprint3: { velocidad: 15, predictibilidad: 95, defectos: 0.08 },
      sprint4: { velocidad: 11, predictibilidad: 94, defectos: 0.09 },
      sprint5: { velocidad: 7, predictibilidad: 94, defectos: 0.09 }
    },
    prioridades: [
      { name: 'Alta', value: 9.8, color: '#fb923c' },
      { name: 'Media', value: 86.9, color: '#3b82f6' },
      { name: 'Baja', value: 3.3, color: '#a78bfa' }
    ],
    requerimientos: [
      { name: 'Finalizaados', cantidad: 22, color: '#3b82f6' },
      { name: 'En Curso', cantidad: 4, color: '#6b7280' },
      { name: 'Retrasado', cantidad: 1, color: '#f59e0b' }
    ],
    statusPruebas: [
      { name: 'Not Done', value: 46.7, color: '#3b82f6' },
      { name: 'Passed', value: 46.7, color: '#fb923c' },
      { name: 'Failed', value: 6.7, color: '#a78bfa' }
    ],
    codigoProbado: [
      { name: 'Probado', value: 39.3, color: '#3b82f6' },
      { name: 'No probado', value: 60.8, color: '#f87171' }
    ]
  };

  // Datos de ejemplo para Proyecto 2
  const datosProyecto2 = {
    metricas: {
      defectDensity: 0.15,
      coberturaDefectos: 88.5,
      csatScore: 3.8,
      velocidadEquipo: 32,
      predictibilidad: 87,
      leadTime: 4.2
    },
    sprints: {
      sprint1: { velocidad: 30, predictibilidad: 85, defectos: 0.18 },
      sprint2: { velocidad: 32, predictibilidad: 87, defectos: 0.15 },
      sprint3: { velocidad: 34, predictibilidad: 90, defectos: 0.13 },
      sprint4: { velocidad: 32, predictibilidad: 86, defectos: 0.14 }
    },
    prioridades: [
      { name: 'Alto', value: 50, color: '#3b82f6' },
      { name: 'Medio', value: 25, color: '#fb923c' },
      { name: 'Bajo', value: 25, color: '#a78bfa' }
    ],
    requerimientos: [
      { name: 'Implementado', cantidad: 3, color: '#3b82f6' },
      { name: 'Sin implementar', cantidad: 13, color: '#6b7280' },
      { name: 'Retrasado', cantidad: 1, color: '#f59e0b' },
      { name: 'En curso', cantidad: 7, color: '#3af50bff' }
    ],
    statusPruebas: [
      { name: 'Not Done', value: 86.2, color: '#3b82f6' },
      { name: 'Passed', value: 3.3, color: '#fb923c' },
      { name: 'Started but not done', value: 6.2, color: '#fff200ff' },
      { name: 'Failed', value: 3.3, color: '#ff0000ff' }
    ],
    codigoProbado: [
      { name: 'Probado', value: 4.8, color: '#3b82f6' },
      { name: 'No probado', value: 95.2, color: '#f87171' }
    ]
  };

  const datosActuales = selectedProject === 'proyecto1' ? datosProyecto1 : datosProyecto2;

  // Datos de evolución por sprint
  const evolucionSprints = [
    { sprint: 'S1', ...datosActuales.sprints.sprint1 },
    { sprint: 'S2', ...datosActuales.sprints.sprint2 },
    { sprint: 'S3', ...datosActuales.sprints.sprint3 },
    { sprint: 'S4', ...datosActuales.sprints.sprint4 }
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files.map(f => f.name)]);
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color = "blue" }) => {
    const colorClasses = {
      green: "from-emerald-500/20 to-green-500/20 border-emerald-500/30",
      yellow: "from-amber-500/20 to-yellow-500/20 border-amber-500/30",
      blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
    };

    const iconColorClasses = {
      green: "text-emerald-400",
      yellow: "text-amber-400",
      blue: "text-blue-400"
    };

    return (
      <div className="relative group overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
        <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-slate-700/50 ${iconColorClasses[color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-slate-300">{title}</p>
              </div>
              <p className="text-4xl font-bold text-white mb-2">{value}</p>
              {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
            </div>
            {trend && (
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dashboard de Métricas
              </h1>
              <p className="text-slate-300 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Monitoreo y análisis de KPIs en tiempo real
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">Sistema activo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Controles */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
          <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Selector de Proyecto */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Proyecto
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full p-3 bg-slate-700/50 border border-slate-600 text-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="proyecto1">Proyecto 1 - Planify</option>
                  <option value="proyecto2">Proyecto 2 - Packn'go</option>
                </select>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 backdrop-blur-sm">
                <p className="text-sm font-medium text-green-300 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Archivos cargados:
                </p>
                <div className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-xs border border-green-500/30">
                      {file}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <MetricCard
            title="DEFECT DENSITY"
            value={datosActuales.metricas.defectDensity}
            subtitle="Defectos/línea de código"
            icon={AlertCircle}
            color="green"
          />
          <MetricCard
            title="COBERTURA DE PRUEBAS"
            value={`${datosActuales.metricas.coberturaDefectos}%`}
            subtitle="Código probado"
            icon={CheckCircle}
            color="green"
          />
          <MetricCard
            title="CSAT SCORE"
            value={`${datosActuales.metricas.csatScore} / 5`}
            subtitle="Satisfacción del cliente"
            icon={Target}
            color="blue"
          />
          <MetricCard
            title="VELOCIDAD EQUIPO"
            value={`${datosActuales.metricas.velocidadEquipo} SP`}
            subtitle="Story points por sprint"
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="PREDICTIBILIDAD"
            value={`${datosActuales.metricas.predictibilidad}%`}
            subtitle="Compromiso cumplido"
            icon={Target}
            color="green"
          />
          <MetricCard
            title="LEAD TIME"
            value={`${datosActuales.metricas.leadTime} Días`}
            subtitle="Tiempo promedio de entrega"
            icon={Clock}
            color="yellow"
          />
        </div>

        {/* Gráficos de Evolución por Sprint */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Evolución de Velocidad por Sprint
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={evolucionSprints}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="sprint" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="velocidad" stroke="#3b82f6" strokeWidth={3} name="Velocidad (SP)" dot={{ fill: '#3b82f6', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Predictibilidad por Sprint
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={evolucionSprints}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="sprint" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Bar dataKey="predictibilidad" fill="#10b981" name="Predictibilidad (%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Gráficos Principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Prioridad de Requerimientos */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Prioridad de los Requerimientos</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={datosActuales.prioridades}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {datosActuales.prioridades.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Requerimientos */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Estado de Requerimientos</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datosActuales.requerimientos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Bar dataKey="cantidad" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                    {datosActuales.requerimientos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status de Pruebas */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Status de las Pruebas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={datosActuales.statusPruebas}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {datosActuales.statusPruebas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Estatus de las */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Porcentaje de Código Probado</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={datosActuales.codigoProbado}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {datosActuales.codigoProbado.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Resumen Comparativo */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
          <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Resumen Comparativo de Proyectos
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-300">Métrica</th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-300">Proyecto 1</th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-300">Proyecto 2</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-slate-200">Defect Density</td>
                    <td className="px-6 py-4 text-center font-medium text-emerald-400">{datosProyecto1.metricas.defectDensity}</td>
                    <td className="px-6 py-4 text-center font-medium text-amber-400">{datosProyecto2.metricas.defectDensity}</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-slate-200">Cobertura de Pruebas</td>
                    <td className="px-6 py-4 text-center font-medium text-emerald-400">{datosProyecto1.metricas.coberturaDefectos}%</td>
                    <td className="px-6 py-4 text-center font-medium text-amber-400">{datosProyecto2.metricas.coberturaDefectos}%</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-slate-200">CSAT Score</td>
                    <td className="px-6 py-4 text-center font-medium text-blue-400">{datosProyecto1.metricas.csatScore}/5</td>
                    <td className="px-6 py-4 text-center font-medium text-blue-400">{datosProyecto2.metricas.csatScore}/5</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-slate-200">Velocidad Equipo</td>
                    <td className="px-6 py-4 text-center font-medium text-blue-400">{datosProyecto1.metricas.velocidadEquipo} SP</td>
                    <td className="px-6 py-4 text-center font-medium text-emerald-400">{datosProyecto2.metricas.velocidadEquipo} SP</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-slate-200">Predictibilidad</td>
                    <td className="px-6 py-4 text-center font-medium text-emerald-400">{datosProyecto1.metricas.predictibilidad}%</td>
                    <td className="px-6 py-4 text-center font-medium text-blue-400">{datosProyecto2.metricas.predictibilidad}%</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-slate-200">Lead Time</td>
                    <td className="px-6 py-4 text-center font-medium text-emerald-400">{datosProyecto1.metricas.leadTime} días</td>
                    <td className="px-6 py-4 text-center font-medium text-blue-400">{datosProyecto2.metricas.leadTime} días</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;