import styles from "./NewNote.css";
import { Form, useActionData, useNavigation } from "@remix-run/react";

export default function NewNote () {
  const { state } = useNavigation()
  const isSubmitting = state === 'submitting';
  const data = useActionData();

  return (
    <Form method="post" id="note-form" action="/notes">
    
      {data?.messages &&
        (data.messages.map((message, index) => <p key={index}>{message}</p>))
      }

      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button
          disabled={isSubmitting}
        >
          {isSubmitting ? '..Adding Note' : 'Add Note'}
        </button>
      </div>
    </Form>
  );
}

export function links () {
  return [{ rel: "stylesheet", href: styles }];
}
