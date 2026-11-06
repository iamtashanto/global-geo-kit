import Link from "next/link";

const features = [
  ["🌍", "Countries, regions and cities", "250 countries, 5,000+ administrative regions and 150,000+ cities."],
  ["💰", "Currencies and money", "ISO 4217 metadata, symbols, decimal rules and amount formatting."],
  ["📞", "Phone and postal data", "Dial-code lookup, formatting and existence-based postal validation."],
  ["⏰", "Timezones", "IANA zones, current time, conversion, offsets and DST detection."],
  ["🗺️", "GeoJSON points", "Map-ready country, state and city Point FeatureCollections."],
  ["⚡", "Production-ready", "TypeScript, ESM, CJS, lazy loading, caching and tree-shaking."],
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "global-geo-kit",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: "https://globalgeokit.tashanto.com",
    description: "A TypeScript toolkit for global location data and utilities.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    codeRepository: "https://github.com/iamtashanto/global-geo-kit",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-slate-800 bg-[radial-gradient(circle_at_top,#172554,transparent_55%)]">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link href="/" className="text-xl font-bold tracking-tight">global<span className="text-cyan-400">-geo-kit</span></Link>
          <div className="flex gap-5 text-sm text-slate-300">
            <Link href="#features" className="hover:text-white">Features</Link>
            <a href="https://github.com/iamtashanto/global-geo-kit" className="hover:text-white">GitHub</a>
            <a href="https://www.npmjs.com/package/global-geo-kit" className="hover:text-white">npm</a>
          </div>
        </nav>
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-20">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">The global location toolkit</p>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">Every location primitive. One package.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">Build country selectors, address forms, checkout flows, dashboards and maps with one typed API for the world&apos;s location data.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="https://www.npmjs.com/package/global-geo-kit" className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300">Install global-geo-kit</a>
              <a href="https://github.com/iamtashanto/global-geo-kit#readme" className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-white hover:bg-slate-900">Read the docs</a>
            </div>
            <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/80 p-4 font-mono text-sm text-cyan-300">npm install global-geo-kit</div>
          </div>
        </div>
      </section>
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">One install, complete coverage</p><h2 className="mt-3 text-3xl font-bold text-white">Everything your location-aware product needs.</h2></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([icon, title, description]) => <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"><div className="text-3xl">{icon}</div><h3 className="mt-5 text-lg font-semibold text-white">{title}</h3><p className="mt-2 leading-7 text-slate-400">{description}</p></article>)}
        </div>
      </section>
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div><p className="font-mono text-sm text-cyan-400">import {"{"} searchGlobal {"}"} from &quot;global-geo-kit&quot;;</p><h2 className="mt-5 text-3xl font-bold text-white">A consistent API across every dataset.</h2><p className="mt-4 leading-7 text-slate-400">Lazy-loaded data, cached global search and strict TypeScript declarations keep your app fast without making your codebase fragmented.</p></div>
          <pre className="overflow-auto rounded-2xl border border-slate-700 bg-slate-950 p-6 text-sm leading-7 text-slate-300"><code>{`const results = await searchGlobal({\n  query: \"Dhaka\",\n  countryCode: \"BD\",\n  includePostcodes: true,\n});`}</code></pre>
        </div>
      </section>
      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-slate-500 sm:flex-row sm:justify-between"><span>global-geo-kit by TA Shanto</span><span>MIT wrapper · upstream data notices preserved</span></footer>
    </main>
  );
}
