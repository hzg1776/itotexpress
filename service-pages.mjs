// Local authoring helper. Reuses the homepage shell; writes static HTML only.
// Run after changing shared navigation, contact previews or footer content.
import {readFile, writeFile} from 'node:fs/promises';

const pages = [
  {
    file: 'website-development.html',
    label: 'Website development',
    title: 'Website Creation & Development in NC | IT/OT Express LLC',
    description: 'Business website development, redesigns, contact forms and mobile layouts. Based in Holly Springs, serving North Carolina.',
    heading: 'Business website development',
    introduction: 'Your website should help customers understand your business and get in touch. We create new sites and improve existing ones, from the wording and layout to navigation and contact forms.',
    takeaway: 'A new or redesigned website with the agreed pages, features and instructions for keeping it up to date.',
    start: ['A website that fits your business', 'We start with your customers and what they need to find. Together, we choose the pages and features that belong on your site and plan how you will keep it current.'],
    interest: 'website',
    cta: 'Discuss your website',
    sectionHeading: 'Website services',
    sectionIntro: 'The project can cover a new website, a redesign or improvements to specific pages and features.',
    topics: [
      ['New business websites', 'A place for customers to learn about your services, find business information and contact you.'],
      ['Website redesigns', 'Updated layouts, clearer wording and easier navigation across phones, tablets and computers.'],
      ['Contact forms', 'Customer inquiries sent to your chosen inbox, with the details you need to follow up.']
    ],
    preparationHeading: 'Information to provide',
    preparation: [
      'A short description of your business and customers',
      'Your current website address, if you have one',
      'The pages or features you need',
      'Any logo, photos or wording you have permission to use'
    ],
    preparationNote: 'Content preparation and tool selection can be included in the project scope.',
    outputHeading: 'Review and handover',
    output: 'You review the pages and wording before launch. We check the agreed links, forms and layouts on different screen sizes. The project also defines who owns and manages the website, where it will be hosted, and how future updates will be handled.',
    faqs: [
      ['Can you improve a website we already have?', 'Yes. We can discuss changes to its appearance, wording, navigation or features. We first check how the site was built and what can be changed.'],
      ['Will the website work on phones?', 'We design pages to adjust to smaller screens and check the agreed layouts and controls at phone, tablet and desktop sizes.'],
      ['Can visitors contact us through the website?', 'Yes. A contact form can collect the information you need and send inquiries to an agreed inbox or submission list. We check the complete message route before launch.'],
      ['What are a domain name and hosting?', 'A domain name is your website address. Hosting is the service that keeps the website available online. We discuss who will manage these and any ongoing costs before choosing them.'],
      ['Are future changes included?', 'We agree on any updates, maintenance or training separately so you know who will look after the site after launch.']
    ],
    related: ['technical-documentation.html', 'ai-analysis.html']
  },
  {
    file: 'network-audits.html',
    label: 'Network audits',
    title: 'Network Audits & Wi-Fi Reviews in NC | IT/OT Express LLC',
    description: 'Network audits, Wi-Fi troubleshooting, and network, rack and cabling drawings for North Carolina businesses. Based in Holly Springs, serving Wake County and the Triangle.',
    heading: 'Network audits and Wi-Fi reviews',
    introduction: 'Slow connections and unreliable Wi-Fi interrupt everyday work. We investigate your network setup and reported problems, then explain the findings and possible next steps.',
    takeaway: 'A findings report, network or equipment drawings, and recommended actions, as specified in the project scope.',
    start: ['Understanding the problem', 'We begin with what your team is experiencing, where it happens and what has changed. That helps us focus the review on the equipment and connections involved.'],
    interest: 'network',
    cta: 'Discuss a network audit',
    sectionHeading: 'How we can help',
    sectionIntro: 'The review can focus on a repeated problem, missing records or an upcoming change, such as moving to a new office.',
    topics: [
      ['Network setup', 'We review your equipment, connections and existing records to understand how your network fits together.'],
      ['Wi-Fi and connections', 'We investigate dead zones, dropped connections and slow access, focusing on the areas and devices where you experience problems.'],
      ['Equipment and connection drawings', 'Network diagrams, rack layouts and cable records make your setup easier to understand and maintain.']
    ],
    preparationHeading: 'Information to provide',
    preparation: [
      'Where the issue happens and who is affected',
      'When it started and whether anything changed beforehand',
      'Existing diagrams, equipment lists or troubleshooting notes',
      'Any planned move, expansion or equipment replacement'
    ],
    preparationNote: 'You do not need complete records to discuss the work. Missing documentation can be part of the scope.',
    outputHeading: 'Findings and recommendations',
    output: 'The agreed report and drawings record findings, unresolved questions and recommended actions. Repairs, equipment replacement and configuration changes are scoped separately.',
    extra: '<section id="industrial-scope" class="service-block" aria-labelledby="industrial-heading" tabindex="-1"><p class="eyebrow">OFFICE + INDUSTRIAL NETWORKS</p><h2 id="industrial-heading">Understand your IT and OT connections</h2><p>For shops, plants and warehouses, the review can include agreed PLCs, HMIs, cameras and other networked equipment, alongside the office network.</p><div class="scope-grid"><article><h3>Agree on the equipment</h3><p>Define which devices, areas and records are in scope. Record access limits and anything that cannot be verified.</p></article><article><h3>Review the connections</h3><p>Document how office and machine networks connect and identify separation questions for your team and vendors.</p></article><article><h3>Hand over the findings</h3><p>Receive drawings, evidence and open questions. Scanning, configuration changes and work that could affect production require separate planning and authorization.</p></article></div></section>',

    faqs: [
      ['What is the difference between a network audit and troubleshooting?', 'A network audit is a review of your setup and records. Troubleshooting looks for the cause of a specific problem, such as dropped connections. A project can include both if we agree on that before starting.'],
      ['Can you review Wi-Fi without replacing all our equipment?', 'A Wi-Fi review can begin with the existing setup and the problems being reported. Equipment replacement is a possible recommendation, not an assumption made before the review.'],
      ['Do we need a current network diagram?', 'No. Existing notes and diagrams are useful, but creating or updating network documentation can be included in the work. Start by identifying which records you already have and which are missing.'],
      ['Does a network audit certify our security or compliance?', 'No. This review does not certify that your systems are secure or that they meet a particular law or standard. Any security checks need to be agreed separately.']
    ],
    related: ['technical-documentation.html', 'ai-analysis.html']
  },
  {
    file: 'technical-documentation.html',
    label: 'Technical documentation',
    title: 'IT Documentation Services in NC | IT/OT Express LLC',
    description: 'Network and rack drawings, equipment lists, operating procedures and handover documents. Based in Holly Springs, serving North Carolina businesses.',
    heading: 'Technical documentation',
    introduction: 'When system knowledge is scattered across old files and conversations, routine work takes longer. We turn those records into organized diagrams, equipment lists and instructions your team can use.',
    takeaway: 'Drawings, equipment lists, procedures and handover notes in the agreed file formats.',
    start: ['Documents your team can use', 'We organize the information around the people who need it, whether they are troubleshooting a connection, maintaining equipment or learning a routine task.'],
    interest: 'documentation',
    cta: 'Discuss a documentation project',
    sectionHeading: 'Document types',
    sectionIntro: 'Projects can include new documents, revisions to existing records or both.',
    topics: [
      ['Equipment and connection drawings', 'Diagrams showing how your network connects, where equipment sits and how cabling is arranged.'],
      ['Equipment lists and technical guides', 'Organized equipment and software records, with guidance for the people who use or maintain them.'],
      ['Step-by-step instructions and handover notes', 'Written procedures for routine tasks and staff handovers. Training can also help your team put the documents to use.']
    ],
    preparationHeading: 'Existing records and requirements',
    preparation: [
      'Existing diagrams, spreadsheets, notes or vendor documentation',
      'The systems or processes that need attention first',
      'Who will use the documents and what they need to do',
      'Known gaps, outdated records or conflicting instructions'
    ],
    preparationNote: 'The first discussion can establish which material needs updating, which needs checking and which needs to be created.',
    outputHeading: 'Document review and handover',
    output: 'You receive the completed documents, revision details and a clear record of anything that still needs checking. We also discuss who will maintain the files and when they will need updating.',
    faqs: [
      ['Can you work from scattered or outdated notes?', 'Yes. Documentation cleanup can start with existing notes, diagrams and files. The work includes identifying gaps and deciding what needs to be checked before an updated document is treated as current.'],
      ['What is the difference between a network diagram and a rack drawing?', 'A network diagram shows how your equipment connects. A rack drawing shows where each item sits in an equipment cabinet. Cable records show which cable connects each device or location.'],
      ['Can you create documentation when none exists?', 'Yes. Creating new documentation is part of the service. The project scope should identify the systems to document and how the information will be collected and checked.'],
      ['Does this include industrial electrical or control drawings?', 'Drawing services cover network, rack and cabling documentation. They do not include industrial electrical or control drawings.'],
      ['Can documentation be used for staff training?', 'Yes. Operating procedures and technical guides can support onboarding and staff training. Agree on the audience and the tasks people need to learn so the material has the right level of detail.']
    ],
    related: ['network-audits.html', 'ai-analysis.html']
  },
  {
    file: 'ai-analysis.html',
    label: 'AI & automation',
    title: 'AI Analysis & Consulting in NC | IT/OT Express LLC',
    description: 'AI assessments covering workflows, model and software options, hardware requirements, costs, privacy and evaluation criteria. Serving North Carolina.',
    heading: 'Practical AI, from assessment to a scoped prototype',
    introduction: 'Find a useful starting point for a document assistant, custom agent or routine workflow. We compare approaches and define how to test the results before you commit to a larger system.',
    takeaway: 'A written assessment of requirements and options, with recommendations and a trial scope where appropriate.',
    start: ['Start with the work you want to improve', 'We look at how the task is handled today and what a useful improvement would mean for your team. That gives us a basis for comparing options and checking whether the results are good enough.'],
    interest: 'ai',
    cta: 'Discuss an AI project',
    sectionHeading: 'What we look at',
    sectionIntro: 'The assessment covers the workflow, available data, integration requirements and evaluation method. Rule-based automation can be considered alongside AI.',
    topics: [
      ['Workflow and oversight', 'How your team does the work, which exceptions matter and where someone needs to check or approve the results.'],
      ['Your information and current tools', 'The information available, where it is stored and how an AI tool could work with your existing software.'],
      ['Model evaluation and hardware', 'Compare models on representative tasks, including answer quality, response time and cost. Assess hardware sizing and local or cloud architecture against your requirements.']
    ],
    preparationHeading: 'Information to provide',
    preparation: [
      'A description of the task and how it is handled today',
      'The applications and types of information involved',
      'What a useful result would look like and how you would check it',
      'Budget, privacy, timing or hardware constraints'
    ],
    preparationNote: 'Product selection and hardware requirements are part of the assessment; purchases are not required to discuss the project.',
    outputHeading: 'Assessment report and trial scope',
    output: 'Depending on the agreed scope, the report documents requirements, data gaps, software and hardware options, estimated costs and recommendations. A proposed trial specifies test cases, evaluation criteria and approval points. Building or deploying a system is separate work.',
    extra: '<section class="service-block" aria-labelledby="use-cases-heading"><h2 id="use-cases-heading">Start with one useful workflow</h2><div class="scope-grid"><article><h3>Document assistants</h3><p>Find information in approved manuals and procedures, show the source and flag missing answers.</p></article><article><h3>Staff guidance and reporting</h3><p>Help teams find procedures, prepare routine reports or turn existing knowledge into training material.</p></article><article><h3>Custom agents and automation</h3><p>Scope repetitive order or shipping-document tasks, with clear permissions, exception handling and human approval.</p></article></div><h3 class="prototype-heading">Then test a small prototype</h3><p>A separately scoped build can test the chosen workflow against agreed examples and difficult cases. The handover records results, limitations, running costs and the requirements for any wider rollout.</p><a class="arrow-link" href="samples.html#lookup-example">Try the fictional document lookup example &rarr;</a></section>',
    faqs: [
      ['Do we need to choose an AI tool first?', 'No. We can compare the tools and equipment for you. Start with the task, the information it uses and any limits on budget or privacy.'],
      ['Can we compare AI on our computers with online services?', 'Yes. We can compare tools that run on your equipment with services accessed online. The review considers the task, privacy, equipment and ongoing costs.'],
      ['How do we decide whether AI is a good fit?', 'Look at the task, the information available and how someone would check the results. We consider mistakes, cost and how the tool fits into your work. A simpler software change may be a better choice.'],
      ['Does an AI assessment include building the system?', 'No. The review helps you decide what to do. Building and testing a system is separate work with its own agreed price, schedule and responsibilities.']
    ],
    related: ['network-audits.html', 'technical-documentation.html']
  }
];

