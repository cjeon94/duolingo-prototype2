import React from "react";

interface Exercise {
  english: string;
  spanish: string;
  list: string[];
}

interface HarderExercise {
  english: string;
  spanish: string;
  list: string[];
  type: 'translation' | 'listening' | 'speaking';
}

const exercises: Exercise[] = [
  {
    english: "The man eats an apple",
    spanish: "El hombre come una manzana",
    list: ["El", "hombre", "come", "una", "manzana", "perro", "gato", "casa"]
  },
  {
    english: "I drink water",
    spanish: "Yo bebo agua",
    list: ["Yo", "bebo", "agua", "leche", "pan", "mesa", "silla"]
  },
  {
    english: "She reads a book",
    spanish: "Ella lee un libro",
    list: ["Ella", "lee", "un", "libro", "papel", "ventana", "puerta"]
  }
];

const harderExercises: HarderExercise[] = [
  {
    english: "I would like to make a reservation for tonight at eight o'clock",
    spanish: "Me gustaría hacer una reserva para esta noche a las ocho",
    list: ["Me", "gustaría", "hacer", "una", "reserva", "para", "esta", "noche", "a", "las", "ocho", "mañana", "tarde", "ayer", "siempre", "nunca", "quiero", "necesito"],
    type: 'translation'
  },
  {
    english: "The weather forecast says it will rain tomorrow morning",
    spanish: "El pronóstico del tiempo dice que lloverá mañana por la mañana",
    list: ["El", "pronóstico", "del", "tiempo", "dice", "que", "lloverá", "mañana", "por", "la", "mañana", "tarde", "noche", "hoy", "ayer", "sol", "nieve", "viento"],
    type: 'translation'
  },
  {
    english: "Could you please help me find the nearest subway station?",
    spanish: "¿Podrías ayudarme a encontrar la estación de metro más cercana?",
    list: ["¿Podrías", "ayudarme", "a", "encontrar", "la", "estación", "de", "metro", "más", "cercana?", "hospital", "banco", "tienda", "restaurante", "hotel", "aeropuerto"],
    type: 'translation'
  }
];

interface Screen7Props {
  onResponse: (skipToAdvanced: boolean) => void;
}

