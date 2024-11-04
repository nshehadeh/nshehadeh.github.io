import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Mail, Linkedin, ExternalLink } from "lucide-react";

// Project detail component
const ProjectDetail = ({ project, onBack }) => (
  <div className="max-w-4xl mx-auto p-6">
    <button 
      onClick={onBack}
      className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
    >
      ← Back to Projects
    </button>
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.categories.map(category => (
            <span key={category} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {category}
            </span>
          ))}
        </div>
        {project.ongoing && (
          <span className="inline-flex items-center text-sm text-emerald-600">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
            Ongoing Project
          </span>
        )}
      </div>
      {project.github && (
        <a href={project.github} className="text-gray-600 hover:text-gray-900">
          <Github className="h-5 w-5" />
        </a>
      )}
    </div>
    <div className="grid gap-6">
      <div className="prose max-w-none">
        {project.description}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {project.images?.map((img, idx) => (
          <img 
            key={idx}
            src={img}
            alt={`${project.title} screenshot ${idx + 1}`}
            className="rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  </div>
);

// Experience detail component
const ExperienceDetail = ({ experience, onBack }) => (
  <div className="max-w-4xl mx-auto p-6">
    <button 
      onClick={onBack}
      className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
    >
      ← Back to Experience
    </button>
    <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
    <p className="text-gray-600 mb-4">{experience.company} • {experience.period}</p>
    <div className="prose max-w-none">
      {experience.description}
      <h3>Key Achievements</h3>
      <ul>
        {experience.achievements.map((achievement, idx) => (
          <li key={idx}>{achievement}</li>
        ))}
      </ul>
    </div>
  </div>
);

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Full Stack",
    "Mixed Reality",
    "Computer Vision",
    "Machine Learning",
    "LLMs",
    "Medical"
  ];

  const projects = [
    {
      id: 1,
      title: "Medical Image Analysis Platform",
      preview: "AI-powered platform for medical image analysis",
      ongoing: true,
      github: "https://github.com/yourusername/project1",
      description: "Detailed description of the medical image analysis platform...",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      categories: ["Medical", "Computer Vision", "Machine Learning"]
    },
    {
      id: 2,
      title: "Virtual Reality Training System",
      preview: "VR-based medical training simulator",
      ongoing: false,
      github: "https://github.com/yourusername/project2",
      description: "Detailed description of the VR training system...",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      categories: ["Mixed Reality", "Medical"]
    }
  ];

  const experiences = [
    {
      id: 1,
      title: "Senior Developer",
      company: "Tech Company",
      period: "2020 - Present",
      preview: "Leading development of AI-powered healthcare solutions",
      description: "Detailed description of the role and responsibilities...",
      achievements: [
        "Led team of 5 developers in creating new ML pipeline",
        "Reduced processing time by 60% through optimization"
      ]
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "Previous Company",
      period: "2018 - 2020",
      preview: "Full stack development of web applications",
      description: "Detailed description of the role and responsibilities...",
      achievements: [
        "Implemented new feature that increased user engagement by 40%",
        "Mentored 3 junior developers"
      ]
    }
  ];

  const filteredProjects = selectedCategories.length > 0
    ? projects.filter(project => 
        project.categories.some(category => 
          selectedCategories.includes(category)
        )
      )
    : projects;

  if (selectedProject) {
    return (
      <ProjectDetail 
        project={projects.find(p => p.id === selectedProject)} 
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  if (selectedExperience) {
    return (
      <ExperienceDetail
        experience={experiences.find(e => e.id === selectedExperience)}
        onBack={() => setSelectedExperience(null)}
      />
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-8">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Your Name
            </h1>
            <p className="text-gray-600 mb-4">Software Developer</p>
            <div className="flex gap-4">
              <a href="https://github.com/yourusername" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:your@email.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/yourusername" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <img 
            src="/api/placeholder/150/150" 
            alt="Profile" 
            className="rounded-full w-32 h-32 border-4 border-white shadow-lg"
          />
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                  <p className="text-gray-600">
                    Hello! I'm a passionate software developer with expertise in modern web technologies.
                    I love building user-friendly applications and solving complex problems.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
                  <div className="grid gap-4">
                    {experiences.map((experience) => (
                      <button
                        key={experience.id}
                        onClick={() => setSelectedExperience(experience.id)}
                        className="text-left border p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200"
                      >
                        <h3 className="font-semibold">{experience.title}</h3>
                        <p className="text-sm text-gray-500">{experience.company} • {experience.period}</p>
                        <p className="mt-2 text-gray-600">{experience.preview}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">My Projects</h2>
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      Current
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-2">Filter by category:</div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategories(prev =>
                              prev.includes(category)
                                ? prev.filter(c => c !== category)
                                : [...prev, category]
                            );
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedCategories.includes(category)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {filteredProjects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project.id)}
                        className="text-left border p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{project.title}</h3>
                            {project.ongoing && (
                              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            )}
                          </div>
                          {project.github && (
                            <a 
                              href={project.github}
                              className="text-gray-600 hover:text-gray-900"
                              onClick={e => e.stopPropagation()}
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{project.preview}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.categories.map(category => (
                            <span key={category} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resume">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Resume</h2>
                    <a 
                      href="/path-to-your-resume.pdf" 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      download
                    >
                      Download PDF
                    </a>
                  </div>
                  <div className="prose max-w-none">
                    <h3>Education</h3>
                    <p>Your University • BS in Computer Science • 2018</p>
                    
                    <h3>Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'Python', 'AWS'].map(skill => (
                        <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
                  <div className="grid gap-4">
                    <div className="border p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200">
                      <h3 className="font-semibold">First Blog Post</h3>
                      <p className="text-sm text-gray-500">January 1, 2024</p>
                      <p className="text-gray-600">Preview of your first blog post...</p>
                    </div>
                    <div className="border p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200">
                      <h3 className="font-semibold">Second Blog Post</h3>
                      <p className="text-sm text-gray-500">January 15, 2024</p>
                      <p className="text-gray-600">Preview of your second blog post...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export default App;