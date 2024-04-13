import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { formatDate } from "./utils/helpers";

const db = getFirestore();

export const fetchJournals = async (userId: string) => {
  const journalCollection = collection(db, "journals");
  const q = query(journalCollection, where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  const journals = querySnapshot.docs.map((doc) => doc.data());

  return journals;
};

export const createJournalEntry = async (
  user: any,
  entry: string
): Promise<void> => {
  try {
    const journalCollection = collection(db, "journals");

    const newJournalEntry = {
      userId: user.uid,
      entry: entry,
      createdAt: new Date().toISOString(),
    };

    await addDoc(journalCollection, newJournalEntry);
  } catch (error) {
    console.error("Error creating journal entry:", error);
  }
};

export const displayJournals = (journals: any[]) => {
  const journalList = document.getElementById("journal-entries");

  if (journalList) {
    journalList.innerHTML = journals
      .map(
        (journal) => `
      <div class="entry">
        <p>${journal.entry}</p>
        <p class="date">${formatDate(journal.createdAt)}</p>
      </div>
    `
      )
      .join("");
  }
};
