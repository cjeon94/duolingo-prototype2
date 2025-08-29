import React from "react";

export default function Screen8(): JSX.Element {
  const [userInput, setUserInput] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [result, setResult] = React.useState<'correct' | 'incorrect' | null>(null);
  
  const correctAnswer = "Querida Ana, ¿cómo estás?";
  const englishSentence = "Dear Ana, how are you?";

  // Auto-play audio when component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(englishSentence);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCheck = () => {
    const isCorrect = userInput.trim().toLowerCase() === correctAnswer.toLowerCase();
    setResult(isCorrect ? 'correct' : 'incorrect');
    setIsChecked(true);
    
    if (isCorrect) {
      const correctSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Correct%20answer%20sound%20effect.mp3");
      correctSound.play().catch(() => {
        console.log("Could not play correct answer sound");
      });
    } else {
      const incorrectSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Bad%20answer.mp3");
      incorrectSound.play().catch(() => {
        console.log("Could not play incorrect answer sound");
      });
    }
  };

  const handleMicrophoneClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
      };
      
      recognition.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

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
            <div className="w-3/5 h-full bg-[#58cc02] rounded-full"></div>
          </div>
        </div>

        {/* Level Indicator */}
        <div className="flex items-center gap-3 px-6 mb-8">
          <div className="w-8 h-8 bg-[#ce82ff] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">6</span>
          </div>
          <span className="text-[#ce82ff] font-bold text-sm tracking-wider">LEVEL 6</span>
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
                src="/Duo Character 3.svg" 
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
                      const utterance = new SpeechSynthesisUtterance(englishSentence);
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
                    Dear Ana, how are you?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-8">
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
                Correct answer: {correctAnswer}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={handleCheck}
            disabled={userInput.trim().length === 0}
            className="w-full h-12 rounded-xl text-white font-semibold active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: userInput.trim().length > 0 ? '#2ec748' : '#86efac',
              boxShadow: userInput.trim().length > 0 ? '0 3px 0 #27aa3d' : '0 3px 0 #6ee7b7'
            }}
          >
            CHECK
          </button>
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