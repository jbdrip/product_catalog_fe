import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { service: "netlify-graphql" },
  transports: [
    // Solo consola para Netlify
    new transports.Console({ format: format.simple() })
  ],
});

export default logger;
