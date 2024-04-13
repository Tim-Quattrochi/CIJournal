import { getAuth } from "firebase/auth";
import { app } from "./utils/firebase.config";
import { showSection } from "./utils/helpers";
import { createJournalEntry } from "./journal";
import { handleRegister, handleLogin } from "./auth/auth";

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

interface EventMap {
  [id: string]: (event: Event) => void;
}

export function setUpEventListeners(): void {
  const formEventMap: EventMap = {
    "register-form": handleRegister,
    "login-form": handleLogin,
    "journal-form": handleJournalSubmit,
  };

  const buttonEventMap: EventMap = {
    "register-btn": () => showSection("register", false),
    "login-btn": () => showSection("login", false),
    "logout-btn": () => {
      handleLogout();
      showSection("login", false);
    },
  };

  Object.entries(formEventMap).forEach(([id, handler]) => {
    const form = document.getElementById(id) as HTMLFormElement;
    if (form) {
      form.addEventListener("submit", (event: Event) =>
        handler(event)
      );
    }
  });

  Object.entries(buttonEventMap).forEach(([id, handler]) => {
    const button = document.getElementById(id) as HTMLButtonElement;
    if (button) {
      button.addEventListener("click", handler);
    }
  });
}
