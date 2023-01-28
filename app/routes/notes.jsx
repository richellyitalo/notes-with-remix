import { redirect } from '@remix-run/node';
import { getStoredNotes, storeNotes, addNote } from '../../data/notes';
import NewNote, { links as newNoteLinks } from '~/components/notes/NewNote';

export default function NotesPage () {
    return (
        <div>
            <NewNote />
        </div>
    )
}


export function links () {
    return [
        ...newNoteLinks(),
    ]
}

export async function action (params) {
    const formData = await params.request.formData();

    // const noteData = {
    //     title: formData.get('title'),
    //     content: formData.get('content'),
    // }
    // same thing when use 'Object.fromEntries()'
    const noteData = Object.fromEntries(formData);
    noteData.id = '3333'

    // add validations
    await addNote(noteData);

    return redirect('/');
}