export const firebaseErrorMessages: { [key: string]: string } = {
  // Errores de autenticación
  "auth/email-already-in-use": "Email already in use.",
  "auth/user-not-found": "User not found.",
  "auth/wrong-password": "Incorrect email addres or password.",
  "auth/invalid-email": "Incorrect email addres or password.",
  "auth/weak-password": "Password is too weak.",
  "auth/operation-not-allowed":
    "Operation not allowed. Please contact support.",
  "auth/too-many-requests": "Too many requests. Please try again later.",
  "auth/requires-recent-login":
    "Please log in again to complete this operation.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email but different sign-in credentials.",
  "auth/credential-already-in-use":
    "This credential is already associated with a different user account.",
  "auth/popup-blocked":
    "The popup was blocked by the browser. Please allow popups and try again.",
  "auth/popup-closed-by-user":
    "The popup was closed before completing the sign-in. Please try again.",
  "auth/unauthorized-domain":
    "The domain is not authorized for OAuth operations.",
  "auth/network-request-failed":
    "Network error. Please check your internet connection and try again.",
  "auth/internal-error": "An internal error occurred. Please try again later.",

  // Errores de Google Sign-In
  "auth/cancelled-popup-request":
    "Only one popup request is allowed at one time.",
  "auth/redirect-cancelled-by-user": "Redirect was cancelled by the user.",

  // Errores de la base de datos
  "database/permission-denied":
    "You don't have permission to access this data.",
  "database/unauthorized": "You are not authorized to perform this operation.",
  "database/network-error":
    "Network error. Please check your internet connection.",
  "database/invalid-data": "Invalid data. Please check your inputs.",
  "database/data-stale": "The data is stale. Please refresh and try again.",
  "database/unknown-error":
    "An unknown error occurred. Please try again later.",
  "database/disconnected":
    "The connection to the database was lost. Please check your network and try again.",
  "database/timeout": "The operation timed out. Please try again.",

  // Otros errores generales
  "unknown-error": "An unknown error occurred. Please try again later.",
};
