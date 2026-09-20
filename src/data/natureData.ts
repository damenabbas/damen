export interface NatureItem {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  icon: string;
}

export interface CategoryInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;
}

export const heroImage =
  'https://images.pexels.com/photos/39470846/pexels-photo-39470846.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080';

export const categories: CategoryInfo[] = [
  {
    id: 'mountains-deserts',
    title: 'الجبال والصحاري',
    subtitle: 'عظمة المرتفعات وسحر الكثبان',
    description:
      'من جبال السروات الشامخة إلى رمال الربع الخالي الممتدة، تستضيف المملكة تضاريس متناذعة تجمع بين صلابة الجبال وامتداد الصحراء.',
    image:
      'https://images.pexels.com/photos/36772107/pexels-photo-36772107.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    accent: 'from-amber-700 to-amber-900',
  },
  {
    id: 'seas-palms',
    title: 'البحار والنخيل',
    subtitle: 'زرقة البحار وخضرة الواحات',
    description:
      'سواحل تمتد على البحر الأحمر والخليج العربي، وشواطئ مرجانية ساحرة، واحات نخيل خضراء تحكي قصة الحضارة والتراث.',
    image:
      'https://images.pexels.com/photos/13828960/pexels-photo-13828960.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    accent: 'from-cyan-600 to-blue-800',
  },
];

export const mountains: NatureItem[] = [
  {
    id: 'jabal-al-lawz',
    name: 'جبل اللوز',
    location: 'تبوك - شمال المملكة',
    description:
      'جبل اللوز هو أعلى قمة في منطقة تبوك، يبلغ ارتفاعه نحو 2600 متر فوق سطح البحر. يتميز بقمته التي تتغطى بالثلوج في فصل الشتاء، مما يجعله ظاهرة فريدة في شمال المملكة. يضم الجبل آثاراً تاريخية ونقوشاً صخرية تعود لآلاف السنين، ويُعد مقصداً للمستكشفين وعشاق الطبيعة البكر.',
    image:
      'https://images.pexels.com/photos/36772107/pexels-photo-36772107.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'Mountain',
  },
  {
    id: 'jabal-tuwaiq',
    name: 'جبل طويق',
    location: 'الرياض - وسط المملكة',
    description:
      'طويق جبل منعزل يمتد على شكل قوس طوله أكثر من 800 كيلومتر، يطل على هضبة نجد. يتميز بمنحدراته الحادة التي ترتفع نحو 600 متر عن سطح الهضبة. يُعد من أبرز المعالم الجيولوجية في المملكة، وتشكّل ممراته التاريخية مثل ممر "العقرب" و"الفيا" مسارات للمشي والمغامرة.',
    image:
      'https://images.pexels.com/photos/10961006/pexels-photo-10961006.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'Mountain',
  },
  {
    id: 'jabal-al-souda',
    name: 'جبل السودة',
    location: 'عسير - جنوب المملكة',
    description:
      'يقع جبل السودة في منطقة عسير جنوب غرب المملكة، ويبلغ ارتفاعه نحو 3000 متر، مما يجعله من أعلى القمم في الجزيرة العربية. يتميز بمناخه المعتدل وغاباته الكثيفة وأمطاره الغزيرة، ويضم تلفريك سياحي يصل إلى قمة الجبل، ويُعد مقصداً سياحياً بارزاً في فصل الصيف.',
    image:
      'https://images.pexels.com/photos/38336046/pexels-photo-38336046.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'Mountain',
  },
];

export const deserts: NatureItem[] = [
  {
    id: 'rub-al-khali',
    name: 'الربع الخالي',
    location: 'جنوب شرق المملكة',
    description:
      'الربع الخالي هو أكبر صحراء رملية متصلة في العالم، يمتد على مساحة تزيد عن 650 ألف كيلومتر مربع عبر المملكة واليمن وعُمان. يتميز بكثبانه الرملية التي يصل ارتفاعها إلى 300 متر، وبيئته القاسية التي تمنع الحياة المستقرة، لكنه يضم ثروات طبيعية وآثاراً لحضارات قديمة.',
    image:
      'https://images.pexels.com/photos/16908875/pexels-photo-16908875.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'Sun',
  },
  {
    id: 'an-nafud',
    name: 'صحراء النفود الكبير',
    location: 'شمال المملكة',
    description:
      'صحراء النفود الكبير تقع في شمال المملكة، وتمتد على مساحة نحو 65 ألف كيلومتر مربع. تتميز برمالها الحمراء التي تأخذ أشكالاً فنية مذهلة بفعل الرياح. كانت ممراً للقوافل التاريخية، وتضم مواقع أثرية تعود لعصور ما قبل التاريخ، مما يجعلها متحفاً طبيعياً مفتوحاً.',
    image:
      'https://images.pexels.com/photos/16726602/pexels-photo-16726602.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'Sun',
  },
  {
    id: 'dahna',
    name: 'صحراء الدهناء',
    location: 'وسط المملكة',
    description:
      'الدهناء هي ممر رملي على شكل قوس يربط بين صحراء النفود شمالاً والربع الخالي جنوباً، يمتد على طول نحو 1200 كيلومتر. تتميز برمالها الذهبية وتنوعها النباتي الموسمي، وتُعد منطقة رعوية مهمة، وفاصلاً طبيعياً بين نجد والإقليم الشرقي.',
    image:
      'https://images.pexels.com/photos/28638835/pexels-photo-28638835.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'Sun',
  },
];

