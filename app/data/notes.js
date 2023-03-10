import fs from "fs/promises";

export async function getStoredNotes() {
  const rawFileContent = await fs.readFile("notes.json", { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export function storeNotes(notes) {
  return fs.writeFile("notes.json", JSON.stringify({ notes: notes || [] }));
}

export async function addNote(noteData) {
  const newNoteData = {
    id: new Date().getTime(),
    date: new Date().toISOString(),
    ...noteData,
  };

  const existingNotes = await getStoredNotes();

  const updatedNotes = existingNotes.concat(newNoteData);

  await storeNotes(updatedNotes);

  return updatedNotes;
}

export async function getNoteById(noteId) {
  const notes = await getStoredNotes();
  const note = notes.find((note) => note.id === noteId);
  return note;
}