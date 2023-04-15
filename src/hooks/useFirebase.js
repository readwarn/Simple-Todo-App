import { db, set, ref, get } from "../constants/firebase-todo-app-config";

const useFirebase = () => ({ db, set, ref, get });

export default useFirebase;
