import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../utils/firebase.config";
import { showSection } from "../utils/helpers";
import { fetchJournals, displayJournals } from "../journal";

const auth = getAuth(app);

export const handleRegister = async (event: Event): Promise<void> => {
  event.preventDefault();

  const emailInput = document.getElementById(
    "email"
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "password"
  ) as HTMLInputElement;

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(app),
      email,
      password
    );
    const user = userCredential.user;

    showSection("journal", true);
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

export const handleLogin = async (event: Event): Promise<void> => {
  event.preventDefault();

  const emailInput = document.getElementById(
    "login-email"
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "login-password"
  ) as HTMLInputElement;

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(
      getAuth(app),
      email,
      password
    );
    const user = userCredential.user;

    showSection("journal", true);

    const journals = await fetchJournals(user.uid);
    console.log(journals);
    displayJournals(journals);
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    showSection("journal", true);

    const journals = await fetchJournals(user.uid);
    console.log(journals);
    displayJournals(journals);
  } else {
    showSection("login", true);
    showSection("journal", false);
    showSection("journal-form", false);
  }
});
