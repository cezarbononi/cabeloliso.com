// Conteúdo e dados comerciais do Cabeloliso.com, centralizados.
// Fonte: site cabeloliso.com, Instagram @cabeloliso.com_oficial e validações do cliente.

const wa = (phone: string, text?: string) =>
  `https://wa.me/${phone}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const business = {
  name: 'Salão Cabeloliso.com',
  founded: 2009,
  founder: 'Renildo Ferreira',
  address: {
    street: 'Rua Emanuel Guedes, 106',
    district: 'Butantã',
    city: 'São Paulo – SP',
    zip: '05540-010',
    mapEmbed: 'https://maps.google.com/maps?q=Rua%20Emanuel%20Guedes%2C%20106%20-%20Butant%C3%A3%2C%20S%C3%A3o%20Paulo%20-%20SP&z=16&output=embed',
    directions: 'https://www.google.com/maps/dir/?api=1&destination=Rua%20Emanuel%20Guedes%2C%20106%2C%20Butant%C3%A3%2C%20S%C3%A3o%20Paulo',
  },
  hours: 'Terça a sábado · 8h30 às 17h',
  phones: { booking: '(11) 98206-3088', courses: '(11) 95967-0552' },
  links: {
    booking: wa('5511982063088', 'Olá! Gostaria de agendar uma avaliação.'),
    bookingMethod: wa('5511982063088', 'Olá! Quero agendar a Compactação Capilar.'),
    whatsapp: wa('5511982063088'),
    coursePresencial: wa('5511959670552', 'Olá! Quero informações sobre a formação presencial.'),
    courseWorkshops: wa('5511959670552', 'Olá! Tenho interesse nos workshops.'),
    courseOnline: wa('5511959670552', 'Olá! Tenho interesse nos cursos online.'),
    instagram: 'https://www.instagram.com/cabeloliso.com_oficial/',
    youtube: 'https://www.youtube.com/user/MyRennys',
    facebook: 'https://www.facebook.com/cabelolisooficial/',
  },
  instagram: {
    handle: '@cabeloliso.com_oficial',
    // valor configurável — preparado para ser substituído por dados de API (ver useInstagramFollowers)
    followers: 54_200,
  },
} as const

export const media = {
  logo: { full: 'images/logo-full.png', mark: 'images/logo-mark.png', wordmark: 'images/logo-wordmark.png' },
  heroVideo: 'videos/hero-cabeloliso.mp4',
  heroPoster: 'images/resultado-01-depois.webp',
  salon: 'images/salao.webp',
  evolution: 'images/evolucao.webp',
  founder: 'images/renildo-retrato.webp',
}

export const nav = [
  { id: 'metodo', label: 'Método' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'especialista', label: 'Especialista' },
  { id: 'cursos', label: 'Cursos' },
  { id: 'contato', label: 'Contato' },
] as const

export const hero = {
  eyebrow: 'Salão especializado · Butantã, São Paulo · Desde 2009',
  title: 'Liso 100%.',
  titleAccent: 'Todo santo dia.',
  lead: 'Alisamento definitivo com tioglicolato de MEA, personalizado para cada tipo de cabelo. Sem formol e com um liso duradouro na parte tratada.',
}

export const method = {
  eyebrow: '02 — O método',
  title: 'Compactação',
  titleAccent: 'Capilar',
  lead: 'Nosso método exclusivo de alisamento definitivo: um liso natural e duradouro na parte tratada, que pede apenas o retoque da raiz conforme o cabelo cresce.',
  pillars: [
    { n: '01', title: 'Avaliação do cabelo e histórico', text: 'Comprimento, curvatura, espessura dos fios, coloração e química anterior: cada atendimento começa com uma avaliação cuidadosa e individual.' },
    { n: '02', title: 'Ferramentas exclusivas', text: 'Instrumentos criados pelo mestre dos alisamentos Renildo Ferreira, fruto de anos de dedicação ao cabelo liso.' },
    { n: '03', title: 'Formulação personalizada', text: 'Preparada na hora, de acordo com o seu tipo de cabelo. São mais de 32 combinações para adaptar o tratamento a cada cliente.' },
  ],
  steps: [
    { n: '01', title: 'Avaliação e personalização', text: 'Produtos ajustados de acordo com o seu cabelo.' },
    { n: '02', title: 'Aplicação do ativo', text: 'No comprimento a ser tratado, com pausa de 20 a 45 minutos.' },
    { n: '03', title: 'Enxágue e hidratação', text: 'Para equilibrar o pH e cuidar dos fios.' },
    { n: '04', title: 'Secagem e laminação', text: 'Com chapinha a 180 graus.' },
    { n: '05', title: 'Memorização do alisamento', text: 'Etapa que fixa o resultado.' },
    { n: '06', title: 'Enxágue e finalização', text: 'Finalização com secador, revelando o liso.' },
  ],
  aftercare: {
    title: 'Cuidados depois do alisamento',
    lead: 'Alguns hábitos simples ajudam o liso a durar mais e os fios a continuarem saudáveis.',
    items: [
      'Prefira shampoo e máscara hidratante indicados para cabelos alisados.',
      'Evite shampoos de limpeza profunda.',
      'Antes de colorir ou descolorir, converse com a nossa equipe.',
      'Para novas químicas, procure quem conhece o seu histórico.',
      'Use elásticos e prendedores que não apertem os fios.',
    ],
  },
  benefits: ['Sem formol', 'Liso duradouro na parte tratada', 'Retoque só na raiz', 'Para crespos, cacheados e ondulados, após avaliação'],
  evolution: {
    label: 'Acompanhamento real',
    text: '1ª aplicação aos 25 cm · retoques de raiz · 60 cm de liso em 18 meses',
    alt: 'Evolução de uma cliente: cabelo crespo e, após aplicações e retoques, liso de 25 cm a 60 cm em 18 meses',
  },
}

export type BeforeAfter = { id: string; caption: string }
export const results = {
  eyebrow: '03 — Resultados',
  title: 'Antes e depois,',
  titleAccent: 'sem filtro.',
  lead: 'Arraste para comparar. Fotografias reais de clientes atendidas no salão.',
  gallery: [
    { id: '05', caption: 'Cabelo crespo' },
    { id: '01', caption: 'Ondulado longo' },
    { id: '10', caption: 'Crespo com coloração' },
    { id: '08', caption: 'Cacheado de fios finos' },
    { id: '04', caption: 'Com mechas' },
    { id: '12', caption: 'Ondulado com luzes' },
  ] satisfies BeforeAfter[],
  videos: [
    { id: 'LCDA5cW-Dg4', name: 'Diane', meta: 'Alisamento definitivo · 1:51' },
    { id: 'xKA1ZYvCy5I', name: 'Débora', meta: 'Caraguatatuba · 8:37' },
    { id: 'h-8yE9J8jLc', name: 'Retoque de raiz', meta: '5 meses depois · 5:33' },
    { id: '8C1fX5ad93E', name: 'Catarina', meta: 'Profissional em Portugal · 20:39' },
  ],
  moreVideos: [
    { id: 'Cc__09DLTJ8', name: '100% de satisfação', meta: 'Depoimento de cliente · 1:01' },
    { id: 'yWkifTWKvuQ', name: 'Rafaela', meta: 'Profissional formada no curso · 1:31' },
    { id: 'WHxh4UnS8ZI', name: 'Avaliação por curvaturas', meta: 'Renildo Ferreira explica · 11:56' },
  ],
  quote: {
    text: 'Não imaginava que seria tão fácil aprender a compactar os cabelos. O curso me ensinou tudo que eu precisava saber!',
    author: 'Profissional formada no curso presencial',
  },
}

export const expert = {
  eyebrow: '04 — O especialista',
  name: 'Renildo Ferreira',
  role: 'o mestre dos alisamentos',
  paragraphs: [
    'O Cabeloliso.com nasceu em 2009, no Butantã, de um propósito do seu fundador: dedicar a carreira ao alisamento definitivo com tioglicolato personalizado.',
    'Aqui o foco é um só: o alisamento definitivo. Por isso toda a atenção vai para entender o seu cabelo e cuidar dele com técnica, no tempo e do jeito que ele pede.',
  ],
  stats: [
    { value: '2009', label: 'dedicação exclusiva ao alisamento definitivo' },
    { value: '400+', label: 'profissionais treinados no método' },
    { value: '32+', label: 'combinações de formulação' },
    { value: '9', label: 'países com salões parceiros' },
  ],
  signature: 'Uma especialidade. Um propósito.',
}

export const products = {
  eyebrow: 'Outras criações do Renildo',
  title: 'Compactação Hot Turbo.',
  lead: 'Dois produtos desenvolvidos por Renildo Ferreira para a linha Compactação Hot Turbo.',
  items: [
    {
      name: 'Turbo Protect',
      detail: 'Creme hidratante protetor · 1 L',
      image: 'images/turbo-protect.png',
      alt: 'Frasco branco Turbo Protect, creme hidratante protetor da Compactação Hot Turbo.',
      href: wa('5511982063088', 'Olá! Gostaria de saber mais sobre o Turbo Protect.'),
    },
    {
      name: 'Capa Compactação',
      detail: 'Hot Turbo',
      image: 'images/capa-compactacao.png',
      alt: 'Uma capa dourada Compactação Hot Turbo, representando o par espelhado.',
      href: wa('5511982063088', 'Olá! Gostaria de saber mais sobre a Capa Compactação Hot Turbo.'),
    },
  ],
}

// História contada pelo próprio Renildo (fonte: renildoferreira.com.br/biografia, com revisão leve de texto)
export const story = {
  button: 'Conheça a minha história',
  title: 'A minha história',
  subtitle: 'Do sertão da Paraíba ao mestre dos alisamentos',
  photo: 'images/renildo-historia.webp',
  photoAlt: 'Renildo Ferreira sorrindo e apontando para a tabela de mapeamento capilar que ele criou',
  chapters: [
    {
      year: 'Infância',
      title: 'Cresci numa barbearia',
      text: [
        'Nasci em São João do Rio do Peixe, no sertão da Paraíba, e cresci na barbearia do meu tio. Meu primeiro brinquedo foram os cabelos que caíam no chão: minha mãe me colocava para engatinhar e eu ia direto na direção dos fios.',
        'Aos 15 anos peguei numa tesoura pela primeira vez, na lã das ovelhas que meu pai criava. Ele não achou nada legal. O meu primeiro cliente de verdade foi meu irmão caçula.',
      ],
    },
    {
      year: '1987',
      title: 'São Paulo, a pizzaria e a primeira escola',
      text: [
        'Com 17 anos e meio, viajei quatro dias de ônibus até São Paulo. Ao descer no bairro onde ia morar, a primeira coisa que vi foi uma barbearia, com um senhor cortando cabelo com uma precisão que eu nunca tinha visto.',
        'Arrumei trabalho lavando pratos numa pizzaria. Um colega garçom fazia curso de cabeleireiro, me levou até a escola e eu me matriculei no mesmo dia. Foram nove meses sem perder uma aula. Mas todo salão pedia cinco anos de experiência.',
      ],
    },
    {
      year: '1989',
      title: 'De volta ao sertão, com uma novidade na mochila',
      text: [
        'Voltei para a Paraíba levando uma máquina de cortar cabelo, novidade no mercado. Consegui a vaga no salão mais badalado da cidade no mesmo dia. No mês seguinte, uma novela lançou o corte na máquina 2 e formava fila para cortar comigo.',
        'Aos 19 anos montei meu primeiro salão: 20 metros quadrados, uma cadeira, um espelho e um banco de madeira feito pelo meu pai. Aos domingos, pedalava 14 quilômetros para atender uma comunidade e aceitava arroz, feijão e galinhas como pagamento.',
      ],
    },
    {
      year: '1995',
      title: 'Recomeçar do zero em São Paulo',
      text: [
        'Voltei a São Paulo com cinco anos de experiência como dono de salão e abri um espaço de 25 metros quadrados, sem nenhum cliente. A estratégia foi abrir uma hora antes e fechar uma hora depois dos concorrentes. Deu certo: em um ano mudei para um espaço de 60 metros quadrados.',
      ],
    },
    {
      year: '2002',
      title: 'O alisamento e a criação do método',
      text: [
        'Quando a escova definitiva chegou ao Brasil, apostei na novidade. Em três anos eu tinha o salão mais conhecido da região em alisamento, mas não estava satisfeito com alguns resultados.',
        'Passei a estudar dia e noite os produtos que modificam a estrutura dos fios e os cabelos do mundo todo, para criar um método com resultado seguro para quem aplica e para quem recebe. Assim nasceram o Sistema de Compactação Capilar, as ferramentas próprias e a primeira tabela de mapeamento capilar, com mais de 80 tipos de cabelo.',
      ],
    },
    {
      year: '2009',
      title: 'Nasce o Cabeloliso.com',
      text: [
        'Procurei um nome que as pessoas encontrassem ao buscar por "cabelo liso". Comprei uma câmera de 2 megapixels, depois uma que filmava, e comecei a registrar cada alisamento no YouTube. Profissionais começaram a perguntar qual era o produto, e eu explicava: o resultado não está no martelo, mas em quem dá as marteladas.',
        'Passei a ensinar o método no meu salão. A primeira aluna veio da Bélgica.',
      ],
    },
    {
      year: '2012',
      title: 'Um salão só para o liso',
      text: [
        'A procura não parava de crescer, e era hora de dar um lar ao método. Assim nasceu o salão Cabeloliso.com: um espaço pensado para receber as clientes com calma e para formar novos profissionais na técnica.',
        'De lá para cá, mais de 400 profissionais aprenderam o método, e hoje há salões parceiros em 9 países. Cada cabelo liso que sai daqui carrega um pouco daquele menino que brincava com os fios no chão da barbearia. E essa história ainda está sendo escrita.',
      ],
    },
  ],
}

// Galeria: sessão de fotos no salão (fonte: renildoferreira.com.br)
export const gallery = {
  eyebrow: '05 — Galeria',
  title: 'Por dentro',
  titleAccent: 'do salão.',
  photos: [
    { src: 'images/galeria-01.webp', alt: 'Cliente de cabelo ondulado ao lado do Renildo, antes do alisamento', tall: true, caption: 'Antes' },
    { src: 'images/galeria-02.webp', alt: 'Renildo mostrando o cabelo da cliente já liso, de costas', tall: true, caption: 'Depois' },
    { src: 'images/galeria-03.webp', alt: 'Cabelo castanho liso e brilhante da cliente, visto de costas', tall: true, caption: 'Pronto' },
    { src: 'images/galeria-04.webp', alt: 'Renildo sorrindo enquanto finaliza o cabelo de uma cliente no salão', caption: 'Finalização' },
    { src: 'images/galeria-05.webp', alt: 'Renildo secando e alinhando o cabelo de uma cliente com escova', caption: 'Secagem' },
    { src: 'images/galeria-06.webp', alt: 'Renildo aplicando secador no cabelo de uma cliente', caption: 'Escova' },
    { src: 'images/galeria-07.webp', alt: 'Renildo examinando o cabelo de uma cliente no salão', caption: 'Avaliação' },
    { src: 'images/galeria-08.webp', alt: 'Renildo aplicando produto no cabelo de uma cliente sentada', caption: 'Aplicação' },
  ],
}

// Equipe: quando as fotos chegarem, preencha `photo` (ex.: 'images/equipe-day.webp') e troque `role`/`text`
export type TeamMember = { name: string; role: string; text: string; photo?: string }
export const team = {
  eyebrow: '06 — Equipe',
  title: 'Nossa',
  titleAccent: 'equipe.',
  lead: 'Ao lado do Renildo, uma equipe treinada no método acompanha você em cada etapa.',
  members: [
    { name: 'Day', role: 'Colaboradora', text: 'Descrição em breve.' },
    { name: 'Ivan', role: 'Colaborador', text: 'Descrição em breve.' },
  ] as TeamMember[],
}

export const courses = {
  eyebrow: '08 — Educação',
  title: 'Seja um profissional',
  titleAccent: 'avançado',
  lead: 'O método que já formou mais de 400 profissionais no Brasil e no mundo.',
  items: [
    {
      n: '01', status: 'open' as const, tag: 'Inscrições abertas', title: 'Formação presencial', meta: '3 dias · Salão sede, Butantã',
      topics: ['Anamnese capilar e testes de mechas', 'Cabelos quimicamente tratados', 'Formulações, ajuste de pH e personalização', 'Passo a passo completo e modelo de salão'],
      cta: 'Quero me inscrever', href: business.links.coursePresencial,
    },
    {
      n: '02', status: 'soon' as const, tag: 'Em breve', title: 'Workshops', meta: 'Encontros temáticos · Vagas reduzidas',
      text: 'Imersões curtas em temas específicos do alisamento definitivo, para profissionais que desejam aprofundar a técnica.',
      cta: 'Tenho interesse', href: business.links.courseWorkshops,
    },
    {
      n: '03', status: 'soon' as const, tag: 'Em breve', title: 'Cursos online', meta: 'No seu ritmo · Onde estiver',
      text: 'O conhecimento do método em formato digital, para profissionais de qualquer cidade ou país.',
      cta: 'Tenho interesse', href: business.links.courseOnline,
    },
  ],
}

export const faq = {
  eyebrow: '07 — Dúvidas',
  title: 'Perguntas',
  titleAccent: 'frequentes.',
  groups: [
    {
      label: 'Para clientes',
      items: [
        { q: 'O método funciona para o meu tipo de cabelo?', a: 'Atendemos cabelos crespos, cacheados, ondulados e frisados, dos fios mais finos aos mais grossos. Antes de tudo fazemos uma avaliação, para conferir se os fios estão saudáveis e prontos para o procedimento.' },
        { q: 'O alisamento tem formol?', a: 'Não. A técnica não usa formol, ácidos fórmicos nem seus derivados.' },
        { q: 'Tenho cabelo colorido ou com outra química. Posso fazer?', a: 'Na maioria dos casos, sim. O resultado depende da saúde dos fios, por isso a avaliação individual é sempre o primeiro passo.' },
        { q: 'Quanto tempo dura?', a: 'A parte tratada continua lisa depois das lavagens. Conforme o cabelo cresce, basta retocar a raiz, normalmente depois de alguns meses.' },
        { q: 'Dá para fazer em casa?', a: 'O ideal é fazer no salão. O resultado vem da técnica e da formulação preparada na hora para o seu cabelo, e não apenas do produto.' },
      ],
    },
    {
      label: 'Para profissionais',
      items: [
        { q: 'Como me torno um profissional do método?', a: 'Pela formação presencial no salão sede. Fale com a nossa equipe de cursos pelo WhatsApp para saber as próximas turmas.' },
        { q: 'Preciso mudar o nome do meu salão?', a: 'Não. Você trabalha com o método mantendo o nome do seu próprio salão.' },
        { q: 'Tenho desconto na reposição de produtos?', a: 'Sim. Profissionais formados têm desconto na reposição, tanto para uso no salão quanto para revenda.' },
      ],
    },
  ],
}

export const contact = {
  eyebrow: '09 — Visite o salão',
  finalTitle: 'Seu liso definitivo começa',
  finalAccent: 'com uma avaliação.',
  finalLead: 'Mande uma foto do seu cabelo limpo e seco pelo WhatsApp e a nossa equipe te orienta sobre o melhor caminho.',
}

// Faixas em movimento e frase de transição entre seções
export const transitions = {
  marqueeTop: ['Liso 100%', 'Sem formol', 'Tioglicolato de MEA', 'Retoque só na raiz', 'Desde 2009'],
  marqueeBottom: ['Agende sua avaliação', 'Butantã · São Paulo', 'Terça a sábado', 'Liso todo santo dia'],
  statement: {
    eyebrow: 'Uma especialidade',
    text: 'Desde 2009, uma única obsessão: entender cada cabelo e entregar o liso que ele merece.',
  },
}
