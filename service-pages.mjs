// Local authoring helper. Reuses the homepage shell; writes static HTML only.
// Run after changing shared navigation, contact previews or footer content.
import {readFile, writeFile} from 'node:fs/promises';

const pages = [
  {
    file: 'website-development.html',
    label: 'Website Development',
    title: 'Website Creation & Development in NC | IT/OT Express LLC',
    description: 'New business websites and redesigns with clear content, easy navigation, contact forms, and layouts for phones and computers. Serving North Carolina.',
    heading: 'Business Website Development',
    introduction: 'Make it easy for customers to see what you offer and contact you. We build new business websites and redesign existing sites, with clear writing, simple navigation, and pages that work on phones and computers.',
    takeaway: 'A website with the pages and features we agree on, plus instructions for managing future updates.',
    start: ['Plan Your Website', 'We begin by learning about your business, your customers, and what you want visitors to do. Then we plan the pages, content, and features needed to support that goal.'],
    interest: 'website',
    cta: 'Discuss your website',
    sectionHeading: 'Website Services',
    sectionIntro: 'We can build a site from the ground up or improve the one you already have.',
    topics: [
      ['New Business Websites', 'We create pages that introduce your business, explain your services, and give customers a clear way to contact you.'],
      ['Website Redesigns', 'We improve the writing, page layout, and navigation so visitors can find what they need.'],
      ['Contact Forms', 'We add forms that collect customer inquiries and send them to your chosen inbox or a place where you can review submissions.']
    ],
    preparationHeading: 'What to Bring to the First Conversation',
    preparation: [
      'A short description of your business and customers',
      'Your current website address, if you have one',
      'The pages or features you need',
      'Any logo, photos or wording you have permission to use'
    ],
    preparationNote: 'You do not need finished website content to get started. We can include help with writing and choosing website tools in the project.',
    outputHeading: 'What Happens Before Launch',
    output: 'You review the site before it goes live. We check the links, test the contact form, and review the layout on phone, tablet, and desktop screens. We also agree on hosting, ownership, and who will make future updates.',
    faqs: [
      ['Can you improve our existing website?', 'Yes. We first check how your site was built, then discuss which changes are possible and worthwhile. The work might involve rewriting pages, updating the design, or adding features.'],
      ['Will the website work on phones?', 'Yes. We design layouts that adapt to smaller screens and check that the text, menus, and buttons are easy to use.'],
      ['Can customers contact us through the website?', 'Yes. We can add a form that collects the details you need to respond. Before launch, we test that submissions reach the agreed destination.'],
      ['What are a domain name and hosting?', 'A domain name is your website address. Hosting keeps your website available online. We explain the options, costs, and management responsibilities before you choose them.'],
    ],
    related: ['technical-documentation.html', 'ai-analysis.html']
  },
  {
    file: 'network-audits.html',
    label: 'Office Networks & Wi-Fi',
    title: 'Network Troubleshooting & Wi-Fi Services in NC | IT/OT Express LLC',
    description: 'Network troubleshooting, Wi-Fi reviews, equipment changes, and documentation for North Carolina businesses. Agree on assessment and implementation before work starts.',
    heading: 'Get help with your office network.',
    introduction: 'Dropped connections and unreliable Wi-Fi interrupt everyday work. We investigate network problems, review existing equipment, and carry out the improvements agreed for your project.',
    takeaway: 'For an assessment: findings and recommendations. For implementation: the agreed changes, test results, and updated records.',
    start: ['Start with the Problem', 'Tell us what is happening, where it happens, and who is affected. We use that information to decide which equipment, connections, and records the review should cover.'],
    interest: 'network',
    cta: 'Discuss your network',
    sectionHeading: 'Investigation, improvements, and records',
    sectionIntro: 'You can start with a specific fault, ask for a wider review, or discuss a planned equipment change. We define which work is included before starting.',
    topics: [
      ['Troubleshooting and Wi-Fi Reviews', 'We investigate weak signals, dropped connections, and slow access, focusing on the devices and locations where the problem occurs.'],
      ['Equipment and Network Changes', 'We can discuss installation, replacement, and configuration work. The quote defines the devices, changes, and checks included in the project.'],
      ['Network Diagrams and Cable Records', 'We create or update drawings that show how devices connect, where equipment sits, and how cables are arranged.']
    ],
    preparationHeading: 'What to Tell Us',
    preparation: [
      'Where the issue happens and who is affected',
      'When it started and whether anything changed beforehand',
      'Existing diagrams, equipment lists or troubleshooting notes',
      'Any planned move, expansion or equipment replacement'
    ],
    preparationNote: 'Incomplete records are fine for the first conversation. We can include missing diagrams and equipment lists in the project.',
    outputHeading: 'Know what the quote includes',
    output: 'An assessment records findings, unresolved questions, and recommended actions. If you also want implementation, we agree on the changes, cost, timing, and tests before carrying them out. Your handover records what was done and any remaining issues.',
    extra: '<section id="industrial-scope" class="service-block" aria-labelledby="industrial-heading" tabindex="-1"><p class="eyebrow">INDUSTRIAL NETWORKS</p><h2 id="industrial-heading">How Your Office and Plant Networks Connect</h2><p>For plants, workshops, and warehouses, the review can include machine controllers, operator panels, cameras, and their connections to the office network.</p><div class="scope-grid"><article><h3>Identify the Equipment</h3><p>We agree on the devices and production areas to review, using the records your team already has.</p></article><article><h3>Map the Connections</h3><p>We document how the networks connect and identify where their separation needs further review with your team and equipment vendors.</p></article><article><h3>Plan the Next Steps</h3><p>We explain the findings and recommendations so your team can plan changes around production schedules and equipment requirements.</p></article></div></section>',

    faqs: [
      ['Can you carry out the fixes as well as review the network?', 'Implementation can be included in a separately agreed scope. We first identify the required changes, check that the work is a fit, and agree on cost, timing, and how the result will be tested. A review alone does not include every recommended repair.'],
      ['How is an audit different from troubleshooting?', 'An audit reviews the network and its records to identify issues and recommended improvements. Troubleshooting investigates a specific problem, such as a connection that keeps dropping. We can include both in the same project.'],
      ['Can you work with our existing IT provider?', 'Tell us who currently manages the network and any vendor involvement. We agree on responsibilities and permissions with you before scheduling work.'],
      ['Will we have to replace our equipment?', 'Not necessarily. We start by reviewing your current setup. We recommend replacement only when the findings support it.'],
      ['Do we need an up-to-date network diagram?', 'No. Bring any notes or diagrams you have. Creating or updating those records can be part of the work.'],
      ['Does an audit certify our security or compliance?', 'No. A network audit does not certify security or compliance with a law or standard. Any security checks must be defined separately.']
    ],
    related: ['industrial-networks.html', 'technical-documentation.html']
  },
  {
    file: 'industrial-networks.html',
    label: 'Industrial Networks',
    title: 'Industrial Network Installation & Troubleshooting | IT/OT Express LLC',
    description: 'Plant network installation, communication troubleshooting, HMI and PLC connectivity, PRP networks, and documentation. Based in Holly Springs, North Carolina.',
    heading: 'Connect your equipment. Understand your plant network.',
    introduction: 'Get help with the network connections between machine controllers, operator screens, and plant systems. We discuss the equipment, production requirements, and work involved before agreeing on a project.',
    takeaway: 'An agreed investigation or installation scope, records of the work and checks performed, and any unresolved issues for your team to address.',
    start: ['Start with the equipment and the symptom', 'Tell us which connection is failing or changing, what your team has observed, and who supports the equipment. We use that information to define the investigation and identify the people needed for the work.'],
    interest: 'industrial',
    cta: 'Discuss your plant network',
    sectionHeading: 'Plant network work',
    sectionIntro: 'Operational technology (OT) includes systems that monitor and control physical equipment. Our network services focus on the connections those systems use.',
    topics: [
      ['Installation and Equipment Connections', 'Network equipment installation and connections for production areas, including operator screens (HMIs) and programmable logic controllers (PLCs).'],
      ['Communication Troubleshooting', 'Investigation of dropped or unreliable connections between devices. Testing and access are agreed around the equipment and production requirements.'],
      ['Redundancy and Documentation', 'Support for Parallel Redundancy Protocol (PRP) networks, which use two communication paths, along with network drawings, equipment lists, and connection records.']
    ],
    preparationHeading: 'What to include in your inquiry',
    preparation: ['The affected equipment and the symptoms or planned change', 'Your site location and preferred timing', 'Whether production is affected and any available maintenance window', 'The IT, maintenance, and equipment-vendor contacts involved'],
    preparationNote: 'A high-level description is enough to begin. We agree on how to exchange technical records after discussing the project.',
    outputHeading: 'Assessment and implementation',
    output: 'An investigation produces findings and recommended actions. Installation or configuration changes require an agreed implementation scope. The handover includes the records, checks, and open items defined for that work.',
    extra: '<section class="service-block" aria-labelledby="production-plan-heading"><p class="eyebrow">BEFORE WORK STARTS</p><h2 id="production-plan-heading">Plan around the equipment and the people who run it.</h2><div class="scope-grid"><article><h3>Coordinate</h3><p>Agree on authorized changes, site requirements, work windows, and the roles of your IT team, maintenance staff, and equipment vendors.</p></article><article><h3>Test</h3><p>Define the checks needed to confirm the result, who reviews them, and when production can resume after any agreed interruption.</p></article><article><h3>Prepare for recovery</h3><p>Identify the records, configurations, and vendor support needed to restore the previous setup if a change does not pass its checks.</p></article></div></section>',
    faqs: [
      ['Does this include programming our machines?', 'This page covers industrial network connectivity. Changes to control programs, machine behavior, or electrical systems are not implied by a network project and require separate scope and appropriate expertise.'],
      ['Can you guarantee there will be no downtime?', 'No. We discuss interruption risks and agree on work windows, testing, and recovery arrangements before changes. The requirements depend on your equipment and the proposed work.'],
      ['Can we bring in our existing IT provider or machine vendor?', 'Yes. Identify those contacts during planning so responsibilities, approvals, and any vendor-dependent work can be agreed.'],
    ],
    related: ['network-audits.html', 'technical-documentation.html']
  },
  {
    file: 'technical-documentation.html',
    label: 'Technical Documentation',
    title: 'IT Documentation Services in NC | IT/OT Express LLC',
    description: 'Network and rack drawings, equipment lists, operating procedures and handover documents. Based in Holly Springs, serving North Carolina businesses.',
    heading: 'Technical Documentation',
    introduction: 'Your team should not have to search old emails or rely on one person to understand a system. We organize technical information into network diagrams, equipment lists, and instructions that explain how to do the work.',
    takeaway: 'The diagrams, equipment records, and procedures agreed for your project, with revision details and any unresolved questions clearly marked.',
    start: ['Write for the People Doing the Work', 'A technician tracing a cable needs different information from a new employee learning a routine task. We identify who will use each document and organize it around what that person needs to do.'],
    interest: 'documentation',
    cta: 'Discuss a documentation project',
    sectionHeading: 'Documents We Can Create',
    sectionIntro: 'We can update existing files, create missing records, or do both as part of the same project.',
    topics: [
      ['Network, Rack, and Cable Diagrams', 'These drawings show how devices connect, where equipment sits in a cabinet, and which cables run between locations.'],
      ['Equipment Lists and Technical Guides', 'These records keep equipment and software information together, with instructions for the people who use and maintain the systems.'],
      ['Procedures and Training Guides', 'These guides explain routine tasks step by step and record the details someone needs when taking over a role or system.']
    ],
    preparationHeading: 'What to Bring to the First Conversation',
    preparation: [
      'Existing diagrams, spreadsheets, notes or vendor documentation',
      'The systems or processes that need attention first',
      'Who will use the documents and what they need to do',
      'Known gaps, outdated records or conflicting instructions'
    ],
    preparationNote: 'You do not need to organize everything first. We can start by identifying the most important gaps with you.',
    outputHeading: 'What You Receive',
    output: 'You receive the completed files with revision details and a list of anything that still needs confirmation. We agree on file formats, editable source files, and who will maintain them before the project begins. We review the documents with the people who will use them.',
    extra: '<section class="service-block" aria-labelledby="document-sample-heading"><h2 id="document-sample-heading">See how network paths connect.</h2><p>A network drawing helps your team follow connections between devices. This PRP diagram illustrates separate LAN A and LAN B paths through an industrial network.</p><a class="arrow-link" href="samples.html#deliverable-example">View the network diagram &rarr;</a></section>',
    faqs: [
      ['Can you work from scattered or outdated notes?', 'Yes. We review the files you have, identify gaps or conflicting information, and agree on what needs checking before the documents are updated.'],
      ['How is a network diagram different from a rack drawing?', 'A network diagram shows how devices connect. A rack drawing shows where each device sits in an equipment cabinet. Cable records identify the cables between devices or locations.'],
      ['What if we have no documentation?', 'We can create it. First, we agree on which systems to document and how the information will be collected and checked.'],
      ['Do you create industrial electrical or control drawings?', 'No. Our drawing services cover networks, equipment racks, and cabling.'],
      ['Can the documents be used for training?', 'Yes. We can write procedures and guides for new employees or existing staff learning a task. We agree on the audience first so the instructions include the detail they need.']
    ],
    related: ['network-audits.html', 'industrial-networks.html']
  },
  {
    file: 'ai-analysis.html',
    label: 'AI & Automation',
    title: 'AI & Automation Consulting in NC | IT/OT Express LLC',
    description: 'Compare AI and automation options for your business, including software, hardware, privacy, costs, and a plan to test results. Serving North Carolina.',
    heading: 'Practical AI for Everyday Work',
    introduction: 'Could artificial intelligence (AI) help your team find information, prepare reports, or handle repetitive tasks? We assess the work, compare suitable tools, and plan a small trial so you can judge the results before investing in a larger system.',
    takeaway: 'A comparison of suitable tools, recommendations for software and hardware, and a plan to test accuracy, speed, and cost.',
    start: ['Choose One Task to Improve', 'We start with how your team does the task today. Together, we define the improvement you want and how to measure it, such as finding an answer faster or reducing manual data entry.'],
    interest: 'ai',
    cta: 'Discuss an AI project',
    sectionHeading: 'What the Assessment Covers',
    sectionIntro: 'We review the task, the information it uses, and the software it needs to work with. We consider AI alongside simpler automation that follows fixed rules.',
    topics: [
      ['The Task and Its Risks', 'We identify the steps involved, the mistakes that would matter most, and the points where a person should review or approve the result.'],
      ['Data and Existing Software', 'We look at what information is available, where it is stored, and how a proposed tool would connect to your current software.'],
      ['AI Tools and Hardware', 'We compare AI models on tasks like yours and assess their accuracy, speed, and running costs. We also consider the equipment needed to run them on your computers or through an online service.']
    ],
    preparationHeading: 'What to Tell Us',
    preparation: [
      'A description of the task and how it is handled today',
      'The applications and types of information involved',
      'What a useful result would look like and how you would check it',
      'Budget, privacy, timing or hardware constraints'
    ],
    preparationNote: 'You do not need to choose a tool or buy equipment before we discuss the project.',
    outputHeading: 'Recommendations and a Test Plan',
    output: 'You receive our recommendations, estimated running costs, and a plan for a small trial. The plan sets out what to test and how to judge the results. If you decide to proceed, we agree on the cost and scope of building the system separately.',
    extra: '<section class="service-block" aria-labelledby="use-cases-heading"><h2 id="use-cases-heading">Tasks We Can Explore With You</h2><p>These are possible projects to assess and test against your requirements.</p><div class="scope-grid"><article><h3>Search Manuals and Procedures</h3><p>A document assistant could help staff find answers in approved materials, cite the source, and flag questions those materials do not answer.</p></article><article><h3>Prepare Reports and Training Materials</h3><p>AI could help draft routine reports or turn existing procedures into training guides for your team to review.</p></article><article><h3>Automate Repetitive Steps</h3><p>Automation could help retrieve order details or prepare shipping documents. An AI agent is software that uses AI to carry out steps in a task; we define its permissions and the actions that need human approval.</p></article></div><h3 class="prototype-heading">Test the Idea Before Expanding</h3><p>A small prototype lets you try the approach on routine tasks and difficult cases. We review the results, limitations, costs, and training needs before you decide what to do next.</p><a class="arrow-link" href="#contact">Discuss your AI project &rarr;</a></section>',
    faqs: [
      ['Do we need to choose an AI tool first?', 'No. Tell us about the task, the information it uses, and your budget and privacy requirements. We can then compare suitable options.'],
      ['Can AI run on our own computers?', 'Some tools can run on your equipment; others use online services. We compare the options based on your task, privacy requirements, hardware, and ongoing costs.'],
      ['How do we know whether AI is a good fit?', 'We look at whether it can produce results your team can check, at a cost that makes sense. The assessment may recommend a simpler software change if that would solve the problem more effectively.'],
      ['Does the assessment include building the system?', 'No. The assessment provides recommendations and a test plan. Building and testing a system is a separate phase with an agreed scope, schedule, and cost.']
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
          <div><p class="eyebrow">HOLLY SPRINGS, NC &middot; SERVING NORTH CAROLINA</p>
          <h1 id="service-heading">${escape(page.heading)}</h1>
          <p class="service-introduction">${escape(page.introduction)}</p>
          <div class="service-takeaway"><h2>What You Receive</h2><p>${escape(page.takeaway)}</p></div>
          <a class="button button-bright" href="#contact" data-interest="${page.interest}">${escape(page.cta)}</a></div>
          <nav class="page-contents" aria-label="On this page"><span>On This Page</span><a href="#scope">${escape(page.sectionHeading)}</a><a href="#preparation">Getting Started</a><a href="#outputs">${escape(page.outputHeading)}</a><a href="#questions">Common Questions</a></nav>
        </div>
      </div>
    </section>
    <div class="wrap service-body">
      <section class="starting-project" aria-labelledby="starting-heading"><div><h2 id="starting-heading">${escape(page.start[0])}</h2></div><div><p>${escape(page.start[1])}</p><a href="index.html#process">How a project works</a>${page.interest==='website'?'':` <span aria-hidden="true">&middot;</span> <a href="samples.html${['network','industrial'].includes(page.interest)?'#industrial-experience':'#documentation-experience'}">Relevant experience</a>`}</div></section>
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
      <section id="questions" class="service-block" aria-labelledby="questions-heading" tabindex="-1"><h2 id="questions-heading">Common Questions</h2><div class="question-list">${page.faqs.map(([question, answer])=>`<article><h3>${escape(question)}</h3><p>${escape(answer)}</p></article>`).join('\n')}</div></section>
      <section class="related-services" aria-labelledby="related-heading"><h2 id="related-heading">Related Services</h2><div>${related.map(other=>`<a href="${other.file}">${escape(other.label)}</a>`).join('')}</div><p>Based in Holly Springs, serving business owners in Wake County, the Triangle and throughout North Carolina.</p></section>
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
