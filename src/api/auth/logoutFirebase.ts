import { FirebaseAuth } from "../apiConfig";

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
