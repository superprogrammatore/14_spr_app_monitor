/**
 * App Monitor – Logging & Debugging
 * 
 * Applicazione didattica per imparare i concetti di logging.
 * Tutto è simulato: nessun backend, nessuna API esterna.
 * 
 * Sezioni:
 * 1. Hero - Introduzione al logging
 * 2. FlowDiagram - Il percorso dei log
 * 3. LogGenerator - Genera eventi simulati
 * 4. LogDashboard - Visualizza i log
 * 5. LogImportance - Perché i log sono fondamentali
 * 6. StructuredLogs - Formato e struttura
 * 7. DevVsProd - Differenze tra ambienti
 */

import { HeroSection } from '@/components/HeroSection';
import { FlowDiagram } from '@/components/FlowDiagram';
import { LogGenerator } from '@/components/LogGenerator';
import { LogDashboard } from '@/components/LogDashboard';
import { LogImportanceSection } from '@/components/LogImportanceSection';
import { StructuredLogsSection } from '@/components/StructuredLogsSection';
import { DevVsProdSection } from '@/components/DevVsProdSection';
import { useLogStore } from '@/hooks/useLogStore';

const Index = () => {
  // Hook personalizzato che gestisce lo store dei log
  // Simula un sistema di logging completo in memoria
  const {
    logs,
    filteredLogs,
    filter,
    stats,
    lastAddedId,
    logEvent,
    clearLogs,
    updateFilter,
    toggleLevel
  } = useLogStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Sezione Hero - Introduzione */}
      <HeroSection />
      
      {/* Diagramma del Flusso - App → Logger → Storage → Dashboard */}
      <FlowDiagram />
      
      {/* Generatore di Eventi - Pulsanti per simulare azioni */}
      <LogGenerator onGenerateLog={logEvent} />
      
      {/* Dashboard dei Log - Visualizzazione e filtri */}
      <LogDashboard
        logs={logs}
        filteredLogs={filteredLogs}
        stats={stats}
        filter={filter}
        lastAddedId={lastAddedId}
        onToggleLevel={toggleLevel}
        onSearch={(query) => updateFilter({ searchQuery: query })}
        onClear={clearLogs}
      />
      
      {/* Importanza del Logging - Con vs Senza log */}
      <LogImportanceSection />
      
      {/* Log Strutturati - JSON vs Testo */}
      <StructuredLogsSection />
      
      {/* Sviluppo vs Produzione - Differenze fondamentali */}
      <DevVsProdSection />
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            <span className="font-semibold text-foreground">App Monitor</span> — 
            Strumento didattico per comprendere logging e debugging
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Tutto simulato • Nessun backend • Solo scopo educativo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
