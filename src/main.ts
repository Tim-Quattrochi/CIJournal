
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header>
      <h1>Basic Journal</h1>
    </header>
    <main>
      <form id="journal-form">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" required />
        <label for="content">Content</label>
        <textarea id="content" name="content" rows="5" cols="40" autocomplete="off" form="journal-form"required></textarea>
        <button>Add Entry</button>
      </form>
`;


