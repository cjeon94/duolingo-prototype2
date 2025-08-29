import React from "react";

interface TypingExercise {
  english: string;
  spanish: string;
  hint?: string;
}

const typingExercises: TypingExercise[] = [
  {
    english: "Dear Ana, how are you?",
    spanish: "Querida Ana, ¿cómo estás?",
    hint: "Remember: 'Querida' for dear (feminine), '¿cómo estás?' for how are you"
  },
  {
    english: "I would like to make a reservation for tonight",
    spanish: "Me gustaría hacer una reserva para esta noche",
    hint: "Use 'Me gustaría' for 'I would like'"
  },
  {
    english: "Could you please help me find the nearest hospital?",
    spanish: "¿Podrías ayudarme a encontrar el hospital más cercano?",
    hint: "'¿Podrías' means 'could you', 'más cercano' means 'nearest'"
  },
  {
    english: "The weather forecast says it will rain tomorrow",
    spanish: "El pronóstico del tiempo dice que lloverá mañana",
    hint: "'pronóstico del tiempo' means weather forecast"
  },
  {
    english: "I need to buy groceries before the store closes",
    spanish: "Necesito comprar comestibles antes de que cierre la tienda",
    hint: "'antes de que' means 'before', 'cierre' means 'closes'"
  }
];

