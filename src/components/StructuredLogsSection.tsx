/**
 * Sezione sui Log Strutturati
 * 
 * Spiega:
 * - Cos'è un log strutturato (JSON con metadati)
 * - Perché è meglio del semplice testo
 * - Quali campi dovrebbe avere
 * 
 * Mostra visivamente la struttura di un log.
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Clock, 
  Tag, 
  MessageSquare, 
  Braces,
  FileJson,
  FileText,
  Check,
  X
} from 'lucide-react';

const structuredLogExample = {
  timestamp: '2024-01-15T10:30:45.123Z',
  level: 'error',
  message: 'Pagamento fallito',
  context: {
    source: 'PaymentService',
    userId: 'user_42',
    orderId: 'order_789',
    amount: 99.99,
    errorCode: 'CARD_DECLINED',
    requestId: 'req_abc123'
  }
};

const logFields = [
  {
    name: 'timestamp',
    icon: Clock,
    description: 'Momento esatto dell\'evento (ISO 8601)',
    color: 'log-info',
    value: structuredLogExample.timestamp
  },
  {
    name: 'level',
    icon: Tag,
    description: 'Gravità: debug, info, warning, error',
    color: 'log-error',
    value: structuredLogExample.level
  },
  {
    name: 'message',
    icon: MessageSquare,
    description: 'Descrizione leggibile dell\'evento',
    color: 'log-warning',
    value: structuredLogExample.message
  },
  {
    name: 'context',
    icon: Braces,
    description: 'Metadati aggiuntivi per il debugging',
    color: 'log-success',
    value: JSON.stringify(structuredLogExample.context, null, 2)
  }
];

const comparison = [
  {
    feature: 'Ricerca e filtraggio',
    structured: true,
    text: false
  },
  {
    feature: 'Parsing automatico',
    structured: true,
    text: false
  },
  {
    feature: 'Aggregazione dati',
    structured: true,
    text: false
  },
  {
    feature: 'Alert automatici',
    structured: true,
    text: false
  },
  {
    feature: 'Leggibilità umana',
    structured: true,
    text: true
  }
];

export function StructuredLogsSection() {
  const [activeField, setActiveField] = useState<string | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Log Strutturati
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I log moderni non sono semplice testo. Sono oggetti JSON 
            con metadati ricchi che permettono ricerche e analisi avanzate.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Log Structure Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Struttura di un Log</h3>
            
            <div className="space-y-4">
              {logFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveField(activeField === field.name ? null : field.name)}
                  className={`
                    section-card cursor-pointer transition-all
                    ${activeField === field.name ? 'ring-2 ring-primary' : ''}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `hsl(var(--${field.color}) / 0.2)` }}
                    >
                      <field.icon 
                        className="w-5 h-5"
                        style={{ color: `hsl(var(--${field.color}))` }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <code 
                          className="font-mono font-semibold"
                          style={{ color: `hsl(var(--${field.color}))` }}
                        >
                          {field.name}
                        </code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {field.description}
                      </p>
                      
                      {/* Expanded value */}
                      {activeField === field.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3"
                        >
                          <pre className="font-mono text-xs bg-secondary/50 p-3 rounded-lg overflow-x-auto">
                            {field.value}
                          </pre>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">
              Strutturato vs Testo Semplice
            </h3>
            
            <div className="section-card">
              <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-border">
                <div className="font-medium text-muted-foreground">Feature</div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <FileJson className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">JSON</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">Testo</span>
                  </div>
                </div>
              </div>
              
              {comparison.map((item, index) => (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-3 gap-4 py-3 border-b border-border last:border-0"
                >
                  <div className="text-sm">{item.feature}</div>
                  <div className="text-center">
                    {item.structured ? (
                      <Check className="w-5 h-5 mx-auto text-log-success" />
                    ) : (
                      <X className="w-5 h-5 mx-auto text-log-error" />
                    )}
                  </div>
                  <div className="text-center">
                    {item.text ? (
                      <Check className="w-5 h-5 mx-auto text-log-success" />
                    ) : (
                      <X className="w-5 h-5 mx-auto text-log-error" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Full JSON Example */}
            <div className="mt-6">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <FileJson className="w-4 h-4 text-primary" />
                Esempio Completo
              </h4>
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="flex gap-1.5">
                    <div className="terminal-dot bg-log-error" />
                    <div className="terminal-dot bg-log-warning" />
                    <div className="terminal-dot bg-log-success" />
                  </div>
                  <span className="ml-4 text-sm text-muted-foreground font-mono">
                    log-entry.json
                  </span>
                </div>
                <pre className="p-4 font-mono text-xs overflow-x-auto">
                  <code className="text-muted-foreground">
                    {JSON.stringify(structuredLogExample, null, 2)}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Note about simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-xl border border-primary/30 bg-primary/5 max-w-2xl mx-auto text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">💾 Nota:</span> In questa app, 
            i log sono salvati solo in memoria (stato React). In un sistema reale, 
            verrebbero inviati a un servizio come Datadog, Sentry o CloudWatch.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
