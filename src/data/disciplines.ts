import { Leaf, FlaskConical, Sigma, Cpu, Tv, Sprout, Gamepad2 } from 'lucide-react';

export interface DisciplineData {
  slug: string;
  title: string;
  color: string;
  iconName: 'Leaf' | 'FlaskConical' | 'Sigma' | 'Cpu' | 'Tv' | 'Sprout' | 'Gamepad2';
  heroImage: string;
  description: string;
  activities: string[];
  skills: string[];
  quote?: {
    text: string;
    author: string;
  };
}

export const disciplinesData: Record<string, DisciplineData> = {
  biology: {
    slug: 'biology',
    title: 'Biology',
    color: '#4ADE80',
    iconName: 'Leaf',
    heroImage: '/assets/images/children-studying-science-using-microscope-in-clas-2026-04-13-23-13-15-utc.jpg',
    description: "Biology is the fascinating exploration of living things in all their forms. In this discipline, participants don't just read textbooks; they use real research microscopes, observe cellular structures of microscopic organisms, and conduct plant DNA extraction experiments. Field activities in the Livingstone College arboretum allow students to analyze local biodiversity and understand how ecosystems function.",
    activities: [
      "Hands-on strawberry DNA extraction in the laboratory",
      "Observation and classification of aquatic micro-organisms",
      "Comparative study of plant and animal cells under the microscope",
      "Flora and fauna sampling field trip on campus"
    ],
    skills: [
      "Operation of precision optical instruments (microscope)",
      "Experimental methodology and laboratory protocols",
      "Scientific observation and analytical record-keeping",
      "Awareness of biodiversity and ecology"
    ],
    quote: {
      text: "I extracted DNA from a plant cell with my own hands! I felt like a real lab geneticist.",
      author: "Mia J., 2025 Participant"
    }
  },
  chemistry: {
    slug: 'chemistry',
    title: 'Chemistry',
    color: '#FB923C',
    iconName: 'FlaskConical',
    heroImage: '/assets/images/enthusiastic-children-explore-chemistry-in-science-2026-03-25-10-42-26-utc.jpg',
    description: "Chemistry studies the molecules and reactions that make up the universe. Participants discover how chemical bonds create dramatic changes in color, temperature, and physical state. Supervised by instructors in our college laboratories, they perform reactive mixtures, discover chromatography, measure pH of common solutions, and explore the fundamental physical principles of thermodynamics in a fun and safe way.",
    activities: [
      "Creating controlled exothermic reactions (heat generation)",
      "Analyzing the pH of daily solutions using natural indicators",
      "Separation of pigments by paper chromatography",
      "Workshop on making fun polymers (scientific slime)"
    ],
    skills: [
      "Volume measurements and handling of chemical glassware",
      "Strict compliance with laboratory safety rules",
      "Understanding states of matter and acid/base reactions",
      "Comparative analysis of experimental data"
    ],
    quote: {
      text: "Chemistry was just a board of formulas to me. At camp, it became color, motion, and real experimentation!",
      author: "Jordan S., 2024 Participant"
    }
  },
  mathematics: {
    slug: 'mathematics',
    title: 'Mathematics',
    color: '#60A5FA',
    iconName: 'Sigma',
    heroImage: '/assets/images/girl-writing-math-problems-on-a-whiteboard-2026-01-07-02-11-58-utc.jpg',
    description: "Mathematics is the universal language of logic and structure. Far from repetitive mental arithmetic exercises, our module approaches mathematics in a visual and interactive way. Participants discover cryptography by decoding historical secret messages, learn graph theory through network optimization games, and explore geometric fractals found in nature.",
    activities: [
      "Cryptography workshop: encoding and decoding messages (Caesar cipher)",
      "Solving giant geometric puzzles in teams",
      "Simulation of game theory for strategic decision making",
      "Building 3D regular polyhedra and paper fractals"
    ],
    skills: [
      "Logical reasoning and complex problem solving",
      "Algorithmic thinking and mathematical deduction",
      "Geometric spatial representation in 2D and 3D",
      "Collaborative spirit in facing logical challenges"
    ],
    quote: {
      text: "I hated math in school. Decoding secret messages as a team at camp helped me understand how useful and cool it is.",
      author: "Lucas B., 2025 Participant"
    }
  },
  robotics: {
    slug: 'robotics',
    title: 'Robotics',
    color: '#A78BFA',
    iconName: 'Cpu',
    heroImage: '/assets/images/children-learn-about-robotics-with-robotics-kit-2026-03-05-11-56-52-utc.jpg',
    description: "Robotics combines mechanics, electronics, and computer programming. Participants design, build, and program autonomous robots capable of navigating mazes, detecting obstacles, and grabbing objects. Modern and simple educational kits allow immediate hands-on learning, teaching kids how to structure a logical algorithm (loops, sensors) and understand gear forces.",
    activities: [
      "Building a mobile crawler robot from a modular chassis",
      "Block programming of obstacle detection algorithms using ultrasound",
      "Final challenge: autonomous orienteering on a marked track",
      "Integrating a robotic arm controlled by a servo-motor"
    ],
    skills: [
      "Basics of logical programming (if... then..., loops)",
      "Concepts of mechanics (gears, motor torque, sensors)",
      "Engineering method through rapid prototyping and iterations",
      "Diagnostics and debugging of code in real-world conditions"
    ],
    quote: {
      text: "Building a robot is one thing, but seeing it avoid obstacles all by itself using the code you wrote is magical.",
      author: "Elijah W., 2024 Participant"
    }
  },
  'virtual-reality': {
    slug: 'virtual-reality',
    title: 'Virtual Reality',
    color: '#F472B6',
    iconName: 'Tv',
    heroImage: '/assets/images/child-using-virtual-reality-headset-in-classroom-2026-03-25-01-35-09-utc.jpg',
    description: "Virtual Reality (VR) pushes the limits of sensory and technological experience. Students not only explore immersive worlds using standalone headsets, but also learn the basics of 3D modeling by creating their own interactive virtual spaces. It is a unique immersion at the convergence of graphic creation, spatial geometry, and environment programming.",
    activities: [
      "3D modeling of a room or a fantasy island",
      "Immersive exploration of solar system and human body models",
      "Workshop on animating interactive objects in virtual space",
      "Discovering stereoscopy and 360° image rendering"
    ],
    skills: [
      "3D spatial design and geometric modeling",
      "Using virtual reality environment creation tools",
      "Understanding digital optics and human-computer interactivity",
      "Creative thinking applied to interactive staging"
    ],
    quote: {
      text: "We traveled inside a giant human cell in virtual reality. It was like actually being there!",
      author: "Aaliyah M., 2024 Participant"
    }
  },
  'greenhouse-science': {
    slug: 'greenhouse-science',
    title: 'Greenhouse Science',
    color: '#86EFAC',
    iconName: 'Sprout',
    heroImage: '/assets/images/children-studying-a-model-solar-system-at-school-2026-03-25-01-24-35-utc.jpg',
    description: "The Greenhouse Science module shows how technological innovation can address contemporary ecological challenges. Participants study plant biology and climate in the Livingstone College university greenhouse. They install connected soil moisture sensors, discover automated irrigation systems, and experiment with hydroponics (soil-less farming) to understand how to feed the planet sustainably.",
    activities: [
      "Installation and calibration of connected soil moisture sensors",
      "Measuring the impact of LED light on photosynthesis",
      "Assembling an automated drip irrigation circuit",
      "Nutritional analysis of water solutions in hydroponics"
    ],
    skills: [
      "Understanding basic plant physiology (nutrients, water, CO2)",
      "Basics of the Internet of Things (IoT) applied to agriculture",
      "Analytical measurement of environmental parameters (pH, moisture, brightness)",
      "Awareness of sustainable development and ecological transition"
    ],
    quote: {
      text: "We learned to automate watering a plant by programming a small connected computer. Nature meets technology!",
      author: "Chloe D., 2025 Participant"
    }
  },
  esports: {
    slug: 'esports',
    title: 'eSports',
    color: '#FBBF24',
    iconName: 'Gamepad2',
    heroImage: '/assets/images/teen-with-vr-headset-experiencing-virtual-reality-2026-03-16-22-39-31-utc.jpg',
    description: "Modern eSports goes far beyond simply playing video games. It is a complex competitive technology industry. In this module, participants discover eSports through team strategy, performance physiology, and technical mastery. They analyze their game statistics to optimize their paths, learn live video broadcasting tools (streaming), and explore event management.",
    activities: [
      "Statistical data analysis of a team game match",
      "Introductory workshop on video capture technologies and streaming production",
      "Debate on health, screen time, and the physiology of the e-athlete",
      "Organizing a friendly tournament with technical roles (players, commentators, stream crew)"
    ],
    skills: [
      "Team spirit, collaborative communication, and fast decision-making",
      "Quantitative performance data analysis",
      "Basics of multimedia production (audio, video, network streams)",
      "Developing personal discipline and focus management"
    ],
    quote: {
      text: "I realized that eSports requires just as much mental preparation, strategy, and data analysis as traditional sports.",
      author: "Marcus T., 2024 Participant"
    }
  }
};
