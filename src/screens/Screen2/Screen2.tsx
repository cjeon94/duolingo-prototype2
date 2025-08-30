// src/screens/Screen2.tsx
import React from "react";
import { Screen3 } from "../Screen3/Screen3";
import OneImg from "../../assets/vocab/one.png";
import TheManImg from "../../assets/vocab/the-man.png";
import TheCatImg from "../../assets/vocab/the-cat.png";
import TheBoyImg from "../../assets/vocab/the-boy.png";

type OptionKey = "one" | "man" | "cat" | "boy";

const COLORS = {
  duoGreen: "#58cc02",
  sky: "#1cb0f6",
  purple: "#ce82ff",
  grayText: "#4b4b4b",
  cardBorder: "#e6e6e6",
};

const IconOne = () => (
  <img src={OneImg} alt="one" className="w-16 h-16 object-contain" />
);

const IconMan = () => (
  <img src={TheManImg} alt="the man" className="w-16 h-16 object-contain" />
);

const IconCat = () => (
  <img src={TheCatImg} alt="the cat" className="w-16 h-16 object-contain" />
);

const IconBoy = () => (
  <img src={TheBoyImg} alt="the boy" className="w-16 h-16 object-contain" />
);

export default function Screen2(): JSX.Element {
  const [selected, setSelected] = React.useState<OptionKey | null>(null);
  const [checked, setChecked] = React.useState(false);
  const [showScreen3, setShowScreen3] = React.useState(false);

  // Auto-play audio when component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Try to play audio file first, fallback to text-to-speech
      const audio = new Audio("/uno.mp3");
      audio.play().catch(() => {
        // If audio file fails, use text-to-speech as fallback
        const utterance = new SpeechSynthesisUtterance("uno");
        utterance.lang = 'es-ES'; // Spanish pronunciation
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      });
    }, 500); // Small delay to ensure component is fully loaded

    return () => clearTimeout(timer);
  }, []);

  const correctKey: OptionKey = "one";
  const isCorrect = checked && selected === correctKey;
  const isWrong = checked && selected && selected !== correctKey;

  const options: { key: OptionKey; label: string; Icon: React.FC }[] = [
    { key: "one", label: "one", Icon: IconOne },
    { key: "man", label: "the man", Icon: IconMan },
    { key: "cat", label: "the cat", Icon: IconCat },
    { key: "boy", label: "the boy", Icon: IconBoy },
  ];

  const handleCheck = () => {
    setChecked(true);
    if (selected === correctKey) {
      // Play correct answer sound
      const correctSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Correct%20answer%20sound%20effect.mp3");
      correctSound.play().catch(() => {
        console.log("Could not play correct answer sound");
      });
      
      // Wait 1.5 seconds then transition to Screen3
      setTimeout(() => {
        setShowScreen3(true);
      }, 1500);
    } else {
      // Play incorrect answer sound
      const incorrectSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Bad%20answer.mp3");
      incorrectSound.play().catch(() => {
        console.log("Could not play incorrect answer sound");
      });
    }
  };

  if (showScreen3) {
    return <Screen3 />;
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
            <div className="w-[18%] h-full bg-[#58cc02] rounded-full"></div>
          </div>
        </div>

        {/* Level Indicator */}
        <div className="flex items-center gap-3 px-6 mb-10">
          <div className="w-8 h-8 bg-[#ce82ff] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">1</span>
          </div>
          <span className="text-[#ce82ff] font-bold text-sm tracking-wider">LEVEL 1</span>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-40">
          {/* Title */}
          <h1 className="text-3xl font-bold text-[#4b4b4b] mb-12 text-center">
            Select the correct image
          </h1>

          {/* Audio Row */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              className="w-16 h-16 rounded-xl border-0 p-0 shadow-lg bg-[#1cb0f6] flex items-center justify-center"
              onClick={() => {
                // Try to play audio file first, fallback to text-to-speech
                const audio = new Audio("/uno.mp3");
                audio.play().catch(() => {
                  // If audio file fails, use text-to-speech as fallback
                  const utterance = new SpeechSynthesisUtterance("uno");
                  utterance.lang = 'es-ES'; // Spanish pronunciation
                  utterance.rate = 0.8;
                  speechSynthesis.speak(utterance);
                });
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.07 4.93A10 10 0 0 1 19.07 19.07M15.54 8.46A5 5 0 0 1 15.54 15.54" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="underline decoration-dotted text-[#ce82ff] text-xl font-semibold">
              uno
            </span>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-6 mb-12 max-w-md mx-auto">
            {options.map(({ key, label, Icon }) => {
              const active = selected === key;
              const correct = checked && key === correctKey;
              const wrong = checked && active && key !== correctKey;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelected(key);
                    setChecked(false);
                  }}
                  className={[
                    "rounded-2xl p-4 text-left bg-white shadow-sm border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                    active ? "border-[#1cb0f6] bg-[#e6f7ff]" : "border-[#e6e6e6]",
                    correct ? "border-[#58cc02] bg-[#e6ffe6]" : "",
                    wrong ? "border-[#ff4b4b] bg-[#ffe6e6]" : "",
                  ].join(" ")}
                >
                  <div className="grid gap-2 place-items-center">
                    <Icon />
                    <div className="text-sm font-medium text-[#4b4b4b]">
                      {label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          <div className="px-6">
            {isCorrect && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl">
                <span className="text-green-700 font-semibold text-lg">¡Correcto! Great job!</span>
              </div>
            )}
            {isWrong && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl">
                <span className="text-red-700 font-semibold text-lg">Not quite right. Try again!</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="absolute left-6 right-6 bottom-[60px]">
          <button
            className="w-full h-14 rounded-2xl text-white font-bold text-lg tracking-wide disabled:opacity-60 transition-all active:translate-y-[2px]"
            disabled={!selected}
            onClick={handleCheck}
            style={{
              backgroundColor: selected ? '#58cc02' : '#86efac',
              boxShadow: selected ? '0 3px 0 #4a9e02' : '0 3px 0 #6ee7b7'
            }}
          >
            CHECK
          </button>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-[140px] h-[6px] bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { Screen2 };