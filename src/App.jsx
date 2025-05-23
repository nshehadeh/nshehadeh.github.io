import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Mail, Linkedin, ExternalLink } from "lucide-react";

// Project detail component
// Update the ProjectDetail component to handle the new content structure
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
    <div className="grid gap-8">
      {project.content?.map((item, idx) => {
        if (item.type === "paragraph") {
          return (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {item.text}
            </p>
          );
        } else if (item.type === "image") {
          const sizeClasses = {
            small: "max-w-[200px]",
            medium: "max-w-[300px]",
            large: "max-w-[600px]",
            // Add more sizes as needed
          };
        
          return (
            <div key={idx} className="flex flex-col items-center space-y-2">
              <img 
                src={item.src}
                alt={item.caption || `${project.title} image ${idx}`}
                className={`rounded-lg shadow-md w-full ${item.src.includes('policybot.gif') ? 'max-w-[800px]' : sizeClasses[item.size] || sizeClasses.large}`}
              />
              {item.caption && (
                <p className="text-sm text-gray-500 italic max-w-[600px]">
                  {item.caption}
                </p>
              )}
            </div>
          );
        } else if (item.type === "image-row") {
          return (
            <div key={idx} className="grid grid-cols-2 gap-4">
              {item.images.map((image, imageIdx) => (
                <div key={imageIdx} className="flex flex-col items-center space-y-2">
                  <img 
                    src={image.src}
                    alt={image.caption || `${project.title} image ${imageIdx + 1}`}
                    className="rounded-lg shadow-md w-full"
                  />
                  {image.caption && (
                    <p className="text-sm text-gray-500 italic">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          );
        }
      })}
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
  const [activeTab, setActiveTab] = useState("about");

  const categories = [
    "Research",
    "Full Stack",
    "Mixed Reality",
    "Computer Vision",
    "Machine Learning",
    "LLMs",
    "Medical",
  ];
  const aboutContent = [
    {
      type: "paragraph",
      text:  `I'm a full-stack software engineer at AviaryAI, a YC-backed startup developing AI voice agents for the financial industry. I hold a BS and MS in Computer Science from Vanderbilt University, where I specialized in machine learning and mixed reality.`.trim()
    },
    {type: "paragraph",
      text: `

      At Vanderbilt, my research included work in a biomedical engineering lab, where I developed 
      a CUDA kernel for real-time ultrasound guidance and applied deep learning to enhance ultrasound 
      image quality. I also have published research on variational autoencoders (VAEs) and perception 
      in augmented reality, the latter being the focus of my Master's thesis. Additionally, I have 
      industry experience applying generative AI to real-world challenges at Accenture Federal Services.`.trim()

    },
    {
      type: "paragraph",
      text: `After completing my accelerated Master's program at Vanderbilt, 
      I backpacked across Africa and Asia.`.trim()
    },
    {
      type: "image-row",
      images: [
        {
          src: "/about/img3.jpeg",
          caption: "Tanzania"
        },
        {
          src: "/about/img2.jpeg",
          caption: "Nepal"
        },
        {
          src: "/about/img1.jpeg",
          caption:"Laos"
        }
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "PolicyAI",
      previewImage: "/projects/policy-bot/policybot.gif",
      preview: "Full stack chatbot and document search powered by LLM agents to answer questions on federal policies",
      ongoing: true,
      github: "https://github.com/nshehadeh/policy-bot",
      content: [
        {
          type: "paragraph",
          text: `
            PolicyAI is a full-stack chatbot powered by large language models (LLMs) 
            and retrieval-augmented generation (RAG), designed to make U.S. government 
            policies more accessible to the public. Currently, PolicyAI draws from White House 
            "Briefing Room" documents (speeches, interviews, press briefings, and more) using an agentic workflow built
            on LangGraph to process user queries. The system adds context to queries based on chat history, 
            rewrites questions to improve search accuracy, and grades retrieved documents for relevency before
            generating a final answer. Originally, I created PolicyAI to provide users with easy access to legislative and
            policy information through Q&A and document search, inspired by how LLMs can rapidly organize large amounts of
            unstructured data and present information in digestible formats.
          `.trim()        
        },
        {
          type: "image",
          src: "/projects/policy-bot/policybot.gif", 
          caption: "PolicyAI Chat Example"
        },
        {
          type: "paragraph",
          text: `
            The web application is built on a Django backend and a React frontend.
            The Django backend defines a REST API that connects to a RAG system 
            powered by LangGraph, which retrieves and processes data to provide responses.
            LangChain works with a Pinecone vector database to search document chunks for
            relevance, enhancing responses with custom system prompts and chat history. 
            User data, including chat histories, is stored in PostgreSQL through Django's 
            ORM, while MongoDB stores full documents for the LLM to reference as needed. I 
            compiled the initial dataset by scraping White House documents using Python scripts
            with BeautifulSoup. I also used Django channels to implement a WebSocket connection,
            which streams responses to the frontend in real time, creating a more natural chat experience.
            `.trim()
        },
        {
          type: "paragraph",
          text: `
            I have large plans for the future of PolicyAI, including developing a knowledge graph that holds
            information for relationships between legislation, executive orders, and other policy documents. This would
            give the system a more comprehensive understanding of the U.S. government's policies and how they relate to each other, improving
            RAG and the system's ability to hand broad questions, and deliver my analysis connecting different policy ideas. Please
            check out the GitHub repository for more information and to see the codebase as I continue adding new features and
            preparing to launch the MVP.
            `.trim()
        }
      ],
      categories: ["Full Stack", "LLMs"]
    },
    {
      id: 9,
      title: "BEAM Lab, Acoustic Window Detection & Image Quality Deep Learning",
      preview: "Research done in Vanderbilt's Institute for Surgery and Engineering",
      ongoing: false,
      github: null, // Add if available
      previewImage: "/projects/ultrasound/demo.gif",
      content: [
        {
          type: "paragraph",
          text: `
          `.trim()
        },
        {
          type: "image",
          src: "/projects/ultrasound/demo.gif",
          caption: "Real-time GUI assisting with probe placement during live transcranial ultrasound"
        },
        {
          type: "paragraph",
          text: `
              My work in Vanderbilt's Institute for Surgery and Engineering (VISE) in Dr. Brett 
              Byram's BEAM Lab began as a 10-week summer internship as a researcher under PhD student Emelina Vienneau. Emelina’s 
              research focuses on enabling transcranial ultrasound imaging of the brain. 
              I independently developed an acoustic window detection system that calculates 
              the lag-one coherence of ultrasound images in real-time. Lag-one coherence 
              serves as a metric for evaluating image quality at a specific point. My software
              processed real-time ultrasound images, computed the lag-one coherence, and
              displayed results via a GUI to guide the probe operator. The system was implemented
              on a Verasonics ultrasound machine, using MATLAB, MEX (MATLAB's C interface), and 
              CUDA for GPU processing.
           `.trim()
        },
        {
          type: "image",
          src: "/projects/ultrasound/present.png",
          caption: "Presenting my work at the VISE summer conference",
          size: "medium"
        },
        {
          type: "paragraph",
          text: `
          After presenting my work, I continued as a lab researcher for an additional year, optimizing the acoustic window detection algorithm through different thread and block configurations.
          I also worked on a deep learning project to artificially improve ultrasound image quality post-collection. Using data from Emelina's work on coded excitation,
          a technique used to increase the signal-to-noise ratio (SNR) of an ultrasound image during collection, I tested different CNN-based, deep learning architectures to 
          artificially apply the same effect on previously collected data. My work resulted in some promising initial results, increasing SNR in phantom data by 15% using a UNET.`
        }
      ],
      categories: ["Research", "Machine Learning", "Medical", "Computer Vision"]
    },
    {
      title: "XROG: Extended Reality Object Generation",
      preview: "Interactive AR environment that allows users to generate virtual objects with 3D sketches",
      previewImage: "/projects/xrog/gif_clip.gif",
      github: "https://github.com/nshehadeh/xrog",
      ongoing: false,
      content: [
        {
          type: "paragraph",
          text: `
            XROG is an interactive object generation system 
            for augmented reality (AR) developed on Microsoft’s HoloLens2. The system allows for 
            real-time hand tracking and custom gesture recognition to classify 3D sketches 
            drawn by users, which are then used to generate virtual 3D objects within an AR 
            environment. I built a end-to-end machine learning system including data collection, model 
            training, and real-time deployment. Using Unity and Microsoft’s Mixed Reality Toolkit, 
            I created a dataset by tracking hand sketches that capture various shapes, saved as 
            sparse 3D point clouds. To make the data model-ready, I resampled, normalized, and 
            applied augmentations like translations, rotations, and noise, increasing the 
            dataset size and robustness.
            `.trim()
        },
        {
          type: "image",
          src: "/projects/xrog/gif_clip.gif",
          caption: "XROG in Action"
        },
        {
          type: "paragraph",
          text: `
            After data processing, I trained a SVM to classify 
            these 3D sketches into object categories: swords, shields, and stars. I deployed the model 
            via a RESTful API using Flask and hosted on Heroku's cloud to handle real-time inference 
            requests through the Unity application. This setup enabled users to draw gestures in real-time, 
            have their input classified, and see the corresponding 3D object generated in 
            the AR scene. The Unity application integrates seamlessly with the cloud service, creating 
            an intuitive and interactive AR experience that showcases real-time object generation. 
            The full report and code for this project are available on my GitHub.
            `.trim()
        }
      ],
      categories: ["Mixed Reality", "Full Stack", "Computer Vision", "Machine Learning"]
    },
      /*
      {
        id: 6,
        title: "Deathris",
        preview: "Multiplayer VR Tetris with unique player perspectives",
        ongoing: false,
        github: "https://github.com/nshehadeh/Deathris",
        description: "Two-player VR Tetris game built in Unity using Normcore multiplayer networking. One player experiences being trapped inside a classic Tetris game, dodging falling blocks in VR.",
        categories: ["Mixed Reality"]
      },
      */
      {
        id: 8,
        title: "SUDS: Image Steganography Sanitizer",
        preview: "VAE-based framework for removing hidden data from images",
        ongoing: false,
        github: "https://github.com/pkrobinette/suds-ecai-2023", // Add if available
        previewImage: "/projects/suds/prev.jpg",
        content: [
          {
            type: "paragraph",
            text: `This work, which I helped build with a team of PhDs as part of an extended class project studying Representation Learning, was published 
            in ECAI and addresses the limitations of traditional steganography detection methods by proposing a novel sanitization framework 
            called SUDS (Sanitizing Universal and Dependent Steganography). Steganography, the practice of hiding information within digital 
            media, poses challenges for detection, particularly with advanced hiding techniques like deep-learning-based dependent and universal 
            methods. Most existing detection methods rely on recognizing specific hiding patterns, making them ineffective against novel or 
            unseen methods.
            `.trim()
          },
          {
            type: "image",
            src: "/projects/suds/sudsmodel.png",
            caption: "SUDs Architecture. C is the original image which hides secret S. The secret is sanitized using a VAE."
          },
          {
            type: "paragraph",
            text: `To address this, we designed SUDS as a variational autoencoder (VAE) model capable of sanitizing digital images embedded with 
            hidden information without relying on prior knowledge of the hiding method. Through experimentation, we demonstrated that SUDS effectively
            removes embedded messages from images across multiple steganography techniques, preserving image quality better than noise-based 
            sanitization methods. Additionally, applying SUDS to a data poisoning scenario increased classifier resistance to adversarial attacks 
            from 88.31% to 0.72%, proving its robustness and versatility. Full details are available in the published paper, and the code can be accessed on 
            the first author’s GitHub.
             `.trim()
          },
          {
            type: "image",
            src: "/projects/suds/results.png",
            caption: "Example results using SUDs. Using 3 hiding techniques (a,b,c). An image C is combined with a secret S to create C'. After being sanitized, S-hat is no longer discernible",
            size: "small"
          }
        ],
        categories: ["Research", "Machine Learning"]
      },
      {
        id: 3,
        title: "Surgical Gesture and Skill Recognition",
        preview: "Contrastive learning for surgical skill assessment using surgical videos and robot kinematics",
        previewImage: "/projects/contrastive/images.jpg",
        ongoing: false,
        github: "https://github.com/nshehadeh/contrastive-gesture-skill",
        content: [
          {
            type: "paragraph",
            text: `
              This work implements a contrastive learning framework for gesture and skill recognition, focusing 
              on modeling latent space representations from endoscope images captured during robot-assisted surgery. 
              Building on Wu et al.'s encoder-decoder structure, I introduced contrastive learning techniques to improve 
              the separability of the embedding space, allowing for more effective classification of surgical gestures and 
              skills. I explored different contrastive learning models, starting with data augmentation-based contrastive 
              learning using optical flow data, followed by incorporating kinematic data for sample 
              pairing, and finally a time-invariant model using Fourier transforms. Each model was designed to push similar 
              gestures closer in the embedding space while increasing the separation of distinct gestures.
            `.trim(),
          },
          {
            type: "image",
            src: "/projects/contrastive/model.png",
            caption: "Model Architecture for Contrastive Model Using Kinematics for Positive and Negative Samples"

          },
          {
            type: "paragraph",
            text: `
            Throughout the project, I created positive and negative sample pairs, applied contrastive loss functions, and 
            incorporated triplet loss to enhance the discriminative power of the embeddings. Once trained, the models were 
            evaluated for classification accuracy and visualized through UMAP projections, highlighting gesture, skill, 
            and user clusters. While contrastive learning did not produce the expected accuracy improvements—likely due 
            to the small dataset size, the embeddings reveal insights into skill variations across users. Future iterations 
            could refine the model structure and use larger datasets for better generalization. The full report and code 
            are available on my GitHub.
            `.trim()
          },
          {
            type: "image-row",
            images: [
              {
                src: "/projects/contrastive/gesture.png",
                caption: "Surgical Gesture UMAP for Kinematic Contrastive Model"
              },
              {
                src: "/projects/contrastive/skill.png",
                caption: "Surgical Skill UMAP for Kinematic Contrastive Model"
              }
            ]
          },
        ],
        categories: ["Machine Learning", "Computer Vision", "Medical"]
      },
      {
        id: 7,
        title: "Investigation of Presence in AR",
        preview: "Master's Thesis building a HoloLens2 research platform for a user study on plausibility in AR",
        previewImage: "/projects/thesis/full_scene.png",
        ongoing: false,
        github: "https://github.com/nshehadeh/ar_presence",
        content:[
          {
            type: "paragraph",
            text: `
            My thesis investigates the factors contributing to a sense of presence in augmented reality (AR) by adapting principles 
            from virtual reality (VR) and applying psychophysical methods. I conducted a user study in a controlled AR environment on 
            the Hololens 2 headset, where participants interacted with virtual objects under different configurations. The study
             systematically varied three essential factors to user perception in AR: interaction level, physics (e.g., gravity and collisions), and shadow realism. 
             Using a Markov chain to analyze transition choices and a budgeting task to prioritize 
             enhancements, I assessed which configurations led to the highest sense of realism. My results highlighted that realistic, 
             interactive components were essential, with gravity emerging as a strong anchor for plausibility, followed by user-applied 
             physics.
            `.trim()
          },
          {
            type: "image",
            src: "/projects/thesis/full_scene.png",
            caption: "Virtual Environment"
          },
          {
            type: "paragraph",
            text: `
            In addition to capturing user preferences through configuration transitions and budgets, I included questionnaires to quantify 
            plausibility levels, capturing how participants felt about object behavior in relation to real-world expectations. Findings showed 
            that even basic interaction significantly enhanced plausibility, while more advanced features, like realistic shadows, were valued
             for enhancing spatial perception but deemed secondary to physics and interaction. These results inform AR design by emphasizing 
             the importance of functional fidelity, where realistic physics and baseline interaction heighten user presence and immersion. The
              full thesis and code are available on my GitHub.
            `.trim()
          },
          {
            type: "image-row",
            images: [
              {
                src: "/projects/thesis/steven.png",
                caption: "A user interacting with the AR basketballs"
              },
              {
                src: "/projects/thesis/transitiongraph.png",
              caption: "Most common path chosen for transitions. {x, y, z} | x = interaction level, y = physics level, z = shadow level"
              }
            ]
          }
        ],
        categories: ["Research", "Mixed Reality"]
      },
  ];

  const experiences = [
    {
      id: 0,
      title: "Software Engineer",
      company: "AviaryAI",
      period: "February 2025 - Present",
      preview: "Software engineer building AI voice agent tools for financial institutions",
      description: "Detailed description of the role and responsibilities...",
      achievements: [
        "AI/ML/Backend engineer for voice agent and knowledge base platforms",
        "YC-backed startup based in NYC"
      ],
      companyLogo: "/experiences/aviary.png"

    },
    {
      id: 1,
      title: "Machine Learning Engineer Intern",
      company: "Accenture Federal Services (AFS)",
      period: "May 2022 - August 2022",
      preview: "Member of AFS's Machine Learning Research Division",
      description: "Detailed description of the role and responsibilities...",
      achievements: [
        "Conducted research on the application and adaptation of emerging AI technologies for federal services",
        "Implemented CLIP-GEN to synthesize images to improve hotel classification in human trafficking photographs",
        "Used AWS EC2 for scalable data preprocessing and distributed multi-GPU training to reduce model training time",
        "Fine-tuned CLIP to learn latent state representations of hotel picture and location pairs using HuggingFace, resulting in 98% accuracy classifying hotel chains and the generation of basic synthetic images"
      ],
      companyLogo: "/experiences/afs-logo.jpg"
    },
    {
      id: 2,
      title: "VISE Researcher",
      company: "BEAM Lab, Vanderbilt University",
      period: "May 2021 - May 2022",
      preview: "Researcher in Biomedical Elasticity and Acoustic Measurement Lab",
      description: "Detailed description of the role and responsibilities...",
      achievements: [
        "Implemented a backend system and GUI to facilitate live ultrasound placement on patients",
        "Engineered an acoustic window detection algorithm using MATLAB, MEX, and CUDA (C) for efficient real-time ultrasound analysis on beamformed data",
        "Improved ultrasound image quality with UNET, achieving 15% average SNR gains on phantom RF data"
      ],
      companyLogo: "/experiences/vise-logo.png",
      projectLinks: [  // Optional array of related projects
        {
          id: 9,  // matches the id in your projects array
          label: "More Details on BEAM Lab Research"  // display name
        },
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
        onBack={() => {
          setSelectedProject(null);
          setActiveTab("projects"); // Set active tab back to projects
        }}
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
              Nishan Shehadeh
            </h1>
          <p className="text-gray-600 mb-4">Software Engineer | M.S. Computer Science</p>
            <div className="flex gap-4">
              <a href="https://github.com/nshehadeh" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:nishan.g.shehadeh@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/nishan-shehadeh/" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <img 
            src="/profile/hs.png" 
            alt="Profile" 
            className="rounded-full w-32 h-32 border-4 border-white shadow-lg object-cover flex-shrink-0"  // Added object-cover and flex-shrink-0
            />
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          <Tabs defaultValue={activeTab} className="w-full space-y-4">
            {/* Modified TabsList to prevent overflow */}
            <div className="w-full border-b">
            <TabsList className="h-auto flex flex-wrap bg-muted p-1">
              <TabsTrigger 
                value="about"
                className="flex-1 min-w-[120px]"
              >
                About
              </TabsTrigger>
              <TabsTrigger 
                value="experience"
                className="flex-1 min-w-[120px]"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger 
                value="projects"
                className="flex-1 min-w-[120px]"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger 
                value="resume"
                className="flex-1 min-w-[120px]"
              >
                Resume
              </TabsTrigger>
              <TabsTrigger 
                value="blog"
                className="flex-1 min-w-[120px]"
              >
                Blog
              </TabsTrigger>
            </TabsList>
            </div>

            {/* About section with improved mobile image grid */}
            <TabsContent value="about">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                  <div className="grid gap-8">
                    {aboutContent.map((item, idx) => {
                      if (item.type === "paragraph") {
                        return (
                          <p key={idx} className="text-gray-600 leading-relaxed">
                            {item.text}
                          </p>
                        );
                      }
                      else if (item.type === "image-row") {
                        return (
                          <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {item.images.map((image, imageIdx) => (
                              <div key={imageIdx} className="flex flex-col items-center">
                                <div className="w-full min-h-[200px] sm:min-h-[150px]">
                                  <img 
                                    src={image.src}
                                    alt={image.caption || `Image ${imageIdx + 1}`}
                                    className="rounded-lg shadow-md w-full h-full object-cover"
                                  />
                                </div>
                                {image.caption && (
                                  <p className="text-sm text-gray-500 italic mt-2 text-center">
                                    {image.caption}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
                <Card>
                    <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
                    <div className="grid gap-4">
                        {experiences.map((experience) => (
                        <div
                            key={experience.id}
                            className="text-left border p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex justify-between items-start">
                            <div className="flex-grow">
                                <h3 className="font-semibold">{experience.title}</h3>
                                <p className="text-sm text-gray-500">{experience.company} • {experience.period}</p>
                                <p className="mt-2 text-gray-600">{experience.preview}</p>
                                {experience.achievements && (
                                <ul className="mt-2 list-disc list-inside text-gray-600">
                                    {experience.achievements.map((achievement, idx) => (
                                    <li key={idx}>{achievement}</li>
                                    ))}
                                </ul>
                                )}
                                {experience.projectLinks && experience.projectLinks.length > 0 && (
                                <div className="mt-4">
                                    <div className="flex flex-wrap gap-2">
                                    {experience.projectLinks.map((link) => (
                                        <button
                                        key={link.id}
                                        onClick={() => setSelectedProject(link.id)}
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm transition-colors"
                                        >
                                        <span className="mr-1">→</span> {link.label}
                                        {link.tags && link.tags.map(tag => (
                                            <span key={tag} className="ml-1 text-xs bg-blue-100 px-2 py-0.5 rounded-full">
                                            {tag}
                                            </span>
                                        ))}
                                        </button>
                                    ))}
                                    </div>
                                </div>
                                )}
                            </div>
                            {experience.companyLogo && (
                                <img 
                                src={experience.companyLogo} 
                                alt={`${experience.company} logo`}
                                className="w-16 h-16 object-contain ml-4"
                                />
                            )}
                            </div>
                        </div>
                        ))}
                    </div>
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="projects">
                    <Card>
                        <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Projects</h2>
                            <div className="flex items-center gap-2 text-sm text-emerald-600">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            Active
                            </div>
                        </div>

                        {/* Categories filter - keeping this */}
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

                        {/* New Project Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredProjects.map((project) => (
                            <button
                                key={project.id}
                                onClick={() => setSelectedProject(project.id)}
                                className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 text-left"
                            >
                                {/* Project Preview Image or Placeholder */}
                                <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                                {project.previewImage ? (
                                    <img 
                                    src={project.previewImage} 
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Visual placeholder based on category */}
                                    {project.categories[0] === "Machine Learning" && (
                                        <div className="text-3xl opacity-30">🤖</div>
                                    )}
                                    {project.categories[0] === "Mixed Reality" && (
                                        <div className="text-3xl opacity-30">🥽</div>
                                    )}
                                    {project.categories[0] === "LLMs" && (
                                        <div className="text-3xl opacity-30">💬</div>
                                    )}
                                    {/* Add more category icons as needed */}
                                    </div>
                                )}
                                {/* Ongoing badge if applicable */}
                                {project.ongoing && (
                                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                                    Active
                                    </div>
                                )}
                                </div>

                                {/* Project Info */}
                                <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                    </h3>
                                    {project.github && (
                                    <a 
                                        href={project.github}
                                        className="text-gray-400 hover:text-gray-600"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <Github className="h-5 w-5" />
                                    </a>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {project.preview}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {project.categories.map(category => (
                                    <span 
                                        key={category} 
                                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                                    >
                                        {category}
                                    </span>
                                    ))}
                                </div>
                                </div>

                                {/* Interactive overlay hint */}
                                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                            </button>
                            ))}
                        </div>
                        </CardContent>
                    </Card>
                    </TabsContent>
            {/*<TabsContent value="projects">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Projects</h2>
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
            */}
            <TabsContent value="resume">
                <Card>
                    <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <div><h2 className="text-2xl font-semibold">Resume</h2>
                      <h5 className="text-sm text-red-500 underline underline-red-600 pt-2" >Not up to date</h5> </div>
                        
                        <a 
                        href="/resume/nishan-shehadeh-resume.pdf"
                        download
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                        <svg 
                            className="w-4 h-4 mr-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                            />
                        </svg>
                        Download PDF
                        </a>
                    </div>
                    <div className="border rounded-lg overflow-hidden bg-gray-50">
                        <iframe
                        src="/resume/nishan-shehadeh-resume.pdf"
                        className="w-full h-[800px]"
                        title="Resume Preview"
                        />
                    </div>
                    </CardContent>
                </Card>
                </TabsContent>
            {/*
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
            */}
            <TabsContent value="blog">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
                  <div className="grid gap-4">
                    <div className="border p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200">
                      <h3 className="font-semibold">Coming Soon</h3>
                      <p className="text-sm text-gray-500"></p>
                      <p className="text-gray-600"></p>
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
