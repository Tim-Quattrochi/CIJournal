export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const showSection = (
  sectionId: string,
  isAuthenticated: boolean
) => {
  const sections = ["register", "login", "journal"];
  sections.forEach((section) => {
    const el = document.getElementById(section);

    if (el) {
      if (section === sectionId) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
  });

  const registerBtn = document.getElementById("register-btn");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const journalBtn = document.getElementById("journal-btn");
  const journalEntries = document.getElementById("journal-entries");

  if (isAuthenticated) {
    registerBtn?.classList.add("hidden");
    loginBtn?.classList.add("hidden");
    logoutBtn?.classList.remove("hidden");
    journalBtn?.classList.remove("hidden");
  } else {
    registerBtn?.classList.remove("hidden");
    loginBtn?.classList.remove("hidden");
    logoutBtn?.classList.add("hidden");
    journalBtn?.classList.add("hidden");
    journalEntries?.classList.add("hidden");
  }
};
