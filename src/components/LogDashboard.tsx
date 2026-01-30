/**
 * Dashboard dei Log
 * 
 * Visualizza i log generati in modo strutturato con:
 * - Filtri per livello
 * - Ricerca testuale
 * - Statistiche in tempo reale
 * - Animazioni per nuovi log
 * 
 * Questa è la visualizzazione finale del flusso dei log.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Trash2, 
  Filter,
  AlertCircle,
  AlertTriangle,
  Info,
  Bug,
  CheckCircle
} from 'lucide-react';
import { LogEntry, LogLevel } from '@/types/log';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface LogDashboardProps {
  logs: LogEntry[];
  filteredLogs: LogEntry[];
  stats: {
    total: number;
    byLevel: Record<LogLevel, number>;
    errorCount: number;
    warningCount: number;
  };
  filter: {
    levels: LogLevel[];
    searchQuery: string;
  };
  lastAddedId: string | null;
  onToggleLevel: (level: LogLevel) => void;
  onSearch: (query: string) => void;
  onClear: () => void;
}

const levelIcons: Record<LogLevel, typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  debug: Bug,
  success: CheckCircle
};

const levelLabels: Record<LogLevel, string> = {
  info: 'Info',
  warning: 'Warning',
  error: 'Errore',
  debug: 'Debug',
  success: 'Successo'
};

export function LogDashboard({
  logs,
  filteredLogs,
  stats,
  filter,
  lastAddedId,
  onToggleLevel,
  onSearch,
  onClear
}: LogDashboardProps) {
  return (
    <section className="py-20 px-6 bg-card/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dashboard dei Log
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visualizza, filtra e analizza i log generati. 
            I nuovi log appaiono in tempo reale con animazioni.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Stats Panel */}
          <motion.div 
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Total Logs */}
            <div className="section-card">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Log Totali
              </h3>
              <p className="text-4xl font-bold text-primary">
                {stats.total}
              </p>
            </div>

            {/* Level Filters */}
            <div className="section-card">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">
                  Filtra per Livello
                </h3>
              </div>
              
              <div className="space-y-2">
                {(['info', 'success', 'warning', 'error', 'debug'] as LogLevel[]).map(level => {
                  const Icon = levelIcons[level];
                  const isActive = filter.levels.includes(level);
                  const count = stats.byLevel[level] || 0;
                  
                  return (
                    <button
                      key={level}
                      onClick={() => onToggleLevel(level)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                        ${isActive 
                          ? `badge-${level}` 
                          : 'bg-secondary/50 text-muted-foreground opacity-50'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium flex-1 text-left">
                        {levelLabels[level]}
                      </span>
                      <span className="text-xs font-mono">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear Button */}
            <button
              onClick={onClear}
              disabled={logs.length === 0}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              <span>Pulisci Log</span>
            </button>
          </motion.div>

          {/* Log List */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="terminal-window">
              {/* Terminal Header */}
              <div className="terminal-header">
                <div className="flex gap-1.5">
                  <div className="terminal-dot bg-log-error" />
                  <div className="terminal-dot bg-log-warning" />
                  <div className="terminal-dot bg-log-success" />
                </div>
                <span className="ml-4 text-sm text-muted-foreground font-mono">
                  log-viewer.sh
                </span>
                
                {/* Search */}
                <div className="ml-auto flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-1.5">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cerca nei log..."
                    value={filter.searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm w-40 placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Log Entries */}
              <div className="p-4 max-h-[500px] overflow-y-auto space-y-2">
                {filteredLogs.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Bug className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="font-medium">Nessun log da mostrare</p>
                    <p className="text-sm mt-1">
                      Genera alcuni eventi usando i pulsanti sopra
                    </p>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredLogs.map((log) => {
                      const Icon = levelIcons[log.level];
                      const isNew = log.id === lastAddedId;
                      
                      return (
                        <motion.div
                          key={log.id}
                          layout
                          initial={{ opacity: 0, x: -20, height: 0 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0, 
                            height: 'auto',
                            scale: isNew ? [1, 1.02, 1] : 1
                          }}
                          exit={{ opacity: 0, x: 20, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`log-entry log-entry-${log.level} ${
                            isNew ? 'ring-2 ring-primary/50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Level Icon */}
                            <Icon 
                              className="w-4 h-4 mt-0.5 shrink-0"
                              style={{ color: `hsl(var(--log-${log.level}))` }}
                            />
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`badge-${log.level} px-2 py-0.5 text-xs rounded uppercase`}>
                                  {log.level}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {log.context.source}
                                </span>
                              </div>
                              <p className="text-sm break-words">{log.message}</p>
                            </div>
                            
                            {/* Timestamp */}
                            <span className="text-xs text-muted-foreground shrink-0">
                              {format(log.timestamp, 'HH:mm:ss.SSS', { locale: it })}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
