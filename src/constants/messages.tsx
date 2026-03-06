
export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Logged in successfully.",
  LOGIN_FAILED: "Invalid credentials. Please try again.",
  LOGOUT_SUCCESS: "You have been logged out.",
  SESSION_EXPIRED: "Your session has expired. Please log in again.",
  UNAUTHORIZED: "You are not authorized to view this page.",
};

export const FORM_MESSAGES = {
  REQUIRED: "This field is required.",
  INVALID_EMAIL: "Please enter a valid email address.",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters.",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match.",
};

export const API_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
  NOT_FOUND: "The requested resource was not found.",
  TIMEOUT: "Request timed out. Please try again.",
};

export const SUCCESS_MESSAGES = {
  SAVED: "Changes saved successfully.",
  DELETED: "Record deleted successfully.",
  UPDATED: "Record updated successfully.",
  CREATED: "Record created successfully.",
};

export const ERROR_MESSAGES = {
  GENERIC: "An unexpected error occurred.",
  PERMISSION_DENIED: "You do not have permission to perform this action.",
};


export const USER_MESSAGES = {
  DELETE_CONFIRM_TITLE: "Delete User",
  DELETE_CONFIRM_DESC: (name: string) =>
    `Are you sure you want to delete "${name}"? This action cannot be undone and will permanently remove the user and all associated data.`,
  DELETE_SUCCESS: "User deleted successfully.",
  CREATE_SUCCESS: "User created successfully.",
  UPDATE_SUCCESS: "User updated successfully.",
  SYNC_SUCCESS: "Data synced successfully.",
  IMPORT_SUCCESS: "Users imported successfully.",
};

export const ROLE_MESSAGES = {
  DELETE_CONFIRM_TITLE: "Delete Custom Role",
  DELETE_CONFIRM_DESC:  (name: string) =>
    `Are you sure you want to delete the role "${name}"? All employees assigned to this role will lose its permissions.`,
  DELETE_SUCCESS:    "Custom role deleted.",
  CREATE_SUCCESS:    "Custom role created and assigned.",
  UPDATE_SUCCESS:    "Custom role updated.",
  ROLE_EXISTS:       (name: string) =>
    `A role named "${name}" already exists. Please choose a different name.`,
  STEP1_INCOMPLETE:  "Please enter a role name to continue.",
  STEP2_INCOMPLETE:  "Please select at least one employee to continue.",
  STEP3_INCOMPLETE:  "Please select at least one permission to continue.",
};