import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null); // Start with null to show only welcome
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'in-progress', 'answered'
  const [searchQuery, setSearchQuery] = useState('');

  // Get data from MainScreen navigation state
  const studentData = location.state?.studentData || {
    rollNo: 'GUEST',
    name: 'Guest',
    program: 'BSCS'
  };

  const subjectData = location.state?.subjectData || {
    title: 'Functional English',
    description: 'Communication & Literature',
    fundType: 'english',
    icon: '📚',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
  };

  // Form states
  const [studentName, setStudentName] = useState(studentData.name || '');
  const [studentRollNo, setStudentRollNo] = useState(studentData.rollNo || '');
  const [contactInfo, setContactInfo] = useState('');
  const [needHelpWith, setNeedHelpWith] = useState('');
  const [goodAt, setGoodAt] = useState('');

  // Query Center states
  const [lectureLinks, setLectureLinks] = useState([
    { id: 1, title: 'Introduction to Python', url: 'https://www.youtube.com/watch?v=kqtD5dpn9C8', category: 'Programming' },
    { id: 2, title: 'Data Structures Explained', url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM', category: 'Computer Science' },
    { id: 3, title: 'Web Development Basics', url: 'https://www.youtube.com/watch?v=qz0aGYrrlhU', category: 'Web Development' },
    { id: 4, title: 'Machine Learning Intro', url: 'https://www.youtube.com/watch?v=KNAWp2S3w94', category: 'AI/ML' },
    { id: 5, title: 'Database Design', url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc', category: 'Database' },
    { id: 6, title: 'React JS Tutorial', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', category: 'Frontend' },
  ]);

  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkCategory, setNewLinkCategory] = useState('');

  // Get subject-specific teacher - Only ONE teacher per subject
  const getSubjectTeacher = () => {
    const subjectType = subjectData.fundType || 'english';
    const subjectTitle = subjectData.title.toLowerCase();

    // English subject - ONLY Miss Sheba Rose Sultan
    if (subjectType === 'english' || subjectTitle.includes('english') || subjectTitle.includes('functional english')) {
      return {
        id: 1,
        name: 'Miss Sheba Rose Sultan',
        subject: 'English Literature',
        qualification: 'MA in English Literature, Cambridge University',
        expertise: ['Academic Writing', 'Grammar', 'Communication Skills', 'Essay Writing'],
        availability: 'Mon-Wed-Fri: 10 AM - 4 PM',
        avatar: '👩‍🏫',
        status: 'online',
        department: 'English'
      };
    }
    // Computing/ITC/Computer Science subjects - ONLY Sir Nouman
    else if (subjectType === 'computing' || subjectTitle.includes('computing') || subjectTitle.includes('itc') || subjectTitle.includes('computer') || subjectTitle.includes('programming')) {
      return {
        id: 2,
        name: 'Sir Nouman',
        subject: 'Computer Science',
        qualification: 'PhD in Computer Science, MIT',
        expertise: ['Programming', 'Algorithms', 'Data Structures', 'Web Development'],
        availability: 'Tue-Thu: 9 AM - 3 PM',
        avatar: '👨‍💻',
        status: 'online',
        department: 'Computing'
      };
    }
    // Physics subjects - ONLY Ms. Rohan Irfan
    else if (subjectType === 'physics' || subjectTitle.includes('physics')) {
      return {
        id: 3,
        name: 'Ms. Rohan Irfan',
        subject: 'Physics Lab',
        qualification: 'MSc in Experimental Physics',
        expertise: ['Lab Experiments', 'Measurement Techniques', 'Data Analysis'],
        availability: 'Mon-Wed: 1 PM - 5 PM',
        avatar: '👩‍🔬',
        status: 'offline',
        department: 'Physics'
      };
    }
    // Math subjects - ONLY Dr. Ahmed Khan
    else if (subjectType === 'math' || subjectTitle.includes('math') || subjectTitle.includes('mathematics')) {
      return {
        id: 4,
        name: 'Dr. Ahmed Khan',
        subject: 'Mathematics',
        qualification: 'PhD in Applied Mathematics',
        expertise: ['Calculus', 'Linear Algebra', 'Statistics', 'Differential Equations'],
        availability: 'Tue-Thu-Sat: 11 AM - 6 PM',
        avatar: '👨‍🎓',
        status: 'online',
        department: 'Math'
      };
    }
    // Default for any other subject - Return appropriate teacher based on subject type
    else {
      // Try to match based on subject content
      if (subjectTitle.includes('english') || subjectTitle.includes('literature') || subjectTitle.includes('writing')) {
        return {
          id: 1,
          name: 'Miss Sheba Rose Sultan',
          subject: 'English Literature',
          qualification: 'MA in English Literature, Cambridge University',
          expertise: ['Academic Writing', 'Grammar', 'Communication Skills', 'Essay Writing'],
          availability: 'Mon-Wed-Fri: 10 AM - 4 PM',
          avatar: '👩‍🏫',
          status: 'online',
          department: 'English'
        };
      } else {
        // Default to English teacher if no match
        return {
          id: 1,
          name: 'Miss Sheba Rose Sultan',
          subject: 'English Literature',
          qualification: 'MA in English Literature, Cambridge University',
          expertise: ['Academic Writing', 'Grammar', 'Communication Skills', 'Essay Writing'],
          availability: 'Mon-Wed-Fri: 10 AM - 4 PM',
          avatar: '👩‍🏫',
          status: 'online',
          department: 'English'
        };
      }
    }
  };

  const subjectTeacher = getSubjectTeacher();

  // Subject-specific demo requests data
  const getSubjectRequests = () => {
    const subjectType = subjectData.fundType || 'english';

    if (subjectType === 'computing' || subjectData.title.includes('Computing') || subjectData.title.includes('ITC')) {
      return [
        {
          id: 1,
          rollNo: 'CS-101',
          name: 'Ali Ahmed',
          type: 'Post a Lecture Request',
          title: 'Need Lecture on Python Basics',
          description: 'Can someone explain variables, data types, and basic syntax in Python? I\'m new to programming and need help understanding the fundamentals.',
          time: '1 hour ago',
          status: 'pending',
          icon: '🐍',
          details: 'I specifically need help with Python syntax for beginners. Examples with comments would be very helpful.',
          responses: []
        },
        {
          id: 2,
          rollNo: 'CS-102',
          name: 'Sara Khan',
          type: 'Ask a Question',
          title: 'Algorithm Complexity Question',
          description: 'What is the difference between time complexity and space complexity? How do we calculate Big O notation?',
          time: '3 hours ago',
          status: 'answered',
          icon: '⚡',
          details: 'Looking for clear examples of O(1), O(n), O(n²) with practical code implementations.',
          responses: ['Great question! Time complexity measures time taken, space complexity measures memory...']
        },
        {
          id: 3,
          rollNo: 'CS-103',
          name: 'Ahmed Raza',
          type: 'Post a Lecture Request',
          title: 'Data Structures in C++',
          description: 'Requesting a lecture on linked lists and their implementation in C++. Need help with pointers and memory management.',
          time: '5 hours ago',
          status: 'in-progress',
          icon: '📊',
          details: 'Focus on singly linked lists, doubly linked lists, and circular linked lists with code examples.',
          responses: ['Working on this lecture...']
        },
        {
          id: 4,
          rollNo: 'CS-104',
          name: 'Fatima Noor',
          type: 'Ask a Question',
          title: 'Database Normalization',
          description: 'What are the different normal forms (1NF, 2NF, 3NF) in database design? Need practical examples.',
          time: '1 day ago',
          status: 'answered',
          icon: '🗄️',
          details: 'Need examples of unnormalized tables and their normalized versions.',
          responses: ['First normal form ensures atomic values, second normal form removes partial dependencies...']
        },
        {
          id: 5,
          rollNo: 'CS-105',
          name: 'Bilal Hassan',
          type: 'Post a Lecture Request',
          title: 'Object-Oriented Programming',
          description: 'Need a lecture on the four pillars of OOP: Encapsulation, Inheritance, Polymorphism, and Abstraction.',
          time: '1 day ago',
          status: 'in-progress',
          icon: '🧩',
          details: 'Specific focus on real-world examples and Java implementation.',
          responses: ['Working on this lecture...']
        },
        {
          id: 6,
          rollNo: 'CS-106',
          name: 'Zainab Malik',
          type: 'Ask a Question',
          title: 'Operating System Concepts',
          description: 'What are processes and threads? What\'s the difference between them?',
          time: '2 days ago',
          status: 'answered',
          icon: '💻',
          details: 'Need explanation with diagrams and real-world analogies.',
          responses: ['Process is an executing program, thread is a lightweight process within a process...']
        },
        {
          id: 7,
          rollNo: 'CS-107',
          name: 'Usman Sheikh',
          type: 'Post a Lecture Request',
          title: 'Networking Fundamentals',
          description: 'Request lecture on OSI model layers and TCP/IP protocol suite.',
          time: '2 days ago',
          status: 'pending',
          icon: '🌐',
          details: 'Focus on practical applications of each layer in the OSI model.',
          responses: []
        },
        {
          id: 8,
          rollNo: 'CS-108',
          name: 'Hina Aslam',
          type: 'Ask a Question',
          title: 'Software Development Life Cycle',
          description: 'What are the different phases of SDLC? Which model is best for small projects?',
          time: '3 days ago',
          status: 'answered',
          icon: '🔄',
          details: 'Need comparison between Waterfall, Agile, and Spiral models.',
          responses: ['SDLC phases: Requirement analysis, Design, Implementation, Testing, Deployment, Maintenance...']
        }
      ];
    } else if (subjectType === 'physics') {
      return [
        {
          id: 1,
          rollNo: 'PHY-001',
          name: 'Hood Rehan',
          type: 'Post a Lecture Request',
          title: 'Need Lecture on Newton\'s Laws',
          description: 'Can someone explain Newton\'s three laws of motion with practical examples from everyday life?',
          time: '2 hours ago',
          status: 'pending',
          icon: '⚛️',
          details: 'I specifically need help understanding the application of these laws in real-world scenarios like car movement and sports.',
          responses: []
        },
        {
          id: 2,
          rollNo: 'PHY-002',
          name: 'Ateeb',
          type: 'Ask a Question',
          title: 'Thermodynamics Question',
          description: 'What is the difference between heat and temperature? How do we measure them?',
          time: '3 hours ago',
          status: 'answered',
          icon: '🔥',
          details: 'Looking for clear definitions and measurement techniques.',
          responses: ['Heat is energy transfer, temperature is measure of thermal energy...']
        },
        {
          id: 3,
          rollNo: 'PHY-003',
          name: 'Abdu',
          type: 'Post a Lecture Request',
          title: 'Electromagnetism Concepts',
          description: 'Requesting a lecture on electromagnetic induction and Faraday\'s law with applications.',
          time: '5 hours ago',
          status: 'in-progress',
          icon: '🧲',
          details: 'Focus on practical applications like generators and transformers.',
          responses: ['Working on this lecture...']
        },
        {
          id: 4,
          rollNo: 'PHY-004',
          name: 'Subhan',
          type: 'Ask a Question',
          title: 'Quantum Mechanics Basics',
          description: 'What are quantum particles and wave-particle duality?',
          time: '1 day ago',
          status: 'answered',
          icon: '🌌',
          details: 'Need simple explanation of quantum superposition.',
          responses: ['Quantum particles exhibit both wave and particle properties...']
        },
        {
          id: 5,
          rollNo: 'PHY-005',
          name: 'Ali',
          type: 'Post a Lecture Request',
          title: 'Optics and Light Behavior',
          description: 'Need a lecture on reflection, refraction, and lenses.',
          time: '1 day ago',
          status: 'in-progress',
          icon: '🔍',
          details: 'Specific focus on Snell\'s law and lens formula.',
          responses: ['Working on this lecture...']
        },
        {
          id: 6,
          rollNo: 'PHY-006',
          name: 'Basim',
          type: 'Ask a Question',
          title: 'Nuclear Physics',
          description: 'What is nuclear fission and fusion? How do they differ?',
          time: '2 days ago',
          status: 'answered',
          icon: '☢️',
          details: 'Looking for energy calculations and applications.',
          responses: ['Fission splits atoms, fusion combines them...']
        },
        {
          id: 7,
          rollNo: 'PHY-007',
          name: 'Rohan',
          type: 'Post a Lecture Request',
          title: 'Fluid Mechanics',
          description: 'Request lecture on Bernoulli\'s principle and its applications.',
          time: '2 days ago',
          status: 'pending',
          icon: '💧',
          details: 'Focus on aerodynamics and hydraulics.',
          responses: []
        },
        {
          id: 8,
          rollNo: 'PHY-008',
          name: 'Ahmed',
          type: 'Ask a Question',
          title: 'Wave Physics',
          description: 'What are standing waves and resonance?',
          time: '3 days ago',
          status: 'answered',
          icon: '🌊',
          details: 'Need examples from musical instruments.',
          responses: ['Standing waves occur due to interference...']
        }
      ];
    } else if (subjectType === 'math') {
      return [
        {
          id: 1,
          rollNo: 'MATH-001',
          name: 'Hood Rehan',
          type: 'Post a Lecture Request',
          title: 'Need Lecture on Calculus Basics',
          description: 'Can someone explain limits, derivatives, and integrals with practical applications?',
          time: '2 hours ago',
          status: 'pending',
          icon: '∫',
          details: 'I specifically need help understanding the fundamental theorem of calculus.',
          responses: []
        },
        {
          id: 2,
          rollNo: 'MATH-002',
          name: 'Ateeb',
          type: 'Ask a Question',
          title: 'Linear Algebra Question',
          description: 'What are eigenvectors and eigenvalues? What do they represent?',
          time: '3 hours ago',
          status: 'answered',
          icon: '📐',
          details: 'Looking for geometric interpretations.',
          responses: ['Eigenvectors remain in same direction after transformation...']
        },
        {
          id: 3,
          rollNo: 'MATH-003',
          name: 'Abdu',
          type: 'Post a Lecture Request',
          title: 'Probability Theory',
          description: 'Requesting a lecture on probability distributions and Bayes theorem.',
          time: '5 hours ago',
          status: 'in-progress',
          icon: '🎲',
          details: 'Focus on normal distribution and z-scores.',
          responses: ['Working on this lecture...']
        },
        {
          id: 4,
          rollNo: 'MATH-004',
          name: 'Subhan',
          type: 'Ask a Question',
          title: 'Differential Equations',
          description: 'How to solve first order differential equations?',
          time: '1 day ago',
          status: 'answered',
          icon: 'Δ',
          details: 'Need separation of variables method.',
          responses: ['Separate variables and integrate both sides...']
        },
        {
          id: 5,
          rollNo: 'MATH-005',
          name: 'Ali',
          type: 'Post a Lecture Request',
          title: 'Discrete Mathematics',
          description: 'Need a lecture on sets, relations, and functions.',
          time: '1 day ago',
          status: 'in-progress',
          icon: '🔢',
          details: 'Specific focus on equivalence relations.',
          responses: ['Working on this lecture...']
        },
        {
          id: 6,
          rollNo: 'MATH-006',
          name: 'Basim',
          type: 'Ask a Question',
          title: 'Number Theory',
          description: 'What are prime numbers and their properties?',
          time: '2 days ago',
          status: 'answered',
          icon: '🔟',
          details: 'Looking for applications in cryptography.',
          responses: ['Prime numbers have exactly two divisors...']
        },
        {
          id: 7,
          rollNo: 'MATH-007',
          name: 'Rohan',
          type: 'Post a Lecture Request',
          title: 'Vector Calculus',
          description: 'Request lecture on gradient, divergence, and curl.',
          time: '2 days ago',
          status: 'pending',
          icon: '↗️',
          details: 'Focus on Maxwell\'s equations applications.',
          responses: []
        },
        {
          id: 8,
          rollNo: 'MATH-008',
          name: 'Ahmed',
          type: 'Ask a Question',
          title: 'Complex Analysis',
          description: 'What are complex numbers and their applications?',
          time: '3 days ago',
          status: 'answered',
          icon: 'ℂ',
          details: 'Need help with complex plane visualization.',
          responses: ['Complex numbers have real and imaginary parts...']
        }
      ];
    } else {
      // Default English requests (existing ones)
      return [
        {
          id: 1,
          rollNo: 'CS-001',
          name: 'Hood Rehan',
          type: 'Post a Lecture Request',
          title: 'Need Lecture on Verb Tenses',
          description: 'Can someone explain the difference between present perfect and past perfect tenses with examples? I\'m struggling with when to use each tense in academic writing and could use some practical examples.',
          time: '2 hours ago',
          status: 'pending',
          icon: '📝',
          details: 'I specifically need help understanding the subtle differences between present perfect and past perfect tenses. Examples from academic papers would be very helpful.',
          responses: []
        },
        {
          id: 2,
          rollNo: 'CS-002',
          name: 'Ateeb',
          type: 'Ask a Question',
          title: 'Grammar Rules Question',
          description: 'What are the rules for using articles (a, an, the) in English sentences? I keep making mistakes with definite and indefinite articles.',
          time: '3 hours ago',
          status: 'answered',
          icon: '❓',
          details: 'Looking for clear rules and exceptions for article usage. Special focus needed on when to use "the" vs no article.',
          responses: ['Great question! Here\'s a quick guide...']
        },
        {
          id: 3,
          rollNo: 'CS-003',
          name: 'Abdu',
          type: 'Post a Lecture Request',
          title: 'Essay Writing Techniques',
          description: 'Requesting a lecture on how to structure academic essays properly. Need help with introduction, body paragraphs, and conclusion.',
          time: '5 hours ago',
          status: 'in-progress',
          icon: '📝',
          details: 'Focus on argumentative essays structure. Need examples of thesis statements and topic sentences.',
          responses: ['Working on this lecture...']
        },
        {
          id: 4,
          rollNo: 'CS-004',
          name: 'Subhan',
          type: 'Ask a Question',
          title: 'Pronunciation Help',
          description: 'How to pronounce words with silent letters in English? Words like "knight", "psychology", "mnemonic" are confusing.',
          time: '1 day ago',
          status: 'answered',
          icon: '❓',
          details: 'Need phonetic breakdown and audio examples if possible. Focus on common silent letter patterns.',
          responses: ['For "knight", it\'s pronounced "nite"...']
        },
        {
          id: 5,
          rollNo: 'CS-005',
          name: 'Ali',
          type: 'Post a Lecture Request',
          title: 'Punctuation Marks',
          description: 'Need a lecture on proper usage of commas, semicolons, and colons in academic writing.',
          time: '1 day ago',
          status: 'in-progress',
          icon: '📝',
          details: 'Specific focus on when to use semicolons vs periods. Examples from research papers would help.',
          responses: ['Working on this lecture...']
        },
        {
          id: 6,
          rollNo: 'CS-006',
          name: 'Basim',
          type: 'Ask a Question',
          title: 'Vocabulary Building',
          description: 'What are effective methods to improve English vocabulary for academic purposes?',
          time: '2 days ago',
          status: 'answered',
          icon: '❓',
          details: 'Looking for techniques beyond just memorizing word lists. Need strategies for retention.',
          responses: ['Try spaced repetition with Anki...']
        },
        {
          id: 7,
          rollNo: 'CS-007',
          name: 'Rohan',
          type: 'Post a Lecture Request',
          title: 'Idioms and Phrases',
          description: 'Request lecture on common English idioms and their meanings in different contexts.',
          time: '2 days ago',
          status: 'pending',
          icon: '📝',
          details: 'Focus on idioms used in academic and professional settings rather than casual conversation.',
          responses: []
        },
        {
          id: 8,
          rollNo: 'CS-008',
          name: 'Ahmed',
          type: 'Ask a Question',
          title: 'Sentence Structure',
          description: 'How to write complex sentences without making them confusing?',
          time: '3 days ago',
          status: 'answered',
          icon: '❓',
          details: 'Need help with compound-complex sentence structure.',
          responses: ['Complex sentences should maintain clarity...']
        }
      ];
    }
  };

  const demoRequests = getSubjectRequests();

  // Filter requests based on selected filter
  const filteredRequests = demoRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = searchQuery === '' ||
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Count requests by status
  const requestCounts = {
    all: demoRequests.length,
    pending: demoRequests.filter(r => r.status === 'pending').length,
    'in-progress': demoRequests.filter(r => r.status === 'in-progress').length,
    answered: demoRequests.filter(r => r.status === 'answered').length
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [location.state]);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    setSelectedRequest(null);
    console.log(`Navigating to: ${buttonType}`);
  };

  const handleBackToMain = () => {
    navigate('/subjects', { state: studentData });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered': return '#10b981';
      case 'in-progress': return '#f59e0b';
      case 'pending': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'answered': return 'Answered';
      case 'in-progress': return 'Running';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
  };

  const handleFilterClick = (filterType) => {
    setFilter(filterType);
  };

  const handleSubmitRequest = () => {
    if (!studentName.trim() || !studentRollNo.trim() || !needHelpWith.trim()) {
      alert('Please fill in all required fields (Name, Roll No, and "I need help with")');
      return;
    }

    // Create new request object
    const newRequest = {
      id: demoRequests.length + 1,
      rollNo: studentRollNo,
      name: studentName,
      type: 'Post a Lecture Request',
      title: needHelpWith.length > 50 ? needHelpWith.substring(0, 50) + '...' : needHelpWith,
      description: needHelpWith,
      details: `Contact: ${contactInfo}\n\nI'm Good At: ${goodAt}\n\nStatus: Pending approval`,
      time: 'Just now',
      status: 'pending',
      icon: '🎓',
      responses: []
    };

    // In real app, you would send this to backend
    // For demo, we'll just show a success message
    alert('Request submitted successfully! Your lecture request has been sent for approval.');

    // Reset form
    setContactInfo('');
    setNeedHelpWith('');
    setGoodAt('');

    // Optional: Switch to homepage to see the new request
    setActiveButton('homepage');

    console.log('New request submitted:', newRequest);
  };

  // Query Center functions
  const handleAddLink = () => {
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) {
      alert('Please enter both title and URL');
      return;
    }

    // Validate URL format
    if (!newLinkUrl.startsWith('http://') && !newLinkUrl.startsWith('https://')) {
      alert('Please enter a valid URL starting with http:// or https://');
      return;
    }

    const newLink = {
      id: lectureLinks.length + 1,
      title: newLinkTitle,
      url: newLinkUrl,
      category: newLinkCategory || 'General'
    };

    setLectureLinks([...lectureLinks, newLink]);
    setNewLinkTitle('');
    setNewLinkUrl('');
    setNewLinkCategory('');
    alert('Lecture link added successfully!');
  };

  const handleRemoveLink = (id) => {
    if (window.confirm('Are you sure you want to remove this link?')) {
      setLectureLinks(lectureLinks.filter(link => link.id !== id));
    }
  };

  const handleTeacherChat = (teacher) => {
    alert(`Opening chat with ${teacher.name}...\n\nSubject: ${teacher.subject}\nQualification: ${teacher.qualification}\n\nIn a real application, this would open a chat interface.`);
    // Here you would implement actual chat functionality
    console.log('Starting chat with:', teacher);
  };

  const handleOpenLink = (url) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(6, 182, 212, 0.3)',
          borderTop: '4px solid #06b6d4',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#000000'
    }}>

      {/* Enhanced Background Layers */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
        `,
        animation: 'pulse 8s ease-in-out infinite alternate'
      }} />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Header */}
      <header style={{
        padding: '1.5rem 3rem',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 100,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          {/* Left - Back Button and Brand */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <button
              onClick={handleBackToMain}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '12px',
                color: '#67e8f9',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(6, 182, 212, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Back to Subjects
            </button>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(14, 165, 233, 0.2))',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#67e8f9',
              boxShadow: '0 4px 15px rgba(6, 182, 212, 0.2)'
            }}>
              <span style={{ fontSize: '1.3rem' }}>📚</span>
              <span>StudyHive</span>
            </div>
          </div>

          {/* Center - Subject Name */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem 2rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              background: subjectData.gradient,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              boxShadow: `0 6px 15px ${subjectData.color}40`
            }}>
              {subjectData.icon}
            </div>
            <div>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'white'
              }}>
                {subjectData.title}
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                {subjectData.description}
              </div>
            </div>
          </div>

          {/* Right - User Info */}
          <div style={{
            padding: '0.75rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.9rem',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: subjectData.gradient,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: '600',
              color: 'white'
            }}>
              {studentData.name.charAt(0)}
            </div>
            <div>
              <div style={{
                color: '#67e8f9',
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                {studentData.name}
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.85rem'
              }}>
                {studentData.rollNo}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Centered */}
        <div style={{
          maxWidth: '1600px',
          margin: '2rem auto 0',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem'
        }}>
          {/* Home Page Button */}
          <button
            onClick={() => handleButtonClick('homepage')}
            style={{
              padding: '1rem 2.5rem',
              background: activeButton === 'homepage'
                ? `linear-gradient(135deg, ${subjectData.color}, ${subjectData.color}90)`
                : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: activeButton === 'homepage' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              animation: 'slideUp 0.5s ease 0.1s forwards',
              opacity: 0,
              boxShadow: activeButton === 'homepage'
                ? `0 8px 25px ${subjectData.color}60`
                : 'none',
              transform: activeButton === 'homepage' ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (activeButton !== 'homepage') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeButton !== 'homepage') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <span style={{
              fontSize: '1.4rem'
            }}>
              🏠
            </span>
            <span style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: activeButton === 'homepage' ? 'white' : 'white',
            }}>
              Home Page
            </span>
          </button>

          {/* Ask a Lecture Button */}
          <button
            onClick={() => handleButtonClick('ask-lecture')}
            style={{
              padding: '1rem 2.5rem',
              background: activeButton === 'ask-lecture'
                ? `linear-gradient(135deg, ${subjectData.color}, ${subjectData.color}90)`
                : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: activeButton === 'ask-lecture' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              animation: 'slideUp 0.5s ease 0.2s forwards',
              opacity: 0,
              boxShadow: activeButton === 'ask-lecture'
                ? `0 8px 25px ${subjectData.color}60`
                : 'none',
              transform: activeButton === 'ask-lecture' ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (activeButton !== 'ask-lecture') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeButton !== 'ask-lecture') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <span style={{
              fontSize: '1.4rem'
            }}>
              🎓
            </span>
            <span style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: activeButton === 'ask-lecture' ? 'white' : 'white',
            }}>
              Ask a Lecture
            </span>
          </button>

          {/* Query Center Button */}
          <button
            onClick={() => handleButtonClick('query-center')}
            style={{
              padding: '1rem 2.5rem',
              background: activeButton === 'query-center'
                ? `linear-gradient(135deg, ${subjectData.color}, ${subjectData.color}90)`
                : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: activeButton === 'query-center' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              animation: 'slideUp 0.5s ease 0.3s forwards',
              opacity: 0,
              boxShadow: activeButton === 'query-center'
                ? `0 8px 25px ${subjectData.color}60`
                : 'none',
              transform: activeButton === 'query-center' ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (activeButton !== 'query-center') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeButton !== 'query-center') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <span style={{
              fontSize: '1.4rem'
            }}>
              ❓
            </span>
            <span style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: activeButton === 'query-center' ? 'white' : 'white',
            }}>
              Query Center
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        padding: '3rem',
        position: 'relative',
        zIndex: 1,
        minHeight: 'calc(100vh - 220px)',
        height: 'auto'
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          height: '100%'
        }}>
          {/* Welcome Section - Shows when NO button is clicked (initial state) */}
          {!activeButton && !selectedRequest && (
            <div style={{
              height: 'calc(100vh - 220px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              animation: 'fadeIn 0.8s ease'
            }}>
              <div style={{
                width: '180px',
                height: '180px',
                background: subjectData.gradient,
                borderRadius: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '6rem',
                margin: '0 auto 3rem',
                boxShadow: `0 30px 60px ${subjectData.color}40`,
                animation: 'fadeIn 0.8s ease'
              }}>
                {subjectData.icon}
              </div>

              <h1 style={{
                fontSize: '4rem',
                fontWeight: '800',
                color: 'white',
                marginBottom: '1.5rem',
                lineHeight: '1.2'
              }}>
                Welcome to{' '}
                <span style={{
                  background: subjectData.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite'
                }}>
                  {subjectData.title}
                </span>
              </h1>

              <p style={{
                fontSize: '1.5rem',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                marginBottom: '3rem',
                maxWidth: '900px',
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: '0 2rem'
              }}>
                {subjectData.description}. Click on <strong style={{ color: subjectData.color }}>"Home Page"</strong> to view requests,
                <strong style={{ color: subjectData.color }}> "Ask a Lecture"</strong> to request new lectures, or
                <strong style={{ color: subjectData.color }}> "Query Center"</strong> for questions and discussions.
              </p>

              <div style={{
                marginTop: '3rem',
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  background: subjectData.color,
                  borderRadius: '50%',
                  animation: 'pulse 2s ease infinite'
                }}></span>
                Click any navigation button above to get started
              </div>
            </div>
          )}

          {/* Requests List Section - Only shows when Home Page button is clicked */}
          {activeButton === 'homepage' && !selectedRequest && (
            <div style={{
              animation: 'slideUp 0.5s ease 0.3s forwards',
              opacity: 0
            }}>
              {/* Filters and Search Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'rgba(20, 20, 20, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
              }}>
                <div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: 'white',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <span style={{
                      width: '45px',
                      height: '45px',
                      background: subjectData.gradient,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      💬
                    </span>
                    Recent Requests & Questions
                  </h2>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: '0.5rem 0 0 0'
                  }}>
                    Click on any request to view details
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center'
                }}>
                  {/* Search Bar */}
                  <div style={{
                    position: 'relative'
                  }}>
                    <input
                      type="text"
                      placeholder="Search requests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.95rem',
                        width: '250px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.target.style.borderColor = subjectData.color;
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      🔍
                    </span>
                  </div>

                  {/* Filter Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.25rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <button
                      onClick={() => handleFilterClick('all')}
                      style={{
                        padding: '0.5rem 1rem',
                        background: filter === 'all' ? subjectData.color : 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        color: filter === 'all' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>All</span>
                      <span style={{
                        fontSize: '0.8rem',
                        background: filter === 'all' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '10px'
                      }}>
                        {requestCounts.all}
                      </span>
                    </button>

                    <button
                      onClick={() => handleFilterClick('pending')}
                      style={{
                        padding: '0.5rem 1rem',
                        background: filter === 'pending' ? '#ef4444' : 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        color: filter === 'pending' ? 'white' : '#ef4444',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>Pending</span>
                      <span style={{
                        fontSize: '0.8rem',
                        background: filter === 'pending' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '10px',
                        color: filter === 'pending' ? 'white' : '#ef4444'
                      }}>
                        {requestCounts.pending}
                      </span>
                    </button>

                    <button
                      onClick={() => handleFilterClick('in-progress')}
                      style={{
                        padding: '0.5rem 1rem',
                        background: filter === 'in-progress' ? '#f59e0b' : 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        color: filter === 'in-progress' ? 'white' : '#f59e0b',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>Running</span>
                      <span style={{
                        fontSize: '0.8rem',
                        background: filter === 'in-progress' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '10px',
                        color: filter === 'in-progress' ? 'white' : '#f59e0b'
                      }}>
                        {requestCounts['in-progress']}
                      </span>
                    </button>

                    <button
                      onClick={() => handleFilterClick('answered')}
                      style={{
                        padding: '0.5rem 1rem',
                        background: filter === 'answered' ? '#10b981' : 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        color: filter === 'answered' ? 'white' : '#10b981',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>Answered</span>
                      <span style={{
                        fontSize: '0.8rem',
                        background: filter === 'answered' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '10px',
                        color: filter === 'answered' ? 'white' : '#10b981'
                      }}>
                        {requestCounts.answered}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Requests Grid */}
              {filteredRequests.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
                  gap: '2rem',
                  marginTop: '1rem'
                }}>
                  {filteredRequests.map((request) => (
                    <div
                      key={request.id}
                      onClick={() => handleRequestClick(request)}
                      style={{
                        background: 'rgba(20, 20, 20, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '18px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '1.75rem',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(30, 30, 30, 0.9)';
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = subjectData.color;
                        e.currentTarget.style.boxShadow = `0 15px 35px ${subjectData.color}20`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(20, 20, 20, 0.8)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        marginBottom: '1.25rem'
                      }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          background: subjectData.gradient,
                          borderRadius: '15px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.8rem',
                          flexShrink: 0,
                          boxShadow: `0 8px 20px ${subjectData.color}40`
                        }}>
                          {request.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '0.5rem'
                          }}>
                            <div>
                              <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '700',
                                color: 'white',
                                margin: '0 0 0.25rem 0',
                                lineHeight: '1.3'
                              }}>
                                {request.title}
                              </h3>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '0.5rem'
                              }}>
                                <span style={{
                                  fontSize: '1rem',
                                  fontWeight: '600',
                                  color: subjectData.color
                                }}>
                                  {request.name}
                                </span>
                                <span style={{
                                  fontSize: '0.9rem',
                                  color: 'rgba(255, 255, 255, 0.5)'
                                }}>
                                  {request.rollNo}
                                </span>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                              gap: '0.5rem'
                            }}>
                              <span style={{
                                fontSize: '0.85rem',
                                padding: '0.35rem 1rem',
                                background: `rgba(${getStatusColor(request.status)}${request.status === 'answered' ? '0.2' : '0.15'})`,
                                color: getStatusColor(request.status),
                                borderRadius: '20px',
                                fontWeight: '600',
                                border: `1px solid ${getStatusColor(request.status)}40`
                              }}>
                                {getStatusText(request.status)}
                              </span>
                              <span style={{
                                fontSize: '0.8rem',
                                color: 'rgba(255, 255, 255, 0.4)'
                              }}>
                                {request.time}
                              </span>
                            </div>
                          </div>

                          <p style={{
                            fontSize: '1rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            margin: '0 0 1rem 0',
                            lineHeight: '1.5',
                            flex: 1
                          }}>
                            {request.description}
                          </p>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '1rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                          }}>
                            <span style={{
                              fontSize: '0.9rem',
                              color: 'rgba(255, 255, 255, 0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              <span style={{
                                width: '8px',
                                height: '8px',
                                background: subjectData.color,
                                borderRadius: '50%'
                              }}></span>
                              {request.type}
                            </span>
                            <span style={{
                              fontSize: '0.9rem',
                              color: subjectData.color,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              Click to view details
                              <span style={{ fontSize: '1rem' }}>→</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: 'rgba(20, 20, 20, 0.8)',
                  borderRadius: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{
                    fontSize: '4rem',
                    marginBottom: '1.5rem',
                    opacity: 0.5
                  }}>
                    🔍
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '0.5rem'
                  }}>
                    No requests found
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    {searchQuery ? `No results for "${searchQuery}"` : `No requests in ${filter} category`}
                  </p>
                  {(searchQuery || filter !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilter('all');
                      }}
                      style={{
                        marginTop: '1.5rem',
                        padding: '0.75rem 1.5rem',
                        background: subjectData.gradient,
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 8px 20px ${subjectData.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Show All Requests
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Request Detail View */}
          {selectedRequest && (
            <div style={{
              animation: 'fadeIn 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '2.5rem'
              }}>
                <button
                  onClick={() => setSelectedRequest(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
                    e.currentTarget.style.borderColor = subjectData.color;
                    e.currentTarget.style.transform = 'translateX(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>←</span>
                  Back to Requests
                </button>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'white',
                  margin: 0
                }}>
                  Request Details
                </h2>
              </div>

              <div style={{
                background: 'rgba(20, 20, 20, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2.5rem',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                marginBottom: '3rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                  paddingBottom: '2rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: subjectData.gradient,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    flexShrink: 0,
                    boxShadow: `0 15px 30px ${subjectData.color}40`
                  }}>
                    {selectedRequest.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.75rem'
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '1.8rem',
                          fontWeight: '700',
                          color: 'white',
                          margin: '0 0 0.5rem 0'
                        }}>
                          {selectedRequest.title}
                        </h3>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: subjectData.gradient,
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.2rem',
                              fontWeight: '600',
                              color: 'white'
                            }}>
                              {selectedRequest.name.charAt(0)}
                            </div>
                            <div>
                              <div style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: 'white'
                              }}>
                                {selectedRequest.name}
                              </div>
                              <div style={{
                                fontSize: '0.9rem',
                                color: 'rgba(255, 255, 255, 0.6)'
                              }}>
                                {selectedRequest.rollNo}
                              </div>
                            </div>
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            paddingLeft: '1.5rem',
                            borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
                          }}>
                            <span style={{
                              fontSize: '1rem',
                              padding: '0.5rem 1.5rem',
                              background: `rgba(${getStatusColor(selectedRequest.status)}${selectedRequest.status === 'answered' ? '0.2' : '0.15'})`,
                              color: getStatusColor(selectedRequest.status),
                              borderRadius: '12px',
                              fontWeight: '700',
                              border: `1px solid ${getStatusColor(selectedRequest.status)}40`
                            }}>
                              {getStatusText(selectedRequest.status)}
                            </span>
                            <span style={{
                              fontSize: '1rem',
                              color: subjectData.color,
                              fontWeight: '600'
                            }}>
                              {selectedRequest.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div style={{
                        textAlign: 'right'
                      }}>
                        <div style={{
                          fontSize: '1rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          marginBottom: '0.25rem'
                        }}>
                          Posted
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: 'white'
                        }}>
                          {selectedRequest.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <span style={{
                      width: '36px',
                      height: '36px',
                      background: subjectData.gradient,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      📄
                    </span>
                    Description
                  </h4>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '15px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <p style={{
                      fontSize: '1.1rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: '1.7',
                      margin: 0
                    }}>
                      {selectedRequest.description}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <span style={{
                      width: '36px',
                      height: '36px',
                      background: subjectData.gradient,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      📋
                    </span>
                    Additional Details
                  </h4>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '15px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <p style={{
                      fontSize: '1.1rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: '1.7',
                      margin: 0
                    }}>
                      {selectedRequest.details}
                    </p>
                  </div>
                </div>

                {selectedRequest.responses.length > 0 && (
                  <div>
                    <h4 style={{
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      color: 'white',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{
                        width: '36px',
                        height: '36px',
                        background: subjectData.gradient,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}>
                        💬
                      </span>
                      Responses ({selectedRequest.responses.length})
                    </h4>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '15px',
                      padding: '2rem',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      {selectedRequest.responses.map((response, index) => (
                        <div key={index} style={{
                          padding: '1.5rem',
                          background: 'rgba(255, 255, 255, 0.02)',
                          borderRadius: '12px',
                          marginBottom: '1rem',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1rem'
                          }}>
                            <div style={{
                              width: '45px',
                              height: '45px',
                              background: 'rgba(16, 185, 129, 0.2)',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.2rem',
                              color: '#10b981'
                            }}>
                              👨‍🏫
                            </div>
                            <div>
                              <div style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: 'white'
                              }}>
                                Instructor Response
                              </div>
                              <div style={{
                                fontSize: '0.9rem',
                                color: 'rgba(255, 255, 255, 0.6)'
                              }}>
                                1 hour ago
                              </div>
                            </div>
                          </div>
                          <p style={{
                            fontSize: '1rem',
                            color: 'rgba(255, 255, 255, 0.8)',
                            lineHeight: '1.6',
                            margin: 0
                          }}>
                            {response}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ask a Lecture Form */}
          {activeButton === 'ask-lecture' && (
            <div style={{
              animation: 'fadeIn 0.5s ease',
              padding: '2rem'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                background: subjectData.gradient,
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                margin: '0 auto 2rem',
                boxShadow: `0 15px 30px ${subjectData.color}40`
              }}>
                🎓
              </div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Request a Lecture
              </h2>

              {/* Form Container */}
              <div style={{
                width: '100%',
                maxWidth: '800px',
                background: 'rgba(20, 20, 20, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2.5rem',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                margin: '0 auto 2rem'
              }}>
                {/* Personal Information Section */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <span style={{
                      width: '40px',
                      height: '40px',
                      background: subjectData.gradient,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      👤
                    </span>
                    Personal Information
                  </h3>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {/* Name Field */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.95rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '0.5rem',
                        fontWeight: '500'
                      }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter your full name"
                        style={{
                          width: '100%',
                          padding: '1rem 1.25rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: 'white',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                          e.target.style.borderColor = subjectData.color;
                        }}
                        onBlur={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      />
                    </div>

                    {/* Roll No Field */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.95rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '0.5rem',
                        fontWeight: '500'
                      }}>
                        Roll Number *
                      </label>
                      <input
                        type="text"
                        value={studentRollNo}
                        onChange={(e) => setStudentRollNo(e.target.value)}
                        placeholder="Enter your roll number"
                        style={{
                          width: '100%',
                          padding: '1rem 1.25rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: 'white',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                          e.target.style.borderColor = subjectData.color;
                        }}
                        onBlur={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      />
                    </div>
                  </div>

                  {/* Contact Info Field */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '0.5rem',
                      fontWeight: '500'
                    }}>
                      Contact Information (Optional)
                    </label>
                    <input
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="Email, phone number, or any preferred contact method"
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.target.style.borderColor = subjectData.color;
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    />
                  </div>
                </div>

                {/* Lecture Request Section */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <span style={{
                      width: '40px',
                      height: '40px',
                      background: subjectData.gradient,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      📚
                    </span>
                    Lecture Details
                  </h3>

                  {/* I need Help with Field */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '0.5rem',
                      fontWeight: '500'
                    }}>
                      I need help with *
                    </label>
                    <textarea
                      value={needHelpWith}
                      onChange={(e) => setNeedHelpWith(e.target.value)}
                      placeholder="Describe the lecture topic you need help with. Be specific about what you want to learn..."
                      rows="4"
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        resize: 'vertical',
                        minHeight: '120px',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.target.style.borderColor = subjectData.color;
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    />
                  </div>

                  {/* I am Good at Field */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '0.5rem',
                      fontWeight: '500'
                    }}>
                      I am good at (Optional)
                    </label>
                    <textarea
                      value={goodAt}
                      onChange={(e) => setGoodAt(e.target.value)}
                      placeholder="Share topics you're good at and could help others with..."
                      rows="4"
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        resize: 'vertical',
                        minHeight: '120px',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.target.style.borderColor = subjectData.color;
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    />
                    <p style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginTop: '0.5rem',
                      fontStyle: 'italic'
                    }}>
                      This helps create a learning community where students can help each other!
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1.5rem',
                  marginTop: '2rem'
                }}>
                  <button
                    onClick={handleSubmitRequest}
                    style={{
                      padding: '1rem 3rem',
                      background: subjectData.gradient,
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      boxShadow: `0 8px 20px ${subjectData.color}40`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = `0 12px 25px ${subjectData.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 8px 20px ${subjectData.color}40`;
                    }}
                  >
                    <span>🚀</span>
                    Submit Lecture Request
                  </button>

                  <button
                    onClick={() => handleButtonClick('homepage')}
                    style={{
                      padding: '1rem 2rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>←</span>
                    Cancel
                  </button>
                </div>

                {/* Form Guidelines */}
                <div style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: subjectData.color }}>💡</span>
                    Tips for a good request:
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    <li style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: subjectData.color }}>•</span>
                      Be specific about the topic you need help with
                    </li>
                    <li style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: subjectData.color }}>•</span>
                      Mention any specific concepts or problems you're struggling with
                    </li>
                    <li style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: subjectData.color }}>•</span>
                      Your request will be visible to other students and instructors
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Query Center - Teachers Help & Lecture Links */}
          {activeButton === 'query-center' && (
            <div style={{
              animation: 'fadeIn 0.5s ease',
              padding: '2rem'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                background: subjectData.gradient,
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                margin: '0 auto 2rem',
                boxShadow: `0 15px 30px ${subjectData.color}40`
              }}>
                ❓
              </div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                Query Center
              </h2>

              {/* Two Column Layout */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                gap: '2.5rem',
                marginBottom: '3rem'
              }}>
                {/* Teachers Help Section - Only ONE Teacher for the Subject */}
                <div>
                  <div style={{
                    background: 'rgba(20, 20, 20, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '25px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '2rem',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                    height: '100%'
                  }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      fontWeight: '700',
                      color: 'white',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{
                        width: '50px',
                        height: '50px',
                        background: subjectData.gradient,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        👨‍🏫
                      </span>
                      {subjectData.title} Teacher
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '2rem',
                      lineHeight: '1.6'
                    }}>
                      Get instant help from your {subjectData.title} instructor. Click to start a chat.
                    </p>

                    {/* Single Teacher Card */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '18px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      padding: '1.5rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      minHeight: '250px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                      onClick={() => handleTeacherChat(subjectTeacher)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = subjectData.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                      }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1.25rem',
                        flex: 1
                      }}>
                        <div style={{
                          width: '90px',
                          height: '90px',
                          background: subjectData.gradient,
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2.8rem',
                          flexShrink: 0,
                          boxShadow: `0 10px 25px ${subjectData.color}40`
                        }}>
                          {subjectTeacher.avatar}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '0.75rem'
                          }}>
                            <div>
                              <h4 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: 'white',
                                margin: '0 0 0.5rem 0'
                              }}>
                                {subjectTeacher.name}
                              </h4>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '0.5rem'
                              }}>
                                <span style={{
                                  fontSize: '1rem',
                                  color: subjectData.color,
                                  fontWeight: '600',
                                  padding: '0.3rem 0.8rem',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  borderRadius: '8px',
                                  border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                  {subjectTeacher.subject}
                                </span>
                                <span style={{
                                  fontSize: '0.85rem',
                                  color: 'rgba(255, 255, 255, 0.5)',
                                  fontStyle: 'italic'
                                }}>
                                  {subjectTeacher.department} Department
                                </span>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                              gap: '0.5rem'
                            }}>
                              <span style={{
                                fontSize: '0.85rem',
                                padding: '0.35rem 1rem',
                                background: subjectTeacher.status === 'online'
                                  ? 'rgba(16, 185, 129, 0.2)'
                                  : 'rgba(100, 116, 139, 0.2)',
                                color: subjectTeacher.status === 'online' ? '#10b981' : '#64748b',
                                borderRadius: '20px',
                                fontWeight: '600',
                                border: `1px solid ${subjectTeacher.status === 'online' ? '#10b98140' : '#64748b40'}`
                              }}>
                                {subjectTeacher.status === 'online' ? '🟢 Online' : '⚫ Offline'}
                              </span>
                              <span style={{
                                fontSize: '0.8rem',
                                color: 'rgba(255, 255, 255, 0.4)'
                              }}>
                                Available: {subjectTeacher.availability}
                              </span>
                            </div>
                          </div>

                          <div style={{
                            marginBottom: '1rem'
                          }}>
                            <div style={{
                              fontSize: '0.95rem',
                              color: subjectData.color,
                              fontWeight: '500',
                              marginBottom: '0.5rem'
                            }}>
                              <span style={{ fontSize: '1rem' }}>🎓</span> {subjectTeacher.qualification}
                            </div>
                          </div>

                          <div style={{
                            marginBottom: '1.5rem'
                          }}>
                            <div style={{
                              fontSize: '0.9rem',
                              color: 'rgba(255, 255, 255, 0.6)',
                              marginBottom: '0.5rem'
                            }}>
                              Areas of Expertise:
                            </div>
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '0.5rem'
                            }}>
                              {subjectTeacher.expertise.map((skill, index) => (
                                <span key={index} style={{
                                  fontSize: '0.8rem',
                                  padding: '0.3rem 0.8rem',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  color: subjectData.color,
                                  borderRadius: '12px',
                                  border: `1px solid ${subjectData.color}30`,
                                  fontWeight: '500'
                                }}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '1rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                            marginTop: 'auto'
                          }}>
                            <span style={{
                              fontSize: '0.9rem',
                              color: 'rgba(255, 255, 255, 0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              <span style={{
                                width: '8px',
                                height: '8px',
                                background: subjectData.color,
                                borderRadius: '50%',
                                animation: 'pulse 2s ease infinite'
                              }}></span>
                              {subjectTeacher.status === 'online' ? 'Available for instant chat' : 'Currently offline'}
                            </span>
                            <span style={{
                              fontSize: '0.9rem',
                              color: subjectData.color,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              fontWeight: '600'
                            }}>
                              Click to {subjectTeacher.status === 'online' ? 'start chat' : 'leave message'}
                              <span style={{ fontSize: '1rem' }}>💬</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Teacher Availability Note */}
                    <div style={{
                      marginTop: '1.5rem',
                      padding: '1rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      <div style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          color: subjectData.color,
                          fontSize: '1rem'
                        }}>📅</span>
                        <span>
                          <strong>Note:</strong> {subjectTeacher.name} is available during {subjectTeacher.availability}. You can leave messages anytime.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lecture Links Section - Increased Height */}
                <div>
                  <div style={{
                    background: 'rgba(20, 20, 20, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '25px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '2rem',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      fontWeight: '700',
                      color: 'white',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{
                        width: '50px',
                        height: '50px',
                        background: subjectData.gradient,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        📚
                      </span>
                      {subjectData.title} Resources
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '2rem',
                      lineHeight: '1.6'
                    }}>
                      Useful learning resources and lecture recordings for {subjectData.title}. Add your own links to help others!
                    </p>

                    {/* Add New Link Form */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      padding: '1.5rem',
                      marginBottom: '2rem',
                      flexShrink: 0
                    }}>
                      <h4 style={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: 'white',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ color: subjectData.color }}>➕</span>
                        Add New Lecture Link
                      </h4>
                      <div style={{
                        display: 'grid',
                        gap: '1rem'
                      }}>
                        <input
                          type="text"
                          value={newLinkTitle}
                          onChange={(e) => setNewLinkTitle(e.target.value)}
                          placeholder="Lecture Title"
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            color: 'white',
                            fontSize: '0.95rem',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                            e.target.style.borderColor = subjectData.color;
                          }}
                          onBlur={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          }}
                        />
                        <input
                          type="text"
                          value={newLinkUrl}
                          onChange={(e) => setNewLinkUrl(e.target.value)}
                          placeholder="https://example.com/lecture"
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            color: 'white',
                            fontSize: '0.95rem',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                            e.target.style.borderColor = subjectData.color;
                          }}
                          onBlur={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          }}
                        />
                        <input
                          type="text"
                          value={newLinkCategory}
                          onChange={(e) => setNewLinkCategory(e.target.value)}
                          placeholder="Category (e.g., Programming, Math, etc.)"
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            color: 'white',
                            fontSize: '0.95rem',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                            e.target.style.borderColor = subjectData.color;
                          }}
                          onBlur={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          }}
                        />
                        <button
                          onClick={handleAddLink}
                          style={{
                            padding: '0.75rem 1.5rem',
                            background: subjectData.gradient,
                            border: 'none',
                            borderRadius: '10px',
                            color: 'white',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = `0 8px 20px ${subjectData.color}40`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <span>➕</span>
                          Add Link
                        </button>
                      </div>
                    </div>

                    {/* Links List - Increased Height */}
                    <div style={{
                      flex: 1,
                      maxHeight: '400px',
                      overflowY: 'auto',
                      paddingRight: '0.5rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                      }}>
                        {lectureLinks.map((link) => (
                          <div key={link.id} style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '15px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            padding: '1.25rem',
                            transition: 'all 0.3s ease',
                            minHeight: '120px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                              e.currentTarget.style.borderColor = subjectData.color;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                            }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginBottom: '1rem'
                            }}>
                              <div style={{ flex: 1 }}>
                                <h4 style={{
                                  fontSize: '1.1rem',
                                  fontWeight: '600',
                                  color: 'white',
                                  margin: '0 0 0.5rem 0'
                                }}>
                                  {link.title}
                                </h4>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '1rem',
                                  flexWrap: 'wrap'
                                }}>
                                  <span style={{
                                    fontSize: '0.85rem',
                                    color: subjectData.color,
                                    fontWeight: '500',
                                    padding: '0.25rem 0.75rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                  }}>
                                    {link.category}
                                  </span>
                                  <span style={{
                                    fontSize: '0.8rem',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    maxWidth: '300px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {link.url}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveLink(link.id)}
                                style={{
                                  background: 'rgba(239, 68, 68, 0.1)',
                                  border: '1px solid rgba(239, 68, 68, 0.2)',
                                  borderRadius: '8px',
                                  color: '#ef4444',
                                  fontSize: '0.8rem',
                                  padding: '0.4rem 0.8rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  flexShrink: 0,
                                  marginLeft: '1rem'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              >
                                Remove
                              </button>
                            </div>
                            <button
                              onClick={() => handleOpenLink(link.url)}
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '10px',
                                color: subjectData.color,
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                            >
                              <span>🔗</span>
                              Open Lecture Link
                              <span style={{ fontSize: '1rem' }}>↗</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back to Home Button */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem'
              }}>
                <button
                  onClick={() => handleButtonClick('homepage')}
                  style={{
                    padding: '1rem 2rem',
                    background: subjectData.gradient,
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 8px 25px ${subjectData.color}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span>🏠</span>
                  Back to Home Page
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;