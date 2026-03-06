// ─────────────────────────────────────────────
// PRIMITIVE CONSTANTS
// ─────────────────────────────────────────────

export const APP_NAME = "SkillCheck Pro";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION = "Software Development Assessment Portal";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
export const API_TIMEOUT = 30000;

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER: "user",
  THEME: "theme",
};

export const SESSION_STORAGE_KEYS = {
  REDIRECT_URL: "redirect_url",
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

export const DATE_FORMATS = {
  DISPLAY: "DD MMM YYYY",
  DISPLAY_WITH_TIME: "DD MMM YYYY, hh:mm A",
  API: "YYYY-MM-DD",
};

export const DEBOUNCE_DELAY = 300;
export const TOAST_DURATION = 4000;