/**
 * Sezione Sviluppo vs Produzione
 * 
 * Spiega le differenze fondamentali nel logging tra:
 * - Ambiente di sviluppo: debug verboso, tutti i dettagli
 * - Ambiente di produzione: log essenziali, performance, sicurezza
 * 
 * Usa diagrammi interattivi per visualizzare le differenze.
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Code, 
  Rocket, 
  Bug, 
  Shield, 
  Gauge, 
  Eye,
  EyeOff,
  Layers,
  Zap
} from 'lucide-react';

const comparisonData = [
  {
    category: 'Livello di Dettaglio',
    dev: {
      icon: Layers,
      title: 'Tutto viene loggato',
      description: 'Stack trace completi, variabili, query SQL, dati utente',
      value: 100
    },
    prod: {
      icon: Layers,
      title: 'Solo l\'essenziale',
      description: 'Errori critici, metriche di performance, eventi chiave',
      value: 30
    }
  },
  {
    category: 'Performance',
    dev: {
      icon: Gauge,
      title: 'Impatto ignorato',
      description: 'La velocità non è prioritaria durante lo sviluppo',
      value: 20
    },
    prod: {
      icon: Gauge,
      title: 'Ottimizzato',
      description: 'Log asincroni, batching, sampling per ridurre overhead',
      value: 95
    }
  },
  {
    category: 'Sicurezza',
    dev: {
      icon: Eye,
      title: 'Dati visibili',
      description: 'Password, token, PII possono apparire per debug',
      value: 10
    },
    prod: {
      icon: EyeOff,
      title: 'Dati mascherati',
      description: 'Nessun dato sensibile nei log, conformità GDPR',
      value: 100
    }
  },
  {
    category: 'Persistenza',
    dev: {
      icon: Zap,
      title: 'Console locale',
      description: 'I log vivono nella console del browser o terminale',
      value: 30
    },
    prod: {
      icon: Shield,
      title: 'Storage centralizzato',
      description: 'Servizi cloud, retention policy, backup automatici',
      value: 100
    }
  }
];

const exampleLogs = {
  dev: [
    { level: 'debug', text: 'SQL Query: SELECT * FROM users WHERE id = 42' },
    { level: 'debug', text: 'User object: {password: "secret123", email: "..."}' },
    { level: 'info', text: 'Component rendered with props: {data: [...]}' },
    { level: 'debug', text: 'API Response: {token: "eyJhbGc...", user: ...}' },
    { level: 'warning', text: 'Deprecation: useEffect dependency missing' },
    { level: 'error', text: 'TypeError: Cannot read property of undefined\n  at UserProfile.tsx:42\n  at renderComponent...' },
  ],
  prod: [
    { level: 'info', text: 'User login: user_id=42' },
    { level: 'info', text: 'API call: GET /api/users (245ms)' },
    { level: 'error', text: 'Error: USER_NOT_FOUND, request_id=abc123' },
  ]
};

export function DevVsProdSection() {
  const [activeMode, setActiveMode] = useState<'dev' | 'prod'>('dev');

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
            Sviluppo vs Produzione
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Il logging cambia drasticamente tra ambiente di sviluppo e produzione.
            Scopri le differenze fondamentali.
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl border border-border p-1 bg-card">
            <button
              onClick={() => setActiveMode('dev')}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                ${activeMode === 'dev' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Code className="w-5 h-5" />
              Sviluppo
            </button>
            <button
              onClick={() => setActiveMode('prod')}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                ${activeMode === 'prod' 
                  ? 'bg-log-success text-background' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Rocket className="w-5 h-5" />
              Produzione
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {comparisonData.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`section-card ${
                activeMode === 'dev' ? 'comparison-dev' : 'comparison-prod'
              }`}
            >
              <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
                {item.category}
              </h3>
              
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, x: activeMode === 'dev' ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                    ${activeMode === 'dev' ? 'bg-primary/20' : 'bg-log-success/20'}
                  `}>
                    {activeMode === 'dev' ? (
                      <item.dev.icon className="w-6 h-6 text-primary" />
                    ) : (
                      <item.prod.icon className="w-6 h-6 text-log-success" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">
                      {activeMode === 'dev' ? item.dev.title : item.prod.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {activeMode === 'dev' ? item.dev.description : item.prod.description}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          activeMode === 'dev' ? 'bg-primary' : 'bg-log-success'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${activeMode === 'dev' ? item.dev.value : item.prod.value}%` 
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Example Logs Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-card"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Esempio: Console Output
          </h3>
          
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="flex gap-1.5">
                <div className="terminal-dot bg-log-error" />
                <div className="terminal-dot bg-log-warning" />
                <div className="terminal-dot bg-log-success" />
              </div>
              <span className="ml-4 text-sm text-muted-foreground font-mono">
                {activeMode === 'dev' ? 'development.log' : 'production.log'}
              </span>
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                activeMode === 'dev' ? 'badge-info' : 'badge-success'
              }`}>
                {activeMode === 'dev' ? 'DEV MODE' : 'PROD MODE'}
              </span>
            </div>
            
            <div className="p-4 space-y-2 font-mono text-sm max-h-64 overflow-y-auto">
              {exampleLogs[activeMode].map((log, i) => (
                <motion.div
                  key={`${activeMode}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`log-entry log-entry-${log.level}`}
                >
                  <span className="text-muted-foreground">[{log.level.toUpperCase()}]</span>
                  <span className="ml-2 whitespace-pre-wrap">{log.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Takeaway */}
          <div className={`mt-6 p-4 rounded-xl border ${
            activeMode === 'dev' 
              ? 'border-primary/30 bg-primary/5' 
              : 'border-log-success/30 bg-log-success/5'
          }`}>
            <div className="flex items-start gap-3">
              {activeMode === 'dev' ? (
                <>
                  <Bug className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">In Sviluppo</h4>
                    <p className="text-sm text-muted-foreground">
                      Logga tutto il possibile! Stack trace completi, dati di debug, 
                      variabili. L'obiettivo è capire esattamente cosa succede.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 text-log-success mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-log-success mb-1">In Produzione</h4>
                    <p className="text-sm text-muted-foreground">
                      Log minimali e strutturati. Nessun dato sensibile. 
                      Focus su metriche, errori critici e audit trail.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
