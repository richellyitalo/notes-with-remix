import { json, redirect } from "@remix-run/node";
import { getStoredNotes, addNote } from "../data/notes";
import NewNote, { links as newNoteLinks } from "~/components/notes/NewNote";
import NoteList, { links as noteListLinks } from "~/components/notes/NoteList";
import { useCatch, useLoaderData } from "@remix-run/react";

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
  if (!notes || notes.length === 0) {
    throw json(
      { message: 'Sorry! No notes found here yet.' },
      { status: 404, statusText: 'Not Found' });
  }


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
  return [
    ...newNoteLinks(),
    ...noteListLinks()
  ];
}

export function ErrorBoundary ({ error }) {
  return (
    <div>
      <div className="error">
        <p>Sorry! The following error occurred in NoteList page:</p>
        {error.message}
      </div>
    </div>
  )
}

export function CatchBoundary () {
  const dataCatch = useCatch();
  const message = dataCatch?.message || 'Data not found';
  return (
    <main>
      <NewNote />
      <div className="info-message">
        {message}
      </div>
      {/* <code>{JSON.stringify(dataCatch, null, 2)}</code> */}
    </main>
  )
}