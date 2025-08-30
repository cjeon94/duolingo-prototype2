import React from "react";
import { Screen4 } from "../Screen4/Screen4";

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

export default function Screen3(): JSX.Element {
  const duoCharacters = [
    "/duo-character-1.svg",
    "/duo-character-2.svg", 
    "/duo-character-3.svg",
    "/duo-character-4.svg",
    "/duo-character-5.svg"
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
  const [showScreen4, setShowScreen4] = React.useState(false);

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
      
      // Show Screen4 after 1.5 seconds
      setTimeout(() => {
        setShowScreen4(true);
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

  const handleScreen4Response = (skipToAdvanced: boolean) => {
    setShowScreen4(false);
    // Here you could handle the skip to advanced logic or continue with more exercises
    console.log("Skip to advanced:", skipToAdvanced);
  };

  const englishTokens = exercise.english.split(' ');

  if (showScreen4) {
    return <Screen4 onResponse={handleScreen4Response} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Canvas */}
      <div className="relative w-full h-screen bg-white overflow-hidden">
        
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 py-4 h-[60px]">
          <div className="text-[17px] font-semibold text-[#454a53]">9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-[#454a53] rounded-sm"></div>
            <div className="w-6 h-3 border border-[#454a53] rounded-sm"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 px-6 mb-8">
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
        <div className="flex items-center gap-3 px-6 mb-10">
          <div className="w-8 h-8 bg-[#ce82ff] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">2</span>
          </div>
          <span className="text-[#ce82ff] font-bold text-sm tracking-wider">LEVEL 2</span>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-40">
          {/* Title */}
          <h1 className="text-3xl font-bold text-[#4b4b4b] mb-12 text-center">
            Write this in Spanish
          </h1>

          {/* Top Row - Duo and English Sentence */}
          <div className="flex flex-col items-center gap-6 mb-12">
            {/* Duo Character */}
            <div className="w-32 h-32 flex items-center justify-center flex-shrink-0">
              <img 
                src={randomDuoCharacter} 
                alt="Duo character" 
                className="w-32 h-32 object-contain"
              />
            </div>
            
            {/* Audio Button and English Sentence */}
            <div className="flex flex-col items-center gap-4 w-full">
              <button
                className="w-16 h-16 rounded-xl border-0 p-0 shadow-lg bg-[#1cb0f6] flex items-center justify-center"
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(exercise.english);
                  utterance.lang = 'en-US';
                  utterance.rate = 0.8;
                  speechSynthesis.speak(utterance);
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.07 4.93A10 10 0 0 1 19.07 19.07M15.54 8.46A5 5 0 0 1 15.54 15.54" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* English Sentence as Tokens */}
              <div className="flex flex-wrap justify-center gap-2">
                {englishTokens.map((token, index) => (
                  <span
                    key={index}
                    className="inline-block border-b-2 border-dashed border-[#bdbdbd] text-lg text-[#4b4b4b]"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Destination Row */}
          <div className="mb-10">
            <div className="min-h-[80px] border-2 border-dashed border-[#e4e4e4] rounded-2xl p-6 bg-gray-50">
              <div className="flex flex-wrap justify-center gap-3">
                {selectedWords.map((word, index) => (
                  <button
                    key={`selected-${word}-${index}`}
                    onClick={() => handleWordClick(word, true)}
                    className="rounded-2xl border border-[#e4e4e4] bg-white shadow-[0_4px_0_#e4e4e4] px-5 py-3 text-lg active:translate-y-[2px] active:shadow-none transition-all"
                  >
                    {word}
                  </button>
                ))}
                {selectedWords.length === 0 && (
                  <span className="text-gray-400 text-lg">Tap the Spanish words...</span>
                )}
              </div>
            </div>
          </div>

          {/* Origin Row - Spanish Words */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {availableWords.map((word, index) => (
                <button
                  key={`available-${word}-${index}`}
                  onClick={() => handleWordClick(word, false)}
                  className="rounded-2xl border border-[#e4e4e4] bg-white shadow-[0_4px_0_#e4e4e4] px-5 py-3 text-lg active:translate-y-[2px] active:shadow-none transition-all hover:bg-gray-50"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {result === 'correct' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-center">
              <span className="text-green-700 font-semibold text-lg">¡Correcto! Great job!</span>
            </div>
          )}
          {result === 'incorrect' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-center">
              <span className="text-red-700 font-semibold text-lg">Not quite right. Try again!</span>
              <div className="text-base text-red-600 mt-2">
                Correct answer: {exercise.spanish}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="absolute left-6 right-6 bottom-[60px]">
          <div className="flex gap-4">
            {/* Skip Button */}
            <button
              onClick={handleSkip}
              className="flex-1 h-14 rounded-2xl border-2 border-gray-300 bg-white shadow-[0_4px_0_#d1d5db] text-gray-600 font-bold text-lg active:translate-y-[2px] active:shadow-none transition-all hover:bg-gray-50"
            >
              SKIP
            </button>
            
            {/* Check Button */}
            <button
              onClick={handleCheck}
              disabled={selectedWords.length === 0}
              className="flex-1 h-14 rounded-2xl text-white font-bold text-lg active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: selectedWords.length > 0 ? '#2ec748' : '#86efac',
                boxShadow: selectedWords.length > 0 ? '0 4px 0 #27aa3d' : '0 4px 0 #6ee7b7'
              }}
            >
              CHECK
            </button>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-[140px] h-[6px] bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { Screen3 };