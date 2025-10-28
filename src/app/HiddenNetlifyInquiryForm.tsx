// Pure server component: hidden static form so Netlify can parse it at build time
export default function HiddenNetlifyInquiryForm() {
  return (
    <form
      id="hidden-netlify-form"
      name="inquiry"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      action="/thank-you"
      hidden
    >
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
      <input type="hidden" name="subject" value="Nová poptávka z klimatizacetomes.netlify.app" />
      <button type="submit">Send</button>
    </form>
  );
}
