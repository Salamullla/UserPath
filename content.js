const C={
  ar:{
    brand:'مسار المستخدم',navAbout:'الأكاديمية',navServices:'الخدمات',navContact:'تواصل معنا',
    heroEyebrow:'شركة سعودية لأبحاث تجربة المستخدم',heroTop:'طوّر مشروعك',heroAccent:'من خلال المستخدمين.',
    heroLead:'نساعد الشركات على تحقيق أهدافها من خلال فهم أكبر للمستخدمين؛ لأن المستخدم هو من يقود الطريق في تشكيل التجربة الرائعة.',
    heroCta:'تواصل معنا ←',servicesCta:'عرض جميع الخدمات',purpose:'نساعد الناس على تحقيق أهدافهم ونجعل حياتهم أسهل.',purposeSmall:'نبسّط ما هو معقد ونعيد ابتكار ما هو جامد.',badge:'المستخدم يقود المسار',
    whyKicker:'لماذا مسار المستخدم؟',whyTitle:'نفهم المستخدم والسوق والثقافة',whyIntro:'رؤى قابلة للتنفيذ وحلول تخلق قيمة حقيقية لك ولعملائك.',
    contactTitle:'لست متأكداً من الخدمة المناسبة لمشروعك؟',contactBody:'تواصل معنا عبر البريد إلكتروني info@userpath.sa أو من خلال هذا النموذج البسيط وسنشرح لك جميع الخدمات وأي نوع منها يناسب مشروعك بكل صدق وأمانة.',
    nameLabel:'الاسم',emailLabel:'البريد الإلكتروني',companyLabel:'اسم الشركة/الجهة (اختياري)',messageLabel:'الرسالة',writeHere:'اكتب هنا',messagePlaceholder:'أخبرنا عن مشروعك بشكل مختصر أو أي استفسار لديك',submit:'إرسال',success:'شكرًا لك. يمكنك أيضًا مراسلتنا مباشرة على info@userpath.sa',location:'الرياض، المملكة العربية السعودية',
    strip:[],services:[],
    values:[
      ['القيمة','الدافع الأساسي لوجود مسار المستخدم هو إنشاء عمل هادف، ونحن هنا نقدم رؤى قابلة للتنفيذ، ونركز على الحلول والفرص التي تخلق قيمة حقيقية لك ولعملائك.'],
      ['البحث','تكمن خبرتنا في تحديد المشكلات التي يتوجب حلها، وما يميزنا في السوق هو قدرتنا على فهم المستخدمين واحتياجاتهم وبناء أفضل الحلول والتحقق من صحتها.'],
      ['خبرة الموظفين','يتمتع فريقنا بخبرة في مجموعة متنوعة من القطاعات، والتي تشمل الحكومية والخدمات المصرفية والسفر والسياحة والصحة والتجارة الإلكترونية والموارد البشرية وقطاع التوصيل والأمن السيبراني والاتصالات وغيرها الكثير.'],
      ['اللغة والثقافة','الطلاقة والإتقان في اللغتين العربية والإنجليزية، بالإضافة إلى فهم عميق للثقافة السعودية والخليجية.'],
      ['فريق معتمد','يملك أعضاء فريق مسار المستخدم شهادات معتمدة وبدورهم يعملون ويشرفون على جميع المشاريع.']
    ]
  },
  en:{
    brand:'UserPath',navAbout:'Academy',navServices:'Services',navContact:'Contact Us',
    heroEyebrow:'A Saudi user experience research company',heroTop:'Elevate Your Business',heroAccent:'With Real Users.',
    heroLead:'We help companies reach their goals by helping them achieve a greater understanding of their users. Users lead the way in shaping great experiences.',
    heroCta:'Contact Us →',servicesCta:'View all services',purpose:'To help people achieve their goals and make their lives easier.',purposeSmall:'Simplifying what is complex and reinventing what is stagnant.',badge:'Users lead the way',
    whyKicker:'Why UserPath?',whyTitle:'Research, experience and cultural understanding',whyIntro:'Actionable insights and opportunities that create real value for you and your customers.',
    contactTitle:"Not Sure What's Needed For Your Business?",contactBody:"Email us at info@userpath.sa, or fill out this simple form and we'll walk you through our services and provide an honest consultation.",
    nameLabel:'Name',emailLabel:'Email',companyLabel:'Company/Organization (optional)',messageLabel:'Message',writeHere:'Write here',messagePlaceholder:"Tell us about your project or inquire (don't overthink it)",submit:'Submit',success:'Thank you. You can also email us directly at info@userpath.sa',location:'Riyadh, Saudi Arabia',
    strip:[],services:[],
    values:[
      ['Value','Our core motivation for founding UserPath is to create meaningful work. We provide actionable insights, and we focus on solutions and opportunities that create real value for you and your customers.'],
      ['Research','Our experience in identifying the right problems to be solved, our ability to cultivate a strong understanding of users and their needs, and finding, creating and validating the best solutions is what sets us apart in the market.'],
      ['Experienced staff','Our team has a combined experience working in a variety of industries within the country which include government, banking, travel, health, e-commerce, human resources, food delivery, cybersecurity, telecommunication, and more.'],
      ['Language and Culture','Fluency in both languages; Arabic and English + Deep cultural understanding.'],
      ['Certified team members','Certified UX team members overlook and work on all projects.']
    ]
  }
};

const el={logo:document.getElementById('logo'),lang:document.getElementById('lang'),strip:document.getElementById('strip'),services:document.getElementById('servicesGrid'),values:document.getElementById('valueGrid')};
let L=localStorage.getItem('up-lang')||'ar';
function render(){
  const c=C[L];
  document.documentElement.lang=L;
  document.documentElement.dir=L==='ar'?'rtl':'ltr';
  document.title=L==='ar'?'مسار المستخدم | UserPath':'UserPath | UX Research & Design';
  document.querySelectorAll('[data-t]').forEach(e=>e.textContent=c[e.dataset.t]||'');
  document.querySelectorAll('[data-p]').forEach(e=>e.placeholder=c[e.dataset.p]||'');
  el.logo.textContent=c.brand;
  el.lang.textContent=L==='ar'?'English':'العربية';
  el.strip.innerHTML=c.strip.map(x=>`<span><b>•</b> ${x}</span>`).join('');
  el.services.innerHTML=c.services.map((x,i)=>`<article class="card"><span class="num">${String(i+1).padStart(2,'0')}</span><h3>${x[0]}</h3><p>${x[1]}</p><span class="arrow">${L==='ar'?'↙':'↘'}</span></article>`).join('');
  el.values.innerHTML=c.values.map(x=>`<article class="value"><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('');
}
el.lang.addEventListener('click',()=>{L=L==='ar'?'en':'ar';localStorage.setItem('up-lang',L);render()});
render();
