'use client'

import React from "react";
import Image from "next/image";
import { Screen2 } from "./Screen2";

const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 3,
    color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
    size: Math.random() * 8 + 4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.animationDelay}s`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
          }}
        />
      ))}
    </div>
  );
};

const statsData = [
  {
    icon: "/images/auto-layout-horizontal-2.svg",
    value: "1",
    color: "text-[#ff9600]",
  },
  {
    icon: "/images/auto-layout-horizontal.svg",
    value: "505",
    color: "text-[#5acd05]",
  },
  {
    icon: "/images/auto-layout-horizontal-3.svg",
    value: "5",
    color: "text-[#ff4b4b]",
  },
];

const languageOptions = [
  {
    name: "Spanish",
    flag: "/images/spanish-flag.png",
    bgColor: "bg-[#d2effd]",
    borderColor: "border-[#77d0fa]",
    shadowColor: "shadow-[0px_2px_0px_#77d0fa]",
    textColor: "text-[#1cb0f6]",
    isSelected: true,
  },
  {
    name: "French",
    flag: "/images/french-flag.png",
    bgColor: "bg-white",
    borderColor: "border-[#ebebeb]",
    shadowColor: "shadow-[0px_2px_0px_#ebebeb]",
    textColor: "text-[#4b4b4b]",
    isSelected: false,
  },
  {
    name: "German",
    flag: "/images/german-flag.png",
    bgColor: "bg-white",
    borderColor: "border-[#ebebeb]",
    shadowColor: "shadow-[0px_2px_0px_#ebebeb]",
    textColor: "text-[#4b4b4b]",
    isSelected: false,
  },
];

export const Element = (): JSX.Element => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("Spanish");
  const [isExiting, setIsExiting] = React.useState(false);
  const [showLanguageButtons, setShowLanguageButtons] = React.useState(true);
  const [showExcitedMessage, setShowExcitedMessage] = React.useState(false);
  const [isScreen4, setIsScreen4] = React.useState(false);
  const [isScreen2, setIsScreen2] = React.useState(false);

  const handleLanguageSelect = (languageName: string) => {
    setSelectedLanguage(languageName);
    if (languageName === "Spanish") {
      setIsExiting(true);
      setShowExcitedMessage(true);
    }
  };

  const handleScreen3Click = () => {
    if (showExcitedMessage && !isScreen4) {
      setIsScreen4(true);
    }
  };

  const handleStartClick = () => {
    setIsScreen2(true);
  };

  if (isScreen2) {
    return <Screen2 />;
  }

  return (
    <div className="bg-white w-full h-full" onClick={handleScreen3Click}>
      <div className="bg-white overflow-hidden w-full min-h-[844px] relative">
        {/* Status Bar */}
        <header className="flex justify-between items-center px-4 py-3 h-[54px]">
          <div className="text-[17px] font-semibold text-[#454a53]">9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-[#454a53] rounded-sm"></div>
            <div className="w-6 h-3 border border-[#454a53] rounded-sm"></div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex items-center justify-between px-4 py-0 mb-4">
          <div className="w-[35.57px] h-[25.14px] rounded-lg -rotate-1 bg-gray-200" />

          <div className="flex items-center gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="flex items-center gap-1">
                <img
                  className="w-5 h-5"
                  alt="Stat icon"
                  src={stat.icon}
                />
                <div className={`${stat.color} font-bold text-sm`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Progress Card */}
        <div className="mx-4 mb-6 rounded-[14px] overflow-hidden shadow-[0px_4px_0px_#48a502] border-0 flex">
          <div className="flex flex-col flex-1 items-start gap-2.5 px-4 py-[15px] bg-[#5acd05] border-r-2 border-[#43a601]">
            <div className="text-[#cef2ad] text-sm font-bold">
              SECTION ?, UNIT ?
            </div>
            <div className="text-white text-lg font-bold">
              Find your level
            </div>
          </div>
          <img
            className="w-16 h-16"
            alt="Progress icon"
            src="/images/frame-1000005935.svg"
          />
        </div>

        {/* Main Content */}
        <main className="px-4 relative">
          {/* Duo Character and Speech Bubble */}
          <div className="flex justify-center mb-8 relative">
            <div className="relative w-[271px] h-[261px]">
              <div className="absolute w-[205px] h-[205px] top-7 left-[66px]">
                <Image
                  width={205}
                  height={205}
                  className="w-full h-full object-contain"
                  alt="Duo the owl - excited to welcome you!"
                  src={isExiting ? "/images/excited-owl.gif" : "/images/duolingo-hello.gif"}
                />
              </div>

              <div className="absolute w-[70px] h-[65px] top-0 left-0">
                <img
                  className="w-full h-full"
                  alt="Duo's hand waving"
                  src="/images/frame-4.svg"
                />
              </div>

              <div className="absolute w-[70px] h-[65px] top-[196px] left-0">
                <img
                  className="w-full h-full"
                  alt="Duo's other hand"
                  src="/images/frame.svg"
                />
              </div>
            </div>

            <div className="absolute w-20 h-[95px] top-[85px] left-[-30px]">
              <img
                className="w-full h-full"
                alt="Duo's wing"
                src="/images/frame-1.svg"
              />
            </div>
          </div>

          {/* START Button */}
          <div className={`flex justify-center mb-8 ${isScreen4 ? 'z-50 relative' : ''}`}>
            <div className="relative">
              <img
                className="w-[98px] h-[93px]"
                alt="Button background"
                src="/images/auto-layout-horizontal-1.svg"
              />
              <button 
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[81px] h-[42px] bg-white rounded-[10px] border-2 border-gray-300 text-[#58cc02] font-black text-[15px] hover:bg-white transition-all ${isScreen4 ? 'animate-pulse-glow hover:scale-110' : ''}`}
                onClick={handleStartClick}
              >
                START
              </button>
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="flex justify-center mb-8">
            <div className="relative w-[246px] h-[111px]">
              <img
                className="w-full h-full"
                alt="Speech bubble"
                src="/images/union.svg"
              />
              <div className="absolute top-[16px] left-[19px] w-[219px] h-[78px] text-[#4b4b4b] text-lg font-semibold">
                {!showExcitedMessage ? (
                  <div>
                    <div className="typewriter-line1">What would you like</div>
                    <div className="typewriter-line2">to learn?</div>
                  </div>
                ) : isScreen4 ? (
                  <div>
                    <div className="typewriter-screen4-line1">OK, now...</div>
                    <div className="typewriter-screen4-line2">Let's start and find your</div>
                    <div className="typewriter-screen4-line3">level!</div>
                  </div>
                ) : (
                  <div>
                    <div className="typewriter-excited-line1">Yay! Get ready to join 10</div>
                    <div className="typewriter-excited-line2">million people learning</div>
                    <div className="typewriter-excited-line3">Spanish with Duolingo.</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Language Options */}
          {showLanguageButtons && (
            <div className="space-y-2 mb-8">
              {languageOptions.map((language, index) => (
                <div
                  key={language.name}
                  className={`w-full ${index === 2 ? "opacity-80" : ""} ${
                    isExiting ? "animate-fade-out" : "animate-fade-in"
                  }`}
                  style={{ 
                    animationDelay: !isExiting ? `${index * 150}ms` : `${index * 100}ms`
                  }}
                >
                  <button
                    className="w-full transition-all duration-200"
                    onClick={() => handleLanguageSelect(language.name)}
                  >
                    <div
                      className={`flex items-center gap-3.5 px-3.5 py-2 w-full rounded-xl border-2 border-solid transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                        selectedLanguage === language.name 
                          ? 'bg-[#d2effd] border-[#77d0fa] shadow-[0px_2px_0px_#77d0fa]' 
                          : 'bg-white border-[#ebebeb] shadow-[0px_2px_0px_#ebebeb] hover:bg-[#f8f9fa] hover:border-[#d0d7de]'
                      }`}
                    >
                      <div className="w-[46px] h-[38px] rounded-lg overflow-hidden flex-shrink-0">
                        {language.name === "Spanish" && (
                          <div className="w-full h-full">
                            <div className="w-full h-1/3 bg-red-600"></div>
                            <div className="w-full h-1/3 bg-yellow-400"></div>
                            <div className="w-full h-1/3 bg-red-600"></div>
                          </div>
                        )}
                        {language.name === "French" && (
                          <div className="w-full h-full flex">
                            <div className="w-1/3 h-full bg-blue-600"></div>
                            <div className="w-1/3 h-full bg-white"></div>
                            <div className="w-1/3 h-full bg-red-600"></div>
                          </div>
                        )}
                        {language.name === "German" && (
                          <div className="w-full h-full">
                            <div className="w-full h-1/3 bg-black"></div>
                            <div className="w-full h-1/3 bg-red-600"></div>
                            <div className="w-full h-1/3 bg-yellow-400"></div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-start justify-center gap-0.5 flex-1">
                        <div
                          className={`font-bold text-lg transition-colors duration-200 ${
                            selectedLanguage === language.name 
                              ? 'text-[#1cb0f6]' 
                              : 'text-[#4b4b4b]'
                          }`}
                        >
                          {language.name}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Button */}
          <div className="flex justify-center">
            <img
              className={`w-full max-w-[370px] h-[30px] object-contain ${
                !isExiting ? 'animate-fade-in' : 'animate-fade-out'
              }`}
              style={{
                animationDelay: !isExiting ? '450ms' : '300ms'
              }}
              alt="Bottom button"
              src="/images/bottom-button.svg"
            />
          </div>
        </main>

        {/* Overlay Effects */}
        {(isExiting || isScreen4) && (
          <div className="absolute inset-0 bg-[#000000b2]">
            {isExiting && !isScreen4 && <Confetti />}
          </div>
        )}

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-[134px] h-[5px] bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};