const directory = new URL('./dist/', import.meta.url);
const home = await readFile(new URL('index.html', directory), 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const match = expression => {
  const result = home.match(expression)?.[0];
  if (!result) throw new Error(`Shared homepage section missing: ${expression}`);
  return result;
};
const header = match(/<header class="site-header">[\s\S]*?<\/header>/)
  .replace('href="#main"', 'href="index.html"')
  .replace('href="#services"', 'href="index.html#services"')
  .replace('href="#ai"', 'href="index.html#ai"')
  .replace('href="#approach"', 'href="index.html#approach"')
  .replace('href="#about"', 'href="index.html#about"');
const contact = match(/<section id="contact"[\s\S]*?<\/section>/);
const footer = match(/<footer class="site-footer">[\s\S]*?<\/footer>/).replace('href="#main"', 'href="index.html"');
const baseHead = home.slice(0, home.indexOf('<body>')).replace(/\s*<script type="application\/ld\+json" id="site-name-schema">[\s\S]*?<\/script>/, '');

for (const page of pages) {
  const schema = {
    '@context': 'https://schema.org', '@type': 'Service', name: page.label,
    serviceType: page.label, description: page.introduction,
    provider: {'@type':'Organization', name:'IT/OT Express LLC'},
    areaServed: {'@type':'State', name:'North Carolina'}
  };
  const head = baseHead
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="https://itotexpress.com/${page.file}">`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="https://itotexpress.com/${page.file}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escape(page.description)}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escape(page.title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escape(page.description)}">`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`);
  const related = page.related.map(file => pages.find(other => other.file === file));
  const html = `${head}<body class="service-page" data-service-interest="${page.interest}">
  <a class="skip-link" href="#main">Skip to content</a>
  ${header}
  <main id="main" tabindex="-1">
    <section class="service-hero" aria-labelledby="service-heading">
      <div class="wrap">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">${escape(page.label)}</span></nav>
        <div class="service-hero-layout">
          <div><p class="eyebrow">HOLLY SPRINGS · SERVING NORTH CAROLINA</p>
          <h1 id="service-heading">${escape(page.heading)}</h1>
          <p class="service-introduction">${escape(page.introduction)}</p>
          <div class="service-takeaway"><h2>What you receive</h2><p>${escape(page.takeaway)}</p></div>
          <a class="button button-bright" href="#contact" data-interest="${page.interest}">${escape(page.cta)}</a></div>
          <nav class="page-contents" aria-label="On this page"><span>On this page</span><a href="#scope">${page.interest==='website'?'What we can build':'What we review'}</a><a href="#preparation">What to prepare</a><a href="#outputs">What you receive</a><a href="#questions">Questions & answers</a></nav>
        </div>
      </div>
    </section>
    <div class="wrap service-body">
      <section class="starting-project" aria-labelledby="starting-heading"><div><h2 id="starting-heading">${escape(page.start[0])}</h2></div><div><p>${escape(page.start[1])}</p>${page.interest==='website'?'':`<a href="samples.html${page.interest==='ai'?'#lookup-example':page.interest==='documentation'?'#handover-example':'#network-example'}">See a sample</a>`}</div></section>
      <section id="scope" class="service-block" aria-labelledby="scope-heading" tabindex="-1">
        <h2 id="scope-heading">${escape(page.sectionHeading)}</h2>
        <p class="section-intro">${escape(page.sectionIntro)}</p>
        <div class="scope-grid">${page.topics.map(([heading, text]) => `<article><h3>${escape(heading)}</h3><p>${escape(text)}</p></article>`).join('\n')}</div>
      </section>
      <div class="service-two-column">
        <section id="preparation" class="service-block" aria-labelledby="preparation-heading" tabindex="-1"><h2 id="preparation-heading">${escape(page.preparationHeading)}</h2><ul class="preparation-list">${page.preparation.map(item=>`<li>${escape(item)}</li>`).join('')}</ul><p>${escape(page.preparationNote)}</p></section>
        <section id="outputs" class="service-block" aria-labelledby="outputs-heading" tabindex="-1"><h2 id="outputs-heading">${escape(page.outputHeading)}</h2><p>${escape(page.output)}</p></section>
      </div>
      ${page.extra || ''}
      <section id="questions" class="service-block" aria-labelledby="questions-heading" tabindex="-1"><p class="eyebrow">COMMON QUESTIONS</p><h2 id="questions-heading">${escape(page.label)}: questions and answers</h2><div class="question-list">${page.faqs.map(([question, answer])=>`<article><h3>${escape(question)}</h3><p>${escape(answer)}</p></article>`).join('\n')}</div></section>
      <section class="related-services" aria-labelledby="related-heading"><h2 id="related-heading">Related services</h2><div>${related.map(other=>`<a href="${other.file}">${escape(other.label)}</a>`).join('')}</div><p>Based in Holly Springs, serving business owners in Wake County, the Triangle and throughout North Carolina.</p></section>
    </div>
    ${contact}
  </main>
  ${footer}

</body>
</html>
`;
  await writeFile(new URL(page.file, directory), html.replace(/[\t ]+$/gm, '').trimEnd()+'\n');
  console.log(`Updated ${page.file}`);
}
