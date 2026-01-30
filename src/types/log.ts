/**
 * Tipi per il sistema di logging educativo
 * 
 * Questi tipi definiscono la struttura dei log simulati.
 * In un sistema reale, questi dati verrebbero inviati a un server di logging.
 */

export type LogLevel = 'info' | 'warning' | 'error' | 'debug' | 'success';

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  message: string;
  context: {
    source: string;      // Da dove proviene il log (es. "UserAction", "System")
    component?: string;  // Componente React che ha generato il log
    userId?: string;     // ID utente simulato
    sessionId?: string;  // ID sessione simulata
    metadata?: Record<string, unknown>; // Dati aggiuntivi
  };
}

export interface LogFilter {
  levels: LogLevel[];
  searchQuery: string;
  timeRange?: {
    start: Date;
    end: Date;
  };
}

// Eventi simulabili dall'utente
export type SimulatedEvent = 
  | 'user_click'
  | 'page_load'
  | 'api_call'
  | 'auth_success'
  | 'auth_failure'
  | 'form_submit'
  | 'system_warning'
  | 'critical_error'
  | 'debug_trace';

export const EVENT_DESCRIPTIONS: Record<SimulatedEvent, { 
  level: LogLevel; 
  message: string;
  source: string;
  description: string;
}> = {
  user_click: {
    level: 'info',
    message: 'Utente ha cliccato sul pulsante "Acquista"',
    source: 'UserAction',
    description: 'Traccia le interazioni utente per analytics'
  },
  page_load: {
    level: 'info',
    message: 'Pagina Dashboard caricata in 245ms',
    source: 'Performance',
    description: 'Monitora i tempi di caricamento'
  },
  api_call: {
    level: 'info',
    message: 'GET /api/users → 200 OK (128ms)',
    source: 'Network',
    description: 'Registra le chiamate API per debugging'
  },
  auth_success: {
    level: 'success',
    message: 'Login riuscito per user@example.com',
    source: 'Auth',
    description: 'Conferma autenticazioni riuscite'
  },
  auth_failure: {
    level: 'warning',
    message: 'Tentativo di login fallito - credenziali non valide',
    source: 'Auth',
    description: 'Segnala tentativi di accesso sospetti'
  },
  form_submit: {
    level: 'info',
    message: 'Form contatto inviato con successo',
    source: 'UserAction',
    description: 'Traccia le azioni completate'
  },
  system_warning: {
    level: 'warning',
    message: 'Memoria heap al 85% - considera ottimizzazione',
    source: 'System',
    description: 'Avvisi per manutenzione preventiva'
  },
  critical_error: {
    level: 'error',
    message: 'ERRORE: Connessione al database fallita',
    source: 'Database',
    description: 'Errori critici che richiedono intervento'
  },
  debug_trace: {
    level: 'debug',
    message: 'renderComponent() chiamato con props: {id: 42}',
    source: 'Debug',
    description: 'Dettagli tecnici per sviluppatori'
  }
};
