"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  GraduationCap,
  Briefcase,
  Terminal,
  Database,
  Layout,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  BrainCircuit,
  Settings,
  Sparkles,
  Map,
  Code2
} from "lucide-react";
import { toast } from "sonner";

const ROLES = [
  { id: "frontend", title: "Frontend Engineer", icon: Layout, desc: "React, UI/UX, Web Performance" },
  { id: "backend", title: "Backend Engineer", icon: Terminal, desc: "Node.js, APIs, System Design" },
  { id: "data_science", title: "Data Scientist", icon: Database, desc: "Python, ML, Analytics" },
  { id: "core_engineering", title: "Core Engineer", icon: Settings, desc: "Mechanical, Electrical, Civil" }
];

const QUIZ_QUESTIONS: Record<string, any[]> = {
  frontend: [
    { q: "What is the primary purpose of the Virtual DOM in React?", options: ["To directly manipulate the real DOM faster", "To keep a memory representation of the UI and sync it with the real DOM", "To manage backend database queries", "To style components with CSS"], ans: 1 },
    { q: "Which CSS property is used to create a responsive flexbox layout?", options: ["display: grid", "float: left", "display: flex", "position: absolute"], ans: 2 },
    { q: "In Next.js, what does 'use client' signify?", options: ["The component is a Server Component", "The component requires a database connection", "The component should be rendered on the client side", "The component is deprecated"], ans: 2 }
  ],
  backend: [
    { q: "Which of the following is a characteristic of RESTful APIs?", options: ["Stateful communication", "Stateless communication", "XML only responses", "Direct database access"], ans: 1 },
    { q: "What does ACID stand for in database transactions?", options: ["Atomicity, Consistency, Isolation, Durability", "Active, Concurrent, Indexed, Direct", "Automated, Created, Inserted, Deleted", "Array, Class, Integer, Double"], ans: 0 },
    { q: "In Node.js, how is asynchronous I/O handled?", options: ["Multi-threading", "Event Loop", "Sequential execution", "Blocking sockets"], ans: 1 }
  ],
  data_science: [
    { q: "Which Python library is primarily used for data manipulation and analysis?", options: ["TensorFlow", "Flask", "Pandas", "Pygame"], ans: 2 },
    { q: "What is the purpose of cross-validation in machine learning?", options: ["To train the model faster", "To assess how the results of a statistical analysis will generalize to an independent data set", "To increase the size of the dataset", "To remove outliers automatically"], ans: 1 },
    { q: "Which algorithm is used for classification tasks?", options: ["Linear Regression", "K-Means", "Random Forest Classifier", "PCA"], ans: 2 }
  ],
  core_engineering: [
    { q: "What is the primary function of a finite element analysis (FEA)?", options: ["To design electrical circuits", "To simulate and predict how a product reacts to real-world forces", "To write software for microcontrollers", "To optimize chemical reactions"], ans: 1 },
    { q: "In thermodynamics, what does the first law state?", options: ["Entropy always increases", "Energy cannot be created or destroyed", "Temperature flows from cold to hot", "Pressure is inversely proportional to volume"], ans: 1 },
    { q: "Which material property defines the ability to deform under tensile stress?", options: ["Brittleness", "Hardness", "Ductility", "Malleability"], ans: 2 }
  ]
};

