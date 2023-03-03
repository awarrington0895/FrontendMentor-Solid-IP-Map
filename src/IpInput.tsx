import { Component } from 'solid-js';
import { createForm, Form, Field, reset, zodForm } from '@modular-forms/solid';
import { z } from 'zod';

/*
Replace with built-in from zod when this PR is published to NPM:
https://github.com/colinhacks/zod/pull/2066/files
*/
const ipv4Regex =
  /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;

const schema = z.object({
  ip: z.string().regex(ipv4Regex, 'Please enter a valid ipv4 address'),
});

const IpInput: Component = () => {
  const ipForm = createForm<z.input<typeof schema>>({
    validate: zodForm(schema),
  });

  const updateIP = (form: { ip: string }) => {
    console.log('IP updated to: ', form.ip);
  };

  return (
    <Form of={ipForm} onSubmit={updateIP}>
      <Field of={ipForm} name="ip">
        {(field) => (
          <>
            <input
              class="border-2 rounded-lg mb-1"
              {...field.props}
              value={field.value || ''}
              type="text"
            />
            {field.error && <div class="text-red-500">{field.error}</div>}
          </>
        )}
      </Field>
      <input type="submit" />
    </Form>
  );
};

export default IpInput;
