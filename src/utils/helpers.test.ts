import { test, expect } from "vitest";
import { JSDOM } from "jsdom";
import { showSection } from "./helpers";

test("show section", async () => {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <section id="register" class="hidden"></section>
    <section id="login" class="hidden"></section>
    <section id="journal" class="hidden"></section>
    <button id="register-btn" class="hidden"></button>
    <button id="login-btn" class="hidden"></button>
    <button id="logout-btn" class="hidden"></button>
    <button id="journal-btn" class="hidden"></button>
    <div id="journal-entries" class="hidden"></div>
  `);
  (global as any).document = dom.window.document;

  showSection("journal", true);
  expect(
    document.getElementById("journal")?.classList.contains("hidden")
  ).toBe(false);
  expect(
    document.getElementById("register")?.classList.contains("hidden")
  ).toBe(true);
  expect(
    document.getElementById("login")?.classList.contains("hidden")
  ).toBe(true);
  expect(
    document
      .getElementById("logout-btn")
      ?.classList.contains("hidden")
  ).toBe(false);
  expect(
    document
      .getElementById("journal-btn")
      ?.classList.contains("hidden")
  ).toBe(false);

  // test when the isAuthenticated is false
  showSection("login", false);
  expect(
    document.getElementById("login")?.classList.contains("hidden")
  ).toBe(false);
  expect(
    document.getElementById("register")?.classList.contains("hidden")
  ).toBe(true);
  expect(
    document.getElementById("journal")?.classList.contains("hidden")
  ).toBe(true);
  expect(
    document
      .getElementById("logout-btn")
      ?.classList.contains("hidden")
  ).toBe(true);
  expect(
    document
      .getElementById("journal-btn")
      ?.classList.contains("hidden")
  ).toBe(true);

  // after test
  (global as any).document = undefined;
});

test("it shows the journal section after login click", async () => {
  const dom = new JSDOM(`
        <!DOCTYPE html>
        <section id="register" class="hidden"></section>
        <section id="login" class="hidden"></section>
        <section id="journal" class="hidden"></section>
        <button id="register-btn" class="hidden"></button>
        <button id="login-btn" class="hidden"></button>
        <button id="logout-btn" class="hidden"></button>
        <button id="journal-btn" class="hidden"></button>
        <div id="journal-entries" class="hidden"></div>
    `);
  (global as any).document = dom.window.document;

  const loginBtn = document.getElementById(
    "login-btn"
  ) as HTMLButtonElement;
  loginBtn.addEventListener("click", () => {
    showSection("journal", true);
  });
  loginBtn.click();
  expect(
    document.getElementById("journal")?.classList.contains("hidden")
  ).toBe(false);
});
