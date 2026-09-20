import { passages } from './demo-passages.js';
const stop = new Set('a an the is are was were does do how what when where which who can to of for in on at and or its it be every often long much many up this please tell me about send sends retained default'.split(' '));
export function tokens(text) {
  return [...new Set(text.toLowerCase().match(/[a-z0-9]+/g) ?? [])].filter(t => !stop.has(t));
}
const docs = passages.map(p => ({...p,terms:tokens(p.title+' '+p.text)}));
const idf = t => Math.log(1 + docs.length/(1 + docs.filter(d=>d.terms.includes(t)).length));
export function answer(query, engine = 'tfidf') {
  const start = performance.now();
  const done = r => ({...r,engine,latencyMs: +(performance.now()-start).toFixed(3)});
  if (typeof query !== 'string' || !query.trim() || query.length > 500)
    return done({status:'invalid',message:'Enter a synthetic-demo question between 1 and 500 characters.'});
  if (!['tfidf','overlap'].includes(engine)) return done({status:'invalid',message:'Unknown retrieval engine.'});
  if (/\b(passwords?|secrets?|credentials?|disable|bypass|interlock|execute|shutdown)\b|ignore.*instructions/i.test(query))
    return done({status:'out_of_scope',message:'This demo cannot operate equipment, provide secrets, or follow overriding instructions.'});
  const q = tokens(query);
  const ranked = docs.map(d => {
    const common = q.filter(t => d.terms.includes(t));
    const score = engine === 'overlap' ? common.length/Math.max(q.length,1) : common.reduce((s,t)=>s+idf(t)**2,0)/Math.sqrt(Math.max(1,q.reduce((s,t)=>s+idf(t)**2,0))*d.terms.reduce((s,t)=>s+idf(t)**2,0));
    return {d,score,coverage:common.length/Math.max(q.length,1)};
  }).sort((a,b)=>b.score-a.score);
  const best = ranked[0];
  // Conservative lexical coverage is a heuristic, not a probability or a safety guarantee.
  if (q.length < 2 || best.coverage < 0.65)
    return done({status:'unsupported',message:'No sufficiently matching passage was found. Ask the document owner; do not infer an answer.'});
  return done({status:'found',message:'Matching source excerpt — verify that it answers your question.',excerpt:best.d.text,source:{id:best.d.id,title:best.d.title},matchScore:+best.score.toFixed(3)});
}