export default function Screen7({ onResponse }: Screen7Props): JSX.Element {
  const [showModal, setShowModal] = React.useState(true);
  const [showHarderQuiz, setShowHarderQuiz] = React.useState(false);
  const [currentExercise, setCurrentExercise] = React.useState<Exercise>(() => 
    exercises[Math.floor(Math.random() * exercises.length)]
  );
  const [currentHarderExercise, setCurrentHarderExercise] = React.useState<HarderExercise>(() => 
    harderExercises[Math.floor(Math.random() * harderExercises.length)]
  );
  const [selectedWords, setSelectedWords] = React.useState<string[]>([]);
  const [availableWords, setAvailableWords] = React.useState<string[]>([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [result, setResult] = React.useState<'correct' | 'incorrect' | null>(null);
  const [exerciseCount, setExerciseCount] = React.useState(0);

  // Initialize available words when exercise changes
  React.useEffect(() => {
    if (showHarderQuiz) {
      setAvailableWords([...currentHarderExercise.list].sort(() => Math.random() - 0.5));
    } else {
      setAvailableWords([...currentExercise.list].sort(() => Math.random() - 0.5));
    }
    setSelectedWords([]);
    setIsChecked(false);
    setResult(null);
  }, [currentExercise, currentHarderExercise, showHarderQuiz]);

  // Auto-play audio when exercise changes
  React.useEffect(() => {
    if (!showModal) {
      const timer = setTimeout(() => {
        const sentence = showHarderQuiz ? currentHarderExercise.english : currentExercise.english;
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentExercise.english, currentHarderExercise.english, showModal, showHarderQuiz]);

  const handleModalResponse = (skipToAdvanced: boolean) => {
    if (skipToAdvanced) {
      setShowHarderQuiz(true);
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };

  const handleWordClick = (word: string, fromSelected: boolean) => {
    if (fromSelected) {
      setSelectedWords(prev => prev.filter(w => w !== word));
      setAvailableWords(prev => [...prev, word]);
    } else {
      setSelectedWords(prev => [...prev, word]);
      setAvailableWords(prev => prev.filter(w => w !== word));
    }
    setIsChecked(false);
    setResult(null);
  };

  const handleCheck = () => {
    const userAnswer = selectedWords.join(' ');
    const correctAnswer = showHarderQuiz ? currentHarderExercise.spanish : currentExercise.spanish;
    const isCorrect = userAnswer === correctAnswer;
    setResult(isCorrect ? 'correct' : 'incorrect');
    setIsChecked(true);
    
    if (isCorrect) {
      const correctSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Correct%20answer%20sound%20effect.mp3");
      correctSound.play().catch(() => {
        console.log("Could not play correct answer sound");
      });
      
      setTimeout(() => {
        if (showHarderQuiz) {
          const nextExercise = harderExercises[Math.floor(Math.random() * harderExercises.length)];
          setCurrentHarderExercise(nextExercise);
        } else {
          const nextExercise = exercises[Math.floor(Math.random() * exercises.length)];
          setCurrentExercise(nextExercise);
        }
        setExerciseCount(prev => prev + 1);
      }, 1500);
    } else {
      const incorrectSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Bad%20answer.mp3");
      incorrectSound.play().catch(() => {
        console.log("Could not play incorrect answer sound");
      });
    }
  };

  const handleSkip = () => {
    setSelectedWords([]);
    if (showHarderQuiz) {
      setAvailableWords([...currentHarderExercise.list].sort(() => Math.random() - 0.5));
    } else {
      setAvailableWords([...currentExercise.list].sort(() => Math.random() - 0.5));
    }
    setIsChecked(false);
    setResult(null);
  };

  const currentSentence = showHarderQuiz ? currentHarderExercise.english : currentExercise.english;
  const currentCorrectAnswer = showHarderQuiz ? currentHarderExercise.spanish : currentExercise.spanish;
  const englishTokens = currentSentence.split(' ');
  const baseProgress = showHarderQuiz ? 60 : 25;
  const progressPercentage = Math.min(baseProgress + (exerciseCount * 10), 100);
  const levelNumber = showHarderQuiz ? 8 + exerciseCount : 2 + exerciseCount;

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

        {/* Progress Bar */}
        <div className="flex items-center gap-4 px-4 mb-6">
          <button className="w-8 h-8 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-[#6b7280]">
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
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${showHarderQuiz ? 'bg-[#ff6b35]' : 'bg-[#ce82ff]'}`}>
            <span className="text-white font-bold text-sm">{levelNumber}</span>
          </div>
          <span className={`font-bold text-sm tracking-wider ${showHarderQuiz ? 'text-[#ff6b35]' : 'text-[#ce82ff]'}`}>
            {showHarderQuiz ? 'ADVANCED' : 'LEVEL'} {levelNumber}
          </span>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-32">
          {/* Title */}
          <h1 className="text-2xl font-bold text-[#4b4b4b] mb-8">
            {showHarderQuiz ? 'Translate this complex sentence' : 'Write this in Spanish'}
          </h1>

          {/* Top Row - Duo and English Sentence */}
          <div className="flex items-center gap-4 mb-8">
            {/* Duo Character */}
            <div className="w-28 h-28 flex items-center justify-center flex-shrink-0">
              <img 
                src={showHarderQuiz ? "/Duo Character 4.svg" : "/Duo Character 1.svg"}
                alt="Duo character" 
                className="w-28 h-28 object-contain"
              />
            </div>
            
            {/* Audio Button and English Sentence */}
            <div className="flex items-center gap-3 flex-1">
              <button
                className="w-12 h-12 rounded-xl border-0 p-0 shadow-md bg-[#1cb0f6] flex items-center justify-center flex-shrink-0"
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(currentSentence);
                  utterance.lang = 'en-US';
                  utterance.rate = 0.8;
                  speechSynthesis.speak(utterance);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.07 4.93A10 10 0 0 1 19.07 19.07M15.54 8.46A5 5 0 0 1 15.54 15.54" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* English Sentence as Tokens */}
              <div className="flex flex-wrap gap-1">
                {englishTokens.map((token, index) => (
                  <span
                    key={index}
                    className="inline-block border-b-2 border-dashed border-[#bdbdbd] mr-1 text-base text-[#4b4b4b]"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Destination Row */}
          <div className="mb-8">
            <div className="min-h-[80px] border-2 border-dashed border-[#e4e4e4] rounded-lg p-4 bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {selectedWords.map((word, index) => (
                  <button
                    key={`selected-${word}-${index}`}
                    onClick={() => handleWordClick(word, true)}
                    className="rounded-[15px] border border-[#e4e4e4] bg-white shadow-[0_3px_0_#e4e4e4] px-4 py-2 text-base active:translate-y-[2px] active:shadow-none transition-all"
                  >
                    {word}
                  </button>
                ))}
                {selectedWords.length === 0 && (
                  <span className="text-gray-400 text-base">
                    {showHarderQuiz ? 'Tap the Spanish words to build the translation...' : 'Tap the Spanish words...'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Origin Row - Spanish Words */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {availableWords.map((word, index) => (
                <button
                  key={`available-${word}-${index}`}
                  onClick={() => handleWordClick(word, false)}
                  className="rounded-[15px] border border-[#e4e4e4] bg-white shadow-[0_3px_0_#e4e4e4] px-3 py-2 text-sm active:translate-y-[2px] active:shadow-none transition-all hover:bg-gray-50"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {result === 'correct' && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
              <span className="text-green-700 font-semibold">
                {showHarderQuiz ? '¡Excelente! Perfect advanced translation!' : '¡Correcto! Great job!'}
              </span>
            </div>
          )}
          {result === 'incorrect' && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
              <span className="text-red-700 font-semibold">Not quite right. Try again!</span>
              <div className="text-sm text-red-600 mt-1">
                Correct answer: {currentCorrectAnswer}
              </div>
            </div>
          )}

          {/* Difficulty Indicator */}
          {showHarderQuiz && (
            <div className="mb-4 p-3 bg-orange-100 border border-orange-300 rounded-lg">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-orange-600">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
                <span className="text-orange-700 font-semibold text-sm">Advanced Level Challenge</span>
              </div>
            </div>
          )}
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
              disabled={selectedWords.length === 0}
              className="flex-1 h-12 rounded-xl text-white font-semibold active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: selectedWords.length > 0 ? '#2ec748' : '#86efac',
                boxShadow: selectedWords.length > 0 ? '0 3px 0 #27aa3d' : '0 3px 0 #6ee7b7'
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

        {/* Modal Overlay */}
        {showModal && (
          <div className="absolute inset-0 bg-[#000000b2] z-50 flex items-center justify-center p-4">
            {/* Centered Modal */}
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4 relative">
              {/* Duo Character */}
              <div className="flex justify-center mb-4">
                <img
                  className="w-24 h-24 object-contain animate-sway"
                  alt="Excited Duo"
                  src="/excited-owl.gif"
                />
              </div>

              {/* Centered Text Block */}
              <div className="text-center mb-6 max-w-[36ch] mx-auto">
                <p className="font-global-tokens-headings-h-7 font-[number:var(--global-tokens-headings-h-7-font-weight)] text-[#4b4b4b] text-[length:var(--global-tokens-headings-h-7-font-size)] tracking-[var(--global-tokens-headings-h-7-letter-spacing)] leading-[var(--global-tokens-headings-h-7-line-height)] [font-style:var(--global-tokens-headings-h-7-font-style)]">
                  <span className="typewriter-screen7-line1">Wow, your Spanish is so good!</span><br/>
                  <span className="typewriter-screen7-line2">Should we skip to more</span><br/>
                  <span className="typewriter-screen7-line3">advanced?</span>
                </p>
              </div>

              {/* Two-Column Button Grid */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleModalResponse(false)}
                  className="h-12 rounded-xl border-2 border-gray-300 bg-white 
                             shadow-[0_3px_0_#d1d5db] text-gray-600 
                             active:translate-y-[2px] active:shadow-none 
                             transition-all hover:bg-gray-50 text-sm 
                             font-global-tokens-headings-h-7 
                             font-[number:var(--global-tokens-headings-h-7-font-weight)] 
                             tracking-[var(--global-tokens-headings-h-7-letter-spacing)] 
                             [font-style:var(--global-tokens-headings-h-7-font-style)]"
                >
                  NO, KEEP LEARNING
                </button>
                
                <button
                  onClick={() => handleModalResponse(true)}
                  className="h-12 rounded-xl text-white active:translate-y-[2px] transition-all bg-[#2ec748] shadow-[0_3px_0_#27aa3d] text-sm font-global-tokens-headings-h-7 font-[number:var(--global-tokens-headings-h-7-font-weight)] tracking-[var(--global-tokens-headings-h-7-letter-spacing)] [font-style:var(--global-tokens-headings-h-7-font-style)]"
                >
                  YES, SKIP<br/>AHEAD
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
        )}
      </div>
    </div>
  );
}

export { Screen7 };