export default function Screen8(): JSX.Element {
  const [currentExercise, setCurrentExercise] = React.useState<TypingExercise>(() => 
    typingExercises[Math.floor(Math.random() * typingExercises.length)]
  );
  const [userInput, setUserInput] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [result, setResult] = React.useState<'correct' | 'incorrect' | null>(null);
  const [exerciseCount, setExerciseCount] = React.useState(0);
  const [showHint, setShowHint] = React.useState(false);

  // Auto-play audio when component mounts or exercise changes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(currentExercise.english);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentExercise.english]);

  const handleCheck = () => {
    const userAnswer = userInput.trim();
    const correctAnswer = currentExercise.spanish;
    
    // More flexible matching - normalize punctuation and case
    const normalizeText = (text: string) => 
      text.toLowerCase()
          .replace(/[¿¡]/g, '') // Remove Spanish question/exclamation marks
          .replace(/[.,!?]/g, '') // Remove punctuation
          .trim();
    
    const isCorrect = normalizeText(userAnswer) === normalizeText(correctAnswer);
    setResult(isCorrect ? 'correct' : 'incorrect');
    setIsChecked(true);
    
    if (isCorrect) {
      const correctSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Correct%20answer%20sound%20effect.mp3");
      correctSound.play().catch(() => {
        console.log("Could not play correct answer sound");
      });
      
      // Move to next exercise after 2 seconds
      setTimeout(() => {
        const nextExercise = typingExercises[Math.floor(Math.random() * typingExercises.length)];
        setCurrentExercise(nextExercise);
        setUserInput("");
        setIsChecked(false);
        setResult(null);
        setShowHint(false);
        setExerciseCount(prev => prev + 1);
      }, 2000);
    } else {
      const incorrectSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Bad%20answer.mp3");
      incorrectSound.play().catch(() => {
        console.log("Could not play incorrect answer sound");
      });
    }
  };

  const handleSkip = () => {
    const nextExercise = typingExercises[Math.floor(Math.random() * typingExercises.length)];
    setCurrentExercise(nextExercise);
    setUserInput("");
    setIsChecked(false);
    setResult(null);
    setShowHint(false);
    setExerciseCount(prev => prev + 1);
  };

  const handleMicrophoneClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setIsChecked(false);
        setResult(null);
      };
      
      recognition.onerror = (event: any) => {
        console.log('Speech recognition error:', event.error);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const progressPercentage = Math.min(70 + (exerciseCount * 5), 100);
  const levelNumber = 10 + exerciseCount;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Main Canvas */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Status Bar */}
        <div className="flex justify-between items-center px-4 py-3 h-[54px]">
          <div className="text-[17px] font-semibold text-[#454a53]">9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-[#454a53] rounded-sm"></div>
            <div className="w-6 h-3 border border-[#454a53] rounded-sm"></div>
          </div>
        </div>

        {/* Progress Bar with Close Button */}
        <div className="flex items-center gap-4 px-4 mb-6">
          <button className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:text-[#374151] transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="flex-1 h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#58cc02] rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Level Indicator */}
        <div className="flex items-center gap-3 px-6 mb-8">
          <div className="w-8 h-8 bg-[#ff6b35] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{levelNumber}</span>
          </div>
          <span className="text-[#ff6b35] font-bold text-sm tracking-wider">ADVANCED {levelNumber}</span>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-32">
          {/* Title */}
          <h1 className="text-2xl font-bold text-[#4b4b4b] mb-8">
            Translate this sentence
          </h1>

          {/* Character and Speech Bubble Row */}
          <div className="flex items-start gap-4 mb-8">
            {/* Character Illustration */}
            <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
              <img 
                src="/Duo Character 5.svg" 
                alt="Duo character" 
                className="w-20 h-20 object-contain"
              />
            </div>
            
            {/* Speech Bubble */}
            <div className="flex-1 relative">
              <div className="bg-white border-2 border-[#e4e4e4] rounded-2xl p-4 shadow-sm relative">
                {/* Speech bubble tail */}
                <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-[#e4e4e4]"></div>
                <div className="absolute left-[-6px] top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white"></div>
                
                {/* Audio Button and Text */}
                <div className="flex items-center gap-3">
                  <button
                    className="w-10 h-10 rounded-xl border-0 p-0 shadow-md bg-[#1cb0f6] flex items-center justify-center flex-shrink-0"
                    onClick={() => {
                      const utterance = new SpeechSynthesisUtterance(currentExercise.english);
                      utterance.lang = 'en-US';
                      utterance.rate = 0.8;
                      speechSynthesis.speak(utterance);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.07 4.93A10 10 0 0 1 19.07 19.07M15.54 8.46A5 5 0 0 1 15.54 15.54" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <p className="text-[#4b4b4b] text-base font-medium">
                    {currentExercise.english}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  setIsChecked(false);
                  setResult(null);
                }}
                placeholder="Type in Spanish"
                className="w-full h-14 px-4 pr-12 text-base border-2 border-[#e4e4e4] rounded-2xl bg-white shadow-sm focus:border-[#1cb0f6] focus:outline-none transition-colors"
              />
              
              {/* Microphone Icon */}
              <button
                onClick={handleMicrophoneClick}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#6b7280] hover:text-[#1cb0f6] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15S15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19 10V12C19 16.42 15.42 20 11 20H13C17.42 20 21 16.42 21 12V10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 20V24M8 24H16" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Hint Button */}
          {currentExercise.hint && (
            <div className="mb-6">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-[#1cb0f6] hover:text-[#0ea5e9] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 17h.01" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="text-sm font-medium">
                  {showHint ? 'Hide hint' : 'Show hint'}
                </span>
              </button>
              
              {showHint && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 text-sm">{currentExercise.hint}</p>
                </div>
              )}
            </div>
          )}

          {/* Feedback */}
          {result === 'correct' && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
              <span className="text-green-700 font-semibold">¡Perfecto! Excellent translation!</span>
            </div>
          )}
          {result === 'incorrect' && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
              <span className="text-red-700 font-semibold">Not quite right. Try again!</span>
              <div className="text-sm text-red-600 mt-1">
                Correct answer: {currentExercise.spanish}
              </div>
            </div>
          )}

          {/* Advanced Level Indicator */}
          <div className="mb-4 p-3 bg-orange-100 border border-orange-300 rounded-lg">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-orange-600">
                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span className="text-orange-700 font-semibold text-sm">Advanced Typing Challenge</span>
            </div>
          </div>

          {/* Exercise Counter */}
          <div className="text-center mb-4">
            <span className="text-sm text-gray-500">
              Exercise {exerciseCount + 1} • Advanced Level
            </span>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex gap-4">
            {/* Skip Button */}
            <button
              onClick={handleSkip}
              className="flex-1 h-12 rounded-xl border-2 border-gray-300 bg-white shadow-[0_3px_0_#d1d5db] text-gray-600 font-semibold active:translate-y-[2px] active:shadow-none transition-all hover:bg-gray-50"
            >
              SKIP
            </button>
            
            {/* Check Button */}
            <button
              onClick={handleCheck}
              disabled={userInput.trim().length === 0}
              className="flex-1 h-12 rounded-xl text-white font-semibold active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: userInput.trim().length > 0 ? '#2ec748' : '#86efac',
                boxShadow: userInput.trim().length > 0 ? '0 3px 0 #27aa3d' : '0 3px 0 #6ee7b7'
              }}
            >
              CHECK
            </button>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-[134px] h-[5px] bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { Screen8 };