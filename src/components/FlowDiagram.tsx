/**
 * Diagramma del Flusso dei Log
 * 
 * Visualizza il percorso che un log compie:
 * Applicazione → Logger → Storage → Dashboard
 * 
 * Le animazioni mostrano come i dati fluiscono
 * attraverso il sistema di logging.
 */

import { motion } from 'framer-motion';
import { Code, FileText, Database, BarChart3, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const flowSteps = [
  {
    id: 'app',
    icon: Code,
    title: 'Applicazione',
    description: 'Un evento accade nel codice (click, errore, chiamata API)',
    color: 'var(--log-info)'
  },
  {
    id: 'logger',
    icon: FileText,
    title: 'Logger',
    description: 'Il logger formatta il messaggio con timestamp e contesto',
    color: 'var(--log-warning)'
  },
  {
    id: 'storage',
    icon: Database,
    title: 'Storage',
    description: 'Il log viene salvato (file, database, servizio cloud)',
    color: 'var(--log-success)'
  },
  {
    id: 'dashboard',
    icon: BarChart3,
    title: 'Dashboard',
    description: 'I log sono visualizzati, filtrati e analizzati',
    color: 'var(--log-error)'
  }
];

export function FlowDiagram() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const steps = ['app', 'logger', 'storage', 'dashboard'];
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < steps.length) {
        setActiveStep(steps[index]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setActiveStep(null);
          setIsAnimating(false);
        }, 1000);
      }
    }, 800);
  };

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
            Il Flusso dei Log
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ogni log compie un viaggio dall'applicazione alla dashboard. 
            Clicca per visualizzare l'animazione del flusso.
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0">
            {isAnimating && (
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3.2, ease: 'linear' }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Arrow between steps (mobile/tablet) */}
                {index < flowSteps.length - 1 && (
                  <div className="hidden md:flex lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground">
                    <ArrowRight className="w-5 h-5 rotate-90 lg:rotate-0" />
                  </div>
                )}

                <motion.div
                  className={`flow-node text-center cursor-pointer ${
                    activeStep === step.id ? 'flow-node-active' : ''
                  }`}
                  animate={activeStep === step.id ? {
                    scale: [1, 1.05, 1],
                    transition: { duration: 0.3 }
                  } : {}}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all duration-300"
                    style={{ 
                      backgroundColor: activeStep === step.id 
                        ? `hsl(${step.color} / 0.2)` 
                        : 'hsl(var(--secondary))',
                      boxShadow: activeStep === step.id 
                        ? `0 0 20px hsl(${step.color} / 0.4)` 
                        : 'none'
                    }}
                  >
                    <step.icon 
                      className="w-7 h-7 transition-colors"
                      style={{ 
                        color: activeStep === step.id 
                          ? `hsl(${step.color})` 
                          : 'hsl(var(--muted-foreground))'
                      }}
                    />
                  </div>
                  
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  
                  <motion.p
                    className="text-sm text-muted-foreground"
                    animate={{ 
                      opacity: activeStep === step.id ? 1 : 0.7,
                      y: activeStep === step.id ? 0 : 5
                    }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Step number */}
                  <div 
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: activeStep === step.id 
                        ? `hsl(${step.color})` 
                        : 'hsl(var(--secondary))',
                      color: activeStep === step.id 
                        ? 'hsl(var(--background))' 
                        : 'hsl(var(--muted-foreground))'
                    }}
                  >
                    {index + 1}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animate Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={runAnimation}
            disabled={isAnimating}
            className={`
              px-8 py-3 rounded-xl font-medium transition-all duration-300
              ${isAnimating 
                ? 'bg-secondary text-muted-foreground cursor-not-allowed' 
                : 'bg-primary text-primary-foreground hover:opacity-90 glow-primary'
              }
            `}
          >
            {isAnimating ? 'Animazione in corso...' : 'Visualizza il Flusso'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
