/**
 * Hook personalizzato per la gestione dello store dei log
 * 
 * Questo hook simula un sistema di logging completo:
 * - Aggiunta di nuovi log
 * - Filtraggio per livello
 * - Ricerca testuale
 * - Pulizia dei log
 * 
 * In produzione, questi log verrebbero inviati a un servizio
 * come Datadog, Sentry, o CloudWatch.
 */

import { useState, useCallback, useMemo } from 'react';
import { LogEntry, LogLevel, LogFilter, SimulatedEvent, EVENT_DESCRIPTIONS } from '@/types/log';

// Genera un ID univoco per ogni log
const generateId = () => `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Genera un ID sessione simulato
const SESSION_ID = `session_${Math.random().toString(36).substr(2, 9)}`;

export function useLogStore() {
  // Array dei log in memoria (simulazione dello storage)
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  // Filtri attivi
  const [filter, setFilter] = useState<LogFilter>({
    levels: ['info', 'warning', 'error', 'debug', 'success'],
    searchQuery: ''
  });

  // Ultimo log aggiunto (per animazioni)
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  /**
   * Aggiunge un nuovo log allo store
   * 
   * Questo è il punto centrale dove ogni evento viene:
   * 1. Strutturato con timestamp e metadata
   * 2. Salvato nello store (in memoria)
   * 3. Segnalato per le animazioni
   */
  const addLog = useCallback((
    level: LogLevel,
    message: string,
    source: string,
    metadata?: Record<string, unknown>
  ) => {
    const newLog: LogEntry = {
      id: generateId(),
      timestamp: new Date(),
      level,
      message,
      context: {
        source,
        component: 'SimulatedApp',
        userId: 'user_demo_123',
        sessionId: SESSION_ID,
        metadata
      }
    };

    setLogs(prev => [newLog, ...prev]);
    setLastAddedId(newLog.id);

    // Reset dell'highlight dopo l'animazione
    setTimeout(() => setLastAddedId(null), 2000);

    return newLog;
  }, []);

  /**
   * Genera un log da un evento simulato
   * Questo metodo traduce le azioni utente in log strutturati
   */
  const logEvent = useCallback((event: SimulatedEvent) => {
    const eventConfig = EVENT_DESCRIPTIONS[event];
    return addLog(
      eventConfig.level,
      eventConfig.message,
      eventConfig.source,
      { eventType: event }
    );
  }, [addLog]);

  /**
   * Filtra i log in base ai criteri attivi
   * Questo è fondamentale per la dashboard: permette di
   * concentrarsi solo sui log rilevanti
   */
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Filtro per livello
      if (!filter.levels.includes(log.level)) return false;
      
      // Filtro per ricerca testuale
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        const matchesMessage = log.message.toLowerCase().includes(query);
        const matchesSource = log.context.source.toLowerCase().includes(query);
        if (!matchesMessage && !matchesSource) return false;
      }
      
      // Filtro per intervallo temporale
      if (filter.timeRange) {
        if (log.timestamp < filter.timeRange.start || log.timestamp > filter.timeRange.end) {
          return false;
        }
      }
      
      return true;
    });
  }, [logs, filter]);

  /**
   * Statistiche sui log per la dashboard
   */
  const stats = useMemo(() => {
    const byLevel = logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {} as Record<LogLevel, number>);

    return {
      total: logs.length,
      byLevel,
      errorCount: byLevel.error || 0,
      warningCount: byLevel.warning || 0,
      lastError: logs.find(l => l.level === 'error')
    };
  }, [logs]);

  /**
   * Pulisce tutti i log
   * In produzione, i log verrebbero archiviati, non eliminati
   */
  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  /**
   * Aggiorna i filtri attivi
   */
  const updateFilter = useCallback((updates: Partial<LogFilter>) => {
    setFilter(prev => ({ ...prev, ...updates }));
  }, []);

  /**
   * Toggle di un singolo livello di log
   */
  const toggleLevel = useCallback((level: LogLevel) => {
    setFilter(prev => ({
      ...prev,
      levels: prev.levels.includes(level)
        ? prev.levels.filter(l => l !== level)
        : [...prev.levels, level]
    }));
  }, []);

  return {
    logs,
    filteredLogs,
    filter,
    stats,
    lastAddedId,
    addLog,
    logEvent,
    clearLogs,
    updateFilter,
    toggleLevel
  };
}
