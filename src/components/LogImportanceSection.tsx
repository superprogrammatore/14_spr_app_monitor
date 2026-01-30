/**
 * Sezione sull'Importanza del Logging
 * 
 * Mostra visivamente cosa succede quando:
 * - I log sono presenti (debugging facile)
 * - I log sono assenti (debugging impossibile)
 * 
 * Usa confronti animati per rendere chiaro il concetto.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  Search,
  Clock,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';

const scenarios = [
  {
    id: 'with-logs',
    title: 'Con i Log',
    icon: CheckCircle,
    color: 'log-success',
    steps: [
      { icon: AlertTriangle, text: 'Errore segnalato: "Il pagamento non funziona"' },
      { icon: Search, text: 'Cerco nei log: "payment" + timestamp utente' },
      { icon: Lightbulb, text: 'Trovato! Error: CARD_DECLINED at checkout.js:142' },
      { icon: CheckCircle, text: 'Fix applicato in 10 minuti' }
    ],
    outcome: {
      time: '10 minuti',
      stress: 'Basso',
      success: true
    }
  },
  {
    id: 'without-logs',
    title: 'Senza i Log',
    icon: XCircle,
    color: 'log-error',
    steps: [
      { icon: AlertTriangle, text: 'Errore segnalato: "Il pagamento non funziona"' },
      { icon: HelpCircle, text: 'Nessun log... Cosa è successo?' },
      { icon: Search, text: 'Test manuali, ipotesi, tentativi a vuoto...' },
      { icon: Clock, text: '3 ore dopo: ancora nessuna idea' }
    ],
    outcome: {
      time: '???',
      stress: 'Alto',
      success: false
    }
  }
];

export function LogImportanceSection() {
  const [activeScenario, setActiveScenario] = useState<'with-logs' | 'without-logs'>('with-logs');

  const scenario = scenarios.find(s => s.id === activeScenario)!;

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent via-card/30 to-transparent">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perché i Log sono Fondamentali
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Confronta lo stesso scenario di debugging con e senza log.
            La differenza è drammatica.
          </p>
        </motion.div>

        {/* Scenario Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(s.id as 'with-logs' | 'without-logs')}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all border-2
                ${activeScenario === s.id 
                  ? `border-${s.color} bg-${s.color}/10` 
                  : 'border-border bg-card hover:border-muted-foreground/50'
                }
              `}
              style={{
                borderColor: activeScenario === s.id 
                  ? `hsl(var(--${s.color}))` 
                  : undefined,
                backgroundColor: activeScenario === s.id 
                  ? `hsl(var(--${s.color}) / 0.1)` 
                  : undefined
              }}
            >
              <s.icon 
                className="w-5 h-5" 
                style={{ 
                  color: activeScenario === s.id 
                    ? `hsl(var(--${s.color}))` 
                    : 'hsl(var(--muted-foreground))'
                }}
              />
              <span style={{ 
                color: activeScenario === s.id 
                  ? `hsl(var(--${s.color}))` 
                  : undefined 
              }}>
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Scenario Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div 
              className="section-card border-2"
              style={{ borderColor: `hsl(var(--${scenario.color}))` }}
            >
              {/* Timeline */}
              <div className="space-y-6">
                {scenario.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start gap-4"
                  >
                    {/* Timeline connector */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ 
                          backgroundColor: `hsl(var(--${scenario.color}) / 0.2)`,
                        }}
                      >
                        <step.icon 
                          className="w-5 h-5"
                          style={{ color: `hsl(var(--${scenario.color}))` }}
                        />
                      </div>
                      {index < scenario.steps.length - 1 && (
                        <div 
                          className="w-0.5 h-8 mt-2"
                          style={{ backgroundColor: `hsl(var(--${scenario.color}) / 0.3)` }}
                        />
                      )}
                    </div>
                    
                    {/* Step content */}
                    <div className="pt-2">
                      <p className="text-foreground">{step.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Outcome */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 p-6 rounded-xl border"
                style={{ 
                  borderColor: `hsl(var(--${scenario.color}) / 0.3)`,
                  backgroundColor: `hsl(var(--${scenario.color}) / 0.05)`
                }}
              >
                <h4 className="font-semibold mb-4 text-center">Risultato</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tempo</p>
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: `hsl(var(--${scenario.color}))` }}
                    >
                      {scenario.outcome.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Stress</p>
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: `hsl(var(--${scenario.color}))` }}
                    >
                      {scenario.outcome.stress}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Risolto</p>
                    <p className="text-2xl font-bold">
                      {scenario.outcome.success ? (
                        <CheckCircle 
                          className="w-8 h-8 mx-auto"
                          style={{ color: 'hsl(var(--log-success))' }}
                        />
                      ) : (
                        <XCircle 
                          className="w-8 h-8 mx-auto"
                          style={{ color: 'hsl(var(--log-error))' }}
                        />
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
