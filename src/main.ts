import { getAuth } from "firebase/auth";
import "./style.css";
import { app } from "./utils/firebase.config";
import { handleLogin, handleRegister } from "./auth/auth";
import { createJournalEntry } from "./journal";
import { showSection } from "./utils/helpers";

const handleLogout = async (): Promise<void> => {
  try {
    await getAuth(app).signOut();
    showSection("login", false);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

const handleJournalSubmit = async (event: Event): Promise<void> => {
  event.preventDefault();

  const entryInput = document.getElementById(
    "journal-entry"
  ) as HTMLInputElement;

  const entry = entryInput.value;

  try {
    const user = getAuth(app).currentUser;

    if (user) {
      await createJournalEntry(user, entry);
    } else {
      console.log("User not logged in.");
    }
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      handleRegister(event);
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      handleLogin(event);
    });
  }

  const journalForm = document.getElementById("journal-form");
  if (journalForm) {
    journalForm.addEventListener("submit", handleJournalSubmit);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // ...

  const registerBtn = document.getElementById("register-btn");
  if (registerBtn) {
    registerBtn.addEventListener("click", () =>
      showSection("register", false)
    );
  }

  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () =>
      showSection("login", false)
    );
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      handleLogout();
      showSection("login", false);
    });
  }
});
