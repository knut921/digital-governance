const concepts={
  'e-gov':['政府如何用資訊科技提升效率與服務可及性？','線上申辦、流程電子化、單一入口、行政效率','服務上線等於轉型嗎？誰能用、誰仍被排除？','線上報稅、電子公文、政府入口網'],
  'open-gov':['政府如何透過透明、參與與協作提升民主品質？','資訊公開、開放資料、公民參與、協作','資料「公開」就等於可用嗎？參與真的影響決策嗎？','政府資料開放平臺、公共政策網路參與平臺'],
  'digital-gov':['數位技術如何重組政府、社會與市場的治理關係？','資料治理、平台、跨域協作、數位課責','誰設定系統規則？權力、責任與公共價值如何重分配？','vTaiwan、跨機關資料交換、AI 輔助決策'],
  'smart-gov':['政府如何以資料與智慧技術更即時地感知、預測與回應？','感測器、即時資料、預測分析、自動化','更聰明是否也更公平、透明且可課責？','智慧交通、災害預警、城市儀表板']
};
document.querySelectorAll('.unit-title').forEach(btn=>btn.addEventListener('click',()=>{const unit=btn.closest('.unit');unit.classList.toggle('open');btn.setAttribute('aria-expanded',unit.classList.contains('open'));}));
document.querySelectorAll('.concept-tabs button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.concept-tabs button').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false')});btn.classList.add('active');btn.setAttribute('aria-selected','true');
  const v=concepts[btn.dataset.tab];document.getElementById('concept-panel').innerHTML=`<div><small>核心問題</small><strong>${v[0]}</strong></div><div><small>關鍵字</small><p>${v[1]}</p></div><div><small>研究者要追問</small><p>${v[2]}</p></div><div><small>例子</small><p>${v[3]}</p></div>`;
}));
document.querySelectorAll('.question-cards button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.question-cards button').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');document.getElementById('selected-question').textContent=`你選擇了「${btn.querySelector('b').textContent}」視角。下一步：列出一項可以觀察的指標與一項可能遺漏的聲音。`;}));
const toast=msg=>{const t=document.querySelector('.toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1600)};
async function copy(text){try{await navigator.clipboard.writeText(text);toast('已複製到剪貼簿')}catch{toast('請手動選取文字複製')}}
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copy(document.getElementById(b.dataset.copy).textContent)));
document.getElementById('copyHomework')?.addEventListener('click',()=>copy(`【數位治理議題發想｜300 字】\n1. 議題情境：我關注的數位治理現象是＿＿＿＿，它涉及的行動者包括＿＿＿＿。\n2. 研究問題：我想追問的不是「發生了什麼」，而是＿＿＿＿如何影響＿＿＿＿？\n3. 證據需求：回答問題可能需要＿＿＿＿資料；可從＿＿＿＿取得。\n4. 風險提醒：這些資料可能遺漏＿＿＿＿，因此目前不能直接推論＿＿＿＿。`));
const menu=document.querySelector('.menu-button'),nav=document.querySelector('.nav');menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
window.addEventListener('scroll',()=>{const h=document.documentElement;document.getElementById('progress').style.width=`${h.scrollTop/(h.scrollHeight-h.clientHeight)*100}%`},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.15});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Correct anchor position after web-font reflow; prevents a direct #roadmap load from landing in blank space.
if(location.hash){
  const target=document.querySelector(location.hash);
  if(target){
    const align=()=>target.scrollIntoView({block:'start'});
    window.addEventListener('load',()=>{align();setTimeout(align,500)},{once:true});
  }
}

// Save reading-roster names locally so classroom assignments survive refreshes.
const rosterFields=[...document.querySelectorAll('[data-roster]')];
rosterFields.forEach(field=>{
  const key=`dg-roster-${field.dataset.roster}`;
  field.value=localStorage.getItem(key)||'';
  field.addEventListener('input',()=>localStorage.setItem(key,field.value));
});
document.getElementById('clearRoster')?.addEventListener('click',()=>{
  if(!confirm('確定要清除全部導讀同學姓名嗎？')) return;
  rosterFields.forEach(field=>{field.value='';localStorage.removeItem(`dg-roster-${field.dataset.roster}`)});
  toast('已清除全部姓名');
});
