const getLogger = (domain: string, component: string) => {
  const context = `[${domain}:${component}]`;
  const logger = console;
  const params = (data?: object | string) => {
    if (!data) return;
    if (typeof data !== 'object') return { data };
    return data;
  };
  return {
    log: (message: string, messageContext?: object | string) => {
      return logger.log(`${context} ${message}`, params(messageContext));
    },
    info: (message: string, messageContext?: object | string) => {
      return logger.info(`${context} ${message}`, params(messageContext));
    },
    warn: (message: string, messageContext?: object | string) => {
      return logger.warn(`${context} ${message}`, params(messageContext));
    },
    error: (message: string, error?: Error) => {
      return logger.error(`${context} ${message}`, {}, error);
    },
  };
};

export default getLogger;
