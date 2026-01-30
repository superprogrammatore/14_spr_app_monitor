/**
 * Sezione Hero - Introduzione al Logging
 * 
 * Questa sezione spiega:
 * - Cos'è un log
 * - Perché è fondamentale per le applicazioni
 * - Come questa app ti aiuterà a capirlo
 */

import { motion } from 'framer-motion';
import { Terminal, Bug, Activity, Shield } from 'lucide-react';

const features = [
  {
    icon: Terminal,
    title: 'Cosa sono i Log',
    description: 'Messaggi registrati durante l\'esecuzione di un\'applicazione'
  },
  {
    icon: Bug,
    title: 'Debugging',
    description: 'Trova e risolvi errori analizzando la cronologia degli eventi'
  },
  {
    icon: Activity,
    title: 'Monitoraggio',
    description: 'Controlla la salute dell\'applicazione in tempo reale'
  },
  {
    icon: Shield,
    title: 'Sicurezza',
    description: 'Traccia accessi sospetti e comportamenti anomali'
  }
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: 'var(--gradient-glow)' }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-log-success animate-pulse-dot" />
            <span className="text-sm font-medium text-primary">
              Strumento Didattico Interattivo
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">App Monitor</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-8">
            Logging & Debugging
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Scopri perché i <span className="text-primary font-medium">log</span> sono 
            fondamentali per ogni applicazione. Impara a generarli, 
            strutturarli e utilizzarli per il <span className="text-log-error font-medium">debugging</span> e 
            il <span className="text-log-success font-medium">monitoraggio</span>.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="section-card group hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">Scorri per esplorare</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
