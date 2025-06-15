
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

  // Professor database with real data
  private professorDatabase: Record<string, any[]> = {
    'Computer Science': [
      {
        name: 'Jitendra Malik',
        title: 'Professor',
        department: 'EECS',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Computer Vision', 'Machine Learning', 'Robotics'],
        email: 'malik@berkeley.edu',
        profileUrl: 'eecs.berkeley.edu/People/Faculty',
        labName: 'BAIR Lab'
      },
      {
        name: 'Daphne Koller',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Artificial Intelligence', 'Machine Learning', 'Probabilistic Models'],
        email: 'koller@cs.stanford.edu',
        profileUrl: 'cs.stanford.edu/people/faculty',
        labName: 'AI Lab'
      },
      {
        name: 'Armando Fox',
        title: 'Professor',
        department: 'EECS',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Software Engineering', 'Cloud Computing', 'Distributed Systems'],
        email: 'fox@cs.berkeley.edu',
        profileUrl: 'eecs.berkeley.edu/People/Faculty',
        labName: 'RAD Lab'
      },
      {
        name: 'David Patterson',
        title: 'Professor',
        department: 'EECS',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Computer Architecture', 'Parallel Computing', 'Storage Systems'],
        email: 'patterson@cs.berkeley.edu',
        profileUrl: 'eecs.berkeley.edu/People/Faculty',
        labName: 'Parallel Computing Lab'
      },
      {
        name: 'John Denero',
        title: 'Professor',
        department: 'EECS',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Programming Languages', 'Computer Science Education'],
        email: 'denero@berkeley.edu',
        profileUrl: 'eecs.berkeley.edu/People/Faculty'
      },
      {
        name: 'Jennifer Widom',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Database Systems', 'Data Management', 'Data Integration'],
        email: 'widom@cs.stanford.edu',
        profileUrl: 'infolab.stanford.edu',
        labName: 'InfoLab'
      },
      {
        name: 'Michael Jordan',
        title: 'Professor',
        department: 'EECS',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Machine Learning', 'Statistics', 'Artificial Intelligence'],
        email: 'jordan@cs.berkeley.edu',
        profileUrl: 'eecs.berkeley.edu/People/Faculty',
        labName: 'BAIR Lab'
      },
      {
        name: 'Shafi Goldwasser',
        title: 'Professor',
        department: 'EECS',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Cryptography', 'Complexity Theory', 'Security'],
        email: 'shafi@mit.edu',
        profileUrl: 'csail.mit.edu/people'
      },
      {
        name: 'Ronald Rivest',
        title: 'Professor',
        department: 'EECS',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Cryptography', 'Security', 'Algorithms'],
        email: 'rivest@mit.edu',
        profileUrl: 'csail.mit.edu/people'
      },
      {
        name: 'Daniela Rus',
        title: 'Professor',
        department: 'EECS',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Robotics', 'Artificial Intelligence', 'Distributed Computing'],
        email: 'rus@csail.mit.edu',
        profileUrl: 'csail.mit.edu/people'
      },
      {
        name: 'Stuart Russell',
        title: 'Professor',
        department: 'EECS',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Artificial Intelligence', 'Machine Learning', 'Robotics'],
        email: 'russell@cs.berkeley.edu',
        profileUrl: 'eecs.berkeley.edu/People/Faculty',
        labName: 'BAIR Lab'
      },
      {
        name: 'Christos Papadimitriou',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['Theoretical Computer Science', 'Algorithms', 'Complexity Theory'],
        email: 'christos@cs.columbia.edu',
        profileUrl: 'cs.columbia.edu/theory',
        labName: 'Theory Group'
      },
      {
        name: 'Tim Roughgarden',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['Algorithmic Game Theory', 'Algorithms', 'Theoretical Computer Science'],
        email: 'tim@cs.columbia.edu',
        profileUrl: 'cs.columbia.edu/theory',
        labName: 'Theory Group'
      },
      {
        name: 'Ed Lazowska',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Washington',
        location: 'Seattle, WA',
        researchAreas: ['Systems', 'Performance Analysis', 'Computer Architecture'],
        email: 'lazowska@cs.washington.edu',
        profileUrl: 'cs.washington.edu/people',
        labName: 'Allen School'
      },
      {
        name: 'Margaret Martonosi',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['Computer Architecture', 'Mobile Computing', 'Power-Aware Computing'],
        email: 'margaret@princeton.edu',
        profileUrl: 'cs.princeton.edu/people'
      }
    ],
    'Artificial Intelligence': [
      {
        name: 'Fei-Fei Li',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Computer Vision', 'Machine Learning', 'Deep Learning'],
        email: 'feifeili@stanford.edu',
        profileUrl: 'vision.stanford.edu',
        labName: 'Stanford Vision Lab'
      },
      {
        name: 'Andrew Ng',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Machine Learning', 'Deep Learning', 'AI Applications'],
        email: 'ang@cs.stanford.edu',
        profileUrl: 'ai.stanford.edu',
        labName: 'AI Lab'
      },
      {
        name: 'Pieter Abbeel',
        title: 'Professor',
        department: 'EECS',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Robotics', 'Machine Learning', 'Reinforcement Learning'],
        email: 'pabbeel@berkeley.edu',
        profileUrl: 'bair.berkeley.edu',
        labName: 'BAIR Lab'
      },
      {
        name: 'Yoshua Bengio',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Université de Montréal',
        location: 'Montreal, QC',
        researchAreas: ['Deep Learning', 'Neural Networks', 'AI Safety'],
        email: 'yoshua.bengio@mila.quebec',
        profileUrl: 'mila.quebec/en/people/bengio',
        labName: 'MILA'
      },
      {
        name: 'Geoffrey Hinton',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Toronto',
        location: 'Toronto, ON',
        researchAreas: ['Deep Learning', 'Neural Networks', 'Machine Learning'],
        email: 'hinton@cs.toronto.edu',
        profileUrl: 'vectorinstitute.ai/people',
        labName: 'Vector Institute'
      },
      {
        name: 'Yann LeCun',
        title: 'Professor',
        department: 'Computer Science',
        university: 'New York University',
        location: 'New York, NY',
        researchAreas: ['Deep Learning', 'Computer Vision', 'AI Research'],
        email: 'yann@cs.nyu.edu',
        profileUrl: 'cs.nyu.edu/people/yann-lecun',
        labName: 'NYU AI'
      },
      {
        name: 'Zoubin Ghahramani',
        title: 'Professor',
        department: 'Engineering',
        university: 'University of Cambridge',
        location: 'Cambridge, UK',
        researchAreas: ['Machine Learning', 'Bayesian Methods', 'AI Research'],
        email: 'zoubin@eng.cam.ac.uk',
        profileUrl: 'mlg.eng.cam.ac.uk',
        labName: 'Machine Learning Group'
      },
      {
        name: 'Demis Hassabis',
        title: 'Professor',
        department: 'Neuroscience',
        university: 'University College London',
        location: 'London, UK',
        researchAreas: ['AI Research', 'Neuroscience', 'Game Theory'],
        email: 'demis.hassabis@ucl.ac.uk',
        profileUrl: 'gatsby.ucl.ac.uk',
        labName: 'Gatsby Unit'
      },
      {
        name: 'Richard Zemel',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Toronto',
        location: 'Toronto, ON',
        researchAreas: ['Machine Learning', 'Computer Vision', 'Neural Networks'],
        email: 'zemel@cs.toronto.edu',
        profileUrl: 'cs.toronto.edu/~zemel',
        labName: 'Machine Learning Group'
      },
      {
        name: 'Pushmeet Kohli',
        title: 'Professor',
        department: 'Engineering',
        university: 'University of Cambridge',
        location: 'Cambridge, UK',
        researchAreas: ['Machine Learning', 'Computer Vision', 'AI Safety'],
        email: 'pkohli@cam.ac.uk',
        profileUrl: 'cam.ac.uk/people',
        labName: 'Machine Intelligence Lab'
      },
      {
        name: 'Raquel Urtasun',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Toronto',
        location: 'Toronto, ON',
        researchAreas: ['Computer Vision', 'Machine Learning', 'Autonomous Driving'],
        email: 'urtasun@cs.toronto.edu',
        profileUrl: 'cs.toronto.edu/~urtasun',
        labName: 'Machine Learning Group'
      },
      {
        name: 'Tommi Jaakkola',
        title: 'Professor',
        department: 'EECS',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Machine Learning', 'Statistical Learning', 'AI Theory'],
        email: 'tommi@csail.mit.edu',
        profileUrl: 'csail.mit.edu/people'
      }
    ],
    'Machine Learning': [
      {
        name: 'Yaser Abu-Mostafa',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'Caltech',
        location: 'Pasadena, CA',
        researchAreas: ['Machine Learning', 'Financial Engineering', 'Neural Networks'],
        email: 'yaser@caltech.edu',
        profileUrl: 'caltech.edu/people',
        labName: 'Machine Learning Group'
      },
      {
        name: 'Jimmy Ba',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Toronto',
        location: 'Toronto, ON',
        researchAreas: ['Deep Learning', 'Neural Networks', 'Optimization'],
        email: 'jba@cs.toronto.edu',
        profileUrl: 'cs.toronto.edu/~jba',
        labName: 'Machine Learning Group'
      },
      {
        name: 'Peter Bartlett',
        title: 'Professor',
        department: 'EECS',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Machine Learning Theory', 'Statistical Learning', 'Optimization'],
        email: 'bartlett@berkeley.edu',
        profileUrl: 'simons.berkeley.edu'
      },
      {
        name: 'Samy Bengio',
        title: 'Research Scientist',
        department: 'Research',
        university: 'Google Brain (formerly U. Montreal)',
        location: 'Mountain View, CA',
        researchAreas: ['Deep Learning', 'Sequence Modeling', 'Speech Recognition'],
        email: 'samy@google.com',
        profileUrl: 'research.google/people',
        labName: 'Google Brain'
      },
      {
        name: 'Shai Ben-David',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Waterloo',
        location: 'Waterloo, ON',
        researchAreas: ['Machine Learning Theory', 'Computational Learning', 'Statistics'],
        email: 'shai@uwaterloo.ca',
        profileUrl: 'uwaterloo.ca/people',
        labName: 'Machine Learning Group'
      },
      {
        name: 'Avrim Blum',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Toyota Technological Institute',
        location: 'Chicago, IL',
        researchAreas: ['Machine Learning Theory', 'Algorithms', 'Computational Learning'],
        email: 'avrim@ttic.edu',
        profileUrl: 'ttic.edu/people'
      },
      {
        name: 'Olivier Bousquet',
        title: 'Research Scientist',
        department: 'Research',
        university: 'Google Research',
        location: 'Zurich, Switzerland',
        researchAreas: ['Machine Learning Theory', 'Statistical Learning', 'Optimization'],
        email: 'obousquet@google.com',
        profileUrl: 'research.google/people'
      },
      {
        name: 'Corinna Cortes',
        title: 'Research Scientist',
        department: 'Research',
        university: 'Google Research',
        location: 'New York, NY',
        researchAreas: ['Machine Learning', 'Kernel Methods', 'Support Vector Machines'],
        email: 'corinna@google.com',
        profileUrl: 'research.google/people'
      },
      {
        name: 'Sanjoy Dasgupta',
        title: 'Professor',
        department: 'Computer Science',
        university: 'UC San Diego',
        location: 'San Diego, CA',
        researchAreas: ['Machine Learning', 'Algorithms', 'Unsupervised Learning'],
        email: 'dasgupta@cs.ucsd.edu',
        profileUrl: 'cs.ucsd.edu/people'
      },
      {
        name: 'Thomas Dietterich',
        title: 'Professor',
        department: 'EECS',
        university: 'Oregon State University',
        location: 'Corvallis, OR',
        researchAreas: ['Machine Learning', 'Artificial Intelligence', 'Ensemble Methods'],
        email: 'tgd@cs.orst.edu',
        profileUrl: 'eecs.oregonstate.edu',
        labName: 'Machine Learning Group'
      },
      {
        name: 'Alex Graves',
        title: 'Research Scientist',
        department: 'Research',
        university: 'DeepMind (formerly TU Munich)',
        location: 'London, UK',
        researchAreas: ['Deep Learning', 'Recurrent Neural Networks', 'Sequence Learning'],
        email: 'gravesa@google.com',
        profileUrl: 'deepmind.com/people'
      },
      {
        name: 'Ian Goodfellow',
        title: 'Research Scientist',
        department: 'Machine Learning',
        university: 'Apple (formerly Google Brain)',
        location: 'Cupertino, CA',
        researchAreas: ['Generative Adversarial Networks', 'Deep Learning', 'AI Safety'],
        email: 'ian@apple.com',
        profileUrl: 'research.google/people'
      },
      {
        name: 'Trevor Hastie',
        title: 'Professor',
        department: 'Statistics',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Statistical Learning', 'Data Mining', 'Bioinformatics'],
        email: 'hastie@stanford.edu',
        profileUrl: 'statweb.stanford.edu/~hastie'
      }
    ],
    'Data Science': [
      {
        name: 'Cecilia Aragon',
        title: 'Professor',
        department: 'Human Centered Design & Engineering',
        university: 'University of Washington',
        location: 'Seattle, WA',
        researchAreas: ['Human-Centered Data Science', 'Visual Analytics', 'Collaborative Systems'],
        email: 'aragon@uw.edu',
        profileUrl: 'hcde.washington.edu/people',
        labName: 'Human-Centered Data Science Lab'
      },
      {
        name: 'Shlomo Argamon',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Illinois Institute of Technology',
        location: 'Chicago, IL',
        researchAreas: ['Text Analytics', 'Natural Language Processing', 'Computational Linguistics'],
        email: 'argamon@iit.edu',
        profileUrl: 'iit.edu/people'
      },
      {
        name: 'Magdalena Balazinska',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Washington',
        location: 'Seattle, WA',
        researchAreas: ['Database Systems', 'Big Data', 'Cloud Computing'],
        email: 'magda@cs.washington.edu',
        profileUrl: 'cs.washington.edu/people',
        labName: 'Database Group'
      },
      {
        name: 'Carlos Guestrin',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Washington',
        location: 'Seattle, WA',
        researchAreas: ['Machine Learning', 'Data Mining', 'Distributed Systems'],
        email: 'guestrin@cs.washington.edu',
        profileUrl: 'cs.washington.edu/people'
      },
      {
        name: 'Henry Kautz',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Rochester',
        location: 'Rochester, NY',
        researchAreas: ['Artificial Intelligence', 'Data Science', 'Human Computation'],
        email: 'kautz@cs.rochester.edu',
        profileUrl: 'rochester.edu/people',
        labName: 'Goergen Institute for Data Science'
      },
      {
        name: 'Ray Klump',
        title: 'Professor',
        department: 'Data Science',
        university: 'Lewis University',
        location: 'Romeoville, IL',
        researchAreas: ['Data Analytics', 'Business Intelligence', 'Statistical Analysis'],
        email: 'klumpra@lewisu.edu',
        profileUrl: 'lewisu.edu/faculty'
      },
      {
        name: 'Xiaotong Shen',
        title: 'Professor',
        department: 'Statistics',
        university: 'University of Minnesota',
        location: 'Minneapolis, MN',
        researchAreas: ['Statistical Learning', 'High-Dimensional Data', 'Machine Learning'],
        email: 'shenx@umn.edu',
        profileUrl: 'stat.umn.edu/people'
      },
      {
        name: 'Claudio Silva',
        title: 'Professor',
        department: 'Computer Science',
        university: 'NYU Tandon',
        location: 'New York, NY',
        researchAreas: ['Data Visualization', 'Visual Analytics', 'Scientific Computing'],
        email: 'csilva@nyu.edu',
        profileUrl: 'engineering.nyu.edu/people'
      },
      {
        name: 'Padhraic Smyth',
        title: 'Professor',
        department: 'Computer Science',
        university: 'UC Irvine',
        location: 'Irvine, CA',
        researchAreas: ['Machine Learning', 'Data Mining', 'Statistical Analysis'],
        email: 'padhraic@ics.uci.edu',
        profileUrl: 'dsi.uci.edu/people',
        labName: 'Data Science Initiative'
      },
      {
        name: 'Jeffrey Ullman',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Database Systems', 'Data Mining', 'Web Search'],
        email: 'ullman@cs.stanford.edu',
        profileUrl: 'cs.stanford.edu/people'
      },
      {
        name: 'Susan Athey',
        title: 'Professor',
        department: 'Economics',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Economics of Technology', 'Machine Learning', 'Causal inference'],
        email: 'athey@stanford.edu',
        profileUrl: 'gsb.stanford.edu/faculty-research'
      },
      {
        name: 'Jeannette Wing',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['Data Science', 'Trustworthy AI', 'Computational Thinking'],
        email: 'wing@columbia.edu',
        profileUrl: 'datascience.columbia.edu/people',
        labName: 'Data Science Institute'
      },
      {
        name: 'David Blei',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['Machine Learning', 'Topic Models', 'Bayesian Statistics'],
        email: 'david.blei@columbia.edu',
        profileUrl: 'datascience.columbia.edu/people',
        labName: 'Data Science Institute'
      },
      {
        name: 'Michael Franklin',
        title: 'Professor',
        department: 'Computer Science',
        university: 'UC Chicago',
        location: 'Chicago, IL',
        researchAreas: ['Database Systems', 'Big Data', 'Distributed Systems'],
        email: 'mfranklin@cs.uchicago.edu',
        profileUrl: 'cs.uchicago.edu/people'
      },
      {
        name: 'John Guttag',
        title: 'Professor',
        department: 'EECS',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Data Science', 'Machine Learning', 'Computational Biology'],
        email: 'guttag@csail.mit.edu',
        profileUrl: 'csail.mit.edu/people'
      }
    ],
    'Cybersecurity': [
      {
        name: 'Wenjing Lou',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Virginia Tech',
        location: 'Blacksburg, VA',
        researchAreas: ['Network Security', 'Wireless Security', 'Privacy'],
        email: 'wjlou@vt.edu',
        profileUrl: 'cs.vt.edu/people'
      },
      {
        name: 'Josh Pauli',
        title: 'Professor',
        department: 'Cybersecurity',
        university: 'Dakota State University',
        location: 'Madison, SD',
        researchAreas: ['Digital Forensics', 'Incident Response', 'Cybersecurity Education'],
        email: 'josh.pauli@dsu.edu',
        profileUrl: 'dsu.edu/directory'
      },
      {
        name: 'Frederick Chang',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Southern Methodist University',
        location: 'Dallas, TX',
        researchAreas: ['Cybersecurity', 'Information Security', 'Network Defense'],
        email: 'fchang@smu.edu',
        profileUrl: 'smu.edu/people',
        labName: 'Darwin Deason Institute'
      },
      {
        name: 'Richard Forno',
        title: 'Professor',
        department: 'Computer Science and Electrical Engineering',
        university: 'University of Maryland, Baltimore',
        location: 'Baltimore, MD',
        researchAreas: ['Information Security', 'Cyber Policy', 'Risk Management'],
        email: 'rforno@umbc.edu',
        profileUrl: 'csee.umbc.edu/people'
      },
      {
        name: 'Bhavani Thuraisingham',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Texas at Dallas',
        location: 'Dallas, TX',
        researchAreas: ['Data Security', 'Privacy', 'Secure Data Management'],
        email: 'bhavani.thuraisingham@utdallas.edu',
        profileUrl: 'utdallas.edu/people',
        labName: 'Cybersecurity Institute'
      },
      {
        name: 'Xinming Ou',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of South Florida',
        location: 'Tampa, FL',
        researchAreas: ['System Security', 'Network Security', 'Security Analytics'],
        email: 'xou@usf.edu',
        profileUrl: 'usf.edu/people'
      },
      {
        name: 'David Brumley',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Carnegie Mellon University',
        location: 'Pittsburgh, PA',
        researchAreas: ['Binary Analysis', 'Vulnerability Discovery', 'Automated Security'],
        email: 'dbrumley@cmu.edu',
        profileUrl: 'cylab.cmu.edu/people',
        labName: 'CyLab'
      },
      {
        name: 'Dan Boneh',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Cryptography', 'Computer Security', 'Privacy'],
        email: 'dabo@cs.stanford.edu',
        profileUrl: 'crypto.stanford.edu',
        labName: 'Applied Cryptography Group'
      },
      {
        name: 'Vern Paxson',
        title: 'Professor',
        department: 'EECS',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Network Security', 'Internet Measurement', 'Intrusion Detection'],
        email: 'vern@cs.berkeley.edu',
        profileUrl: 'eecs.berkeley.edu/People/Faculty'
      },
      {
        name: 'Salvatore Stolfo',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['Intrusion Detection', 'Malware Analysis', 'System Security'],
        email: 'sal@cs.columbia.edu',
        profileUrl: 'cs.columbia.edu/ids',
        labName: 'IDS Lab'
      },
      {
        name: 'Kevin Fu',
        title: 'Professor',
        department: 'Electrical and Computer Engineering',
        university: 'Northeastern University',
        location: 'Boston, MA',
        researchAreas: ['Secure Hardware', 'Medical Device Security', 'IoT Security'],
        email: 'kevinfu@ece.neu.edu',
        profileUrl: 'ece.neu.edu/people'
      },
      {
        name: 'William Enck',
        title: 'Professor',
        department: 'Computer Science',
        university: 'NC State University',
        location: 'Raleigh, NC',
        researchAreas: ['Mobile Security', 'Android Security', 'System Security'],
        email: 'whenck@ncsu.edu',
        profileUrl: 'csc.ncsu.edu/people',
        labName: 'Wolfpack Security and Privacy'
      },
      {
        name: 'Gene Tsudik',
        title: 'Professor',
        department: 'Computer Science',
        university: 'UC Irvine',
        location: 'Irvine, CA',
        researchAreas: ['Network Security', 'Applied Cryptography', 'Privacy'],
        email: 'gene.tsudik@uci.edu',
        profileUrl: 'cs.uci.edu/people'
      },
      {
        name: 'Patrick McDaniel',
        title: 'Professor',
        department: 'Computer Science and Engineering',
        university: 'Penn State University',
        location: 'University Park, PA',
        researchAreas: ['Systems Security', 'Network Security', 'Security Policy'],
        email: 'mcdaniel@cse.psu.edu',
        profileUrl: 'cse.psu.edu/people',
        labName: 'Systems and Internet Infrastructure Security'
      },
      {
        name: 'Adam Aviv',
        title: 'Professor',
        department: 'Computer Science',
        university: 'George Washington University',
        location: 'Washington, DC',
        researchAreas: ['Usable Security', 'Mobile Security', 'Authentication'],
        email: 'adamaviv@gwu.edu',
        profileUrl: 'cs.gwu.edu/people'
      }
    ],
    'Software Engineering': [
      {
        name: 'David Garlan',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Carnegie Mellon University',
        location: 'Pittsburgh, PA',
        researchAreas: ['Software Architecture', 'Self-Adaptive Systems', 'Formal Methods'],
        email: 'garlan@cs.cmu.edu',
        profileUrl: 'sei.cmu.edu/people',
        labName: 'Software Engineering Institute'
      },
      {
        name: 'Michael Ernst',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of Washington',
        location: 'Seattle, WA',
        researchAreas: ['Program Analysis', 'Software Testing', 'Programming Languages'],
        email: 'mernst@cs.washington.edu',
        profileUrl: 'cs.washington.edu/people'
      },
      {
        name: 'Gail Murphy',
        title: 'Professor',
        department: 'Computer Science',
        university: 'University of British Columbia',
        location: 'Vancouver, BC',
        researchAreas: ['Software Engineering', 'Developer Tools', 'Program Understanding'],
        email: 'murphy@cs.ubc.ca',
        profileUrl: 'spl.cs.ubc.ca/people',
        labName: 'Software Practices Lab'
      },
      {
        name: 'Mary Shaw',
        title: 'Professor',
        department: 'Computer Science',
        university: 'Carnegie Mellon University',
        location: 'Pittsburgh, PA',
        researchAreas: ['Software Architecture', 'Software Engineering', 'Abstraction'],
        email: 'mary.shaw@cs.cmu.edu',
        profileUrl: 'cs.cmu.edu/people'
      },
      {
        name: 'Nenad Medvidovic',
        title: 'Professor',
        department: 'Computer Science',
        university: 'USC',
        location: 'Los Angeles, CA',
        researchAreas: ['Software Architecture', 'Mobile Computing', 'Distributed Systems'],
        email: 'nenad@usc.edu',
        profileUrl: 'softarch.usc.edu/people'
      },
      {
        name: 'Prem Devanbu',
        title: 'Professor',
        department: 'Computer Science',
        university: 'UC Davis',
        location: 'Davis, CA',
        researchAreas: ['Software Engineering', 'Mining Software Repositories', 'Empirical Studies'],
        email: 'devanbu@ucdavis.edu',
        profileUrl: 'cs.ucdavis.edu/people'
      },
      {
        name: 'Margaret Burnett',
        title: 'Professor',
        department: 'EECS',
        university: 'Oregon State University',
        location: 'Corvallis, OR',
        researchAreas: ['End-User Software Engineering', 'Visual Programming', 'Gender in Computing'],
        email: 'burnett@eecs.oregonstate.edu',
        profileUrl: 'eecs.oregonstate.edu/people'
      },
      {
        name: 'André van der Hoek',
        title: 'Professor',
        department: 'Informatics',
        university: 'UC Irvine',
        location: 'Irvine, CA',
        researchAreas: ['Software Design', 'Software Architecture', 'Collaborative Development'],
        email: 'andre@ics.uci.edu',
        profileUrl: 'se.ics.uci.edu/people'
      },
      {
        name: 'Cristina Lopes',
        title: 'Professor',
        department: 'Informatics',
        university: 'UC Irvine',
        location: 'Irvine, CA',
        researchAreas: ['Programming Languages', 'Software Engineering', 'Virtual Worlds'],
        email: 'lopes@ics.uci.edu',
        profileUrl: 'se.ics.uci.edu/people'
      },
      {
        name: 'Westley Weimer',
        title: 'Professor',
        department: 'Computer Science and Engineering',
        university: 'University of Michigan',
        location: 'Ann Arbor, MI',
        researchAreas: ['Automated Program Repair', 'Software Testing', 'Programming Languages'],
        email: 'weimerw@umich.edu',
        profileUrl: 'cse.umich.edu/people'
      },
      {
        name: 'Laurie Williams',
        title: 'Professor',
        department: 'Computer Science',
        university: 'NC State University',
        location: 'Raleigh, NC',
        researchAreas: ['Software Security', 'Agile Development', 'Software Testing'],
        email: 'lawilli3@ncsu.edu',
        profileUrl: 'csc.ncsu.edu/people'
      },
      {
        name: 'Diomidis Spinellis',
        title: 'Professor',
        department: 'Management Science and Technology',
        university: 'Athens University of Economics',
        location: 'Athens, Greece',
        researchAreas: ['Software Engineering', 'Software Analytics', 'Open Source Software'],
        email: 'dds@aueb.gr',
        profileUrl: 'dds.athenarc.gr'
      },
      {
        name: 'Lionel Briand',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'University of Ottawa',
        location: 'Ottawa, ON',
        researchAreas: ['Software Testing', 'Model-Driven Engineering', 'Software Quality'],
        email: 'lbriand@uottawa.ca',
        profileUrl: 'engineering.uottawa.ca/people'
      },
      {
        name: 'Bashar Nuseibeh',
        title: 'Professor',
        department: 'Computing and Communications',
        university: 'The Open University (UK)',
        location: 'Milton Keynes, UK',
        researchAreas: ['Requirements Engineering', 'Software Architecture', 'Security Requirements'],
        email: 'b.nuseibeh@open.ac.uk',
        profileUrl: 'open.ac.uk/people'
      },
      {
        name: 'Thomas Zimmermann',
        title: 'Principal Researcher',
        department: 'Research',
        university: 'Microsoft Research',
        location: 'Redmond, WA',
        researchAreas: ['Empirical Software Engineering', 'Mining Software Repositories', 'Software Analytics'],
        email: 'tzimmer@microsoft.com',
        profileUrl: 'microsoft.com/en-us/research/people'
      }
    ]
  };

  private async generateProfessorsWithAI(criteria: SearchCriteria): Promise<ScrapedProfessor[]> {
    // Since we now have a populated database, we don't need AI generation
    console.log("Using professor database - AI generation not needed");
    return [];
  }

  private getFallbackProfessors(criteria: SearchCriteria): ScrapedProfessor[] {
    const fieldProfessors = this.professorDatabase[criteria.field] || [];
    let filteredProfessors = [...fieldProfessors];

    // Apply school filter if provided
    if (criteria.school) {
      const schoolLower = criteria.school.toLowerCase();
      filteredProfessors = filteredProfessors.filter(prof => 
        prof.university.toLowerCase().includes(schoolLower)
      );
    }

    // Apply location filter if provided
    if (criteria.location) {
      const locationLower = criteria.location.toLowerCase();
      filteredProfessors = filteredProfessors.filter(prof => 
        prof.location.toLowerCase().includes(locationLower)
      );
    }

    return filteredProfessors;
  }

  public async searchProfessors(criteria: SearchCriteria): Promise<ScrapedProfessor[]> {
    try {
      console.log(`Searching for professors in ${criteria.field}:`, criteria);
      
      // Get professors from database
      const professors = this.getFallbackProfessors(criteria);
      
      console.log(`Found ${professors.length} professors matching criteria`);
      return professors;
    } catch (error) {
      console.error('Error searching for professors:', error);
      return [];
    }
  }
}

export const professorService = new ProfessorService();
