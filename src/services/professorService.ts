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
    ],
    'Biomedical Engineering': [
      {
        name: 'Robert Langer',
        title: 'Professor',
        department: 'Chemical Engineering',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Drug Delivery', 'Tissue Engineering', 'Biomaterials'],
        email: 'rlanger@mit.edu',
        profileUrl: 'web.mit.edu/langerlab/',
        labName: 'Langer Lab'
      },
      {
        name: 'Jennifer Elisseeff',
        title: 'Professor',
        department: 'Biomedical Engineering',
        university: 'Johns Hopkins University',
        location: 'Baltimore, MD',
        researchAreas: ['Tissue Engineering', 'Regenerative Medicine', 'Biomaterials'],
        email: 'jhe@jhu.edu',
        profileUrl: 'engineering.jhu.edu/ttetc/',
        labName: 'Translational Tissue Engineering Center'
      },
      {
        name: 'Sangeeta Bhatia',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Tissue Engineering', 'Nanotechnology', 'Cancer Research'],
        email: 'sbhatia@mit.edu',
        profileUrl: 'bhatia.mit.edu/',
        labName: 'Bhatia Lab'
      },
      {
        name: 'Gordana Vunjak-Novakovic',
        title: 'Professor',
        department: 'Biomedical Engineering',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['Tissue Engineering', 'Stem Cell Engineering', 'Bioreactors'],
        email: 'gv2131@columbia.edu',
        profileUrl: 'gvnlab.bme.columbia.edu/',
        labName: 'Stem Cell & Tissue Engineering Lab'
      },
      {
        name: 'Shu Chien',
        title: 'Professor',
        department: 'Bioengineering',
        university: 'UC San Diego',
        location: 'San Diego, CA',
        researchAreas: ['Mechanobiology', 'Cardiovascular Engineering', 'Cell Biology'],
        email: 'shchien@ucsd.edu',
        profileUrl: 'iem.ucsd.edu/',
        labName: 'Institute of Engineering in Medicine'
      },
      {
        name: 'Mark Humayun',
        title: 'Professor',
        department: 'Ophthalmology',
        university: 'USC',
        location: 'Los Angeles, CA',
        researchAreas: ['Neural Engineering', 'Medical Devices', 'Vision Restoration'],
        email: 'humayun@med.usc.edu',
        profileUrl: 'keck.usc.edu/faculty/mark-humayun/',
        labName: 'USC Eye Institute'
      },
      {
        name: 'Michael McAlpine',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'University of Minnesota',
        location: 'Minneapolis, MN',
        researchAreas: ['3D Printing', 'Bioelectronics', 'Nanomaterials'],
        email: 'mmcalpine@umn.edu',
        profileUrl: 'cse.umn.edu/mcalpine/',
        labName: 'McAlpine Research Group'
      },
      {
        name: 'Helen H. Lu',
        title: 'Professor',
        department: 'Biomedical Engineering',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['Interface Tissue Engineering', 'Orthopedic Biomaterials', 'Regenerative Medicine'],
        email: 'hl2645@columbia.edu',
        profileUrl: 'bme.columbia.edu/faculty/hl2645/',
        labName: 'Biomaterials and Interface Tissue Eng. Lab'
      },
      {
        name: 'John Rogers',
        title: 'Professor',
        department: 'Materials Science',
        university: 'Northwestern University',
        location: 'Evanston, IL',
        researchAreas: ['Bioelectronics', 'Flexible Electronics', 'Medical Devices'],
        email: 'jrogers@northwestern.edu',
        profileUrl: 'rogersgroup.northwestern.edu/',
        labName: 'Rogers Research Group'
      },
      {
        name: 'Bin He',
        title: 'Professor',
        department: 'Biomedical Engineering',
        university: 'Carnegie Mellon University',
        location: 'Pittsburgh, PA',
        researchAreas: ['Neural Engineering', 'Brain-Computer Interfaces', 'Medical Imaging'],
        email: 'binhe@cmu.edu',
        profileUrl: 'engineering.cmu.edu/directory/profile.html?he/',
        labName: 'Biomedical Functional Imaging & Neuroeng.'
      },
      {
        name: 'K. Jane Grande-Allen',
        title: 'Professor',
        department: 'Bioengineering',
        university: 'Rice University',
        location: 'Houston, TX',
        researchAreas: ['Cardiovascular Engineering', 'Heart Valve Disease', 'Tissue Engineering'],
        email: 'grande@rice.edu',
        profileUrl: 'grandeallenlab.rice.edu/',
        labName: 'Cardiovascular Tissue Engineering Lab'
      },
      {
        name: 'Tejal Desai',
        title: 'Professor',
        department: 'Biomedical Engineering',
        university: 'Brown University',
        location: 'Providence, RI',
        researchAreas: ['Drug Delivery', 'Microfabrication', 'Nano-bioengineering'],
        email: 'tejal_desai@brown.edu',
        profileUrl: 'desailab.brown.edu/',
        labName: 'Desai Lab'
      },
      {
        name: 'Jordan Green',
        title: 'Professor',
        department: 'Biomedical Engineering',
        university: 'Johns Hopkins University',
        location: 'Baltimore, MD',
        researchAreas: ['Gene Therapy', 'Drug Delivery', 'Biomaterials'],
        email: 'jhg@jhu.edu',
        profileUrl: 'bme.jhu.edu/people/jordan-green/',
        labName: 'Green Lab'
      },
      {
        name: 'David Mooney',
        title: 'Professor',
        department: 'Bioengineering',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['Tissue Engineering', 'Biomaterials', 'Cancer Immunotherapy'],
        email: 'mooneyd@seas.harvard.edu',
        profileUrl: 'mooneylab.seas.harvard.edu/',
        labName: 'Mooney Lab'
      },
      {
        name: 'Ali Khademhosseini',
        title: 'Professor',
        department: 'Bioengineering',
        university: 'UCLA',
        location: 'Los Angeles, CA',
        researchAreas: ['Tissue Engineering', 'Organ-on-Chip', 'Biomaterials'],
        email: 'khademh@ucla.edu',
        profileUrl: 'engineer.ucla.edu/ali-khademhosseini/',
        labName: 'Center for Minimally Invasive Therapeutics'
      }
    ],
    'Mechanical Engineering': [
      {
        name: 'Evelyn Wang',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Heat Transfer', 'Thermal Management', 'Energy Systems'],
        email: 'evelynw@mit.edu',
        profileUrl: 'drl.mit.edu/',
        labName: 'Device Research Lab'
      },
      {
        name: 'Asegun Henry',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Energy Storage', 'Heat Transfer', 'Molecular Dynamics'],
        email: 'ase@mit.edu',
        profileUrl: 'henrylab.mit.edu/',
        labName: 'Atomistic Simulation & Energy Group'
      },
      {
        name: 'Alice Agogino',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Robotics', 'Design Optimization', 'Sensors'],
        email: 'agogino@berkeley.edu',
        profileUrl: 'best.berkeley.edu/',
        labName: 'BEST Lab'
      },
      {
        name: 'Jonathan Cagan',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'Carnegie Mellon University',
        location: 'Pittsburgh, PA',
        researchAreas: ['Design Innovation', 'Computational Design', 'Product Development'],
        email: 'jcagan@cmu.edu',
        profileUrl: 'cmu.edu/me/people/faculty/cagan.html/',
        labName: 'Integrated Innovation Institute'
      },
      {
        name: 'James Hone',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['Nanomechanics', 'Materials Science', '2D Materials'],
        email: 'jhone@columbia.edu',
        profileUrl: 'hone.me.columbia.edu/',
        labName: 'Hone Group'
      },
      {
        name: 'Narayana Aluru',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'University of Illinois',
        location: 'Urbana, IL',
        researchAreas: ['Computational Mechanics', 'Nanofluidics', 'Multiscale Modeling'],
        email: 'aluru@illinois.edu',
        profileUrl: 'aluru.mechse.illinois.edu/',
        labName: 'Computational Science & Engineering'
      },
      {
        name: 'William Dunn',
        title: 'Professor',
        department: 'Mechanical & Nuclear Engineering',
        university: 'Kansas State University',
        location: 'Manhattan, KS',
        researchAreas: ['Nuclear Engineering', 'Heat Transfer', 'Thermal Hydraulics'],
        email: 'wdunn@ksu.edu',
        profileUrl: 'engg.ksu.edu/people/dunn/',
        labName: 'Mechanical & Nuclear Engineering'
      },
      {
        name: 'Cyrus Aidun',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'Georgia Tech',
        location: 'Atlanta, GA',
        researchAreas: ['Fluid Mechanics', 'Computational Fluid Dynamics', 'Multiphase Flow'],
        email: 'cyrus.aidun@me.gatech.edu',
        profileUrl: 'me.gatech.edu/people/cyrus-aidun/',
        labName: 'Fluid Mechanics'
      },
      {
        name: 'Ali Beskok',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'Southern Methodist University',
        location: 'Dallas, TX',
        researchAreas: ['Microfluidics', 'Computational Mechanics', 'Heat Transfer'],
        email: 'abeskok@smu.edu',
        profileUrl: 'smu.edu/lyle/departments/me/people/beskok/',
        labName: 'Microfluidics'
      },
      {
        name: 'Mica Grujicic',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'Clemson University',
        location: 'Clemson, SC',
        researchAreas: ['Materials Science', 'Computational Mechanics', 'Multiscale Modeling'],
        email: 'mica.grujicic@ces.clemson.edu',
        profileUrl: 'clemson.edu/cecas/departments/me/people/grujicic.html/',
        labName: 'Computational Materials Science'
      },
      {
        name: 'O. Burak Ozdoganlar',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'Carnegie Mellon University',
        location: 'Pittsburgh, PA',
        researchAreas: ['Manufacturing', 'Precision Machining', 'Vibration Control'],
        email: 'burak@cmu.edu',
        profileUrl: 'meche.engineering.cmu.edu/directory/burak-ozdoganlar.html/',
        labName: 'Complex Engineered Systems'
      },
      {
        name: 'Richard Figliola',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'Clemson University',
        location: 'Clemson, SC',
        researchAreas: ['Experimental Methods', 'Measurements', 'Thermal Systems'],
        email: 'rfiglio@clemson.edu',
        profileUrl: 'clemson.edu/cecas/departments/me/people/figliola.html/',
        labName: 'Mechanical Measurements'
      },
      {
        name: 'Volker Sick',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'University of Michigan',
        location: 'Ann Arbor, MI',
        researchAreas: ['Combustion', 'Energy Systems', 'Laser Diagnostics'],
        email: 'vsick@umich.edu',
        profileUrl: 'me.engin.umich.edu/people/faculty/volker-sick/',
        labName: 'Advanced Energy Research'
      },
      {
        name: 'Daniel Cooper',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'University of Michigan',
        location: 'Ann Arbor, MI',
        researchAreas: ['Manufacturing', 'Sustainability', 'Life Cycle Assessment'],
        email: 'djcooper@umich.edu',
        profileUrl: 'me.engin.umich.edu/people/faculty/daniel-cooper/',
        labName: 'Manufacturing & Sustainability'
      },
      {
        name: 'Tim Colonius',
        title: 'Professor',
        department: 'Mechanical Engineering',
        university: 'Caltech',
        location: 'Pasadena, CA',
        researchAreas: ['Fluid Mechanics', 'Computational Aeroacoustics', 'Turbulence'],
        email: 'colonius@caltech.edu',
        profileUrl: 'colonius.caltech.edu/',
        labName: 'Colonius Group'
      }
    ],
    'Electrical Engineering': [
      {
        name: 'Ali Hajimiri',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'Caltech',
        location: 'Pasadena, CA',
        researchAreas: ['Integrated Circuits', 'RF Systems', 'Wireless Power Transfer'],
        email: 'hajimiri@caltech.edu',
        profileUrl: 'analog.caltech.edu/',
        labName: 'Hajimiri Lab'
      },
      {
        name: 'Andrea Goldsmith',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['Wireless Communications', 'Information Theory', 'Signal Processing'],
        email: 'goldsmith@princeton.edu',
        profileUrl: 'winlab.princeton.edu/',
        labName: 'Wireless Information Network Lab'
      },
      {
        name: 'John C. Doyle',
        title: 'Professor',
        department: 'Control & Dynamical Systems',
        university: 'Caltech',
        location: 'Pasadena, CA',
        researchAreas: ['Control Theory', 'Systems Biology', 'Network Theory'],
        email: 'doyle@cds.caltech.edu',
        profileUrl: 'cds.caltech.edu/people/doyle/',
        labName: 'Control & Dynamical Systems'
      },
      {
        name: 'Muriel Médard',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Network Coding', 'Information Theory', 'Communications'],
        email: 'medard@mit.edu',
        profileUrl: 'netlab.mit.edu/',
        labName: 'Network Coding and Reliable Comm'
      },
      {
        name: 'Tom Lee',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['RF Circuit Design', 'Wireless Systems', 'Analog Circuits'],
        email: 'tlee@stanford.edu',
        profileUrl: 'mic.stanford.edu/',
        labName: 'Microwave Integrated Circuits'
      },
      {
        name: 'H.-S. Philip Wong',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Nanoelectronics', 'Memory Devices', 'Emerging Technologies'],
        email: 'hspwong@stanford.edu',
        profileUrl: 'nano.stanford.edu/',
        labName: 'Nanoelectronics Lab'
      },
      {
        name: 'David Perreault',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Power Electronics', 'Energy Conversion', 'Motor Drives'],
        email: 'perreault@mit.edu',
        profileUrl: 'perreault.mit.edu/',
        labName: 'Power Electronics Research'
      },
      {
        name: 'Ming Wu',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Optical MEMS', 'Photonics', 'Microelectronics'],
        email: 'wu@eecs.berkeley.edu',
        profileUrl: 'eecs.berkeley.edu/Faculty/Homepages/wu.html/',
        labName: 'Optical MEMS Group'
      },
      {
        name: 'John Bowers',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'UC Santa Barbara',
        location: 'Santa Barbara, CA',
        researchAreas: ['Silicon Photonics', 'Optoelectronics', 'Integrated Optics'],
        email: 'bowers@ece.ucsb.edu',
        profileUrl: 'ece.ucsb.edu/Faculty/bowers/',
        labName: 'Bowers Group'
      },
      {
        name: 'Steven Bowers',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'University of Virginia',
        location: 'Charlottesville, VA',
        researchAreas: ['Power Systems', 'Control Systems', 'Smart Grid'],
        email: 'sbowers@virginia.edu',
        profileUrl: 'bowers.ece.virginia.edu/',
        labName: 'Bowers Research Group'
      },
      {
        name: 'David Tse',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Information Theory', 'Wireless Communications', 'Signal Processing'],
        email: 'dntse@stanford.edu',
        profileUrl: 'web.stanford.edu/~dntse/',
        labName: 'Information Systems Lab'
      },
      {
        name: 'Aydogan Ozcan',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'UCLA',
        location: 'Los Angeles, CA',
        researchAreas: ['Biomedical Imaging', 'Machine Learning', 'Computational Optics'],
        email: 'ozcan@ucla.edu',
        profileUrl: 'innovate.ee.ucla.edu/',
        labName: 'Ozcan Research Group'
      },
      {
        name: 'Jelena Vuckovic',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Quantum Photonics', 'Nanophotonics', 'Quantum Information'],
        email: 'jela@stanford.edu',
        profileUrl: 'nqp.stanford.edu/',
        labName: 'Nanoscale and Quantum Photonics'
      },
      {
        name: 'Anantha Chandrakasan',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Low Power Electronics', 'Digital Signal Processing', 'IoT Systems'],
        email: 'anantha@mit.edu',
        profileUrl: 'rle.mit.edu/people/anantha-chandrakasan/',
        labName: 'Energy-Efficient Circuits'
      },
      {
        name: 'Mark Horowitz',
        title: 'Professor',
        department: 'Electrical Engineering',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['VLSI Design', 'Computer Architecture', 'Digital Systems'],
        email: 'horowitz@stanford.edu',
        profileUrl: 'vlsi.stanford.edu/',
        labName: 'VLSI Research Group'
      }
    ],
    'Chemistry': [
      {
        name: 'Carolyn Bertozzi',
        title: 'Professor',
        department: 'Chemistry',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Chemical Biology', 'Bioorthogonal Chemistry', 'Glycobiology'],
        email: 'bertozzi@stanford.edu',
        profileUrl: 'web.stanford.edu/group/bertozzigroup/',
        labName: 'Bertozzi Group'
      },
      {
        name: 'Moungi Bawendi',
        title: 'Professor',
        department: 'Chemistry',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Quantum Dots', 'Nanomaterials', 'Spectroscopy'],
        email: 'mbawendi@mit.edu',
        profileUrl: 'bawendi.mit.edu/',
        labName: 'Bawendi Group'
      },
      {
        name: 'Robert Grubbs',
        title: 'Professor',
        department: 'Chemistry',
        university: 'Caltech',
        location: 'Pasadena, CA',
        researchAreas: ['Organometallic Chemistry', 'Catalysis', 'Polymer Chemistry'],
        email: 'rgrubbs@caltech.edu',
        profileUrl: 'grubbs.caltech.edu/',
        labName: 'Grubbs Group'
      },
      {
        name: 'Omar Yaghi',
        title: 'Professor',
        department: 'Chemistry',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Metal-Organic Frameworks', 'Porous Materials', 'Gas Storage'],
        email: 'yaghi@berkeley.edu',
        profileUrl: 'yaghi.berkeley.edu/',
        labName: 'Yaghi Group'
      },
      {
        name: 'Paul Alivisatos',
        title: 'Professor',
        department: 'Chemistry',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Nanocrystals', 'Solar Cells', 'Quantum Dots'],
        email: 'alivis@berkeley.edu',
        profileUrl: 'alivisatoslab.lbl.gov/',
        labName: 'Alivisatos Group'
      },
      {
        name: 'Eric Jacobsen',
        title: 'Professor',
        department: 'Chemistry',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['Asymmetric Catalysis', 'Organic Synthesis', 'Organocatalysis'],
        email: 'jacobsen@chemistry.harvard.edu',
        profileUrl: 'jacobsen.chem.harvard.edu/',
        labName: 'Jacobsen Group'
      },
      {
        name: 'Frances Arnold',
        title: 'Professor',
        department: 'Chemical Engineering',
        university: 'Caltech',
        location: 'Pasadena, CA',
        researchAreas: ['Directed Evolution', 'Protein Engineering', 'Biocatalysis'],
        email: 'frances@cheme.caltech.edu',
        profileUrl: 'arnoldlab.caltech.edu/',
        labName: 'Arnold Group'
      },
      {
        name: 'Stephen Lippard',
        title: 'Professor',
        department: 'Chemistry',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Inorganic Chemistry', 'Bioinorganic Chemistry', 'Metal Complexes'],
        email: 'lippard@mit.edu',
        profileUrl: 'lippardlab.mit.edu/',
        labName: 'Lippard Lab'
      },
      {
        name: 'Chad Mirkin',
        title: 'Professor',
        department: 'Chemistry',
        university: 'Northwestern University',
        location: 'Evanston, IL',
        researchAreas: ['Nanotechnology', 'DNA Nanotechnology', 'Materials Chemistry'],
        email: 'c-mirkin@northwestern.edu',
        profileUrl: 'mirkin-group.northwestern.edu/',
        labName: 'Mirkin Research Group'
      },
      {
        name: 'Richard Zare',
        title: 'Professor',
        department: 'Chemistry',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Physical Chemistry', 'Spectroscopy', 'Chemical Dynamics'],
        email: 'zare@stanford.edu',
        profileUrl: 'web.stanford.edu/group/Zarelab/',
        labName: 'Zare Lab'
      },
      {
        name: 'Gregory Fu',
        title: 'Professor',
        department: 'Chemistry',
        university: 'Caltech',
        location: 'Pasadena, CA',
        researchAreas: ['Asymmetric Catalysis', 'Transition Metal Chemistry', 'Organic Synthesis'],
        email: 'fu@caltech.edu',
        profileUrl: 'chemistry.caltech.edu/people/gregory-c-fu/',
        labName: 'Fu Group'
      },
      {
        name: 'Daniel Nocera',
        title: 'Professor',
        department: 'Chemistry',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['Artificial Photosynthesis', 'Energy Storage', 'Solar Fuels'],
        email: 'nocera@chemistry.harvard.edu',
        profileUrl: 'nocera.harvard.edu/',
        labName: 'Nocera Lab'
      },
      {
        name: 'James Tour',
        title: 'Professor',
        department: 'Chemistry',
        university: 'Rice University',
        location: 'Houston, TX',
        researchAreas: ['Graphene', 'Molecular Electronics', 'Nanotechnology'],
        email: 'tour@rice.edu',
        profileUrl: 'jmtour.com/',
        labName: 'Tour Group'
      },
      {
        name: 'Angela Belcher',
        title: 'Professor',
        department: 'Materials Science',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Biomaterials', 'Energy Storage', 'Biotechnology'],
        email: 'belcher@mit.edu',
        profileUrl: 'belcher.mit.edu/',
        labName: 'Belcher Lab'
      },
      {
        name: 'Emily Carter',
        title: 'Professor',
        department: 'Engineering',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['Computational Chemistry', 'Quantum Mechanics', 'Materials Science'],
        email: 'eac@princeton.edu',
        profileUrl: 'carter.princeton.edu/',
        labName: 'Carter Research Group'
      }
    ],
    'Physics': [
      {
        name: 'Subir Sachdev',
        title: 'Professor',
        department: 'Physics',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['Condensed Matter Physics', 'Quantum Phase Transitions', 'High-Tc Superconductivity'],
        email: 'sachdev@g.harvard.edu',
        profileUrl: 'scholar.harvard.edu/sachdevgroup/',
        labName: 'Sachdev Group'
      },
      {
        name: 'Steven Chu',
        title: 'Professor',
        department: 'Physics',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Atomic Physics', 'Laser Cooling', 'Biophysics'],
        email: 'schu@stanford.edu',
        profileUrl: 'chu.stanford.edu/',
        labName: 'Chu Group'
      },
      {
        name: 'Nergis Mavalvala',
        title: 'Professor',
        department: 'Physics',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Gravitational Wave Detection', 'Quantum Measurement', 'LIGO'],
        email: 'nergis@mit.edu',
        profileUrl: 'web.mit.edu/physics/people/faculty/nergis-mavalvala.html/',
        labName: 'LIGO'
      },
      {
        name: 'Lene Hau',
        title: 'Professor',
        department: 'Physics',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['Quantum Optics', 'Ultracold Atoms', 'Slow Light'],
        email: 'hau@physics.harvard.edu',
        profileUrl: 'physics.harvard.edu/people/facpages/hau/',
        labName: 'Hau Lab'
      },
      {
        name: 'John Preskill',
        title: 'Professor',
        department: 'Physics',
        university: 'Caltech',
        location: 'Pasadena, CA',
        researchAreas: ['Quantum Computing', 'Quantum Information', 'Theoretical Physics'],
        email: 'preskill@caltech.edu',
        profileUrl: 'theory.caltech.edu/~preskill/',
        labName: 'Preskill Group'
      },
      {
        name: 'Michael Turner',
        title: 'Professor',
        department: 'Physics',
        university: 'University of Chicago',
        location: 'Chicago, IL',
        researchAreas: ['Cosmology', 'Dark Matter', 'Dark Energy'],
        email: 'mturner@uchicago.edu',
        profileUrl: 'physics.uchicago.edu/people/profile/michael-turner/',
        labName: 'Turner Group'
      },
      {
        name: 'Laura Greene',
        title: 'Professor',
        department: 'Physics',
        university: 'Florida State University',
        location: 'Tallahassee, FL',
        researchAreas: ['Superconductivity', 'Quantum Materials', 'High Magnetic Fields'],
        email: 'greene@magnet.fsu.edu',
        profileUrl: 'nationalmaglab.org/about/our-people/laura-greene/',
        labName: 'National High Magnetic Field Lab'
      },
      {
        name: 'Sean Carroll',
        title: 'Professor',
        department: 'Physics',
        university: 'Johns Hopkins University',
        location: 'Baltimore, MD',
        researchAreas: ['Cosmology', 'General Relativity', 'Quantum Mechanics'],
        email: 'seancarroll@jhu.edu',
        profileUrl: 'seancarroll.com/',
        labName: 'Carroll Group'
      },
      {
        name: 'Brian Greene',
        title: 'Professor',
        department: 'Physics',
        university: 'Columbia University',
        location: 'New York, NY',
        researchAreas: ['String Theory', 'Cosmology', 'Theoretical Physics'],
        email: 'greene@phys.columbia.edu',
        profileUrl: 'physics.columbia.edu/content/brian-greene/',
        labName: 'Greene Lab'
      },
      {
        name: 'David Wineland',
        title: 'Professor',
        department: 'Physics',
        university: 'University of Oregon',
        location: 'Eugene, OR',
        researchAreas: ['Atomic Physics', 'Quantum Computing', 'Ion Trapping'],
        email: 'dwineland@uoregon.edu',
        profileUrl: 'physics.uoregon.edu/profile/dwineland/',
        labName: 'Wineland Group'
      },
      {
        name: 'Edward Witten',
        title: 'Professor',
        department: 'Physics',
        university: 'Institute for Advanced Study',
        location: 'Princeton, NJ',
        researchAreas: ['String Theory', 'Mathematical Physics', 'Quantum Field Theory'],
        email: 'witten@ias.edu',
        profileUrl: 'ias.edu/scholars/witten/',
        labName: 'Witten Group'
      },
      {
        name: 'Lyman Page',
        title: 'Professor',
        department: 'Physics',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['Cosmology', 'Cosmic Microwave Background', 'Astrophysics'],
        email: 'lpage@princeton.edu',
        profileUrl: 'phy.princeton.edu/people/lyman-page/',
        labName: 'Cosmology Group'
      },
      {
        name: 'Xiaoliang Qi',
        title: 'Professor',
        department: 'Physics',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Condensed Matter Theory', 'Quantum Information', 'Topological States'],
        email: 'xlqi@stanford.edu',
        profileUrl: 'web.stanford.edu/group/qi_group/',
        labName: 'Qi Group'
      },
      {
        name: 'Ana Maria Rey',
        title: 'Professor',
        department: 'Physics',
        university: 'University of Colorado',
        location: 'Boulder, CO',
        researchAreas: ['Atomic Physics', 'Quantum Simulation', 'Many-Body Physics'],
        email: 'arey@jila.colorado.edu',
        profileUrl: 'jila.colorado.edu/arey/',
        labName: 'Rey Theory Group'
      }
    ],
    'Biology': [
      {
        name: 'Eric Lander',
        title: 'Professor',
        department: 'Biology',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Genomics', 'Computational Biology', 'Human Genetics'],
        email: 'lander@broadinstitute.org',
        profileUrl: 'broadinstitute.org/landergroup/',
        labName: 'Lander Lab'
      },
      {
        name: 'Bonnie Bassler',
        title: 'Professor',
        department: 'Molecular Biology',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['Quorum Sensing', 'Bacterial Communication', 'Microbiology'],
        email: 'bbassler@princeton.edu',
        profileUrl: 'molbio.princeton.edu/people/bonnie-bassler/',
        labName: 'Bassler Lab'
      },
      {
        name: 'David Page',
        title: 'Professor',
        department: 'Biology',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Sex Chromosome Evolution', 'Human Genetics', 'Y Chromosome'],
        email: 'page@wi.mit.edu',
        profileUrl: 'pagelab.wi.mit.edu/',
        labName: 'Page Lab'
      },
      {
        name: 'George Church',
        title: 'Professor',
        department: 'Genetics',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['Synthetic Biology', 'Genomics', 'Gene Editing'],
        email: 'gchurch@genetics.med.harvard.edu',
        profileUrl: 'arep.med.harvard.edu/gmc/',
        labName: 'Church Lab'
      },
      {
        name: 'Svante Pääbo',
        title: 'Professor',
        department: 'Evolutionary Genetics',
        university: 'Max Planck Institute',
        location: 'Leipzig, Germany',
        researchAreas: ['Paleogenomics', 'Human Evolution', 'Ancient DNA'],
        email: 'paabo@eva.mpg.de',
        profileUrl: 'eva.mpg.de/genetics/paabo.html/',
        labName: 'Evolutionary Genetics'
      },
      {
        name: 'Jennifer Doudna',
        title: 'Professor',
        department: 'Molecular Biology',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['CRISPR', 'RNA Biology', 'Structural Biology'],
        email: 'doudna@berkeley.edu',
        profileUrl: 'doudnalab.org/',
        labName: 'Doudna Lab'
      },
      {
        name: 'E. Peter Greenberg',
        title: 'Professor',
        department: 'Microbiology',
        university: 'University of Washington',
        location: 'Seattle, WA',
        researchAreas: ['Quorum Sensing', 'Bacterial Signaling', 'Microbial Communities'],
        email: 'epg@uw.edu',
        profileUrl: 'depts.washington.edu/epglab/',
        labName: 'Greenberg Lab'
      },
      {
        name: 'David Botstein',
        title: 'Professor',
        department: 'Molecular Biology',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['Yeast Genetics', 'Genomics', 'Systems Biology'],
        email: 'botstein@princeton.edu',
        profileUrl: 'molbio.princeton.edu/people/david-botstein/',
        labName: 'Botstein Lab'
      },
      {
        name: 'Xiaowei Zhuang',
        title: 'Professor',
        department: 'Chemistry',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['Single Molecule Biophysics', 'Super-resolution Microscopy', 'Cell Biology'],
        email: 'zhuang@chemistry.harvard.edu',
        profileUrl: 'zhuang.harvard.edu/',
        labName: 'Zhuang Lab'
      },
      {
        name: 'Hopi Hoekstra',
        title: 'Professor',
        department: 'Organismic Biology',
        university: 'Harvard University',
        location: 'Cambridge, MA',
        researchAreas: ['Evolutionary Biology', 'Population Genetics', 'Behavioral Genetics'],
        email: 'hoekstra@oeb.harvard.edu',
        profileUrl: 'hoekstra.oeb.harvard.edu/',
        labName: 'Hoekstra Lab'
      },
      {
        name: 'Michael Eisen',
        title: 'Professor',
        department: 'Molecular Biology',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        researchAreas: ['Genomics', 'Gene Regulation', 'Drosophila Development'],
        email: 'eisen@berkeley.edu',
        profileUrl: 'eisenlab.org/',
        labName: 'Eisen Lab'
      },
      {
        name: 'David Kingsley',
        title: 'Professor',
        department: 'Developmental Biology',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Evolutionary Genetics', 'Stickleback Evolution', 'Genomics'],
        email: 'kingsley@stanford.edu',
        profileUrl: 'kingsley.stanford.edu/',
        labName: 'Kingsley Lab'
      },
      {
        name: 'Anne Villeneuve',
        title: 'Professor',
        department: 'Developmental Biology',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Meiosis', 'Chromosome Biology', 'C. elegans Genetics'],
        email: 'avillene@stanford.edu',
        profileUrl: 'villeneuvelab.stanford.edu/',
        labName: 'Villeneuve Lab'
      }
    ],
    'Mathematics': [
      {
        name: 'Terence Tao',
        title: 'Professor',
        department: 'Mathematics',
        university: 'UCLA',
        location: 'Los Angeles, CA',
        researchAreas: ['Harmonic Analysis', 'Partial Differential Equations', 'Number Theory'],
        email: 'tao@math.ucla.edu',
        profileUrl: 'math.ucla.edu/~tao/',
        labName: 'Tao Group'
      },
      {
        name: 'Peter Sarnak',
        title: 'Professor',
        department: 'Mathematics',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['Number Theory', 'Automorphic Forms', 'Quantum Chaos'],
        email: 'sarnak@math.princeton.edu',
        profileUrl: 'web.math.princeton.edu/~sarnak/',
        labName: 'Sarnak Group'
      },
      {
        name: 'Andrew Wiles',
        title: 'Professor',
        department: 'Mathematics',
        university: 'Oxford University',
        location: 'Oxford, UK',
        researchAreas: ['Number Theory', 'Algebraic Geometry', 'Arithmetic Geometry'],
        email: 'andrew.wiles@maths.ox.ac.uk',
        profileUrl: 'maths.ox.ac.uk/people/andrew.wiles/',
        labName: 'Wiles Group'
      },
      {
        name: 'Ingrid Daubechies',
        title: 'Professor',
        department: 'Mathematics',
        university: 'Duke University',
        location: 'Durham, NC',
        researchAreas: ['Wavelets', 'Applied Mathematics', 'Signal Processing'],
        email: 'ingrid@math.duke.edu',
        profileUrl: 'services.math.duke.edu/~ingrid/',
        labName: 'Daubechies Group'
      },
      {
        name: 'Manjul Bhargava',
        title: 'Professor',
        department: 'Mathematics',
        university: 'Princeton University',
        location: 'Princeton, NJ',
        researchAreas: ['Number Theory', 'Algebraic Number Theory', 'Arithmetic Geometry'],
        email: 'bhargava@math.princeton.edu',
        profileUrl: 'web.math.princeton.edu/~bhargava/',
        labName: 'Bhargava Group'
      },
      {
        name: 'Avi Wigderson',
        title: 'Professor',
        department: 'Mathematics',
        university: 'Institute for Advanced Study',
        location: 'Princeton, NJ',
        researchAreas: ['Computational Complexity', 'Algorithms', 'Randomness'],
        email: 'avi@ias.edu',
        profileUrl: 'ias.edu/scholars/wigderson/',
        labName: 'Wigderson Group'
      },
      {
        name: 'László Lovász',
        title: 'Professor',
        department: 'Mathematics',
        university: 'Eötvös Loránd University',
        location: 'Budapest, Hungary',
        researchAreas: ['Discrete Mathematics', 'Graph Theory', 'Combinatorial Optimization'],
        email: 'lovasz@cs.elte.hu',
        profileUrl: 'cs.elte.hu/~lovasz/',
        labName: 'Lovász Group'
      },
      {
        name: 'Persi Diaconis',
        title: 'Professor',
        department: 'Mathematics',
        university: 'Stanford University',
        location: 'Stanford, CA',
        researchAreas: ['Probability Theory', 'Statistics', 'Mathematical Magic'],
        email: 'diaconis@math.stanford.edu',
        profileUrl: 'statweb.stanford.edu/~cgates/PERSI/',
        labName: 'Diaconis Group'
      },
      {
        name: 'Peter Scholze',
        title: 'Professor',
        department: 'Mathematics',
        university: 'University of Bonn',
        location: 'Bonn, Germany',
        researchAreas: ['Arithmetic Geometry', 'Number Theory', 'Perfectoid Spaces'],
        email: 'scholze@math.uni-bonn.de',
        profileUrl: 'hcm.uni-bonn.de/en/people/faculty/profile/peter-scholze/',
        labName: 'Scholze Group'
      },
      {
        name: 'Karen Uhlenbeck',
        title: 'Professor',
        department: 'Mathematics',
        university: 'University of Texas at Austin',
        location: 'Austin, TX',
        researchAreas: ['Differential Geometry', 'Partial Differential Equations', 'Mathematical Physics'],
        email: 'uhlenbeck@math.utexas.edu',
        profileUrl: 'web.ma.utexas.edu/users/uhlen/',
        labName: 'Uhlenbeck Group'
      },
      {
        name: 'Richard Stanley',
        title: 'Professor',
        department: 'Mathematics',
        university: 'MIT',
        location: 'Cambridge, MA',
        researchAreas: ['Combinatorics', 'Algebraic Combinatorics', 'Enumerative Combinatorics'],
        email: 'rstan@math.mit.edu',
        profileUrl: 'math.mit.edu/~rstan/',
        labName: 'Stanley Group'
      },
      {
        name: 'Akshay Venkatesh',
        title: 'Professor',
        department: 'Mathematics',
        university: 'Institute for Advanced Study',
        location: 'Princeton, NJ',
        researchAreas: ['Number Theory', 'Automorphic Forms', 'Homogeneous Dynamics'],
        email: 'akshay@ias.edu',
        profileUrl: 'ias.edu/scholars/venkatesh/',
        labName: 'Venkatesh Group'
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
