import { test, vi, expect } from "vitest";
import { JSDOM } from "jsdom";
import { handleJournalSubmit } from "../events";

test("should handle empty input fields", async () => {
  const dom = new JSDOM(`
    <!DOCTYPE html>
   <section id="journal" class="hidden">
        <h2>Submit Journal</h2>
        <form id="journal-form">
          <label for="journal-entry">Journal Entry:</label><br />
          <textarea
            id="journal-entry"
            name="journal-entry"
            rows="4"
            cols="50"
            required
          ></textarea
          ><br />
          <input type="submit" value="Submit" />
        </form>
      </section>
  `);
  (global as any).document = dom.window.document;

  const eventMock = {
    preventDefault: vi.fn(),
    target: {
      elements: {
        email: { value: "" },
        password: { value: "" },
      },
    },
  } as unknown as Event;

  handleJournalSubmit(eventMock);

  const validationMessage = document.getElementById(
    "validation-message"
  );
  expect(validationMessage?.textContent).toBe(
    "Journal entry is required."
  );

  (global as any).document = undefined;
});