export function OnboardingClient({ institutions }: { institutions: any[] }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [profileData, setProfileData] = useState({
    fullName: "",
    bio: "",
    hobbies: "",
    institutionId: "",
    department: "",
  });

  const [selectedRole, setSelectedRole] = useState("");
  
  // Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState(0);

  const handleNext = () => {
    if (step === 1) {
      if (!profileData.fullName || !profileData.institutionId || !profileData.department) {
        toast.error("Please fill in the required fields (Name, Institution, Department)");
        return;
      }
    }
    if (step === 2) {
      if (!selectedRole) {
        toast.error("Please select a target role");
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIdx] = optionIdx;
    setAnswers(newAnswers);
    
    // Auto advance
    setTimeout(() => {
      if (currentQuestionIdx < QUIZ_QUESTIONS[selectedRole].length - 1) {
        setCurrentQuestionIdx(idx => idx + 1);
      } else {
        // Calculate score
        let correct = 0;
        QUIZ_QUESTIONS[selectedRole].forEach((q, i) => {
          if (newAnswers[i] === q.ans) correct++;
        });
        const scorePct = Math.round((correct / QUIZ_QUESTIONS[selectedRole].length) * 100);
        setQuizScore(scorePct);
        setStep(4);
      }
    }, 400);
  };

  const submitOnboarding = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/student/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: profileData,
          role: selectedRole,
          score: quizScore
        })
      });

      if (!res.ok) throw new Error("Failed to save onboarding data");
      
      toast.success("Profile fully configured!");
      
      // Hard redirect to force a clean re-mount of the layout (bypassing cached middleware if necessary)
      window.location.href = '/dashboard/student';
      
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border/60 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      
      {/* Progress Header */}
      <div className="bg-muted/30 p-6 border-b border-border/40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">Welcome to SCI</span>
          </div>
          <span className="text-xs font-semibold text-muted-foreground font-mono">Step {step} of 4</span>
        </div>
        
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 sm:p-10 min-h-[450px] flex flex-col justify-center relative">
        
        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-6 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-right-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Let's build your profile</h2>
              <p className="text-sm text-muted-foreground">Tell us a bit about yourself and your academic background.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={profileData.fullName}
                  onChange={e => setProfileData({...profileData, fullName: e.target.value})}
                  className="w-full h-11 px-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">Institution <span className="text-red-500">*</span></label>
                <input 
                  type="text"
                  list="institutions-list"
                  value={profileData.institutionId}
                  onChange={e => setProfileData({...profileData, institutionId: e.target.value})}
                  className="w-full h-11 px-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition-all"
                  placeholder="Type or select College/University..."
                />
                <datalist id="institutions-list">
                  {institutions.map(inst => (
                    <option key={inst.id} value={inst.name} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">Department <span className="text-red-500">*</span></label>
                <select 
                  value={profileData.department}
                  onChange={e => setProfileData({...profileData, department: e.target.value})}
                  className="w-full h-11 px-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Department...</option>
                  <option value="Computer Science">Computer Science & Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Data Science">Data Science & AI</option>
                </select>
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">Bio & Ambitions</label>
                <textarea 
                  value={profileData.bio}
                  onChange={e => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full p-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition-all resize-none"
                  placeholder="I am passionate about building scalable web applications and learning new technologies..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">Hobbies & Interests</label>
                <input 
                  type="text" 
                  value={profileData.hobbies}
                  onChange={e => setProfileData({...profileData, hobbies: e.target.value})}
                  className="w-full h-11 px-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition-all"
                  placeholder="e.g., Chess, Open Source Contributing, Guitar"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Role Selection */}
        {step === 2 && (
          <div className="space-y-6 max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-right-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Target Career Path</h2>
              <p className="text-sm text-muted-foreground">Select the role you're aiming for. We'll tailor your initial assessment to this path.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ROLES.map(role => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5 shadow-md scale-[1.02]' 
                        : 'border-border/60 bg-background hover:border-border hover:bg-muted/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-foreground">{role.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">{role.desc}</p>
                    
                    {isSelected && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-primary animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4" /> Selected
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Technical Assessment */}
        {step === 3 && selectedRole && (
          <div className="space-y-6 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-right-4">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Baseline Evaluation</h2>
                  <p className="text-xs text-muted-foreground font-mono">{ROLES.find(r => r.id === selectedRole)?.title} Assessment</p>
                </div>
              </div>
              <div className="text-sm font-bold font-mono text-muted-foreground">
                Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS[selectedRole].length}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground leading-snug">
                {QUIZ_QUESTIONS[selectedRole][currentQuestionIdx].q}
              </h3>

              <div className="space-y-3">
                {QUIZ_QUESTIONS[selectedRole][currentQuestionIdx].options.map((opt: string, i: number) => {
                  const isSelected = answers[currentQuestionIdx] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all group flex items-center gap-3 ${
                        isSelected 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-border/60 bg-background hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30 group-hover:border-primary/50'
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-background rounded-full" />}
                      </div>
                      <span className={`text-sm font-semibold ${isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Results */}
        {step === 4 && (
          <div className="space-y-8 max-w-xl mx-auto w-full text-center animate-in zoom-in-95 duration-500">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center mx-auto mb-6 relative z-10 bg-card">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-foreground font-mono">{quizScore}%</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Score</span>
                </div>
              </div>
              {/* Decorative background circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-2xl rounded-full" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Assessment Complete!</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                We've analyzed your responses and generated a baseline skill profile. Your personalized learning paths and job matches are ready.
              </p>
            </div>

            <div className="bg-muted/30 border border-border/40 rounded-xl p-4 flex items-center justify-between gap-4 max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <Map className="w-8 h-8 text-emerald-500" />
                <div className="text-left">
                  <h4 className="text-sm font-bold text-foreground">Learning Path Generated</h4>
                  <p className="text-xs text-muted-foreground">Tailored for {ROLES.find(r => r.id === selectedRole)?.title}</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>

            <button
              onClick={submitOnboarding}
              disabled={isSubmitting}
              className="mt-4 px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto disabled:opacity-70 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Workspace...
                </>
              ) : (
                <>
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}

      </div>

      {/* Footer Navigation (Hide on Step 4) */}
      {step < 4 && (
        <div className="p-6 border-t border-border/40 bg-muted/10 flex items-center justify-between">
          <button 
            onClick={handlePrev}
            disabled={step === 1}
            className="px-5 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button 
            onClick={handleNext}
            disabled={step === 3} // Step 3 auto-advances
            className={`px-5 py-2.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm ${step === 3 ? 'opacity-0' : ''}`}
          >
            {step === 2 ? 'Start Assessment' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
