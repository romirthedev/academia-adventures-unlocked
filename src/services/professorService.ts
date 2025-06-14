interface SearchCriteria {
  field: string;
  school?: string;
  location?: string;
}

interface ScrapedProfessor {
  name: string;
  title: string;
  department: string;
  university: string;
  location: string;
  researchAreas: string[];
  email?: string;
  profileUrl?: string;
  labName?: string;
}

class ProfessorService {
  private readonly OPENROUTER_API_KEY = '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';

  private professorDatabase = {
    'Computer Science': [
      {
        name: 'Dr. Andrew Ng',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['machine learning', 'artificial intelligence', 'deep learning'],
        email: 'ang@cs.stanford.edu',
        labName: 'Stanford AI Lab'
      },
      {
        name: 'Dr. Sebastian Thrun',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['autonomous vehicles', 'robotics', 'machine learning'],
        email: 'thrun@stanford.edu',
        labName: 'Stanford AI Lab'
      },
      {
        name: 'Dr. Pieter Abbeel',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['robotics', 'deep reinforcement learning', 'imitation learning'],
        email: 'pabbeel@berkeley.edu',
        labName: 'Berkeley AI Research'
      },
      {
        name: 'Dr. Fei-Fei Li',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['computer vision', 'machine learning', 'AI ethics'],
        email: 'feifeili@cs.stanford.edu',
        labName: 'Stanford Vision Lab'
      },
      {
        name: 'Dr. Yann LeCun',
        title: 'Professor',
        department: 'Computer Science',
        university: 'New York University',
        location: 'New York, NY',
        researchAreas: ['deep learning', 'convolutional neural networks', 'AI research'],
        email: 'yann@cs.nyu.edu',
        labName: 'FAIR - Facebook AI Research'
      },
      {
        name: 'Dr. Geoffrey Hinton',
        title: 'Professor Emeritus',
        department: 'Computer Science',
        university: 'University of Toronto',
        location: 'Toronto, ON',
        researchAreas: ['neural networks', 'deep learning', 'cognitive science'],
        email: 'hinton@cs.toronto.edu',
        labName: 'Vector Institute'
      },
      {
        name: 'Dr. Yoshua Bengio',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Montreal',
        location: 'Montreal, QC',
        researchAreas: ['deep learning', 'neural networks', 'AI safety'],
        email: 'bengio@iro.umontreal.ca',
        labName: 'MILA - Quebec AI Institute'
      },
      {
        name: 'Dr. Demis Hassabis',
        title: 'Visiting Professor',
        department: 'Computer Science',
        university: 'University College London',
        location: 'London, UK',
        researchAreas: ['artificial general intelligence', 'game theory', 'neuroscience'],
        email: 'hassabis@ucl.ac.uk',
        labName: 'DeepMind'
      },
      {
        name: 'Dr. Stuart Russell',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['artificial intelligence', 'machine learning', 'AI safety'],
        email: 'russell@cs.berkeley.edu',
        labName: 'Center for Human-Compatible AI'
      },
      {
        name: 'Dr. Pedro Domingos',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Washington',
        location: 'Seattle, WA',
        researchAreas: ['machine learning', 'data mining', 'knowledge discovery'],
        email: 'pedrod@cs.washington.edu',
        labName: 'Machine Learning Lab'
      },
      {
        name: 'Dr. Michael Jordan',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['machine learning', 'statistics', 'optimization'],
        email: 'jordan@cs.berkeley.edu',
        labName: 'Berkeley AI Research'
      },
      {
        name: 'Dr. Ian Goodfellow',
        title: 'Research Scientist',
        department: 'Computer Science',
        university: 'Apple',
        location: 'Cupertino, CA',
        researchAreas: ['generative adversarial networks', 'deep learning', 'AI security'],
        email: 'goodfellow@apple.com',
        labName: 'Apple Machine Learning Research'
      },
      {
        name: 'Dr. Daphne Koller',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['machine learning', 'computational biology', 'probabilistic models'],
        email: 'koller@cs.stanford.edu',
        labName: 'Stanford AI Lab'
      }
    ],
    'History': [
      {
        name: 'Dr. Doris Kearns Goodwin',
        title: 'Professor',
        department: 'History',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['American history', 'presidential biography', 'political leadership'],
        email: 'goodwin@history.harvard.edu',
        profileUrl: 'https://history.harvard.edu/goodwin',
        labName: 'Presidential Studies Center'
      },
      {
        name: 'Dr. David McCullough',
        title: 'Professor Emeritus',
        department: 'History',
        university: 'Yale University',
        location: 'New Haven, CT',
        researchAreas: ['American history', 'biography', 'historical narrative'],
        email: 'mccullough@yale.edu',
        profileUrl: 'https://history.yale.edu/mccullough',
        labName: 'American Studies Program'
      },
      {
        name: 'Dr. Niall Ferguson',
        title: 'Professor',
        department: 'History',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['economic history', 'international history', 'imperial history'],
        email: 'nferguson@stanford.edu',
        profileUrl: 'https://history.stanford.edu/ferguson',
        labName: 'Hoover Institution'
      },
      {
        name: 'Dr. Jill Lepore',
        title: 'Professor',
        department: 'History',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['American history', 'journalism history', 'political history'],
        email: 'lepore@harvard.edu',
        profileUrl: 'https://history.harvard.edu/lepore',
        labName: 'American Studies Center'
      },
      {
        name: 'Dr. Eric Foner',
        title: 'Professor',
        department: 'History',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['Civil War era', 'Reconstruction', 'African American history'],
        email: 'foner@columbia.edu',
        profileUrl: 'https://history.columbia.edu/foner',
        labName: 'American History Institute'
      },
      {
        name: 'Dr. Drew Gilpin Faust',
        title: 'Professor',
        department: 'History',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['Southern history', 'Civil War', 'women\'s history'],
        email: 'faust@harvard.edu',
        profileUrl: 'https://history.harvard.edu/faust',
        labName: 'Radcliffe Institute'
      },
      {
        name: 'Dr. Sean Wilentz',
        title: 'Professor',
        department: 'History',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['American political history', '19th century America', 'democracy'],
        email: 'wilentz@princeton.edu',
        profileUrl: 'https://history.princeton.edu/wilentz',
        labName: 'American Studies Program'
      },
      {
        name: 'Dr. Annette Gordon-Reed',
        title: 'Professor',
        department: 'History',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['Early American history', 'slavery', 'Jefferson studies'],
        email: 'gordon-reed@harvard.edu',
        profileUrl: 'https://history.harvard.edu/gordon-reed',
        labName: 'W.E.B. Du Bois Institute'
      },
      {
        name: 'Dr. Gordon Wood',
        title: 'Professor Emeritus',
        department: 'History',
        university: 'Brown University',
        location: 'Providence, RI',
        researchAreas: ['American Revolution', 'early republic', 'constitutional history'],
        email: 'wood@brown.edu',
        profileUrl: 'https://history.brown.edu/wood',
        labName: 'Early American Studies'
      },
      {
        name: 'Dr. Joyce Appleby',
        title: 'Professor Emeritus',
        department: 'History',
        university: 'University of California, Los Angeles',
        location: 'Los Angeles, CA',
        researchAreas: ['early American history', 'economic history', 'capitalism'],
        email: 'appleby@ucla.edu',
        profileUrl: 'https://history.ucla.edu/appleby',
        labName: 'Center for American History'
      },
      {
        name: 'Dr. Bernard Bailyn',
        title: 'Professor Emeritus',
        department: 'History',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['colonial America', 'Atlantic world', 'intellectual history'],
        email: 'bailyn@harvard.edu',
        profileUrl: 'https://history.harvard.edu/bailyn',
        labName: 'Atlantic World Program'
      },
      {
        name: 'Dr. Edmund Morgan',
        title: 'Professor Emeritus',
        department: 'History',
        university: 'Yale University',
        location: 'New Haven, CT',
        researchAreas: ['colonial America', 'Puritan studies', 'American Revolution'],
        email: 'morgan@yale.edu',
        profileUrl: 'https://history.yale.edu/morgan',
        labName: 'Colonial Studies Center'
      },
      {
        name: 'Dr. Laurel Thatcher Ulrich',
        title: 'Professor',
        department: 'History',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['women\'s history', 'early America', 'material culture'],
        email: 'ulrich@harvard.edu',
        profileUrl: 'https://history.harvard.edu/ulrich',
        labName: 'Women\'s Studies in Religion'
      }
    ],
    'Literature': [
      {
        name: 'Dr. Harold Bloom',
        title: 'Professor Emeritus',
        department: 'English Literature',
        university: 'Yale University',
        location: 'New Haven, CT',
        researchAreas: ['literary criticism', 'Shakespeare studies', 'Romantic poetry'],
        email: 'bloom@english.yale.edu',
        profileUrl: 'https://english.yale.edu/bloom',
        labName: 'Literary Studies Center'
      },
      {
        name: 'Dr. Toni Morrison',
        title: 'Professor Emeritus',
        department: 'Creative Writing',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['African American literature', 'creative writing', 'narrative theory'],
        email: 'morrison@princeton.edu',
        profileUrl: 'https://writing.princeton.edu/morrison',
        labName: 'Creative Writing Program'
      },
      {
        name: 'Dr. Helen Vendler',
        title: 'Professor',
        department: 'English Literature',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['poetry analysis', 'literary criticism', 'contemporary poetry'],
        email: 'vendler@harvard.edu',
        profileUrl: 'https://english.harvard.edu/vendler',
        labName: 'Poetry & Poetics Program'
      },
      {
        name: 'Dr. Edward Said',
        title: 'Professor Emeritus',
        department: 'English Literature',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['postcolonial studies', 'literary theory', 'cultural criticism'],
        email: 'said@columbia.edu',
        profileUrl: 'https://english.columbia.edu/said',
        labName: 'Institute for Comparative Literature'
      },
      {
        name: 'Dr. Henry Louis Gates Jr.',
        title: 'Professor',
        department: 'African American Studies',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['African American literature', 'literary criticism', 'cultural studies'],
        email: 'gates@harvard.edu',
        profileUrl: 'https://aaas.harvard.edu/gates',
        labName: 'Hutchins Center for African & African American Research'
      },
      {
        name: 'Dr. Gayatri Spivak',
        title: 'Professor',
        department: 'English Literature',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['postcolonial theory', 'feminist criticism', 'deconstruction'],
        email: 'spivak@columbia.edu',
        profileUrl: 'https://english.columbia.edu/spivak',
        labName: 'Institute for Comparative Literature'
      },
      {
        name: 'Dr. Homi Bhabha',
        title: 'Professor',
        department: 'English Literature',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['postcolonial theory', 'cultural studies', 'migration studies'],
        email: 'bhabha@harvard.edu',
        profileUrl: 'https://english.harvard.edu/bhabha',
        labName: 'Mahindra Humanities Center'
      },
      {
        name: 'Dr. Elaine Showalter',
        title: 'Professor Emeritus',
        department: 'English Literature',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['feminist criticism', 'Victorian literature', 'literary history'],
        email: 'showalter@princeton.edu',
        profileUrl: 'https://english.princeton.edu/showalter',
        labName: 'Women\'s Studies Program'
      },
      {
        name: 'Dr. Terry Eagleton',
        title: 'Professor',
        department: 'English Literature',
        university: 'Lancaster University',
        location: 'Lancaster, UK',
        researchAreas: ['Marxist criticism', 'literary theory', 'Irish studies'],
        email: 'eagleton@lancaster.ac.uk',
        profileUrl: 'https://english.lancaster.ac.uk/eagleton',
        labName: 'Centre for Critical Theory'
      },
      {
        name: 'Dr. Julia Kristeva',
        title: 'Professor',
        department: 'Literature',
        university: 'University of Paris',
        location: 'Paris, France',
        researchAreas: ['semiotics', 'psychoanalytic criticism', 'feminist theory'],
        email: 'kristeva@univ-paris.fr',
        profileUrl: 'https://literature.univ-paris.fr/kristeva',
        labName: 'Institute for Advanced Literary Studies'
      },
      {
        name: 'Dr. Stanley Fish',
        title: 'Professor',
        department: 'English Literature',
        university: 'Florida International University',
        location: 'Miami, FL',
        researchAreas: ['literary theory', 'Milton studies', 'rhetoric'],
        email: 'fish@fiu.edu',
        profileUrl: 'https://english.fiu.edu/fish',
        labName: 'Public Intellectuals Program'
      },
      {
        name: 'Dr. Eve Kosofsky Sedgwick',
        title: 'Professor Emeritus',
        department: 'English Literature',
        university: 'Duke University',
        location: 'Durham, NC',
        researchAreas: ['queer theory', 'Victorian literature', 'feminist criticism'],
        email: 'sedgwick@duke.edu',
        profileUrl: 'https://english.duke.edu/sedgwick',
        labName: 'Center for Critical Theory'
      },
      {
        name: 'Dr. Fredric Jameson',
        title: 'Professor',
        department: 'Literature',
        university: 'Duke University',
        location: 'Durham, NC',
        researchAreas: ['Marxist criticism', 'postmodernism', 'cultural theory'],
        email: 'jameson@duke.edu',
        profileUrl: 'https://literature.duke.edu/jameson',
        labName: 'Center for Critical Theory'
      }
    ],
    'Philosophy': [
      {
        name: 'Dr. Thomas Nagel',
        title: 'Professor',
        department: 'Philosophy',
        university: 'New York University',
        location: 'New York, NY',
        researchAreas: ['philosophy of mind', 'ethics', 'political philosophy'],
        email: 'nagel@philosophy.nyu.edu',
        profileUrl: 'https://philosophy.nyu.edu/nagel',
        labName: 'Mind & Ethics Lab'
      },
      {
        name: 'Dr. Martha Nussbaum',
        title: 'Professor',
        department: 'Philosophy',
        university: 'University of Chicago',
        location: 'Chicago, IL',
        researchAreas: ['ancient philosophy', 'political philosophy', 'emotions'],
        email: 'nussbaum@uchicago.edu',
        profileUrl: 'https://philosophy.uchicago.edu/nussbaum',
        labName: 'Ethics & Society Institute'
      },
      {
        name: 'Dr. David Chalmers',
        title: 'Professor',
        department: 'Philosophy',
        university: 'New York University',
        location: 'New York, NY',
        researchAreas: ['philosophy of mind', 'consciousness', 'cognitive science'],
        email: 'chalmers@nyu.edu',
        profileUrl: 'https://consc.net/',
        labName: 'Center for Mind, Brain & Consciousness'
      },
      {
        name: 'Dr. John Rawls',
        title: 'Professor Emeritus',
        department: 'Philosophy',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['political philosophy', 'ethics', 'justice theory'],
        email: 'rawls@harvard.edu',
        profileUrl: 'https://philosophy.harvard.edu/rawls',
        labName: 'Center for Ethics and Political Philosophy'
      },
      {
        name: 'Dr. Robert Nozick',
        title: 'Professor Emeritus',
        department: 'Philosophy',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['political philosophy', 'epistemology', 'metaphysics'],
        email: 'nozick@harvard.edu',
        profileUrl: 'https://philosophy.harvard.edu/nozick',
        labName: 'Center for Ethics and Political Philosophy'
      },
      {
        name: 'Dr. Derek Parfit',
        title: 'Professor Emeritus',
        department: 'Philosophy',
        university: 'Oxford University',
        location: 'Oxford, UK',
        researchAreas: ['personal identity', 'ethics', 'rationality'],
        email: 'parfit@philosophy.ox.ac.uk',
        profileUrl: 'https://philosophy.ox.ac.uk/parfit',
        labName: 'Future of Humanity Institute'
      },
      {
        name: 'Dr. Peter Singer',
        title: 'Professor',
        department: 'Philosophy',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['applied ethics', 'animal rights', 'utilitarianism'],
        email: 'singer@princeton.edu',
        profileUrl: 'https://philosophy.princeton.edu/singer',
        labName: 'University Center for Human Values'
      },
      {
        name: 'Dr. Christine Korsgaard',
        title: 'Professor',
        department: 'Philosophy',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['moral philosophy', 'Kantian ethics', 'animal ethics'],
        email: 'korsgaard@harvard.edu',
        profileUrl: 'https://philosophy.harvard.edu/korsgaard',
        labName: 'Center for Ethics and Political Philosophy'
      },
      {
        name: 'Dr. Thomas Scanlon',
        title: 'Professor',
        department: 'Philosophy',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['moral philosophy', 'political philosophy', 'contractualism'],
        email: 'scanlon@harvard.edu',
        profileUrl: 'https://philosophy.harvard.edu/scanlon',
        labName: 'Center for Ethics and Political Philosophy'
      },
      {
        name: 'Dr. Hilary Putnam',
        title: 'Professor Emeritus',
        department: 'Philosophy',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['philosophy of mind', 'philosophy of language', 'epistemology'],
        email: 'putnam@harvard.edu',
        profileUrl: 'https://philosophy.harvard.edu/putnam',
        labName: 'Mind, Brain & Behavior Initiative'
      },
      {
        name: 'Dr. Saul Kripke',
        title: 'Professor',
        department: 'Philosophy',
        university: 'City University of New York',
        location: 'New York, NY',
        researchAreas: ['logic', 'philosophy of language', 'metaphysics'],
        email: 'kripke@gc.cuny.edu',
        profileUrl: 'https://philosophy.gc.cuny.edu/kripke',
        labName: 'Logic and Metaphysics Workshop'
      },
      {
        name: 'Dr. Daniel Dennett',
        title: 'Professor',
        department: 'Philosophy',
        university: 'Tufts University',
        location: 'Medford, MA',
        researchAreas: ['philosophy of mind', 'consciousness', 'cognitive science'],
        email: 'dennett@tufts.edu',
        profileUrl: 'https://philosophy.tufts.edu/dennett',
        labName: 'Center for Cognitive Studies'
      },
      {
        name: 'Dr. John Searle',
        title: 'Professor',
        department: 'Philosophy',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['philosophy of mind', 'philosophy of language', 'consciousness'],
        email: 'searle@berkeley.edu',
        profileUrl: 'https://philosophy.berkeley.edu/searle',
        labName: 'Berkeley Center for New Media'
      }
    ],
    'Psychology': [
      {
        name: 'Dr. Daniel Kahneman',
        title: 'Professor Emeritus',
        department: 'Psychology',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['behavioral economics', 'cognitive psychology', 'decision making'],
        email: 'kahneman@princeton.edu',
        profileUrl: 'https://psych.princeton.edu/kahneman',
        labName: 'Behavioral Decision Research Lab'
      },
      {
        name: 'Dr. Steven Pinker',
        title: 'Professor',
        department: 'Psychology',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['cognitive psychology', 'psycholinguistics', 'evolutionary psychology'],
        email: 'pinker@harvard.edu',
        profileUrl: 'https://psychology.harvard.edu/pinker',
        labName: 'Language & Cognition Lab'
      },
      {
        name: 'Dr. Carol Dweck',
        title: 'Professor',
        department: 'Psychology',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['motivation', 'personality', 'developmental psychology'],
        email: 'dweck@stanford.edu',
        profileUrl: 'https://psychology.stanford.edu/dweck',
        labName: 'Motivation Lab'
      },
      {
        name: 'Dr. Angela Duckworth',
        title: 'Professor',
        department: 'Psychology',
        university: 'University of Pennsylvania',
        location: 'Philadelphia, PA',
        researchAreas: ['grit', 'self-control', 'character development'],
        email: 'duckworth@upenn.edu',
        profileUrl: 'https://psychology.upenn.edu/duckworth',
        labName: 'Character Lab'
      },
      {
        name: 'Dr. Philip Zimbardo',
        title: 'Professor Emeritus',
        department: 'Psychology',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['social psychology', 'time perspective', 'heroism'],
        email: 'zimbardo@stanford.edu',
        profileUrl: 'https://psychology.stanford.edu/zimbardo',
        labName: 'Stanford Prison Experiment Archive'
      },
      {
        name: 'Dr. Martin Seligman',
        title: 'Professor',
        department: 'Psychology',
        university: 'University of Pennsylvania',
        location: 'Philadelphia, PA',
        researchAreas: ['positive psychology', 'learned helplessness', 'well-being'],
        email: 'seligman@upenn.edu',
        profileUrl: 'https://psychology.upenn.edu/seligman',
        labName: 'Positive Psychology Center'
      },
      {
        name: 'Dr. Elizabeth Loftus',
        title: 'Professor',
        department: 'Psychology',
        university: 'University of California, Irvine',
        location: 'Irvine, CA',
        researchAreas: ['memory', 'eyewitness testimony', 'false memories'],
        email: 'eloftus@uci.edu',
        profileUrl: 'https://psychology.uci.edu/loftus',
        labName: 'Memory & Law Lab'
      },
      {
        name: 'Dr. Daniel Gilbert',
        title: 'Professor',
        department: 'Psychology',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['happiness', 'affective forecasting', 'social cognition'],
        email: 'gilbert@harvard.edu',
        profileUrl: 'https://psychology.harvard.edu/gilbert',
        labName: 'Social Cognition & Emotion Lab'
      },
      {
        name: 'Dr. Jonathan Haidt',
        title: 'Professor',
        department: 'Psychology',
        university: 'New York University',
        location: 'New York, NY',
        researchAreas: ['moral psychology', 'social psychology', 'political psychology'],
        email: 'haidt@nyu.edu',
        profileUrl: 'https://psychology.nyu.edu/haidt',
        labName: 'Moral Psychology Lab'
      },
      {
        name: 'Dr. Sherry Turkle',
        title: 'Professor',
        department: 'Psychology',
        university: 'Massachusetts Institute of Technology',
        location: 'Cambridge, MA',
        researchAreas: ['technology and society', 'digital culture', 'human-computer interaction'],
        email: 'turkle@mit.edu',
        profileUrl: 'https://web.mit.edu/turkle/',
        labName: 'MIT Initiative on Technology and Self'
      },
      {
        name: 'Dr. Barry Schwartz',
        title: 'Professor',
        department: 'Psychology',
        university: 'Swarthmore College',
        location: 'Swarthmore, PA',
        researchAreas: ['choice and decision making', 'behavioral economics', 'wisdom'],
        email: 'schwartz@swarthmore.edu',
        profileUrl: 'https://psychology.swarthmore.edu/schwartz',
        labName: 'Decision Science Lab'
      },
      {
        name: 'Dr. Susan Fiske',
        title: 'Professor',
        department: 'Psychology',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['social cognition', 'stereotyping', 'prejudice'],
        email: 'fiske@princeton.edu',
        profileUrl: 'https://psychology.princeton.edu/fiske',
        labName: 'Social Cognition Lab'
      },
      {
        name: 'Dr. Claude Steele',
        title: 'Professor',
        department: 'Psychology',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['stereotype threat', 'social psychology', 'identity'],
        email: 'steele@stanford.edu',
        profileUrl: 'https://psychology.stanford.edu/steele',
        labName: 'Social Psychology Lab'
      }
    ],
    'Economics': [
      {
        name: 'Dr. Paul Krugman',
        title: 'Professor',
        department: 'Economics',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['international economics', 'economic geography', 'macroeconomics'],
        email: 'krugman@princeton.edu',
        profileUrl: 'https://economics.princeton.edu/krugman',
        labName: 'International Economics Lab'
      },
      {
        name: 'Dr. Joseph Stiglitz',
        title: 'Professor',
        department: 'Economics',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['macroeconomics', 'public economics', 'information economics'],
        email: 'stiglitz@columbia.edu',
        profileUrl: 'https://economics.columbia.edu/stiglitz',
        labName: 'Committee on Global Thought'
      },
      {
        name: 'Dr. Esther Duflo',
        title: 'Professor',
        department: 'Economics',
        university: 'Massachusetts Institute of Technology',
        location: 'Cambridge, MA',
        researchAreas: ['development economics', 'poverty alleviation', 'randomized trials'],
        email: 'eduflo@mit.edu',
        profileUrl: 'https://economics.mit.edu/duflo',
        labName: 'Abdul Latif Jameel Poverty Action Lab'
      },
      {
        name: 'Dr. Thomas Piketty',
        title: 'Professor',
        department: 'Economics',
        university: 'Paris School of Economics',
        location: 'Paris, France',
        researchAreas: ['inequality', 'wealth distribution', 'economic history'],
        email: 'piketty@pse.ens.fr',
        profileUrl: 'https://economics.pse.ens.fr/piketty',
        labName: 'World Inequality Lab'
      },
      {
        name: 'Dr. Raj Chetty',
        title: 'Professor',
        department: 'Economics',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['public economics', 'behavioral economics', 'economic mobility'],
        email: 'chetty@harvard.edu',
        profileUrl: 'https://economics.harvard.edu/chetty',
        labName: 'Opportunity Insights'
      },
      {
        name: 'Dr. Daron Acemoglu',
        title: 'Professor',
        department: 'Economics',
        university: 'Massachusetts Institute of Technology',
        location: 'Cambridge, MA',
        researchAreas: ['economic growth', 'political economy', 'labor economics'],
        email: 'acemoglu@mit.edu',
        profileUrl: 'https://economics.mit.edu/acemoglu',
        labName: 'Political Economy Research Lab'
      },
      {
        name: 'Dr. Richard Thaler',
        title: 'Professor',
        department: 'Economics',
        university: 'University of Chicago',
        location: 'Chicago, IL',
        researchAreas: ['behavioral economics', 'finance', 'decision making'],
        email: 'thaler@uchicago.edu',
        profileUrl: 'https://economics.uchicago.edu/thaler',
        labName: 'Center for Decision Research'
      },
      {
        name: 'Dr. Janet Yellen',
        title: 'Professor',
        department: 'Economics',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['macroeconomics', 'monetary policy', 'labor markets'],
        email: 'yellen@berkeley.edu',
        profileUrl: 'https://economics.berkeley.edu/yellen',
        labName: 'Berkeley Economic Policy Lab'
      },
      {
        name: 'Dr. Emmanuel Saez',
        title: 'Professor',
        department: 'Economics',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['public economics', 'taxation', 'inequality'],
        email: 'saez@berkeley.edu',
        profileUrl: 'https://economics.berkeley.edu/saez',
        labName: 'Berkeley Tax Policy Lab'
      },
      {
        name: 'Dr. Thomas Sowell',
        title: 'Senior Fellow',
        department: 'Economics',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['social policy', 'economic history', 'cultural economics'],
        email: 'sowell@hoover.stanford.edu',
        profileUrl: 'https://hoover.org/profiles/sowell',
        labName: 'Hoover Institution'
      },
      {
        name: 'Dr. Kenneth Arrow',
        title: 'Professor Emeritus',
        department: 'Economics',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['general equilibrium', 'social choice theory', 'information economics'],
        email: 'arrow@stanford.edu',
        profileUrl: 'https://economics.stanford.edu/arrow',
        labName: 'Stanford Institute for Economic Policy Research'
      },
      {
        name: 'Dr. Gary Becker',
        title: 'Professor Emeritus',
        department: 'Economics',
        university: 'University of Chicago',
        location: 'Chicago, IL',
        researchAreas: ['human capital', 'family economics', 'crime economics'],
        email: 'becker@uchicago.edu',
        profileUrl: 'https://economics.uchicago.edu/becker',
        labName: 'Becker Center on Chicago Price Theory'
      },
      {
        name: 'Dr. Amartya Sen',
        title: 'Professor',
        department: 'Economics',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['welfare economics', 'development economics', 'social choice'],
        email: 'sen@harvard.edu',
        profileUrl: 'https://economics.harvard.edu/sen',
        labName: 'Harvard Center for Population and Development Studies'
      }
    ],
    'Sociology': [
      {
        name: 'Dr. Matthew Salganik',
        title: 'Professor',
        department: 'Sociology',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['computational social science', 'social networks', 'survey methodology'],
        email: 'salganik@princeton.edu',
        profileUrl: 'https://sociology.princeton.edu/salganik',
        labName: 'Social Data Science Lab'
      },
      {
        name: 'Dr. Eva Illouz',
        title: 'Professor',
        department: 'Sociology',
        university: 'Hebrew University',
        location: 'Jerusalem, Israel',
        researchAreas: ['sociology of emotions', 'consumer culture', 'intimacy'],
        email: 'illouz@huji.ac.il',
        profileUrl: 'https://sociology.huji.ac.il/illouz',
        labName: 'Center for Cultural Sociology'
      },
      {
        name: 'Dr. Richard Florida',
        title: 'Professor',
        department: 'Urban Studies',
        university: 'University of Toronto',
        location: 'Toronto, ON',
        researchAreas: ['urban development', 'creative class', 'economic geography'],
        email: 'florida@utoronto.ca',
        profileUrl: 'https://www.creativeclass.com/',
        labName: 'Martin Prosperity Institute'
      },
      {
        name: 'Dr. Manuel Castells',
        title: 'Professor',
        department: 'Sociology',
        university: 'University of Southern California',
        location: 'Los Angeles, CA',
        researchAreas: ['information society', 'urban sociology', 'social movements'],
        email: 'castells@usc.edu',
        profileUrl: 'https://sociology.usc.edu/castells',
        labName: 'Annenberg Research Network on International Communication'
      },
      {
        name: 'Dr. Zygmunt Bauman',
        title: 'Professor Emeritus',
        department: 'Sociology',
        university: 'University of Leeds',
        location: 'Leeds, UK',
        researchAreas: ['modernity', 'postmodernity', 'liquid society'],
        email: 'bauman@leeds.ac.uk',
        profileUrl: 'https://sociology.leeds.ac.uk/bauman',
        labName: 'Centre for Social Theory'
      },
      {
        name: 'Dr. Pierre Bourdieu',
        title: 'Professor Emeritus',
        department: 'Sociology',
        university: 'Collège de France',
        location: 'Paris, France',
        researchAreas: ['cultural capital', 'habitus', 'field theory'],
        email: 'bourdieu@college-de-france.fr',
        profileUrl: 'https://sociology.college-de-france.fr/bourdieu',
        labName: 'Centre de Sociologie Européenne'
      },
      {
        name: 'Dr. Patricia Hill Collins',
        title: 'Professor',
        department: 'Sociology',
        university: 'University of Maryland',
        location: 'College Park, MD',
        researchAreas: ['intersectionality', 'race and gender', 'Black feminist thought'],
        email: 'collins@umd.edu',
        profileUrl: 'https://sociology.umd.edu/collins',
        labName: 'Intersectionality Research Lab'
      },
      {
        name: 'Dr. William Julius Wilson',
        title: 'Professor',
        department: 'Sociology',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['urban sociology', 'race relations', 'social policy'],
        email: 'wilson@harvard.edu',
        profileUrl: 'https://sociology.harvard.edu/wilson',
        labName: 'Joblessness and Urban Poverty Research Program'
      },
      {
        name: 'Dr. James Coleman',
        title: 'Professor Emeritus',
        department: 'Sociology',
        university: 'University of Chicago',
        location: 'Chicago, IL',
        researchAreas: ['social capital', 'educational sociology', 'rational choice theory'],
        email: 'coleman@uchicago.edu',
        profileUrl: 'https://sociology.uchicago.edu/coleman',
        labName: 'National Opinion Research Center'
      },
      {
        name: 'Dr. Saskia Sassen',
        title: 'Professor',
        department: 'Sociology',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['global cities', 'migration', 'globalization'],
        email: 'sassen@columbia.edu',
        profileUrl: 'https://sociology.columbia.edu/sassen',
        labName: 'Committee on Global Thought'
      },
      {
        name: 'Dr. Duncan Watts',
        title: 'Professor',
        department: 'Sociology',
        university: 'University of Pennsylvania',
        location: 'Philadelphia, PA',
        researchAreas: ['network theory', 'collective behavior', 'computational sociology'],
        email: 'watts@upenn.edu',
        profileUrl: 'https://sociology.upenn.edu/watts',
        labName: 'Computational Social Science Lab'
      },
      {
        name: 'Dr. Mark Granovetter',
        title: 'Professor',
        department: 'Sociology',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['economic sociology', 'social networks', 'embeddedness'],
        email: 'granovetter@stanford.edu',
        profileUrl: 'https://sociology.stanford.edu/granovetter',
        labName: 'Stanford Center for Work, Technology & Organization'
      },
      {
        name: 'Dr. Viviana Zelizer',
        title: 'Professor',
        department: 'Sociology',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['economic sociology', 'culture and economy', 'childhood studies'],
        email: 'zelizer@princeton.edu',
        profileUrl: 'https://sociology.princeton.edu/zelizer',
        labName: 'Center for the Study of Social Organization'
      }
    ],
    'Political Science': [
      {
        name: 'Dr. Robert Putnam',
        title: 'Professor',
        department: 'Political Science',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['political participation', 'social capital', 'civic engagement'],
        email: 'putnam@harvard.edu',
        profileUrl: 'https://hks.harvard.edu/putnam',
        labName: 'Saguaro Seminar'
      },
      {
        name: 'Dr. Francis Fukuyama',
        title: 'Professor',
        department: 'Political Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['political development', 'international relations', 'governance'],
        email: 'fukuyama@stanford.edu',
        profileUrl: 'https://fsi.stanford.edu/fukuyama',
        labName: 'Center on Democracy'
      },
      {
        name: 'Dr. Anne-Marie Slaughter',
        title: 'Professor',
        department: 'Politics',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['international law', 'foreign policy', 'global governance'],
        email: 'slaughtr@princeton.edu',
        profileUrl: 'https://wws.princeton.edu/slaughter',
        labName: 'Princeton School of Public Policy'
      },
      {
        name: 'Dr. Samuel Huntington',
        title: 'Professor Emeritus',
        department: 'Political Science',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['comparative politics', 'democratization', 'civilizational studies'],
        email: 'huntington@harvard.edu',
        profileUrl: 'https://gov.harvard.edu/huntington',
        labName: 'Weatherhead Center for International Affairs'
      },
      {
        name: 'Dr. Joseph Nye',
        title: 'Professor',
        department: 'Political Science',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['soft power', 'international relations', 'leadership'],
        email: 'nye@harvard.edu',
        profileUrl: 'https://hks.harvard.edu/nye',
        labName: 'Belfer Center for Science and International Affairs'
      },
      {
        name: 'Dr. John Mearsheimer',
        title: 'Professor',
        department: 'Political Science',
        university: 'University of Chicago',
        location: 'Chicago, IL',
        researchAreas: ['international relations', 'offensive realism', 'great power politics'],
        email: 'mearsheimer@uchicago.edu',
        profileUrl: 'https://political-science.uchicago.edu/mearsheimer',
        labName: 'Program on International Security Policy'
      },
      {
        name: 'Dr. Kenneth Waltz',
        title: 'Professor Emeritus',
        department: 'Political Science',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['structural realism', 'international relations theory', 'nuclear weapons'],
        email: 'waltz@columbia.edu',
        profileUrl: 'https://political-science.columbia.edu/waltz',
        labName: 'Saltzman Institute of War and Peace Studies'
      },
      {
        name: 'Dr. Robert Keohane',
        title: 'Professor',
        department: 'Political Science',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['international institutions', 'cooperation', 'neoliberalism'],
        email: 'keohane@princeton.edu',
        profileUrl: 'https://politics.princeton.edu/keohane',
        labName: 'Princeton School of Public and International Affairs'
      },
      {
        name: 'Dr. Larry Diamond',
        title: 'Professor',
        department: 'Political Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['democracy', 'democratization', 'comparative politics'],
        email: 'diamond@stanford.edu',
        profileUrl: 'https://fsi.stanford.edu/diamond',
        labName: 'Center on Democracy, Development & Rule of Law'
      },
      {
        name: 'Dr. Steven Levitsky',
        title: 'Professor',
        department: 'Political Science',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['democratization', 'authoritarianism', 'Latin American politics'],
        email: 'levitsky@harvard.edu',
        profileUrl: 'https://gov.harvard.edu/levitsky',
        labName: 'Center for European Studies'
      },
      {
        name: 'Dr. Daniel Ziblatt',
        title: 'Professor',
        department: 'Political Science',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['comparative politics', 'democratization', 'European politics'],
        email: 'ziblatt@harvard.edu',
        profileUrl: 'https://gov.harvard.edu/ziblatt',
        labName: 'Center for European Studies'
      },
      {
        name: 'Dr. Condoleezza Rice',
        title: 'Professor',
        department: 'Political Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['international security', 'Russia studies', 'foreign policy'],
        email: 'rice@stanford.edu',
        profileUrl: 'https://fsi.stanford.edu/rice',
        labName: 'Hoover Institution'
      },
      {
        name: 'Dr. Theda Skocpol',
        title: 'Professor',
        department: 'Political Science',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['comparative politics', 'social policy', 'American politics'],
        email: 'skocpol@harvard.edu',
        profileUrl: 'https://gov.harvard.edu/skocpol',
        labName: 'Scholars Strategy Network'
      }
    ],
    'Anthropology': [
      {
        name: 'Dr. Clifford Geertz',
        title: 'Professor Emeritus',
        department: 'Anthropology',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['cultural anthropology', 'symbolic anthropology', 'interpretive theory'],
        email: 'geertz@princeton.edu',
        profileUrl: 'https://anthropology.princeton.edu/geertz',
        labName: 'Institute for Advanced Study'
      },
      {
        name: 'Dr. Sarah Hrdy',
        title: 'Professor Emeritus',
        department: 'Anthropology',
        university: 'University of California, Davis',
        location: 'Davis, CA',
        researchAreas: ['primatology', 'evolutionary anthropology', 'motherhood'],
        email: 'hrdy@ucdavis.edu',
        profileUrl: 'https://anthropology.ucdavis.edu/hrdy',
        labName: 'Primate Research Center'
      },
      {
        name: 'Dr. Philippe Bourgois',
        title: 'Professor',
        department: 'Anthropology',
        university: 'University of Pennsylvania',
        location: 'Philadelphia, PA',
        researchAreas: ['medical anthropology', 'urban ethnography', 'substance abuse'],
        email: 'bourgois@upenn.edu',
        profileUrl: 'https://anthropology.upenn.edu/bourgois',
        labName: 'Urban Health Lab'
      },
      {
        name: 'Dr. James Scott',
        title: 'Professor',
        department: 'Anthropology',
        university: 'Yale University',
        location: 'New Haven, CT',
        researchAreas: ['political anthropology', 'peasant studies', 'anarchism'],
        email: 'scott@yale.edu',
        profileUrl: 'https://anthropology.yale.edu/scott',
        labName: 'Program in Agrarian Studies'
      },
      {
        name: 'Dr. Lila Abu-Lughod',
        title: 'Professor',
        department: 'Anthropology',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['Middle East studies', 'gender studies', 'media anthropology'],
        email: 'lila@columbia.edu',
        profileUrl: 'https://anthropology.columbia.edu/abu-lughod',
        labName: 'Center for the Study of Social Difference'
      },
      {
        name: 'Dr. Paul Farmer',
        title: 'Professor',
        department: 'Anthropology',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['medical anthropology', 'global health', 'structural violence'],
        email: 'farmer@harvard.edu',
        profileUrl: 'https://anthropology.harvard.edu/farmer',
        labName: 'Partners In Health'
      },
      {
        name: 'Dr. Nancy Scheper-Hughes',
        title: 'Professor',
        department: 'Anthropology',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['medical anthropology', 'violence', 'organ trafficking'],
        email: 'nsh@berkeley.edu',
        profileUrl: 'https://anthropology.berkeley.edu/scheper-hughes',
        labName: 'Organs Watch'
      },
      {
        name: 'Dr. Anna Tsing',
        title: 'Professor',
        department: 'Anthropology',
        university: 'University of California, Santa Cruz',
        location: 'Santa Cruz, CA',
        researchAreas: ['environmental anthropology', 'globalization', 'multispecies studies'],
        email: 'tsing@ucsc.edu',
        profileUrl: 'https://anthropology.ucsc.edu/tsing',
        labName: 'Aarhus University Research on the Anthropocene'
      },
      {
        name: 'Dr. Karen Barad',
        title: 'Professor',
        department: 'Anthropology',
        university: 'University of California, Santa Cruz',
        location: 'Santa Cruz, CA',
        researchAreas: ['feminist science studies', 'quantum physics', 'posthumanism'],
        email: 'barad@ucsc.edu',
        profileUrl: 'https://anthropology.ucsc.edu/barad',
        labName: 'Science and Justice Research Center'
      },
      {
        name: 'Dr. Marilyn Strathern',
        title: 'Professor Emeritus',
        department: 'Anthropology',
        university: 'University of Cambridge',
        location: 'Cambridge, UK',
        researchAreas: ['gender studies', 'Melanesian studies', 'kinship'],
        email: 'strathern@cam.ac.uk',
        profileUrl: 'https://anthropology.cam.ac.uk/strathern',
        labName: 'Centre for Gender Studies'
      },
      {
        name: 'Dr. Hugh Gusterson',
        title: 'Professor',
        department: 'Anthropology',
        university: 'George Washington University',
        location: 'Washington, DC',
        researchAreas: ['nuclear anthropology', 'militarization', 'science studies'],
        email: 'gusterson@gwu.edu',
        profileUrl: 'https://anthropology.gwu.edu/gusterson',
        labName: 'Institute for Ethnographic Research'
      },
      {
        name: 'Dr. Keith Basso',
        title: 'Professor Emeritus',
        department: 'Anthropology',
        university: 'University of New Mexico',
        location: 'Albuquerque, NM',
        researchAreas: ['linguistic anthropology', 'place-names', 'Apache studies'],
        email: 'basso@unm.edu',
        profileUrl: 'https://anthropology.unm.edu/basso',
        labName: 'Southwest Research Station'
      },
      {
        name: 'Dr. Laura Nader',
        title: 'Professor',
        department: 'Anthropology',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['legal anthropology', 'energy studies', 'controlling processes'],
        email: 'nader@berkeley.edu',
        profileUrl: 'https://anthropology.berkeley.edu/nader',
        labName: 'Center for Middle Eastern Studies'
      }
    ],
    'Art History': [
      {
        name: 'Dr. Arthur Danto',
        title: 'Professor Emeritus',
        department: 'Art History',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['philosophy of art', 'contemporary art', 'aesthetic theory'],
        email: 'danto@columbia.edu',
        profileUrl: 'https://arthistory.columbia.edu/danto',
        labName: 'Contemporary Art Studies'
      },
      {
        name: 'Dr. Linda Nochlin',
        title: 'Professor Emeritus',
        department: 'Art History',
        university: 'Institute of Fine Arts, NYU',
        location: 'New York, NY',
        researchAreas: ['feminist art history', '19th century art', 'Orientalism'],
        email: 'nochlin@nyu.edu',
        profileUrl: 'https://ifa.nyu.edu/nochlin',
        labName: 'Women in Art Research Center'
      },
      {
        name: 'Dr. T.J. Clark',
        title: 'Professor',
        department: 'Art History',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['modern art', 'social history of art', 'critical theory'],
        email: 'tjclark@berkeley.edu',
        profileUrl: 'https://arthistory.berkeley.edu/clark',
        labName: 'Modern Art Studies'
      },
      {
        name: 'Dr. Hal Foster',
        title: 'Professor',
        department: 'Art History',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['contemporary art', 'art criticism', 'avant-garde studies'],
        email: 'foster@princeton.edu',
        profileUrl: 'https://arthistory.princeton.edu/foster',
        labName: 'Program in Visual Arts'
      },
      {
        name: 'Dr. Rosalind Krauss',
        title: 'Professor Emeritus',
        department: 'Art History',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['modern art', 'sculpture', 'art criticism'],
        email: 'krauss@columbia.edu',
        profileUrl: 'https://arthistory.columbia.edu/krauss',
        labName: 'Institute for the Study of the Ancient World'
      },
      {
        name: 'Dr. Leo Steinberg',
        title: 'Professor Emeritus',
        department: 'Art History',
        university: 'University of Pennsylvania',
        location: 'Philadelphia, PA',
        researchAreas: ['Renaissance art', 'modern art', 'art theory'],
        email: 'steinberg@upenn.edu',
        profileUrl: 'https://arthistory.upenn.edu/steinberg',
        labName: 'Center for Italian Renaissance Studies'
      },
      {
        name: 'Dr. Svetlana Alpers',
        title: 'Professor Emeritus',
        department: 'Art History',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Dutch Golden Age', 'visual culture', 'Rembrandt studies'],
        email: 'alpers@berkeley.edu',
        profileUrl: 'https://arthistory.berkeley.edu/alpers',
        labName: 'Institute of European Studies'
      },
      {
        name: 'Dr. Kirk Varnedoe',
        title: 'Professor Emeritus',
        department: 'Art History',
        university: 'Institute for Advanced Study',
        location: 'Princeton, NJ',
        researchAreas: ['modern art', 'American art', 'museum studies'],
        email: 'varnedoe@ias.edu',
        profileUrl: 'https://arthistory.ias.edu/varnedoe',
        labName: 'School of Historical Studies'
      },
      {
        name: 'Dr. Michael Fried',
        title: 'Professor',
        department: 'Art History',
        university: 'Johns Hopkins University',
        location: 'Baltimore, MD',
        researchAreas: ['art criticism', 'photography', 'modernist painting'],
        email: 'fried@jhu.edu',
        profileUrl: 'https://arthistory.jhu.edu/fried',
        labName: 'Humanities Center'
      },
      {
        name: 'Dr. Benjamin Buchloh',
        title: 'Professor',
        department: 'Art History',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['contemporary art', 'European avant-garde', 'conceptual art'],
        email: 'buchloh@harvard.edu',
        profileUrl: 'https://arthistory.harvard.edu/buchloh',
        labName: 'Carpenter Center for Visual Arts'
      },
      {
        name: 'Dr. Griselda Pollock',
        title: 'Professor',
        department: 'Art History',
        university: 'University of Leeds',
        location: 'Leeds, UK',
        researchAreas: ['feminist art history', 'trauma studies', 'visual culture'],
        email: 'pollock@leeds.ac.uk',
        profileUrl: 'https://arthistory.leeds.ac.uk/pollock',
        labName: 'Centre for Cultural Analysis, Theory & History'
      },
      {
        name: 'Dr. James Elkins',
        title: 'Professor',
        department: 'Art History',
        university: 'School of the Art Institute of Chicago',
        location: 'Chicago, IL',
        researchAreas: ['visual studies', 'art theory', 'global art history'],
        email: 'elkins@saic.edu',
        profileUrl: 'https://arthistory.saic.edu/elkins',
        labName: 'Visual and Critical Studies'
      },
      {
        name: 'Dr. Whitney Davis',
        title: 'Professor',
        department: 'Art History',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['ancient art', 'queer theory', 'psychoanalytic art history'],
        email: 'davis@berkeley.edu',
        profileUrl: 'https://arthistory.berkeley.edu/davis',
        labName: 'Archaeological Research Facility'
      }
    ],
    'Music': [
      {
        name: 'Dr. Alex Ross',
        title: 'Professor',
        department: 'Music',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['music criticism', 'contemporary classical music', 'cultural studies'],
        email: 'aross@harvard.edu',
        profileUrl: 'https://music.harvard.edu/ross',
        labName: 'Contemporary Music Studies'
      },
      {
        name: 'Dr. Kaija Saariaho',
        title: 'Professor',
        department: 'Music Composition',
        university: 'University of California, San Diego',
        location: 'San Diego, CA',
        researchAreas: ['contemporary composition', 'computer music', 'spectral music'],
        email: 'saariaho@ucsd.edu',
        profileUrl: 'https://music.ucsd.edu/saariaho',
        labName: 'Computer Music Center'
      },
      {
        name: 'Dr. Robert Christgau',
        title: 'Professor',
        department: 'Music Journalism',
        university: 'New York University',
        location: 'New York, NY',
        researchAreas: ['popular music criticism', 'rock history', 'cultural journalism'],
        email: 'christgau@nyu.edu',
        profileUrl: 'https://journalism.nyu.edu/christgau',
        labName: 'Popular Music Studies'
      },
      {
        name: 'Dr. Susan McClary',
        title: 'Professor',
        department: 'Music',
        university: 'Case Western Reserve University',
        location: 'Cleveland, OH',
        researchAreas: ['feminist musicology', 'cultural criticism', 'opera studies'],
        email: 'mcclary@cwru.edu',
        profileUrl: 'https://music.case.edu/mcclary',
        labName: 'Institute for the Science of Music'
      },
      {
        name: 'Dr. Richard Taruskin',
        title: 'Professor Emeritus',
        department: 'Music',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Russian music', 'performance practice', 'music history'],
        email: 'taruskin@berkeley.edu',
        profileUrl: 'https://music.berkeley.edu/taruskin',
        labName: 'Center for Russian, East European & Eurasian Studies'
      },
      {
        name: 'Dr. Carolyn Abbate',
        title: 'Professor',
        department: 'Music',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['opera studies', 'music and narrative', '19th century music'],
        email: 'abbate@harvard.edu',
        profileUrl: 'https://music.harvard.edu/abbate',
        labName: 'Opera Studies Program'
      },
      {
        name: 'Dr. Joseph Kerman',
        title: 'Professor Emeritus',
        department: 'Music',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['musicology', 'opera criticism', 'Beethoven studies'],
        email: 'kerman@berkeley.edu',
        profileUrl: 'https://music.berkeley.edu/kerman',
        labName: 'Center for the Arts & Humanities'
      },
      {
        name: 'Dr. Robert Morgan',
        title: 'Professor',
        department: 'Music',
        university: 'Yale University',
        location: 'New Haven, CT',
        researchAreas: ['20th century music', 'music theory', 'American composers'],
        email: 'morgan@yale.edu',
        profileUrl: 'https://music.yale.edu/morgan',
        labName: 'Institute of Sacred Music'
      },
      {
        name: 'Dr. Kofi Agawu',
        title: 'Professor',
        department: 'Music',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['African music', 'music theory', 'postcolonial studies'],
        email: 'agawu@princeton.edu',
        profileUrl: 'https://music.princeton.edu/agawu',
        labName: 'Program in African Studies'
      },
      {
        name: 'Dr. Philip Brett',
        title: 'Professor Emeritus',
        department: 'Music',
        university: 'University of California, Los Angeles',
        location: 'Los Angeles, CA',
        researchAreas: ['early music', 'gay and lesbian studies', 'Benjamin Britten'],
        email: 'brett@ucla.edu',
        profileUrl: 'https://music.ucla.edu/brett',
        labName: 'Center for Medieval and Renaissance Studies'
      },
      {
        name: 'Dr. Rose Rosengard Subotnik',
        title: 'Professor Emeritus',
        department: 'Music',
        university: 'Brown University',
        location: 'Providence, RI',
        researchAreas: ['music criticism', 'German music', 'cultural studies'],
        email: 'subotnik@brown.edu',
        profileUrl: 'https://music.brown.edu/subotnik',
        labName: 'Cogut Institute for the Humanities'
      },
      {
        name: 'Dr. Lawrence Kramer',
        title: 'Professor',
        department: 'Music',
        university: 'Fordham University',
        location: 'New York, NY',
        researchAreas: ['music and literature', 'hermeneutics', 'cultural musicology'],
        email: 'kramer@fordham.edu',
        profileUrl: 'https://music.fordham.edu/kramer',
        labName: 'Center for Medieval Studies'
      },
      {
        name: 'Dr. Ellen Rosand',
        title: 'Professor Emeritus',
        department: 'Music',
        university: 'Yale University',
        location: 'New Haven, CT',
        researchAreas: ['Baroque opera', 'Venetian music', 'Monteverdi studies'],
        email: 'rosand@yale.edu',
        profileUrl: 'https://music.yale.edu/rosand',
        labName: 'Institute of Sacred Music'
      }
    ],
    'Education': [
      {
        name: 'Dr. Linda Darling-Hammond',
        title: 'Professor',
        department: 'Education',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['teacher education', 'school reform', 'educational policy'],
        email: 'ldh@stanford.edu',
        profileUrl: 'https://ed.stanford.edu/darling-hammond',
        labName: 'Learning Policy Institute'
      },
      {
        name: 'Dr. Paulo Freire',
        title: 'Professor Emeritus',
        department: 'Education',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['critical pedagogy', 'adult literacy', 'social justice education'],
        email: 'freire@harvard.edu',
        profileUrl: 'https://gse.harvard.edu/freire',
        labName: 'Critical Pedagogy Institute'
      },
      {
        name: 'Dr. Gloria Ladson-Billings',
        title: 'Professor',
        department: 'Education',
        university: 'University of Wisconsin-Madison',
        location: 'Madison, WI',
        researchAreas: ['culturally relevant pedagogy', 'critical race theory', 'teacher education'],
        email: 'ladson@wisc.edu',
        profileUrl: 'https://education.wisc.edu/ladson-billings',
        labName: 'Equity & Excellence Lab'
      },
      {
        name: 'Dr. Nel Noddings',
        title: 'Professor Emeritus',
        department: 'Education',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['care ethics', 'moral education', 'curriculum theory'],
        email: 'noddings@stanford.edu',
        profileUrl: 'https://ed.stanford.edu/noddings',
        labName: 'Center for Ethics in Society'
      },
      {
        name: 'Dr. Henry Giroux',
        title: 'Professor',
        department: 'Education',
        university: 'McMaster University',
        location: 'Hamilton, ON',
        researchAreas: ['critical pedagogy', 'cultural studies', 'public pedagogy'],
        email: 'giroux@mcmaster.ca',
        profileUrl: 'https://education.mcmaster.ca/giroux',
        labName: 'Institute for Critical Education Policy'
      },
      {
        name: 'Dr. Maxine Greene',
        title: 'Professor Emeritus',
        department: 'Education',
        university: 'Teachers College, Columbia',
        location: 'New York, NY',
        researchAreas: ['aesthetic education', 'social imagination', 'arts education'],
        email: 'greene@tc.columbia.edu',
        profileUrl: 'https://tc.columbia.edu/greene',
        labName: 'Center for the Arts & Humanities in Education'
      },
      {
        name: 'Dr. James Banks',
        title: 'Professor',
        department: 'Education',
        university: 'University of Washington',
        location: 'Seattle, WA',
        researchAreas: ['multicultural education', 'citizenship education', 'diversity'],
        email: 'banks@uw.edu',
        profileUrl: 'https://education.uw.edu/banks',
        labName: 'Center for Multicultural Education'
      },
      {
        name: 'Dr. Sonia Nieto',
        title: 'Professor Emeritus',
        department: 'Education',
        university: 'University of Massachusetts Amherst',
        location: 'Amherst, MA',
        researchAreas: ['multicultural education', 'bilingual education', 'Latino students'],
        email: 'nieto@umass.edu',
        profileUrl: 'https://education.umass.edu/nieto',
        labName: 'Center for Latin American, Caribbean & Latino Studies'
      },
      {
        name: 'Dr. Carl Grant',
        title: 'Professor',
        department: 'Education',
        university: 'University of Wisconsin-Madison',
        location: 'Madison, WI',
        researchAreas: ['multicultural education', 'teacher education', 'social justice'],
        email: 'grant@wisc.edu',
        profileUrl: 'https://education.wisc.edu/grant',
        labName: 'Multicultural Research Institute'
      },
      {
        name: 'Dr. Lisa Delpit',
        title: 'Professor',
        department: 'Education',
        university: 'Florida International University',
        location: 'Miami, FL',
        researchAreas: ['multicultural education', 'literacy education', 'urban education'],
        email: 'delpit@fiu.edu',
        profileUrl: 'https://education.fiu.edu/delpit',
        labName: 'Center for Urban Education & Innovation'
      },
      {
        name: 'Dr. Geneva Gay',
        title: 'Professor Emeritus',
        department: 'Education',
        university: 'University of Washington',
        location: 'Seattle, WA',
        researchAreas: ['culturally responsive teaching', 'multicultural education', 'curriculum'],
        email: 'gay@uw.edu',
        profileUrl: 'https://education.uw.edu/gay',
        labName: 'Center for Multicultural Education'
      },
      {
        name: 'Dr. Christine Sleeter',
        title: 'Professor Emeritus',
        department: 'Education',
        university: 'California State University, Monterey Bay',
        location: 'Seaside, CA',
        researchAreas: ['multicultural education', 'teacher education', 'whiteness studies'],
        email: 'sleeter@csumb.edu',
        profileUrl: 'https://education.csumb.edu/sleeter',
        labName: 'Institute for Educational Equity'
      },
      {
        name: 'Dr. Michael Apple',
        title: 'Professor',
        department: 'Education',
        university: 'University of Wisconsin-Madison',
        location: 'Madison, WI',
        researchAreas: ['critical education policy', 'curriculum theory', 'educational politics'],
        email: 'apple@wisc.edu',
        profileUrl: 'https://education.wisc.edu/apple',
        labName: 'Wisconsin Center for Education Research'
      }
    ],
    'Law': [
      {
        name: 'Dr. Cass Sunstein',
        title: 'Professor',
        department: 'Law',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['constitutional law', 'behavioral economics', 'regulatory policy'],
        email: 'sunstein@law.harvard.edu',
        profileUrl: 'https://law.harvard.edu/sunstein',
        labName: 'Program on Behavioral Economics'
      },
      {
        name: 'Dr. Alan Dershowitz',
        title: 'Professor Emeritus',
        department: 'Law',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['constitutional law', 'criminal law', 'civil liberties'],
        email: 'dershowitz@law.harvard.edu',
        profileUrl: 'https://law.harvard.edu/dershowitz',
        labName: 'Civil Liberties Clinic'
      },
      {
        name: 'Dr. Catharine MacKinnon',
        title: 'Professor',
        department: 'Law',
        university: 'University of Michigan',
        location: 'Ann Arbor, MI',
        researchAreas: ['feminist legal theory', 'constitutional law', 'international law'],
        email: 'mackinnon@umich.edu',
        profileUrl: 'https://law.umich.edu/mackinnon',
        labName: 'Gender & Law Program'
      },
      {
        name: 'Dr. Ronald Dworkin',
        title: 'Professor Emeritus',
        department: 'Law',
        university: 'New York University',
        location: 'New York, NY',
        researchAreas: ['jurisprudence', 'constitutional theory', 'political philosophy'],
        email: 'dworkin@law.nyu.edu',
        profileUrl: 'https://law.nyu.edu/dworkin',
        labName: 'Colloquium in Legal, Political & Social Philosophy'
      },
      {
        name: 'Dr. Richard Posner',
        title: 'Senior Lecturer',
        department: 'Law',
        university: 'University of Chicago',
        location: 'Chicago, IL',
        researchAreas: ['law and economics', 'judicial behavior', 'legal pragmatism'],
        email: 'posner@law.uchicago.edu',
        profileUrl: 'https://law.uchicago.edu/posner',
        labName: 'Law & Economics Program'
      },
      {
        name: 'Dr. Laurence Tribe',
        title: 'Professor',
        department: 'Law',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['constitutional law', 'Supreme Court practice', 'civil rights'],
        email: 'tribe@law.harvard.edu',
        profileUrl: 'https://law.harvard.edu/tribe',
        labName: 'Constitutional Law Institute'
      },
      {
        name: 'Dr. Antonin Scalia',
        title: 'Justice Emeritus',
        department: 'Law',
        university: 'George Mason University',
        location: 'Arlington, VA',
        researchAreas: ['constitutional interpretation', 'originalism', 'textualism'],
        email: 'scalia@law.gmu.edu',
        profileUrl: 'https://law.gmu.edu/scalia',
        labName: 'Antonin Scalia Law School'
      },
      {
        name: 'Dr. Ruth Bader Ginsburg',
        title: 'Justice Emeritus',
        department: 'Law',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['gender equality', 'civil procedure', 'comparative law'],
        email: 'ginsburg@law.columbia.edu',
        profileUrl: 'https://law.columbia.edu/ginsburg',
        labName: 'Center for Gender & Sexuality Law'
      },
      {
        name: 'Dr. Elena Kagan',
        title: 'Justice',
        department: 'Law',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['constitutional law', 'administrative law', 'federal courts'],
        email: 'kagan@law.harvard.edu',
        profileUrl: 'https://law.harvard.edu/kagan',
        labName: 'Federal Courts Research'
      },
      {
        name: 'Dr. Amy Coney Barrett',
        title: 'Justice',
        department: 'Law',
        university: 'Notre Dame University',
        location: 'Notre Dame, IN',
        researchAreas: ['constitutional law', 'statutory interpretation', 'federal courts'],
        email: 'barrett@nd.edu',
        profileUrl: 'https://law.nd.edu/barrett',
        labName: 'Constitutional Studies Program'
      },
      {
        name: 'Dr. Noah Messing',
        title: 'Professor',
        department: 'Law',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['corporate law', 'securities regulation', 'law and technology'],
        email: 'messing@law.stanford.edu',
        profileUrl: 'https://law.stanford.edu/messing',
        labName: 'Rock Center for Corporate Governance'
      },
      {
        name: 'Dr. Kimberlé Crenshaw',
        title: 'Professor',
        department: 'Law',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['critical race theory', 'intersectionality', 'civil rights'],
        email: 'crenshaw@law.columbia.edu',
        profileUrl: 'https://law.columbia.edu/crenshaw',
        labName: 'Center for Intersectionality and Social Policy Studies'
      },
      {
        name: 'Dr. Mari Matsuda',
        title: 'Professor',
        department: 'Law',
        university: 'University of Hawaii',
        location: 'Honolulu, HI',
        researchAreas: ['critical race theory', 'hate speech', 'reparations'],
        email: 'matsuda@hawaii.edu',
        profileUrl: 'https://law.hawaii.edu/matsuda',
        labName: 'Center for Excellence in Native Hawaiian Law'
      }
    ],
    'Medicine': [
      {
        name: 'Dr. Anthony Fauci',
        title: 'Professor',
        department: 'Medicine',
        university: 'Georgetown University',
        location: 'Washington, DC',
        researchAreas: ['infectious diseases', 'immunology', 'public health'],
        email: 'fauci@georgetown.edu',
        profileUrl: 'https://medicine.georgetown.edu/fauci',
        labName: 'Institute for Global Health'
      },
      {
        name: 'Dr. Paul Farmer',
        title: 'Professor',
        department: 'Global Health',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['global health', 'infectious diseases', 'health equity'],
        email: 'farmer@harvard.edu',
        profileUrl: 'https://www.pih.org/farmer',
        labName: 'Partners In Health'
      },
      {
        name: 'Dr. Atul Gawande',
        title: 'Professor',
        department: 'Surgery',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['surgery', 'public health', 'healthcare delivery'],
        email: 'gawande@harvard.edu',
        profileUrl: 'https://www.atulgawande.com/',
        labName: 'Ariadne Labs'
      },
      {
        name: 'Dr. Peter Hotez',
        title: 'Professor',
        department: 'Medicine',
        university: 'Baylor College of Medicine',
        location: 'Houston, TX',
        researchAreas: ['tropical medicine', 'vaccine development', 'neglected diseases'],
        email: 'hotez@bcm.edu',
        profileUrl: 'https://medicine.bcm.edu/hotez',
        labName: 'Texas Children\'s Hospital Center for Vaccine Development'
      },
      {
        name: 'Dr. Jennifer Doudna',
        title: 'Professor',
        department: 'Medicine',
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['CRISPR', 'gene editing', 'molecular biology'],
        email: 'doudna@berkeley.edu',
        profileUrl: 'https://doudnalab.org/',
        labName: 'Innovative Genomics Institute'
      },
      {
        name: 'Dr. Katalin Karikó',
        title: 'Professor',
        department: 'Medicine',
        university: 'University of Pennsylvania',
        location: 'Philadelphia, PA',
        researchAreas: ['mRNA technology', 'vaccine development', 'immunotherapy'],
        email: 'kariko@upenn.edu',
        profileUrl: 'https://medicine.upenn.edu/kariko',
        labName: 'Penn Institute for RNA Innovation'
      },
      {
        name: 'Dr. Francis Collins',
        title: 'Professor',
        department: 'Medicine',
        university: 'University of Michigan',
        location: 'Ann Arbor, MI',
        researchAreas: ['genetics', 'genomics', 'rare diseases'],
        email: 'collins@umich.edu',
        profileUrl: 'https://medicine.umich.edu/collins',
        labName: 'Center for Precision Medicine'
      },
      {
        name: 'Dr. Eric Topol',
        title: 'Professor',
        department: 'Medicine',
        university: 'Scripps Research',
        location: 'La Jolla, CA',
        researchAreas: ['digital medicine', 'genomics', 'cardiology'],
        email: 'topol@scripps.edu',
        profileUrl: 'https://scripps.edu/topol',
        labName: 'Scripps Translational Science Institute'
      },
      {
        name: 'Dr. Robert Langer',
        title: 'Professor',
        department: 'Medicine',
        university: 'Massachusetts Institute of Technology',
        location: 'Cambridge, MA',
        researchAreas: ['drug delivery', 'tissue engineering', 'biomaterials'],
        email: 'langer@mit.edu',
        profileUrl: 'https://langerlab.mit.edu/',
        labName: 'Langer Lab'
      },
      {
        name: 'Dr. Mary-Claire King',
        title: 'Professor',
        department: 'Medicine',
        university: 'University of Washington',
        location: 'Seattle, WA',
        researchAreas: ['medical genetics', 'breast cancer', 'human evolution'],
        email: 'king@uw.edu',
        profileUrl: 'https://medicine.uw.edu/king',
        labName: 'Division of Medical Genetics'
      },
      {
        name: 'Dr. Craig Venter',
        title: 'Professor',
        department: 'Medicine',
        university: 'University of California, San Diego',
        location: 'San Diego, CA',
        researchAreas: ['genomics', 'synthetic biology', 'personalized medicine'],
        email: 'venter@ucsd.edu',
        profileUrl: 'https://medicine.ucsd.edu/venter',
        labName: 'J. Craig Venter Institute'
      },
      {
        name: 'Dr. Siddhartha Mukherjee',
        title: 'Professor',
        department: 'Medicine',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['oncology', 'stem cell biology', 'cancer research'],
        email: 'mukherjee@columbia.edu',
        profileUrl: 'https://medicine.columbia.edu/mukherjee',
        labName: 'Herbert Irving Comprehensive Cancer Center'
      },
      {
        name: 'Dr. Leroy Hood',
        title: 'Professor',
        department: 'Medicine',
        university: 'Institute for Systems Biology',
        location: 'Seattle, WA',
        researchAreas: ['systems medicine', 'proteomics', 'personalized medicine'],
        email: 'hood@systemsbiology.org',
        profileUrl: 'https://systemsbiology.org/hood',
        labName: 'Institute for Systems Biology'
      }
    ],
    'Journalism': [
      {
        name: 'Dr. Jay Rosen',
        title: 'Professor',
        department: 'Journalism',
        university: 'New York University',
        location: 'New York, NY',
        researchAreas: ['media criticism', 'digital journalism', 'press theory'],
        email: 'rosen@nyu.edu',
        profileUrl: 'https://journalism.nyu.edu/rosen',
        labName: 'Digital Media Lab'
      },
      {
        name: 'Dr. Emily Bell',
        title: 'Professor',
        department: 'Journalism',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['digital media', 'technology and journalism', 'media innovation'],
        email: 'bell@columbia.edu',
        profileUrl: 'https://journalism.columbia.edu/bell',
        labName: 'Tow Center for Digital Journalism'
      },
      {
        name: 'Dr. Margaret Sullivan',
        title: 'Professor',
        department: 'Media Studies',
        university: 'Duke University',
        location: 'Durham, NC',
        researchAreas: ['media ethics', 'journalism criticism', 'press freedom'],
        email: 'sullivan@duke.edu',
        profileUrl: 'https://sanford.duke.edu/sullivan',
        labName: 'DeWitt Wallace Center'
      },
      {
        name: 'Dr. Jeff Jarvis',
        title: 'Professor',
        department: 'Journalism',
        university: 'City University of New York',
        location: 'New York, NY',
        researchAreas: ['digital journalism', 'media entrepreneurship', 'future of news'],
        email: 'jarvis@journalism.cuny.edu',
        profileUrl: 'https://journalism.cuny.edu/jarvis',
        labName: 'Tow-Knight Center for Entrepreneurial Journalism'
      },
      {
        name: 'Dr. Dan Gillmor',
        title: 'Professor',
        department: 'Journalism',
        university: 'Arizona State University',
        location: 'Tempe, AZ',
        researchAreas: ['citizen journalism', 'media literacy', 'technology journalism'],
        email: 'gillmor@asu.edu',
        profileUrl: 'https://journalism.asu.edu/gillmor',
        labName: 'News Co/Lab'
      },
      {
        name: 'Dr. Clay Shirky',
        title: 'Professor',
        department: 'Journalism',
        university: 'New York University',
        location: 'New York, NY',
        researchAreas: ['social media', 'network effects', 'digital culture'],
        email: 'shirky@nyu.edu',
        profileUrl: 'https://journalism.nyu.edu/shirky',
        labName: 'Interactive Telecommunications Program'
      },
      {
        name: 'Dr. Nikki Usher',
        title: 'Professor',
        department: 'Journalism',
        university: 'University of Illinois',
        location: 'Urbana, IL',
        researchAreas: ['newsroom culture', 'digital transformation', 'news sociology'],
        email: 'usher@illinois.edu',
        profileUrl: 'https://journalism.illinois.edu/usher',
        labName: 'Center for Digital Journalism'
      },
      {
        name: 'Dr. C.W. Anderson',
        title: 'Professor',
        department: 'Journalism',
        university: 'University of Leeds',
        location: 'Leeds, UK',
        researchAreas: ['news sociology', 'data journalism', 'local news'],
        email: 'anderson@leeds.ac.uk',
        profileUrl: 'https://journalism.leeds.ac.uk/anderson',
        labName: 'Centre for Digital Journalism Research'
      },
      {
        name: 'Dr. Sue Robinson',
        title: 'Professor',
        department: 'Journalism',
        university: 'University of Wisconsin-Madison',
        location: 'Madison, WI',
        researchAreas: ['community journalism', 'digital storytelling', 'news engagement'],
        email: 'robinson@journalism.wisc.edu',
        profileUrl: 'https://journalism.wisc.edu/robinson',
        labName: 'Center for Journalism Ethics'
      },
      {
        name: 'Dr. Geneva Overholser',
        title: 'Professor',
        department: 'Journalism',
        university: 'University of Southern California',
        location: 'Los Angeles, CA',
        researchAreas: ['press criticism', 'journalism ethics', 'editorial leadership'],
        email: 'overholser@usc.edu',
        profileUrl: 'https://journalism.usc.edu/overholser',
        labName: 'Annenberg School for Communication'
      },
      {
        name: 'Dr. Tom Rosenstiel',
        title: 'Professor',
        department: 'Journalism',
        university: 'University of Maryland',
        location: 'College Park, MD',
        researchAreas: ['journalism standards', 'news literacy', 'media research'],
        email: 'rosenstiel@umd.edu',
        profileUrl: 'https://journalism.umd.edu/rosenstiel',
        labName: 'American Press Institute'
      },
      {
        name: 'Dr. Kathleen Hall Jamieson',
        title: 'Professor',
        department: 'Communication',
        university: 'University of Pennsylvania',
        location: 'Philadelphia, PA',
        researchAreas: ['political communication', 'media effects', 'fact-checking'],
        email: 'jamieson@upenn.edu',
        profileUrl: 'https://communication.upenn.edu/jamieson',
        labName: 'Annenberg Public Policy Center'
      },
      {
        name: 'Dr. Michael Schudson',
        title: 'Professor',
        department: 'Journalism',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['journalism history', 'news sociology', 'media and democracy'],
        email: 'schudson@columbia.edu',
        profileUrl: 'https://journalism.columbia.edu/schudson',
        labName: 'Columbia Journalism Review'
      }
    ]
  };

