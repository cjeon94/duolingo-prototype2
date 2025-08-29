// src/screens/Screen5.tsx
import React from "react";
import { Screen6 } from "../Screen6/Screen6";

type OptionKey = "one" | "man" | "cat" | "boy";

const COLORS = {
  duoGreen: "#58cc02",
  sky: "#1cb0f6",
  purple: "#ce82ff",
  grayText: "#4b4b4b",
  cardBorder: "#e6e6e6",
};

const IconOne = () => (
  <img src="/1.png" alt="one" className="w-16 h-16 object-contain" />
);

const IconMan = () => (
  <img src="/man.png" alt="the man" className="w-16 h-16 object-contain" />
);

const IconCat = () => (
  <img src="/cat.png" alt="the cat" className="w-16 h-16 object-contain" />
);

const IconBoy = () => (
  <img src="/the-boy.png" alt="the boy" className="w-16 h-16 object-contain" />
);

export default function Screen5(): JSX.Element {
  const [selected, setSelected] = React.useState<OptionKey | null>(null);
  const [checked, setChecked] = React.useState(false);
  const [showScreen6, setShowScreen6] = React.useState(false);

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
      
      // Wait 1.5 seconds then transition to Screen6
      setTimeout(() => {
        setShowScreen6(true);
      }, 1500);
    } else {
      // Play incorrect answer sound
      const incorrectSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Bad%20answer.mp3");
      incorrectSound.play().catch(() => {
        console.log("Could not play incorrect answer sound");
      });
    }
  };

  if (showScreen6) {
    return <Screen6 />;
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-4">
      {/* phone canvas */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* status bar */}
        <div className="absolute top-0 left-0 right-0 h-[54px]">
          <div className="absolute left-[52px] top-[17px] text-[17px] text-[#454a53]">9:41</div>
          <div className="absolute right-4 top-[17px] h-5 w-20 rounded bg-slate-200" />
        </div>

        {/* progress */}
        <div className="absolute top-[70px] left-4 right-4">
          <div className="h-2 w-full rounded-full bg-[#e5e5e5] overflow-hidden">
            <div className="h-2 w-[18%] bg-[#58cc02]" />
          </div>
        </div>

        {/* level */}
        <div className="absolute top-[110px] left-6 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[color:var(--purple,#ce82ff)] grid place-items-center text-white text-xs font-bold">
            1
          </div>
          <span className="text-[color:var(--purple,#ce82ff)] font-bold text-sm tracking-wider">
            LEVEL 1
          </span>
        </div>

        {/* prompt */}
        <div className="absolute left-6 right-6 top-[150px]">
          <h1 className="text-2xl font-bold text-[color:var(--grayText,#4b4b4b)] mb-6">
            Select the correct image
          </h1>

          {/* audio row */}
          <div className="flex items-center gap-3 mb-6">
            <button
              className="w-12 h-12 rounded-xl border-0 p-0 shadow-md bg-[#1cb0f6] flex items-center justify-center"
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.07 4.93A10 10 0 0 1 19.07 19.07M15.54 8.46A5 5 0 0 1 15.54 15.54" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="underline decoration-dotted text-[#ce82ff]">
              uno
            </span>
          </div>

          {/* options */}
          <div className="grid grid-cols-2 gap-4">
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
                    "rounded-2xl p-4 text-left bg-white shadow-sm border transition",
                    active ? "ring-2 ring-sky-400 border-sky-300" : "border-[#e6e6e6]",
                    correct ? "ring-2 ring-emerald-500" : "",
                    wrong ? "ring-2 ring-rose-500" : "",
                  ].join(" ")}
                >
                  <div className="grid gap-2 place-items-center">
                    <Icon />
                    <div
                      className={
                        key === "one" ? "text-sm font-medium text-[#1cb0f6]" : "text-sm text-slate-600"
                      }
                    >
                      {label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* feedback */}
          {isCorrect && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
              <span className="text-green-700 font-semibold">¡Correcto! Great job!</span>
            </div>
          )}
          {isWrong && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
              <span className="text-red-700 font-semibold">Not quite right. Try again!</span>
            </div>
          )}
        </div>

        {/* bottom actions */}
        <div className="absolute left-4 right-4 bottom-[48px]">
          <button
            className="w-full h-12 rounded-xl text-white font-semibold tracking-wide disabled:opacity-60 bg-[#58cc02]"
            disabled={!selected}
            onClick={handleCheck}
          >
            CHECK
          </button>
        </div>

        {/* home indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[139px] h-[5px] rounded-full bg-black/90" />
      </div>
    </div>
  );
}

export { Screen5 };