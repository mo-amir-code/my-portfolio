// Privated Credentials
const APP_PORT = process.env.APP_PORT;
const PROF_EMAIL = process.env.PROF_EMAIL;
const PROF_EMAIL_PASS = process.env.PROF_EMAIL_PASS;
const BCRYPT_SALT_ROUND = Number.parseInt(
  process.env.BCRYPT_SALT_ROUND || "12"
);
const COOKIE_ROOT_DOMAIN = process.env.COOKIE_ROOT_DOMAIN;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const DB_URI = process.env.DB_URI!;
const COMPANY_NAME = process.env.COMPANY_NAME;
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN;
const ENVIRONMENT = process.env.ENVIRONMENT;

export {
  APP_PORT,
  PROF_EMAIL,
  PROF_EMAIL_PASS,
  BCRYPT_SALT_ROUND,
  COOKIE_ROOT_DOMAIN,
  JWT_SECRET_KEY,
  DB_URI,
  COMPANY_NAME,
  ENVIRONMENT,
  CLIENT_DOMAIN,
};

const BASE_DOMAIN_URL =
  ENVIRONMENT === "DEVELOPMENT"
    ? "http:localhost:3000"
    : "https:" + CLIENT_DOMAIN + "/";

export {
    BASE_DOMAIN_URL
}