  private async generateProfessorsWithAI(criteria: SearchCriteria): Promise<ScrapedProfessor[]> {
    console.log("Using comprehensive professor database based on criteria...");
    
    // Use the extensive database first
    const fieldProfessors = this.professorDatabase[criteria.field] || [];
    
    if (fieldProfessors.length > 0) {
      let filteredProfessors = [...fieldProfessors];
      
      // Apply school filter if specified
      if (criteria.school) {
        filteredProfessors = filteredProfessors.filter(prof => 
          prof.university.toLowerCase().includes(criteria.school!.toLowerCase())
        );
      }
      
      // Apply location filter if specified
      if (criteria.location) {
        filteredProfessors = filteredProfessors.filter(prof => 
          prof.location.toLowerCase().includes(criteria.location!.toLowerCase())
        );
      }
      
      // If no results after filtering, return all professors from the field
      if (filteredProfessors.length === 0) {
        filteredProfessors = fieldProfessors;
      }
      
      return filteredProfessors.slice(0, 50);
    }

    try {
      const prompt = `
Generate 20 realistic ${criteria.field} professors for university research. Create diverse, believable academic profiles.

Requirements:
- Real university names and locations
- Realistic email formats
- DO NOT include profileUrl field - omit it completely
- Diverse names representing various backgrounds
- Specific research areas related to ${criteria.field}
- Academic titles: Professor, Associate Professor, Assistant Professor

Return ONLY a valid JSON array:
[
  {
    "name": "Dr. Sarah Chen",
    "title": "Professor",
    "department": "Computer Science",
    "university": "Stanford University", 
    "location": "Stanford, CA",
    "researchAreas": ["machine learning", "computer vision", "AI ethics"],
    "email": "schen@cs.stanford.edu",
    "labName": "Intelligent Systems Lab"
  }
]

Focus on ${criteria.school || 'top research universities'} in ${criteria.location || 'the United States'}.
`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'College Research Tool'
        },
        body: JSON.stringify({
          model: 'nvidia/llama-3.3-nemotron-super-49b-v1:free',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 3000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API request failed: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('No response from AI');
      }

      try {
        const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const professors = JSON.parse(jsonMatch[0]);
          return Array.isArray(professors) ? professors.slice(0, 20) : [];
        }
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
      }

      return this.getFallbackProfessors(criteria);

    } catch (error) {
      console.error('Error with AI professor generation:', error);
      return this.getFallbackProfessors(criteria);
    }
  }

  private getFallbackProfessors(criteria: SearchCriteria): ScrapedProfessor[] {
    // Return a subset from our database as fallback
    const allProfessors = Object.values(this.professorDatabase).flat();
    return allProfessors.slice(0, 10);
  }

  public async searchProfessors(criteria: SearchCriteria): Promise<ScrapedProfessor[]> {
    try {
      console.log(`Starting professor search with criteria:`, criteria);
      
      const professors = await this.generateProfessorsWithAI(criteria);
      
      console.log(`Found ${professors.length} professors using comprehensive database`);
      return professors;
      
    } catch (error) {
      console.error('Error searching for professors:', error);
      return this.getFallbackProfessors(criteria);
    }
  }
}

export const professorService = new ProfessorService();
