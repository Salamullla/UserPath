const academyContent={
  ar:{
    navAbout:'الأكاديمية',
    navTraining:'التدريب',
    navServices:'الخدمات',
    academyKicker:'أكاديمية مسار المستخدم',
    academyTitle:'من التعلّم إلى العمل الحقيقي.',
    academyIntro:'برامج عملية ومكثفة تساعد المهنيين الناشئين على بناء مهارات مطلوبة، وإنشاء أعمال جاهزة لملف الإنجاز، وإكمال مشروع تخرج؛ بدعم من مجتمع مهني يستمر بعد انتهاء الدورة.',
    journeyTitle:'رحلة التعلّم',
    academyCta:'استكشف البرامج ↗',
    journey:['تعلّم','طبّق','ابنِ ملف أعمالك','أكمل مشروع التخرج','انضم إلى المجتمع','اكتشف الفرص'],
    programmes:[
      {meta:['64 ساعة','المدرب: صالح'],category:'تصميم UI/UX',title:'تصميم UI/UX باستخدام Figma والذكاء الاصطناعي',body:'تعلّم كيف تحوّل الأفكار إلى تجارب رقمية جاهزة للإنتاج باستخدام Figma والذكاء الاصطناعي التوليدي؛ بدءًا من البحث والتفكير التصميمي، وصولًا إلى التصميم البصري، والتخطيط التلقائي، والمكوّنات، والمتغيرات، والنماذج الأولية المتقدمة.'},
      {meta:['64 ساعة','المدرب: سلمان اللبون'],category:'كتابة تجربة المستخدم',title:'كتابة تجربة المستخدم',body:'تعلّم كتابة محتوى واضح ومفيد للمنتجات، يوجّه المستخدمين ويقلل التعقيد ويحسّن التفاعل؛ ويشمل التعاون عبر Figma، ونصوص الواجهات، وأبحاث المحتوى، واختبار قابلية الاستخدام، واختبارات A/B.'}
    ],
    servicesKicker:'الخدمات',
    servicesTitle:'خدمات متخصصة للتصميم والمحتوى',
    servicesIntro:'أربع خدمات مركّزة لدعم فرق المنتجات الرقمية ورفع جودة التجربة.',
    strip:['تصميم واجهة تجربة المستخدم','كتابة تجربة المستخدم','بناء أنظمة التصميم','مظهر الحكومة الرقمية DGA'],
    services:[
      ['خدمة تصميم واجهة تجربة المستخدم','تصميم واجهات للمنتجات الرقمية تجمع بين الوضوح وسهولة الاستخدام، وتدعم المستخدمين في تحقيق أهدافهم.'],
      ['كتابة تجربة المستخدم','كتابة محتوى واضح ومتسق للمنتجات الرقمية، يوجّه المستخدمين ويسهّل رحلتهم باللغتين العربية والإنجليزية.'],
      ['بناء أنظمة التصميم','تصميم أنظمة متكاملة توحّد المكوّنات والأنماط والإرشادات، وتساعد الفرق على بناء منتجات رقمية متسقة وقابلة للتوسع.'],
      ['تحويل التصاميم الحكومية إلى مظهر الحكومة الرقمية DGA','تحويل واجهات وتصاميم الجهات الحكومية إلى مظهر الحكومة الرقمية بما يتوافق مع إرشادات ومعايير هيئة الحكومة الرقمية DGA.']
    ]
  },
  en:{
    navAbout:'Academy',
    navTraining:'Training',
    navServices:'Services',
    academyKicker:'USERPATH ACADEMY',
    academyTitle:'From learning to real-world work.',
    academyIntro:'Practical, intensive programmes that help emerging professionals build in-demand skills, create portfolio-ready work and complete a capstone project—supported by a professional community that continues beyond the course.',
    journeyTitle:'LEARNING JOURNEY',
    academyCta:'Explore the programmes ↗',
    journey:['Learn','Practice','Build your portfolio','Complete a capstone','Join the community','Discover opportunities'],
    programmes:[
      {meta:['64 hours','Instructor: Saleh'],category:'UI/UX DESIGN',title:'UI/UX Design with Figma & AI',body:'Learn to turn ideas into production-ready digital experiences with Figma and generative AI—from research and design thinking to visual design, auto layout, components, variables and advanced prototyping.'},
      {meta:['64 hours','Instructor: Salman Al-Laboun'],category:'UX WRITING',title:'UX Writing',body:'Learn to write clear, useful product content that guides users, reduces friction and improves engagement—covering Figma collaboration, interface copy, content research, usability testing and A/B testing.'}
    ],
    servicesKicker:'Services',
    servicesTitle:'Specialised design and content services',
    servicesIntro:'Four focused services that support digital product teams and improve experience quality.',
    strip:['UI/UX Design','UX Writing','Design System Development','DGA Digital Government Style'],
    services:[
      ['UI/UX Design','Designing clear, usable digital product interfaces that help users achieve their goals.'],
      ['UX Writing','Writing clear, consistent digital product content that guides users and simplifies their journey in Arabic and English.'],
      ['Design System Development','Designing complete systems that unify components, patterns and guidelines, helping teams build consistent and scalable digital products.'],
      ['Government Design Transformation to DGA Digital Government Style','Transforming government interfaces and designs into the Digital Government style in alignment with DGA guidelines and standards.']
    ]
  }
};

Object.assign(C.ar,academyContent.ar);
Object.assign(C.en,academyContent.en);

function renderAcademy(){
  const c=academyContent[L];
  document.getElementById('journeyList').innerHTML=c.journey.map(x=>`<div class="journey-step"><span>•</span>${x}</div>`).join('');
  document.getElementById('programmes').innerHTML=c.programmes.map(p=>`<article class="programme"><div class="programme-top"><div class="programme-meta">${p.meta.map(x=>`<span>${x}</span>`).join('')}</div><span class="programme-category">${p.category}</span></div><h3>${p.title}</h3><p>${p.body}</p></article>`).join('');
}

el.lang.addEventListener('click',renderAcademy);
render();
renderAcademy();
