const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const logger = {
  // Solo registrar en desarrollo a menos que sea un error
  info: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`${colors.blue}[INFO]${colors.reset}`, ...args);
    }
  },
  
  // Registrar errores en todos los entornos
  error: (...args) => {
    console.error(`${colors.red}[ERROR]${colors.reset}`, ...args);
  },
  
  // Advertencias solo en desarrollo
  warn: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`${colors.yellow}[WARN]${colors.reset}`, ...args);
    }
  },
  
  // Debug solo en desarrollo
  debug: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`${colors.cyan}[DEBUG]${colors.reset}`, ...args);
    }
  },
  
  // Inicio de peticiones HTTP
  request: (req) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `${colors.green}[${req.method}]${colors.reset} ${req.path} ${colors.dim}${JSON.stringify(req.query)}${colors.reset}`
      );
    }
  }
};

export default logger;