export const seas: NatureItem[] = [
  {
    id: 'red-sea',
    name: 'البحر الأحمر',
    location: 'الساحل الغربي للمملكة',
    description:
      'يمتد ساحل البحر الأحمر للمملكة على طول يقارب 1800 كيلومتر، من خليج العقبة شمالاً إلى حدود اليمن جنوباً. يتميز بمياهه الدافئة وشعابه المرجانية التي تُعد من أكثر النظم البيئية تنوعاً في العالم. يضم أكثر من 200 نوع من المرجان وآلاف الأنواع من الأسماك، ويُعد مقصداً عالمياً للغوص.',
    image:
      'https://images.pexels.com/photos/13828960/pexels-photo-13828960.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'Waves',
  },
  {
    id: 'arabian-gulf',
    name: 'الخليج العربي',
    location: 'الساحل الشرقي للمملكة',
    description:
      'يمتد ساحل الخليج العربي للمملكة على طول نحو 500 كيلومتر، من الكويت شمالاً إلى حدود قطر والإمارات جنوباً. يتميز بمياهه الضحلة وشواطئه الرملية الممتدة، ويضم موائل طبيعية للأسماك والقشريات. يُعد ممراً مائياً استراتيجياً وبيئة بحرية غنية بالثروة السمكية.',
    image:
      'https://images.pexels.com/photos/3525724/pexels-photo-3525724.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'Waves',
  },
  {
    id: 'neom-coast',
    name: 'ساحل نيوم المرجاني',
    location: 'تبوك - شمال غرب المملكة',
    description:
      'يمتد ساحل نيوم على البحر الأحمر على طول 460 كيلومتراً، ويضم واحداً من أكبر الشعاب المرجانية البكر في العالم. يتميز بمياهه الصافية وجزره الـ 40 الموزعة على الساحل، ومشاريعه السياحية المستدامة. يُعد من أكثر المناطق الواعدة بالتنمية السياحية والبيئية في المملكة.',
    image:
      'https://images.pexels.com/photos/31895961/pexels-photo-31895961.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'Waves',
  },
];

export const palms: NatureItem[] = [
  {
    id: 'al-ahsa',
    name: 'واحة الأحساء',
    location: 'الأحساء - شرق المملكة',
    description:
      'واحة الأحساء هي أكبر واحة نخيل طبيعية في العالم، تضم أكثر من 3 ملايين نخلة موزعة على مساحة تتجاوز 85 كيلومتراً مربعاً. سُجلت في قائمة اليونسكو للتراث العالمي عام 2018، وتُعد من أقدم الواحات المأهولة في العالم. تنتج أجود أنواع التمور العالمية، وترويها أكثر من 280 عيناً مائية طبيعية.',
    image:
      'https://images.pexels.com/photos/17877983/pexels-photo-17877983.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'TreePalm',
  },
  {
    id: 'qatif',
    name: 'واحة القطيف',
    location: 'القطيف - شرق المملكة',
    description:
      'واحة القطيف واحة تاريخية عريقة تقع على ساحل الخليج العربي، عُرفت منذ القدم بزراعة النخيل وإنتاج التمور عالية الجودة. تضم مزارع ممتدة وأنواعاً متعددة من التمور، وتُعد من المناطق الزراعية المهمة في المنطقة الشرقية، حيث تجمع بين عبق التاريخ وخصوبة الأرض.',
    image:
      'https://images.pexels.com/photos/17877601/pexels-photo-17877601.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'TreePalm',
  },
  {
    id: 'madinah-palms',
    name: 'مزارع المدينة المنورة',
    location: 'المدينة المنورة - غرب المملكة',
    description:
      'تُعرف مزارع المدينة المنورة منذ العهد النبوي بزراعة النخيل، وتضم آلاف المزارع التي تنتج أصنافاً مميزة من التمور مثل "العجوة" و"الصقعي". تُعد العجوة من أجود التمور وأكثرها قيمة، وتحظى بمكانة خاصة في التراث والثقافة السعودية، وتُسوّق عالمياً لجودتها الفريدة.',
    image:
      'https://images.pexels.com/photos/28445714/pexels-photo-28445714.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
    icon: 'TreePalm',
  },
];

export const aiClasses = [
  { name: 'الجبال', color: '#8b6f47', icon: 'Mountain' },
  { name: 'الصحراء', color: '#d4a017', icon: 'Sun' },
  { name: 'البحار', color: '#0ea5e9', icon: 'Waves' },
  { name: 'النخيل', color: '#16a34a', icon: 'TreePalm' },
];
