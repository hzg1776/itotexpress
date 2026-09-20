// Local authoring helper. Reuses the homepage shell; writes static HTML only.
// Run after changing shared navigation, contact previews or footer content.
import {readFile, writeFile} from 'node:fs/promises';

const pages = [
  {
    file: 'network-audits.html',
    label: 'Network audits',
    title: 'Network Audits & Wi-Fi Reviews in NC | IT/OT Express LLC',
    description: 'Network audits, Wi-Fi troubleshooting, and network, rack and cabling drawings for North Carolina businesses. Based in Holly Springs, serving Wake County and the Triangle.',
    heading: 'Network audits and Wi-Fi reviews.',
    introduction: 'When connections drop or Wi-Fi is unreliable, it can be difficult to tell where the problem starts. Review the network layout, investigate the reported issues and identify which records or changes need attention.',
    takeaway: 'Documented findings, network or rack drawings, and recommendations for next steps.',
    start: ['Choose one network area or recurring connection problem.', 'Agree on the equipment and records to review, the drawings needed and which questions the findings should answer.'],
    interest: 'network',
    cta: 'Discuss a network audit',
    sectionHeading: 'What the review can cover',
    sectionIntro: 'The scope depends on the problem you want to solve. An audit might focus on a recurring fault, missing network records or preparation for a change.',
    topics: [
      ['Network setup', 'Review the network layout, connected equipment and available records to understand how the systems fit together.'],
      ['Wi-Fi and connections', 'Investigate reported dead zones, intermittent connections or slow access. Narrow the review to the affected areas, devices and applications.'],
      ['Network, rack and cabling drawings', 'Create or update drawings that describe connections, rack layouts and cabling. Agree on the level of detail before the work starts.']
    ],
    preparationHeading: 'Useful information for the first conversation',
    preparation: [
      'Where the issue happens and who is affected',
      'When it started and whether anything changed beforehand',
      'Existing diagrams, equipment lists or troubleshooting notes',
      'Any planned move, expansion or equipment replacement'
    ],
    preparationNote: 'You do not need complete records to discuss the work. Missing documentation can be part of the scope.',
    outputHeading: 'What comes out of the work?',
    output: 'The agreed scope can include documented findings, network or rack drawings, and recommendations for further investigation or changes. Confirm the documents and level of detail when the project is scoped. A review does not by itself include replacing equipment or changing configurations.',
    faqs: [
      ['What is the difference between a network audit and troubleshooting?', 'An audit reviews the network more broadly, including its layout and documentation. Troubleshooting focuses on a specific problem, such as a connection that drops or an area with poor Wi-Fi. One project can include both if that is the agreed scope.'],
      ['Can you review Wi-Fi without replacing all our equipment?', 'A Wi-Fi review can begin with the existing setup and the problems being reported. Equipment replacement is a possible recommendation, not an assumption made before the review.'],
      ['Do we need a current network diagram?', 'No. Existing notes and diagrams are useful, but creating or updating network documentation can be included in the work. Start by identifying which records you already have and which are missing.'],
      ['Does a network audit certify our security or compliance?', 'No. A network review is not a security certification or compliance attestation. Security and recovery reviews are separate services whose scope needs to be agreed.']
    ],
    related: ['technical-documentation.html', 'ai-analysis.html']
  },
  {
    file: 'technical-documentation.html',
    label: 'Technical documentation',
    title: 'IT Documentation Services in NC | IT/OT Express LLC',
    description: 'Technical documentation cleanup and creation: network diagrams, rack drawings, system inventories and operating procedures. Holly Springs, serving North Carolina.',
    heading: 'Technical documentation your team can use.',
    introduction: 'When diagrams are outdated and instructions are scattered, routine work becomes harder to hand over. Organize existing records, check what has changed and create the documentation your team needs.',
    takeaway: 'Updated diagrams, system inventories, technical guides or operating procedures.',
    start: ['Choose one system or set of records that is difficult to maintain or hand over.', 'Agree on the source material, intended readers, file formats and documents to update or create.'],
    interest: 'documentation',
    cta: 'Discuss a documentation project',
    sectionHeading: 'What can be documented?',
    sectionIntro: 'Focus on the records your team needs to operate, maintain or hand over a system. Cleanup and new documentation can be part of the same project.',
    topics: [
      ['Network, rack and cabling drawings', 'Show how network components connect, where equipment sits in a rack and how cabling is arranged.'],
      ['System inventories and technical guides', 'Organize information about the systems in scope and create reference material for staff who maintain them.'],
      ['Operating procedures and handover notes', 'Document routine tasks and system handovers. Staff training can be included to help people use the material.']
    ],
    preparationHeading: 'Start with what you already have',
    preparation: [
      'Existing diagrams, spreadsheets, notes or vendor documentation',
      'The systems or processes that need attention first',
      'Who will use the documents and what they need to do',
      'Known gaps, outdated records or conflicting instructions'
    ],
    preparationNote: 'The first discussion can establish which material needs updating, which needs checking and which needs to be created.',
    outputHeading: 'Agree on the documents before the work starts',
    output: 'A documentation project can produce revised drawings, system inventories, technical guides or operating procedures. Agree on the intended readers, file formats, level of detail and review process when setting the scope. Identify who will maintain the documents as systems change.',
    faqs: [
      ['Can you work from scattered or outdated notes?', 'Yes. Documentation cleanup can start with existing notes, diagrams and files. The work includes identifying gaps and deciding what needs to be checked before an updated document is treated as current.'],
      ['What is the difference between a network diagram and a rack drawing?', 'A network diagram shows relationships and connections between network components. A rack drawing shows where equipment is positioned within a rack. Cabling documentation records the connections between equipment or locations.'],
      ['Can you create documentation when none exists?', 'Yes. Creating new documentation is part of the service. The project scope should identify the systems to document and how the information will be collected and checked.'],
      ['Does this include industrial electrical or control drawings?', 'Drawing services cover network, rack and cabling documentation. They do not include industrial electrical or control drawings.'],
      ['Can documentation be used for staff training?', 'Yes. Operating procedures and technical guides can support onboarding and staff training. Agree on the audience and the tasks people need to learn so the material has the right level of detail.']
    ],
    related: ['network-audits.html', 'ai-analysis.html']
  },
  {
    file: 'ai-analysis.html',
    label: 'AI analysis',
    title: 'AI Analysis & Consulting in NC | IT/OT Express LLC',
    description: 'Assess AI ideas, data needs, models, hardware and architecture before choosing tools. AI consulting from Holly Springs for business owners across North Carolina.',
    heading: 'AI analysis before you choose the tools.',
    introduction: 'Have a task you think AI could help with? Start by describing how it works today. Review the information, systems and constraints before choosing models, hardware or software.',
    takeaway: 'An assessment of the idea, a comparison of approaches and recommendations for what a trial should test.',
    start: ['Choose one repeated task and describe a useful result.', 'Agree on the data, systems and constraints to examine, the approaches to compare and what a trial would need to demonstrate.'],
    interest: 'ai',
    cta: 'Discuss an AI assessment',
    sectionHeading: 'What an AI assessment considers',
    sectionIntro: 'Start with a specific task and a definition of a useful result. The assessment then examines what would be needed to make that result possible.',
    topics: [
      ['The task and its limits', 'Describe how the work is done today, what needs to improve and which decisions should remain with a person.'],
      ['Data and existing systems', 'Identify the information required, where it comes from and how current applications would fit into the workflow.'],
      ['Models, hardware and architecture', 'Compare suitable open-source models and hosted services. Review their hardware needs, operating constraints and how the components would connect.']
    ],
    preparationHeading: 'Bring one task you want to improve',
    preparation: [
      'A description of the task and how it is handled today',
      'The applications and types of information involved',
      'What a useful result would look like and how you would check it',
      'Budget, privacy, timing or hardware constraints'
    ],
    preparationNote: 'Begin with a description of the work. You do not need to choose a model or buy hardware before discussing an assessment.',
    outputHeading: 'What should an assessment help you decide?',
    output: 'The assessment can help you decide whether to pursue the idea, change the approach or leave the task as it is. It can identify missing information, compare suitable approaches and define what a trial would need to test. Agree on the recommendations and documentation to be delivered before work begins.',
    extra: '<section class="service-block" aria-labelledby="use-cases-heading"><h2 id="use-cases-heading">Business tasks to discuss</h2><p>Possible projects include AI agents, onboarding using standard operating procedures (SOPs), individual or group AI avatar training, reports from enterprise resource planning (ERP) systems, order retrieval, label creation and shipping-document automation.</p><p>For ERP work, distinguish reading data for reporting from changing transactions. For labels and shipping documents, identify the source system, document format and approval steps before planning an integration.</p></section>',
    faqs: [
      ['Do we need to know which AI model to use?', 'No. Model evaluation, hardware sizing and architecture advice can be part of the assessment. Begin with the business task, required information and constraints.'],
      ['Can you compare local models with hosted AI services?', 'Yes. The consulting scope includes open-source models, hosted services, hardware and architecture choices. The comparison should consider the task, data handling, available equipment and ongoing operation.'],
      ['How do we decide whether AI is a good fit?', 'Start by defining the task, the information available and how a result would be checked. Then consider errors, human review and integration requirements alongside the expected benefit. The assessment may find that simpler automation is more appropriate.'],
      ['Does an AI assessment include building the system?', 'An assessment focuses on the task, data and available approaches. Building a trial or production system requires an agreed implementation scope, including deliverables and approval steps.']
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
const baseHead = home.slice(0, home.indexOf('<body>'));

for (const page of pages) {
  const schema = {
    '@context': 'https://schema.org', '@type': 'Service', name: page.label,
    serviceType: page.label, description: page.introduction,
    provider: {'@type':'Organization', name:'IT/OT Express LLC'},
    areaServed: {'@type':'State', name:'North Carolina'}
  };
  const head = baseHead
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escape(page.description)}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escape(page.title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escape(page.description)}">`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`);
  const related = page.related.map(file => pages.find(other => other.file === file));
  const html = `${head}<body class="service-page" data-service-interest="${page.interest}">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="draft-bar"><div class="wrap">Unpublished working draft <span>Preview for review before launch.</span></div></div>
  ${header}
  <main id="main" tabindex="-1">
    <section class="service-hero" aria-labelledby="service-heading">
      <div class="wrap">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">${escape(page.label)}</span></nav>
        <div class="service-hero-layout">
          <div><p class="eyebrow">HOLLY SPRINGS · SERVING NORTH CAROLINA</p>
          <h1 id="service-heading">${escape(page.heading)}</h1>
          <p class="service-introduction">${escape(page.introduction)}</p>
          <div class="service-takeaway"><h2>What you can receive</h2><p>${escape(page.takeaway)} <a href="#outputs">The agreed scope determines the deliverables.</a></p></div>
          <a class="button button-bright" href="#contact" data-interest="${page.interest}">${escape(page.cta)}</a></div>
          <nav class="page-contents" aria-label="On this page"><span>On this page</span><a href="#scope">Project scope</a><a href="#preparation">What to prepare</a><a href="#outputs">Possible outputs</a><a href="#questions">Questions & answers</a></nav>
        </div>
      </div>
    </section>
    <div class="wrap service-body">
      <section class="starting-project" aria-labelledby="starting-heading"><div><p class="eyebrow">A FOCUSED FIRST PROJECT</p><h2 id="starting-heading">${escape(page.start[0])}</h2></div><div><p>${escape(page.start[1])}</p><p>Confirm the scope, fee, schedule and access arrangements before work starts.</p><a href="samples.html${page.interest==='ai'?'#lookup-example':page.interest==='documentation'?'#handover-example':'#network-example'}">See an illustrative example</a></div></section>
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
