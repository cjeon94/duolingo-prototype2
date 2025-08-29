import React from "react";
import { Screen7 } from "../Screen7/Screen7";

interface Exercise {
  english: string;
  spanish: string;
  list: string[];
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

export default function Screen6(): JSX.Element {
  const duoCharacters = [
    "/Duo Character 1.svg",
    "/Duo Character 2.svg", 
    "/Duo Character 3.svg",
    "/Duo Character 4.svg",
    "/Duo Character 5.svg"
  ];
  
  const [randomDuoCharacter] = React.useState(() => 
    duoCharacters[Math.floor(Math.random() * duoCharacters.length)]
  );
  
  const [exercise] = React.useState<Exercise>(() => 
    exercises[Math.floor(Math.random() * exercises.length)]
  );
  
  const [selectedWords, setSelectedWords] = React.useState<string[]>([]);
  const [availableWords, setAvailableWords] = React.useState<string[]>(
    () => [...exercise.list].sort(() => Math.random() - 0.5)
  );
  const [isChecked, setIsChecked] = React.useState(false);
  const [result, setResult] = React.useState<'correct' | 'incorrect' | null>(null);
  const [showScreen7, setShowScreen7] = React.useState(false);

  // Auto-play audio when component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(exercise.english);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }, 500); // Small delay to ensure component is fully loaded

    return () => clearTimeout(timer);
  }, [exercise.english]);

  const handleWordClick = (word: string, fromSelected: boolean) => {
    if (fromSelected) {
      // Move from selected back to available
      setSelectedWords(prev => prev.filter(w => w !== word));
      setAvailableWords(prev => [...prev, word]);
    } else {
      // Move from available to selected
      setSelectedWords(prev => [...prev, word]);
      setAvailableWords(prev => prev.filter(w => w !== word));
    }
    setIsChecked(false);
    setResult(null);
  };

  const handleCheck = () => {
    const userAnswer = selectedWords.join(' ');
    const isCorrect = userAnswer === exercise.spanish;
    setResult(isCorrect ? 'correct' : 'incorrect');
    setIsChecked(true);
    
    if (isCorrect) {
      // Play correct answer sound
      const correctSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Correct%20answer%20sound%20effect.mp3");
      correctSound.play().catch(() => {
        console.log("Could not play correct answer sound");
      });
      
      // Show Screen7 after 1.5 seconds
      setTimeout(() => {
        setShowScreen7(true);
      }, 1500);
    } else {
      // Play incorrect answer sound
      const incorrectSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Bad%20answer.mp3");
      incorrectSound.play().catch(() => {
        console.log("Could not play incorrect answer sound");
      });
    }
  };

  const handleSkip = () => {
    // Reset the exercise
    setSelectedWords([]);
    setAvailableWords([...exercise.list].sort(() => Math.random() - 0.5));
    setIsChecked(false);
    setResult(null);
  };

  const handleScreen7Response = (skipToAdvanced: boolean) => {
    setShowScreen7(false);
    // Here you could handle the skip to advanced logic or continue with more exercises
    console.log("Skip to advanced:", skipToAdvanced);
  };

  const englishTokens = exercise.english.split(' ');

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
            <div className="w-1/4 h-full bg-[#58cc02] rounded-full"></div>
          </div>
        </div>

        {/* Level Indicator */}
        <div className="flex items-center gap-3 px-6 mb-8">
          <div className="w-8 h-8 bg-[#ce82ff] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">2</span>
          </div>
          <span className="text-[#ce82ff] font-bold text-sm tracking-wider">LEVEL 2</span>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-32">
          {/* Title */}
          <h1 className="text-2xl font-bold text-[#4b4b4b] mb-8">
            Write this in Spanish
          </h1>

          {/* Top Row - Duo and English Sentence */}
          <div className="flex items-center gap-4 mb-8">
            {/* Duo Character */}
            <div className="w-28 h-28 flex items-center justify-center flex-shrink-0">
              <img 
                src={randomDuoCharacter} 
                alt="Duo character" 
                className="w-28 h-28 object-contain"
              />
            </div>
            
            {/* Audio Button and English Sentence */}
            <div className="flex items-center gap-3 flex-1">
              <button
                className="w-12 h-12 rounded-xl border-0 p-0 shadow-md bg-[#1cb0f6] flex items-center justify-center flex-shrink-0"
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(exercise.english);
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
            <div className="min-h-[60px] border-2 border-dashed border-[#e4e4e4] rounded-lg p-4 bg-gray-50">
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
                  <span className="text-gray-400 text-base">Tap the Spanish words...</span>
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
                  className="rounded-[15px] border border-[#e4e4e4] bg-white shadow-[0_3px_0_#e4e4e4] px-4 py-2 text-base active:translate-y-[2px] active:shadow-none transition-all hover:bg-gray-50"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {result === 'correct' && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
              <span className="text-green-700 font-semibold">¡Correcto! Great job!</span>
            </div>
          )}
          {result === 'incorrect' && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
              <span className="text-red-700 font-semibold">Not quite right. Try again!</span>
              <div className="text-sm text-red-600 mt-1">
                Correct answer: {exercise.spanish}
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

        {/* Screen7 Overlay */}
        {showScreen7 && (
          <Screen7 onResponse={handleScreen7Response} />
        )}
      </div>
    </div>
  );
}

export { Screen6 };