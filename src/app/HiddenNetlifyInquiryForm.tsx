// This hidden form ensures Netlify detects the inquiry form for submissions from JS-rendered modals.
import * as React from 'react';

export default function HiddenNetlifyInquiryForm() {
  return (
    <form name="inquiry" data-netlify="true" hidden>
      <input type="text" name="name" />
      <input type="text" name="contact" />
      <textarea name="message" />
    </form>
  );
}
