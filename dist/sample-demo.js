import {answer} from './demo-retrieval.js';
import {passages} from './demo-passages.js';
const input = document.querySelector('#lookup-question');
const output = document.querySelector('#lookup-result');
const examples = {heartbeat:'How often does the Aster gateway send a heartbeat?',reports:'When does the Beacon portal create a summary report?',missing:'What is the warranty period for the Cedar sensor?'};
function render() {
  const result = answer(input.value);
  const heading = document.createElement('h3');
  heading.textContent = result.status === 'found' ? 'Matching source passage' : 'No source passage returned';
  const message = document.createElement('p');
  message.textContent = result.message;
  const nodes = [heading, message];
  if (result.status === 'found') {
    const excerpt = document.createElement('blockquote'); excerpt.textContent = result.excerpt;
    const source = document.createElement('a'); source.href = '#source-'+result.source.id; source.textContent = 'Source: '+result.source.id+' · '+result.source.title;
    source.addEventListener('click',()=> {document.querySelector('.source-library').open=true;});
    nodes.push(excerpt,source);
  }
  output.replaceChildren(...nodes);
}
document.querySelector('#lookup-form').addEventListener('submit',event=>{event.preventDefault();render();});
document.querySelectorAll('[data-example]').forEach(button=>{
  button.addEventListener('click',()=>{input.value=examples[button.dataset.example];render();});
  button.disabled=false;
});
const library=document.querySelector('#lookup-sources');
for(const passage of passages){const item=document.createElement('li');item.id='source-'+passage.id;item.tabIndex=-1;const title=document.createElement('h3');title.textContent=passage.id+' · '+passage.title;const body=document.createElement('p');body.textContent=passage.text;item.append(title,body);library.append(item);}
input.disabled=false;document.querySelector('#lookup-submit').disabled=false;
