/**
 * Schermata di Login
 * 
 * Questa schermata richiede l'inserimento di un codice di accesso
 * per accedere all'applicazione didattica.
 * 
 * Il codice viene verificato confrontando il suo hash SHA-256
 * con l'hash memorizzato nel codice.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, KeyRound, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import superProgrammatoreLogo from '@/assets/super-programmatore-logo.png';

interface LoginScreenProps {
  onLogin: (code: string) => Promise<boolean>;
  error: string | null;
  onClearError: () => void;
}

export function LoginScreen({ onLogin, error, onClearError }: LoginScreenProps) {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await onLogin(code);
    
    setIsLoading(false);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    if (error) {
      onClearError();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header con logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-4"
          >
            <img 
              src={superProgrammatoreLogo} 
              alt="Super Programmatore" 
              className="w-48 h-auto mx-auto"
            />
          </motion.div>
          
          <h1 className="text-3xl font-bold mb-2">
            App Monitor
          </h1>
          <p className="text-muted-foreground">
            Logging & Debugging - Strumento Didattico
          </p>
        </div>

        {/* Card di login */}
        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <Lock className="w-5 h-5 text-primary" />
              Accesso Richiesto
            </CardTitle>
            <CardDescription>
              Inserisci il codice di accesso per continuare
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input del codice */}
              <div className="space-y-2">
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showCode ? 'text' : 'password'}
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Codice di accesso"
                    className="pl-10 pr-10 h-12 text-base"
                    autoComplete="off"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showCode ? 'Nascondi codice' : 'Mostra codice'}
                  >
                    {showCode ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Messaggio di errore */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Pulsante di login */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={isLoading || !code.trim()}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Accedi
                  </>
                )}
              </Button>
            </form>

          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Strumento didattico per imparare il logging
        </p>
      </motion.div>
    </div>
  );
}
