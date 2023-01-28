import { json, redirect } from "@remix-run/node";
import { getStoredNotes, addNote } from "../data/notes";
import NewNote, { links as newNoteLinks } from "~/components/notes/NewNote";
import NoteList, { links as noteListLinks } from "~/components/notes/NoteList";
import axios from "axios";
import { useLoaderData } from "@remix-run/react";

export default function NotesPage () {
  const notes = useLoaderData();

  return (
    <div>
      <NewNote />
      <NoteList notes={notes} />
    </div>
  );
}

export async function action (data) {
  const formData = await data.request.formData();

  // Simulate delay
  // await new Promise((resolve, reject) => {
  //   setTimeout(() => resolve(), 2000);
  // })

  // const noteData = {
  //     title: formData.get('title'),
  //     content: formData.get('content'),
  // }
  // same thing when use 'Object.fromEntries()'
  let messages = [];
  const noteData = Object.fromEntries(formData);

  if (noteData.title.trim().length < 5) {
    messages.push('Title: Provide at least a title with 5 characters.');
  }

  if (noteData.content.trim().length < 5) {
    messages.push('Content: Provide at least a title with 5 characters.');
  }

  if (messages.length > 0) {
    return { messages };
  }

  // add validations
  await addNote(noteData);

  return redirect("/notes");
}

export async function loader () {
  const notes = await getStoredNotes();

  // Simulate loading
  // await new Promise((resolve, reject) => {
  //   return setTimeout(() => {
  //     resolve();
  //   }, 2000);
  // });

  return json(notes);
  // const dataAxios = axios.get('https://jsonplaceholder.typicode.com/users');
}

export function links () {
  return [...newNoteLinks(), ...noteListLinks()];
}
