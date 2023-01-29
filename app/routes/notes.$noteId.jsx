import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getNoteById } from "../data/notes"
import noteDetailsStyles from '~/styles/note-details.css';

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: noteDetailsStyles
        }
    ]
}

export function meta({data}) {
    return {
        title: data.title
    }
}

export async function loader ({ params }) {
    const noteId = parseInt(params.noteId);
    const note = await getNoteById(noteId);
    
    if (!note) {
        throw json(
            { message: `Note not found with id ${noteId}` },
            { status: 404, statusText: 'NotFound' }
        )
    }
    return note;
}

export default function NoteDetail () {
    const note = useLoaderData();

    return (
        <main id="note-details">
            <header>
                <nav>
                    <Link to="/notes">Back to all Notes</Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id="note-details-content">
                {note.content}
            </p>
        </main>
    )
};