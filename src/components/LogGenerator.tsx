/**
 * Generatore di Eventi e Log
 * 
 * Questo componente permette di simulare diversi tipi di eventi
 * che generano log. Ogni pulsante rappresenta un'azione tipica
 * in un'applicazione reale.
 * 
 * L'animazione mostra il momento esatto in cui il log viene creato.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { 
  MousePointer, 
  Globe, 
  Wifi, 
  LogIn, 
  XCircle, 
  FileCheck, 
  AlertTriangle, 
  Bug,
  Zap
} from 'lucide-react';
import { SimulatedEvent, EVENT_DESCRIPTIONS } from '@/types/log';
import { useState } from 'react';

interface LogGeneratorProps {
  onGenerateLog: (event: SimulatedEvent) => void;
}

const eventButtons: { event: SimulatedEvent; icon: typeof MousePointer; label: string }[] = [
  { event: 'user_click', icon: MousePointer, label: 'Click Utente' },
  { event: 'page_load', icon: Globe, label: 'Caricamento Pagina' },
  { event: 'api_call', icon: Wifi, label: 'Chiamata API' },
  { event: 'auth_success', icon: LogIn, label: 'Login Riuscito' },
  { event: 'auth_failure', icon: XCircle, label: 'Login Fallito' },
  { event: 'form_submit', icon: FileCheck, label: 'Invio Form' },
  { event: 'system_warning', icon: AlertTriangle, label: 'Warning Sistema' },
  { event: 'critical_error', icon: Zap, label: 'Errore Critico' },
  { event: 'debug_trace', icon: Bug, label: 'Debug Trace' },
];

const levelStyles: Record<string, string> = {
  info: 'btn-log-info',
  warning: 'btn-log-warning',
  error: 'btn-log-error',
  debug: 'btn-log-debug',
  success: 'btn-log-info' // Using info style for success
};

export function LogGenerator({ onGenerateLog }: LogGeneratorProps) {
  const [lastClicked, setLastClicked] = useState<SimulatedEvent | null>(null);
  const [pulseEffect, setPulseEffect] = useState(false);

  const handleClick = (event: SimulatedEvent) => {
    setLastClicked(event);
    setPulseEffect(true);
    onGenerateLog(event);
    
    setTimeout(() => setPulseEffect(false), 500);
    setTimeout(() => setLastClicked(null), 2000);
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
            Genera Eventi & Log
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Clicca sui pulsanti per simulare eventi dell'applicazione.
            Osserva come ogni azione genera un log strutturato.
          </p>
        </motion.div>

        {/* Event description panel */}
        <AnimatePresence mode="wait">
          {lastClicked && (
            <motion.div
              key={lastClicked}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="mb-8 p-6 rounded-xl border border-primary/30 bg-primary/5 max-w-2xl mx-auto"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Log Generato!</h4>
                  <p className="text-sm text-muted-foreground">
                    {EVENT_DESCRIPTIONS[lastClicked].description}
                  </p>
                  <code className="block mt-2 text-xs font-mono bg-card p-2 rounded border">
                    {EVENT_DESCRIPTIONS[lastClicked].message}
                  </code>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {eventButtons.map((btn, index) => {
            const eventConfig = EVENT_DESCRIPTIONS[btn.event];
            
            return (
              <motion.button
                key={btn.event}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleClick(btn.event)}
                className={`
                  relative p-4 rounded-xl font-medium flex items-center gap-3
                  ${levelStyles[eventConfig.level]}
                  ${lastClicked === btn.event && pulseEffect ? 'animate-pulse' : ''}
                `}
              >
                <btn.icon className="w-5 h-5" />
                <span>{btn.label}</span>
                
                {/* Level badge */}
                <span className={`
                  ml-auto px-2 py-0.5 text-xs rounded-full font-mono uppercase
                  badge-${eventConfig.level}
                `}>
                  {eventConfig.level}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Visual pulse effect on log generation */}
        <AnimatePresence>
          {pulseEffect && (
            <motion.div
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-primary pointer-events-none z-50"
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
