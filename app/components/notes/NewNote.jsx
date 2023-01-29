import styles from './NewNote.css';
import {
  Form,
  useActionData,
  useNavigation
} from '@remix-run/react';
import { useEffect, useRef } from 'react';

export default function NewNote () {
  const navigation = useNavigation();
  const data = useActionData();

  const isAdding =
    navigation.state === 'submitting' &&
    !!navigation.formAction;

  const formRef = useRef();
  const firstInput = useRef();

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
      firstInput.current?.focus();
    }
  }, [isAdding])

  return (
    <Form replace ref={formRef} method='post' id='note-form' action='/notes'>
      {data?.messages &&
        data.messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}

      <p>
        <label htmlFor='title'>Title</label>
        <input ref={firstInput} type='text' id='title' name='title' required />
      </p>
      <p>
        <label htmlFor='content'>Content</label>
        <textarea id='content' name='content' rows='5' required />
      </p>
      <div className='form-actions'>
        <button disabled={isAdding}>
          {isAdding ? '..Adding Note' : 'Add Note'}
        </button>
      </div>
    </Form>
  );
}

export function links () {
  return [{ rel: 'stylesheet', href: styles }];
}
