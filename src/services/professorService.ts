import { Professor } from '@/types/professor';

const professorDatabase: Professor[] = [
  // Biomedical Engineering Professors
  {
    name: "Robert Langer",
    title: "Professor of Chemical Engineering",
    department: "Department of Chemical Engineering",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Drug Delivery", "Tissue Engineering", "Biomaterials", "Nanotechnology"],
    email: "rlanger@mit.edu",
    profileUrl: "https://langerlab.mit.edu/",
    labName: "Langer Lab"
  },
  {
    name: "Jennifer Elisseeff",
    title: "Professor of Biomedical Engineering",
    department: "Department of Biomedical Engineering",
    university: "Johns Hopkins University",
    location: "Baltimore, MD",
    researchAreas: ["Tissue Engineering", "Regenerative Medicine", "Biomaterials", "Immunoengineering"],
    email: "elisseeff@jhu.edu",
    profileUrl: "https://engineering.jhu.edu/bme/faculty/jennifer-elisseeff/",
    labName: "Elisseeff Lab"
  },
  // Mechanical Engineering Professors
  {
    name: "Markus Buehler",
    title: "Professor of Civil and Environmental Engineering",
    department: "Department of Civil and Environmental Engineering",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Materials Science", "Mechanics", "Nanotechnology", "Biomaterials"],
    email: "buehler@mit.edu",
    profileUrl: "https://buehler.mit.edu/",
    labName: "Buehler Lab"
  },
  {
    name: "Ellen Kuhl",
    title: "Professor of Mechanical Engineering",
    department: "Department of Mechanical Engineering",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Biomechanics", "Computational Modeling", "Tissue Engineering", "Mechanobiology"],
    email: "ekuhl@stanford.edu",
    profileUrl: "https://kuhl.stanford.edu/",
    labName: "Kuhl Lab"
  },
  // Electrical Engineering Professors
  {
    name: "Ali Javey",
    title: "Professor of Electrical Engineering and Computer Sciences",
    department: "Department of Electrical Engineering and Computer Sciences",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    researchAreas: ["Nanoelectronics", "Flexible Electronics", "Energy Conversion", "2D Materials"],
    email: "javey@berkeley.edu",
    profileUrl: "https://javeygroup.berkeley.edu/",
    labName: "Javey Group"
  },
  {
    name: "Andrea Goldsmith",
    title: "Professor of Electrical Engineering",
    department: "Department of Electrical Engineering",
    university: "Princeton University",
    location: "Princeton, NJ",
    researchAreas: ["Wireless Communications", "Information Theory", "Signal Processing", "Machine Learning"],
    email: "andrea@princeton.edu",
    profileUrl: "https://ee.princeton.edu/people/andrea-goldsmith",
    labName: "Goldsmith Lab"
  },
  // Chemistry Professors
  {
    name: "George M. Whitesides",
    title: "Professor of Chemistry",
    department: "Department of Chemistry",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Organic Chemistry", "Materials Chemistry", "Nanotechnology", "Surface Chemistry"],
    email: "whitesides@chemistry.harvard.edu",
    profileUrl: "https://whitesidesgroup.harvard.edu/",
    labName: "Whitesides Group"
  },
  {
    name: "Carolyn Bertozzi",
    title: "Professor of Chemistry",
    department: "Department of Chemistry",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Chemical Biology", "Glycobiology", "Bioorthogonal Chemistry", "Cancer Research"],
    email: "bertozzi@stanford.edu",
    profileUrl: "https://bertozzigroup.stanford.edu/",
    labName: "Bertozzi Lab"
  },
  // Physics Professors
  {
    name: "Nima Arkani-Hamed",
    title: "Professor of Physics",
    department: "Department of Physics",
    university: "Institute for Advanced Study",
    location: "Princeton, NJ",
    researchAreas: ["Theoretical Physics", "Particle Physics", "Quantum Field Theory", "String Theory"],
    email: "nima@ias.edu",
    profileUrl: "https://www.ias.edu/scholars/arkani-hamed",
    labName: "Arkani-Hamed Group"
  },
  {
    name: "Lisa Randall",
    title: "Professor of Physics",
    department: "Department of Physics",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Particle Physics", "Cosmology", "Extra Dimensions", "Dark Matter"],
    email: "randall@physics.harvard.edu",
    profileUrl: "https://randall.physics.harvard.edu/",
    labName: "Randall Group"
  },
  // Biology Professors
  {
    name: "Eric Lander",
    title: "Professor of Biology",
    department: "Department of Biology",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Genomics", "Systems Biology", "Cancer Biology", "Computational Biology"],
    email: "lander@mit.edu",
    profileUrl: "https://www.landerlab.org/",
    labName: "Lander Lab"
  },
  {
    name: "Jennifer Doudna",
    title: "Professor of Chemistry and Molecular Biology",
    department: "Department of Chemistry and Molecular Biology",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    researchAreas: ["CRISPR", "Gene Editing", "RNA Biology", "Molecular Biology"],
    email: "doudna@berkeley.edu",
    profileUrl: "https://doudnalab.org/",
    labName: "Doudna Lab"
  },
  // Mathematics Professors
  {
    name: "Terence Tao",
    title: "Professor of Mathematics",
    department: "Department of Mathematics",
    university: "UCLA",
    location: "Los Angeles, CA",
    researchAreas: ["Harmonic Analysis", "Partial Differential Equations", "Number Theory", "Combinatorics"],
    email: "tao@math.ucla.edu",
    profileUrl: "https://www.math.ucla.edu/~tao/",
    labName: "Tao Group"
  },
  {
    name: "Manjul Bhargava",
    title: "Professor of Mathematics",
    department: "Department of Mathematics",
    university: "Princeton University",
    location: "Princeton, NJ",
    researchAreas: ["Number Theory", "Algebraic Geometry", "Representation Theory", "Combinatorics"],
    email: "bhargava@math.princeton.edu",
    profileUrl: "https://www.math.princeton.edu/people/manjul-bhargava",
    labName: "Bhargava Group"
  },

  // Psychology Professors
  {
    name: "Steven Pinker",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Cognitive Psychology", "Psycholinguistics", "Visual Cognition", "Language Development"],
    email: "pinker@wjh.harvard.edu",
    profileUrl: "https://psychology.fas.harvard.edu/people/steven-pinker",
    labName: "Pinker Lab"
  },
  {
    name: "Daniel Gilbert",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Social Psychology", "Affective Forecasting", "Happiness Research", "Cognitive Biases"],
    email: "gilbert@wjh.harvard.edu",
    profileUrl: "https://psychology.fas.harvard.edu/people/daniel-gilbert",
    labName: "Social Psychology Lab"
  },
  {
    name: "Mahzarin Banaji",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Social Cognition", "Implicit Bias", "Stereotypes", "Social Psychology"],
    email: "banaji@fas.harvard.edu",
    profileUrl: "https://psychology.fas.harvard.edu/people/mahzarin-banaji",
    labName: "Social Cognition Lab"
  },
  {
    name: "Elizabeth Spelke",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Developmental Psychology", "Cognitive Development", "Spatial Cognition", "Number Cognition"],
    email: "spelke@wjh.harvard.edu",
    profileUrl: "https://www.harvardlds.org/",
    labName: "Laboratory for Developmental Studies"
  },
  {
    name: "Joshua Greene",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Moral Psychology", "Cognitive Neuroscience", "Decision Making", "Social Cognition"],
    email: "jgreene@fas.harvard.edu",
    profileUrl: "https://www.joshuagreene.org/",
    labName: "Moral Cognition Lab"
  },
  {
    name: "Susan Carey",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Cognitive Development", "Conceptual Development", "Language Acquisition", "Developmental Psychology"],
    email: "scarey@wjh.harvard.edu",
    profileUrl: "https://psychology.fas.harvard.edu/people/susan-carey",
    labName: "Cognition, Brain, & Behavior Lab"
  },
  {
    name: "John Gabrieli",
    title: "Professor of Cognitive Neuroscience",
    department: "Department of Brain and Cognitive Sciences",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Cognitive Neuroscience", "Memory", "Learning", "Neuroimaging"],
    email: "gabrieli@mit.edu",
    profileUrl: "https://gablab.mit.edu/",
    labName: "Gabrieli Lab"
  },
  {
    name: "Nancy Kanwisher",
    title: "Professor of Cognitive Neuroscience",
    department: "Department of Brain and Cognitive Sciences",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Visual Cognition", "Face Recognition", "Functional Neuroimaging", "Cognitive Neuroscience"],
    email: "ngk@mit.edu",
    profileUrl: "https://web.mit.edu/bcs/nklab/",
    labName: "Kanwisher Lab"
  },
  {
    name: "Rebecca Saxe",
    title: "Professor of Cognitive Neuroscience",
    department: "Department of Brain and Cognitive Sciences",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Theory of Mind", "Social Cognition", "Developmental Cognitive Neuroscience", "Neuroimaging"],
    email: "saxe@mit.edu",
    profileUrl: "https://saxelab.mit.edu/",
    labName: "SaxeLab"
  },
  {
    name: "James Gross",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Emotion Regulation", "Affective Science", "Social Psychology", "Psychophysiology"],
    email: "james.gross@stanford.edu",
    profileUrl: "https://spl.stanford.edu/",
    labName: "Gross Lab"
  },
  {
    name: "Carol Dweck",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Motivation", "Mindset Theory", "Social Psychology", "Developmental Psychology"],
    email: "dweck@stanford.edu",
    profileUrl: "https://psychology.stanford.edu/dweck",
    labName: "Dweck Lab"
  },
  {
    name: "Brian Knutson",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Neuroeconomics", "Decision Making", "Reward Processing", "Social Neuroscience"],
    email: "knutson@stanford.edu",
    profileUrl: "https://knutsonlab.stanford.edu/",
    labName: "Knutson Lab"
  },
  {
    name: "John R. Anderson",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Carnegie Mellon University",
    location: "Pittsburgh, PA",
    researchAreas: ["Cognitive Psychology", "Cognitive Architecture", "Learning", "Problem Solving"],
    email: "ja@cmu.edu",
    profileUrl: "https://act-r.psy.cmu.edu/people/anderson.html",
    labName: "ACT-R Research Group"
  },
  {
    name: "Marlene Behrmann",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Carnegie Mellon University",
    location: "Pittsburgh, PA",
    researchAreas: ["Cognitive Neuroscience", "Visual Perception", "Object Recognition", "Neuroimaging"],
    email: "behrmann@cmu.edu",
    profileUrl: "https://www.cmu.edu/dietrich/psychology/people/faculty/behrmann-marlene.html",
    labName: "Cognitive Neuroscience Lab"
  },
  {
    name: "BJ Casey",
    title: "Professor of Psychology",
    department: "Department of Psychology",
    university: "Yale University",
    location: "New Haven, CT",
    researchAreas: ["Developmental Cognitive Neuroscience", "Adolescent Brain Development", "Self-Control", "Neuroimaging"],
    email: "bj.casey@yale.edu",
    profileUrl: "https://psychology.yale.edu/people/bj-casey",
    labName: "Casey Lab"
  },

  // Economics Professors
  {
    name: "Daron Acemoglu",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Political Economy", "Economic Development", "Labor Economics", "Economic Growth"],
    email: "daron@mit.edu",
    profileUrl: "https://economics.mit.edu/faculty/acemoglu"
  },
  {
    name: "Esther Duflo",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Development Economics", "Poverty Alleviation", "Randomized Controlled Trials", "Education Economics"],
    email: "eduflo@mit.edu",
    profileUrl: "https://economics.mit.edu/faculty/eduflo",
    labName: "J-PAL"
  },
  {
    name: "Abhijit Banerjee",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Development Economics", "Poverty", "Microfinance", "Policy Evaluation"],
    email: "banerjee@mit.edu",
    profileUrl: "https://economics.mit.edu/faculty/banerjee",
    labName: "J-PAL"
  },
  {
    name: "David Autor",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Labor Economics", "Technology and Employment", "Inequality", "Wage Dynamics"],
    email: "dautor@mit.edu",
    profileUrl: "https://economics.mit.edu/faculty/dautor"
  },
  {
    name: "Amy Finkelstein",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Health Economics", "Public Economics", "Insurance", "Healthcare Policy"],
    email: "afink@mit.edu",
    profileUrl: "https://economics.mit.edu/faculty/afink"
  },
  {
    name: "Raj Chetty",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Public Economics", "Labor Economics", "Behavioral Economics", "Social Mobility"],
    email: "raj_chetty@harvard.edu",
    profileUrl: "https://opportunityinsights.org/",
    labName: "Opportunity Insights"
  },
  {
    name: "Sendhil Mullainathan",
    title: "Professor of Economics",
    department: "Booth School of Business",
    university: "University of Chicago",
    location: "Chicago, IL",
    researchAreas: ["Behavioral Economics", "Machine Learning", "Development Economics", "Psychology and Economics"],
    email: "sendhil@chicagobooth.edu",
    profileUrl: "https://www.chicagobooth.edu/faculty/directory/m/sendhil-mullainathan"
  },
  {
    name: "Matthew Gentzkow",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Industrial Organization", "Media Economics", "Political Economy", "Applied Microeconomics"],
    email: "gentzkow@stanford.edu",
    profileUrl: "https://web.stanford.edu/~gentzkow/"
  },
  {
    name: "Susan Athey",
    title: "Professor of Economics",
    department: "Graduate School of Business",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Market Design", "Machine Learning", "Industrial Organization", "Public Economics"],
    email: "athey@stanford.edu",
    profileUrl: "https://gsb.stanford.edu/faculty-research/faculty/susan-athey"
  },
  {
    name: "Alvin Roth",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Market Design", "Game Theory", "Experimental Economics", "Matching Theory"],
    email: "alroth@stanford.edu",
    profileUrl: "https://web.stanford.edu/~alroth/"
  },
  {
    name: "Emmanuel Saez",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    researchAreas: ["Public Economics", "Taxation", "Inequality", "Labor Economics"],
    email: "saez@berkeley.edu",
    profileUrl: "https://eml.berkeley.edu/~saez/"
  },
  {
    name: "Gabriel Zucman",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    researchAreas: ["Public Economics", "Taxation", "Wealth Inequality", "Tax Avoidance"],
    email: "zucman@berkeley.edu",
    profileUrl: "https://gabriel-zucman.eu/"
  },
  {
    name: "Christina Romer",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    researchAreas: ["Macroeconomics", "Monetary Policy", "Economic History", "Business Cycles"],
    email: "cromer@berkeley.edu",
    profileUrl: "https://eml.berkeley.edu/~cromer/"
  },
  {
    name: "John List",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "University of Chicago",
    location: "Chicago, IL",
    researchAreas: ["Experimental Economics", "Environmental Economics", "Behavioral Economics", "Field Experiments"],
    email: "jlist@uchicago.edu",
    profileUrl: "https://home.uchicago.edu/~jlist/"
  },
  {
    name: "Ariel Rubinstein",
    title: "Professor of Economics",
    department: "Department of Economics",
    university: "NYU",
    location: "New York, NY",
    researchAreas: ["Game Theory", "Behavioral Economics", "Economic Theory", "Bounded Rationality"],
    email: "arielrub@post.tau.ac.il",
    profileUrl: "https://arielrubinstein.tau.ac.il/"
  },

  // Business Administration Professors
  {
    name: "Michael Porter",
    title: "Professor of Strategy",
    department: "Harvard Business School",
    university: "Harvard University",
    location: "Boston, MA",
    researchAreas: ["Competitive Strategy", "Economic Development", "Corporate Strategy", "Competitiveness"],
    email: "mporter@hbs.edu",
    profileUrl: "https://www.hbs.edu/faculty/Pages/profile.aspx?facId=6532"
  },
  {
    name: "Amy Edmondson",
    title: "Professor of Leadership",
    department: "Harvard Business School",
    university: "Harvard University",
    location: "Boston, MA",
    researchAreas: ["Leadership", "Organizational Learning", "Psychological Safety", "Team Performance"],
    email: "aedmondson@hbs.edu",
    profileUrl: "https://www.hbs.edu/faculty/Pages/profile.aspx?facId=6451"
  },
  {
    name: "Francesca Gino",
    title: "Professor of Organizational Behavior",
    department: "Harvard Business School",
    university: "Harvard University",
    location: "Boston, MA",
    researchAreas: ["Organizational Behavior", "Decision Making", "Ethics", "Creativity"],
    email: "fgino@hbs.edu",
    profileUrl: "https://www.hbs.edu/faculty/Pages/profile.aspx?facId=338801"
  },
  {
    name: "William F. Sharpe",
    title: "Professor of Finance",
    department: "Graduate School of Business",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Financial Economics", "Investment Management", "Asset Pricing", "Portfolio Theory"],
    email: "sharpe@stanford.edu",
    profileUrl: "https://www.gsb.stanford.edu/faculty-research/faculty/william-f-sharpe"
  },
  {
    name: "Jeffrey Pfeffer",
    title: "Professor of Organizational Behavior",
    department: "Graduate School of Business",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Organizational Behavior", "Human Resources", "Power and Politics", "Leadership"],
    email: "pfeffer_jeff@gsb.stanford.edu",
    profileUrl: "https://www.gsb.stanford.edu/faculty-research/faculty/jeffrey-pfeffer"
  },
  {
    name: "Robert Sutton",
    title: "Professor of Management Science",
    department: "Graduate School of Business",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Management Science", "Innovation", "Organizational Psychology", "Workplace Dynamics"],
    email: "bobsut@stanford.edu",
    profileUrl: "https://www.gsb.stanford.edu/faculty-research/faculty/robert-i-sutton"
  },
  {
    name: "Jennifer Aaker",
    title: "Professor of Marketing",
    department: "Graduate School of Business",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Marketing", "Consumer Psychology", "Brand Management", "Social Marketing"],
    email: "jaaker@stanford.edu",
    profileUrl: "https://www.gsb.stanford.edu/faculty-research/faculty/jennifer-aaker"
  },
  {
    name: "Adam Grant",
    title: "Professor of Management",
    department: "Wharton School",
    university: "University of Pennsylvania",
    location: "Philadelphia, PA",
    researchAreas: ["Organizational Psychology", "Leadership", "Motivation", "Prosocial Behavior"],
    email: "grantad@wharton.upenn.edu",
    profileUrl: "https://mgmt.wharton.upenn.edu/profile/grantad/"
  },
  {
    name: "Peter Cappelli",
    title: "Professor of Human Resources",
    department: "Wharton School",
    university: "University of Pennsylvania",
    location: "Philadelphia, PA",
    researchAreas: ["Human Resources", "Employment Relations", "Workforce Management", "Talent Management"],
    email: "cappelli@wharton.upenn.edu",
    profileUrl: "https://mgmt.wharton.upenn.edu/profile/cappelli/"
  },
  {
    name: "Nicolaj Siggelkow",
    title: "Professor of Strategy",
    department: "Wharton School",
    university: "University of Pennsylvania",
    location: "Philadelphia, PA",
    researchAreas: ["Strategy", "Organizational Design", "Innovation", "Business Model Innovation"],
    email: "siggelkow@wharton.upenn.edu",
    profileUrl: "https://mgmt.wharton.upenn.edu/profile/siggelkow/"
  },
  {
    name: "Richard Thaler",
    title: "Professor of Behavioral Science",
    department: "Booth School of Business",
    university: "University of Chicago",
    location: "Chicago, IL",
    researchAreas: ["Behavioral Economics", "Behavioral Finance", "Nudge Theory", "Decision Making"],
    email: "richard.thaler@chicagobooth.edu",
    profileUrl: "https://www.chicagobooth.edu/faculty/directory/t/richard-h-thaler"
  },
  {
    name: "Luigi Zingales",
    title: "Professor of Finance",
    department: "Booth School of Business",
    university: "University of Chicago",
    location: "Chicago, IL",
    researchAreas: ["Corporate Finance", "Financial Economics", "Corporate Governance", "Political Economy"],
    email: "luigi.zingales@chicagobooth.edu",
    profileUrl: "https://www.chicagobooth.edu/faculty/directory/z/luigi-zingales"
  },
  {
    name: "Linda Hill",
    title: "Professor of Leadership",
    department: "Harvard Business School",
    university: "Harvard University",
    location: "Boston, MA",
    researchAreas: ["Leadership Development", "Organizational Change", "Innovation Leadership", "Global Leadership"],
    email: "lhill@hbs.edu",
    profileUrl: "https://www.hbs.edu/faculty/Pages/profile.aspx?facId=6461"
  },
  {
    name: "Herminia Ibarra",
    title: "Professor of Organizational Behavior",
    department: "London Business School",
    university: "London Business School",
    location: "London, UK",
    researchAreas: ["Leadership Development", "Career Transitions", "Networks", "Identity"],
    email: "hibarra@london.edu",
    profileUrl: "https://www.london.edu/faculty-and-research/faculty/profiles/i/hibarra"
  },

  // Environmental Science Professors
  {
    name: "James G. Anderson",
    title: "Professor of Atmospheric Chemistry",
    department: "Department of Chemistry",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Atmospheric Chemistry", "Ozone Depletion", "Climate Science", "Environmental Chemistry"],
    email: "janderson@fas.harvard.edu",
    profileUrl: "https://www.chemistry.harvard.edu/people/james-g-anderson"
  },
  {
    name: "Daniel Schrag",
    title: "Professor of Environmental Science",
    department: "Earth and Planetary Sciences",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Climate Science", "Paleoclimatology", "Carbon Cycle", "Energy Policy"],
    email: "schrag@eps.harvard.edu",
    profileUrl: "https://eps.harvard.edu/people/daniel-p-schrag",
    labName: "Center for the Environment"
  },
  {
    name: "Naomi Oreskes",
    title: "Professor of History of Science",
    department: "History of Science",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Climate Science", "Science Policy", "History of Science", "Scientific Consensus"],
    email: "oreskes@fas.harvard.edu",
    profileUrl: "https://history.fas.harvard.edu/people/naomi-oreskes"
  },
  {
    name: "Michael Oppenheimer",
    title: "Professor of Atmospheric Sciences",
    department: "Atmospheric & Oceanic Sciences",
    university: "Princeton University",
    location: "Princeton, NJ",
    researchAreas: ["Climate Science", "Sea Level Rise", "Climate Policy", "Atmospheric Science"],
    email: "omichael@princeton.edu",
    profileUrl: "https://aos.princeton.edu/people/michael-oppenheimer"
  },
  {
    name: "Stephen Pacala",
    title: "Professor of Ecology",
    department: "Ecology and Evolutionary Biology",
    university: "Princeton University",
    location: "Princeton, NJ",
    researchAreas: ["Carbon Cycle", "Ecosystem Ecology", "Climate Change", "Biodiversity"],
    email: "pacala@princeton.edu",
    profileUrl: "https://eeb.princeton.edu/people/stephen-pacala"
  },
  {
    name: "Rob Jackson",
    title: "Professor of Environmental Science",
    department: "Environmental Earth System Science",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Carbon Cycle", "Energy Systems", "Climate Change", "Greenhouse Gases"],
    email: "rob.jackson@stanford.edu",
    profileUrl: "https://earth.stanford.edu/people/rob-jackson"
  },
  {
    name: "Gretchen Daily",
    title: "Professor of Environmental Science",
    department: "Environmental Earth System Science",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Ecosystem Services", "Conservation Biology", "Biodiversity", "Natural Capital"],
    email: "gdaily@stanford.edu",
    profileUrl: "https://dailylab.stanford.edu/",
    labName: "Center for Conservation Biology"
  },
  {
    name: "Chris Field",
    title: "Professor of Environmental Science",
    department: "Environmental Earth System Science",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Climate Change", "Ecosystem Ecology", "Global Carbon Cycle", "Climate Impacts"],
    email: "field@stanford.edu",
    profileUrl: "https://earth.stanford.edu/people/chris-field"
  },
  {
    name: "Pamela Matson",
    title: "Professor of Environmental Science",
    department: "Environmental Earth System Science",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Biogeochemistry", "Sustainability Science", "Land Use Change", "Ecosystem Services"],
    email: "matson@stanford.edu",
    profileUrl: "https://earth.stanford.edu/people/pamela-matson"
  },
  {
    name: "Daniel Kammen",
    title: "Professor of Energy",
    department: "Energy and Resources Group",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    researchAreas: ["Renewable Energy", "Energy Policy", "Climate Change", "Sustainable Development"],
    email: "kammen@berkeley.edu",
    profileUrl: "http://rael.berkeley.edu/",
    labName: "Renewable & Appropriate Energy Lab"
  },
  {
    name: "Inez Fung",
    title: "Professor of Atmospheric Science",
    department: "Earth and Planetary Science",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    researchAreas: ["Atmospheric Science", "Climate Modeling", "Carbon Cycle", "Biogeochemistry"],
    email: "ifung@berkeley.edu",
    profileUrl: "https://eps.berkeley.edu/people/inez-fung"
  },
  {
    name: "John Holdren",
    title: "Professor of Science Policy",
    department: "Kennedy School of Government",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Science Policy", "Climate Policy", "Energy Policy", "Nuclear Security"],
    email: "john_holdren@hks.harvard.edu",
    profileUrl: "https://www.hks.harvard.edu/faculty/john-holdren"
  },
  {
    name: "Michael Mann",
    title: "Professor of Climate Science",
    department: "Earth and Environmental Science",
    university: "University of Pennsylvania",
    location: "Philadelphia, PA",
    researchAreas: ["Climate Science", "Paleoclimatology", "Climate Modeling", "Climate Communication"],
    email: "mann@upenn.edu",
    profileUrl: "https://www.sas.upenn.edu/earth/people/mann"
  },
  {
    name: "Veerabhadran Ramanathan",
    title: "Professor of Climate Science",
    department: "Scripps Institution of Oceanography",
    university: "UC San Diego",
    location: "La Jolla, CA",
    researchAreas: ["Climate Science", "Atmospheric Science", "Global Warming", "Air Pollution"],
    email: "vramanathan@ucsd.edu",
    profileUrl: "https://scripps.ucsd.edu/people/veerabhadran-ramanathan"
  },
  {
    name: "Katharine Hayhoe",
    title: "Professor of Climate Science",
    department: "Political Science",
    university: "Texas Tech University",
    location: "Lubbock, TX",
    researchAreas: ["Climate Science", "Climate Communication", "Climate Impacts", "Regional Climate"],
    email: "katharine.hayhoe@ttu.edu",
    profileUrl: "https://www.depts.ttu.edu/politicalscience/people/faculty/hayhoe_katharine.php"
  },

  // Materials Science Professors
  {
    name: "John A. Rogers",
    title: "Professor of Materials Science",
    department: "Materials Science and Engineering",
    university: "Northwestern University",
    location: "Evanston, IL",
    researchAreas: ["Flexible Electronics", "Biomedical Devices", "Nanomaterials", "Wearable Technology"],
    email: "jrogers@northwestern.edu",
    profileUrl: "https://rogersgroup.northwestern.edu/",
    labName: "Rogers Research Group"
  },
  {
    name: "Chad Mirkin",
    title: "Professor of Materials Science",
    department: "Materials Science and Engineering",
    university: "Northwestern University",
    location: "Evanston, IL",
    researchAreas: ["Nanotechnology", "DNA Nanotechnology", "Nanoparticle Synthesis", "Nanomedicine"],
    email: "c-mirkin@northwestern.edu",
    profileUrl: "https://mirkin-group.northwestern.edu/",
    labName: "Mirkin Research Group"
  },
  {
    name: "Jennifer A. Lewis",
    title: "Professor of Materials Science",
    department: "School of Engineering and Applied Sciences",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["3D Printing", "Soft Materials", "Biomaterials", "Additive Manufacturing"],
    email: "jalewis@seas.harvard.edu",
    profileUrl: "https://lewisgroup.seas.harvard.edu/",
    labName: "Lewis Lab"
  },
  {
    name: "Yet-Ming Chiang",
    title: "Professor of Materials Science",
    department: "Materials Science and Engineering",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Battery Materials", "Energy Storage", "Electrochemistry", "Solid-State Ionics"],
    email: "ychiang@mit.edu",
    profileUrl: "https://chiang.mit.edu/",
    labName: "Chiang Research Group"
  },
  {
    name: "Angela Belcher",
    title: "Professor of Materials Science",
    department: "Materials Science and Engineering",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Biomaterials", "Nanotechnology", "Energy Materials", "Biological Engineering"],
    email: "belcher@mit.edu",
    profileUrl: "https://belcher.mit.edu/",
    labName: "Belcher Lab"
  },
  {
    name: "Julia Greer",
    title: "Professor of Materials Science",
    department: "Materials Science and Mechanics",
    university: "Caltech",
    location: "Pasadena, CA",
    researchAreas: ["Mechanical Metamaterials", "Nanomechanics", "3D Printing", "Lightweight Materials"],
    email: "jrg@caltech.edu",
    profileUrl: "https://greer.caltech.edu/",
    labName: "Greer Group"
  },
  {
    name: "Frances Ross",
    title: "Professor of Materials Science",
    department: "Materials Science and Engineering",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Electron Microscopy", "Semiconductor Materials", "Thin Films", "Nanostructures"],
    email: "fross@mit.edu",
    profileUrl: "https://rosslab.mit.edu/",
    labName: "Ross Lab"
  },
  {
    name: "Ram Seshadri",
    title: "Professor of Materials Science",
    department: "Materials Research Laboratory",
    university: "UC Santa Barbara",
    location: "Santa Barbara, CA",
    researchAreas: ["Solid-State Chemistry", "Energy Materials", "Thermoelectrics", "Electronic Materials"],
    email: "seshadri@ucsb.edu",
    profileUrl: "https://www.mrl.ucsb.edu/people/ram-seshadri",
    labName: "Seshadri Group"
  },
  {
    name: "Paul Alivisatos",
    title: "Professor of Materials Science",
    department: "Materials Science and Engineering",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    researchAreas: ["Nanocrystals", "Quantum Dots", "Solar Cells", "Nanomaterials"],
    email: "alivis@berkeley.edu",
    profileUrl: "https://alivisatoslab.lbl.gov/",
    labName: "Alivisatos Group"
  },
  {
    name: "Kristie J. Koski",
    title: "Professor of Materials Science",
    department: "Chemistry",
    university: "Brown University",
    location: "Providence, RI",
    researchAreas: ["2D Materials", "Layered Materials", "Electronic Properties", "Optical Properties"],
    email: "kristie_koski@brown.edu",
    profileUrl: "https://vivo.brown.edu/display/kkoski",
    labName: "Koski Lab"
  },
  {
    name: "David Awschalom",
    title: "Professor of Materials Science",
    department: "Physics and Molecular Engineering",
    university: "University of Chicago",
    location: "Chicago, IL",
    researchAreas: ["Quantum Materials", "Spintronics", "Quantum Information", "Semiconductor Physics"],
    email: "awsch@uchicago.edu",
    profileUrl: "https://awschalomlab.uchicago.edu/",
    labName: "Awschalom Group"
  },
  {
    name: "Shriram Ramanathan",
    title: "Professor of Materials Science",
    department: "Materials Science and Engineering",
    university: "Purdue University",
    location: "West Lafayette, IN",
    researchAreas: ["Electronic Materials", "Neuromorphic Computing", "Phase Transitions", "Oxide Electronics"],
    email: "sramanathan@purdue.edu",
    profileUrl: "https://engineering.purdue.edu/MSE/people/ptProfile?resource_id=11663",
    labName: "Ramanathan Lab"
  },
  {
    name: "Ju Li",
    title: "Professor of Materials Science",
    department: "Materials Science and Engineering",
    university: "MIT",
    location: "Cambridge, MA",
    researchAreas: ["Computational Materials Science", "Battery Materials", "Mechanical Properties", "Multiscale Modeling"],
    email: "liju@mit.edu",
    profileUrl: "https://li.mit.edu/",
    labName: "Li Group"
  },
  {
    name: "Zhenan Bao",
    title: "Professor of Materials Science",
    department: "Chemical Engineering",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Organic Electronics", "Flexible Electronics", "Wearable Sensors", "Electronic Skin"],
    email: "zbao@stanford.edu",
    profileUrl: "https://baogroup.stanford.edu/",
    labName: "Bao Group"
  },
  {
    name: "Michael McAlpine",
    title: "Professor of Materials Science",
    department: "Mechanical Engineering",
    university: "University of Minnesota",
    location: "Minneapolis, MN",
    researchAreas: ["3D Printing", "Biomedical Devices", "Wearable Electronics", "Flexible Sensors"],
    email: "mmcalpine@umn.edu",
    profileUrl: "https://cse.umn.edu/mcalpine",
    labName: "McAlpine Research Group"
  },

  // History Professors
  {
    name: "Jill Lepore",
    title: "Professor of American History",
    department: "Department of History",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["American History", "Political History", "History of Media", "Biography"],
    email: "lepore@fas.harvard.edu",
    profileUrl: "https://history.fas.harvard.edu/people/jill-lepore"
  },
  {
    name: "Maya Jasanoff",
    title: "Professor of British History",
    department: "Department of History",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["British Empire", "Imperial History", "Global History", "18th-19th Century"],
    email: "jasanoff@fas.harvard.edu",
    profileUrl: "https://history.fas.harvard.edu/people/maya-jasanoff"
  },
  {
    name: "Ann Blair",
    title: "Professor of Early Modern History",
    department: "Department of History",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Early Modern Europe", "History of Knowledge", "Intellectual History", "Renaissance"],
    email: "blair@fas.harvard.edu",
    profileUrl: "https://history.fas.harvard.edu/people/ann-blair"
  },
  {
    name: "Emma Dench",
    title: "Professor of Ancient History",
    department: "Department of History",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Ancient History", "Roman History", "Classical Studies", "Ancient Identity"],
    email: "dench@fas.harvard.edu",
    profileUrl: "https://history.fas.harvard.edu/people/emma-dench"
  },
  {
    name: "David Armitage",
    title: "Professor of Intellectual History",
    department: "Department of History",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Intellectual History", "Atlantic History", "International History", "Political Thought"],
    email: "armitage@fas.harvard.edu",
    profileUrl: "https://history.fas.harvard.edu/people/david-armitage"
  },
  {
    name: "Caroline Elkins",
    title: "Professor of African History",
    department: "Department of History",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["African History", "Colonial History", "Human Rights", "Imperial Violence"],
    email: "celkins@fas.harvard.edu",
    profileUrl: "https://history.fas.harvard.edu/people/caroline-elkins"
  },
  {
    name: "Walter Scheidel",
    title: "Professor of Ancient History",
    department: "Department of History",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Ancient History", "Economic History", "Comparative History", "Inequality"],
    email: "scheidel@stanford.edu",
    profileUrl: "https://history.stanford.edu/people/walter-scheidel"
  },
  {
    name: "Priya Satia",
    title: "Professor of Modern History",
    department: "Department of History",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["British Empire", "Middle Eastern History", "Colonial History", "Modern Britain"],
    email: "psatia@stanford.edu",
    profileUrl: "https://history.stanford.edu/people/priya-satia"
  },
  {
    name: "Steven Zipperstein",
    title: "Professor of Jewish History",
    department: "Department of History",
    university: "Stanford University",
    location: "Stanford, CA",
    researchAreas: ["Jewish History", "Russian History", "Cultural History", "Modern Jewish Thought"],
    email: "zipper@stanford.edu",
    profileUrl: "https://history.stanford.edu/people/steven-zipperstein"
  },
  {
    name: "Lizabeth Cohen",
    title: "Professor of Urban History",
    department: "Department of History",
    university: "Harvard University",
    location: "Cambridge, MA",
    researchAreas: ["Urban History", "Social History", "20th Century America", "Consumer Culture"],
    email: "lcohen@fas.harvard.edu",
    profileUrl: "https://history.fas.harvard.edu/people/lizabeth-cohen"
  },
  {
    name: "Margaret O'Mara",
    title: "Professor of Modern History",
    department: "Department of History",
    university: "University of Washington",
    location: "Seattle, WA",
    researchAreas: ["Modern U.S. History", "Technology History", "Urban History", "Political History"],
    email: "momara@uw.edu",
    profileUrl: "https://history.washington.edu/people/margaret-omara"
  },
  {
    name: "David Hollinger",
    title: "Professor of American History",
    department: "Department of History",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    researchAreas: ["American Intellectual History", "Religious History", "Cultural History", "20th Century America"],
    email: "dhh@berkeley.edu",
    profileUrl: "https://history.berkeley.edu/people/david-hollinger"
  },
  {
    name: "Carla Hesse",
    title: "Professor of French History",
    department: "Department of History",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    researchAreas: ["French History", "European History", "Cultural History", "History of Ideas"],
    email: "chesse@berkeley.edu",
    profileUrl: "https://history.berkeley.edu/people/carla-hesse"
  },
  {
    name: "Thomas Laqueur",
    title: "Professor of European History",
    department: "Department of History",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    researchAreas: ["European History", "Cultural History", "History of Sexuality", "Social History"],
    email: "laqueur@berkeley.edu",
    profileUrl: "https://history.berkeley.edu/people/thomas-laqueur"
  },
  {
    name: "Michael Kazin",
    title: "Professor of U.S. History",
    department: "Department of History",
    university: "Georgetown University",
    location: "Washington, DC",
    researchAreas: ["U.S. History", "Political History", "Labor History", "Social Movements"],
    email: "kazinm@georgetown.edu",
    profileUrl: "https://history.georgetown.edu/people/michael-kazin"
  }
];

export const professorService = {
  searchProfessors: async (criteria: { field: string; school?: string; location?: string }): Promise<Professor[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let results = professorDatabase.filter(professor =>
      professor.researchAreas.some(area => area.toLowerCase().includes(criteria.field.toLowerCase()))
    );

    if (criteria.school) {
      results = results.filter(professor =>
        professor.university.toLowerCase().includes(criteria.school.toLowerCase())
      );
    }

    if (criteria.location) {
      results = results.filter(professor =>
        professor.location.toLowerCase().includes(criteria.location.toLowerCase())
      );
    }

    return results;
  }
};
