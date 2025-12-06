import { useState } from 'react';
import { X, FileSpreadsheet, Download } from 'lucide-react';

interface ExportModalProps {
  onClose: () => void;
}

export default function ExportModal({ onClose }: ExportModalProps) {
  const [reportType, setReportType] = useState('clubes');
  const [region, setRegion] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleExport = () => {
    alert('Descargando archivo Excel...');
    onClose();
  };

  const getPreviewData = () => {
    switch (reportType) {
      case 'clubes':
        return { registros: 105, tipo: 'clubes', columnas: 12 };
      case 'participantes':
        return { registros: 1800, tipo: 'participantes', columnas: 10 };
      case 'enlaces':
        return { registros: 130, tipo: 'enlaces', columnas: 15 };
      case 'padrinos':
        return { registros: 95, tipo: 'padrinos', columnas: 12 };
      case 'general':
        return { registros: 2130, tipo: 'todos los registros', columnas: 20 };
      default:
        return { registros: 0, tipo: '', columnas: 0 };
    }
  };

  const preview = getPreviewData();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 rounded-full p-3">
              <FileSpreadsheet className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl text-[#1e3a5f]">Exportar Datos a Excel</h2>
              <p className="text-sm text-gray-600">Seleccione qué información desea exportar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Report Type */}
          <div>
            <label className="block mb-2">Tipo de Reporte *</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full"
            >
              <option value="clubes">Lista Completa de Clubes</option>
              <option value="participantes">Lista Completa de Participantes</option>
              <option value="enlaces">Lista de Enlaces Voluntarios</option>
              <option value="padrinos">Lista de Padrinos/Madrinas</option>
              <option value="general">Reporte General (Todo)</option>
              <option value="personalizado">Personalizado...</option>
            </select>
          </div>

          {/* Filters */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg text-[#1e3a5f] mb-4">Filtros (Opcional)</h3>
            <div className="space-y-4">
              <div>
                <label>Filtrar por Región</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="">Todas las regiones</option>
                  <option value="Norte">Norte</option>
                  <option value="Suroccidente">Suroccidente</option>
                  <option value="Noroccidente">Noroccidente</option>
                  <option value="Oriente">Oriente</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Período - Desde</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div>
                  <label>Período - Hasta</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg text-[#1e3a5f] mb-4">Vista Previa</h3>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total de registros:</span>
                <span className="text-[#1e3a5f]">
                  {preview.registros} {preview.tipo}
                </span>
              </div>
              {reportType === 'participantes' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Participantes incluidos:</span>
                  <span className="text-[#1e3a5f]">1,800</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Columnas:</span>
                <span className="text-[#1e3a5f]">{preview.columnas}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Formato:</span>
                <span className="text-[#1e3a5f]">Excel (.xlsx)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
          >
            CANCELAR
          </button>
          <button
            onClick={handleExport}
            className="flex-1 bg-[#28a745] hover:bg-[#1e7e34] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            DESCARGAR EXCEL
          </button>
        </div>
      </div>
    </div>
  );
}
