// Lokalizovaná testovací stránka pro Netlify Forms
export const metadata = { title: 'Test Form' };

export default function FormTestPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="mb-4 text-2xl font-bold">Test Form (Netlify, [locale])</h1>
      <p className="mb-6 text-sm text-slate-500">Tento formulář je statický a měl by být zachycen Netlify. Odesláním otestujete, že sběr funguje.</p>
      <form name="inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="space-y-4">
        <input type="hidden" name="form-name" value="inquiry" />
        <p className="hidden">
          <label>
            Don&apos;t fill this out if you&apos;re human:
            {' '}
            <input name="bot-field" type="text" />
          </label>
        </p>
        <div>
          <label className="mb-1 block text-sm" htmlFor="t-name">Jméno</label>
          <input id="t-name" name="name" type="text" required className="w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm" htmlFor="t-contact">Kontakt</label>
          <input id="t-contact" name="contact" type="text" required className="w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm" htmlFor="t-message">Zpráva</label>
          <textarea id="t-message" name="message" rows={4} className="w-full rounded border px-3 py-2" />
        </div>
        <button type="submit" className="rounded bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-500">Odeslat</button>
      </form>
    </main>
  );
}
