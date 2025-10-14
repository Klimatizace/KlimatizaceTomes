// This hidden form ensures Netlify detects the inquiry form for submissions from JS-rendered modals.
import * as React from 'react';

export default function HiddenNetlifyInquiryForm() {
  return (
    <form name="inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="hidden" name="form-name" value="inquiry" />
      <p className="hidden">
        <label>
          Don't fill this out if you're human:
          {' '}
          <input name="bot-field" type="text" />
        </label>
      </p>
      <input type="text" name="name" />
      <input type="text" name="contact" />
      <textarea name="message" />
    </form>
  );
}
