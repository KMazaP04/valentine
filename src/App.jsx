import { useState, useRef  } from "react";
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import lovesvg2 from "./assets/Love In The Air SVG Cut File.svg";
import { SvgDrawReveal } from "./SvgDrawReveal";
import BouquetSvg from "./assets/flowers-bouquet-svgrepo-com.svg?react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [sending, setSending] = useState(false);
  const yesButtonSize = noCount * 20 + 16;
  const iframeRef = useRef(null);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  const handleYesClick = async () => {
    setSending(true);
    setYesPressed(true);
    
    try {
      // Using FormSubmit.co - replace YOUR_EMAIL with Kevin's actual email
      const response = await fetch('https://formsubmit.co/ajax/kmazap040@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: "Angela/PokemonLettuce Response",
          message: `She said YES! 🎉\n\nBut she pressed NO ${noCount} times first 😅\n\nTimestamp: ${new Date().toLocaleString()}`,
          _subject: "🎉 Angela Said YES!",
          _template: "table"
        })
      });
      
      if (response.ok) {
        console.log('Notification sent successfully!');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    } finally {
      setSending(false);
    }
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Really?",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Wow you pressed no so many times!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Pero like why not?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Plsss? :( You're breaking my heart",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <>
      {/* Spotify Player - Fixed in top-right corner */}
      <div className="fixed top-4 right-4 z-10 flex flex-col items-end gap-2">
        <iframe
          ref={iframeRef}
          data-testid="embed-iframe" 
          id="background-music" 
          src="https://open.spotify.com/embed/track/5WDLRQ3VCdVrKw0njWe5E5?utm_source=generator" 
          width="300" 
          height="80" 
          frameBorder="0"
          allowFullScreen=""  
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          className="rounded-lg shadow-lg"
        />
        <div className="text-xs text-zinc-600 bg-white/80 backdrop-blur px-2 py-1 rounded">
          Please press play ▶️, I couldn't get it to play automatically 😅
        </div>
      </div>

      {/* Heart Background */}
      <div className="heart-background">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="heart-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="var(--color1)" />
              <stop offset="50%" stopColor="var(--color2)" />
              <stop offset="100%" stopColor="var(--color3)" />
            </radialGradient>
          </defs>
          <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" fill="url(#heart-gradient)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
        {yesPressed ? (
          <>
      {/* GIF Row */}
      <div className="flex flex-wrap justify-center gap-4 max-w-6xl mb-8">
        {[
          "https://media.tenor.com/47JhmZOqxm8AAAAm/dudu-bubu-dudu-kiss-bubu-crashing-to-the-walls.webp",
          "https://media.tenor.com/3Yml0nL4aBwAAAAm/cosytales-love.webp",
          "https://media.tenor.com/i9yvlqt2aYoAAAAm/peach-goma-peach-and-goma.webp",
          "https://media.tenor.com/OdmWiTKioBQAAAAm/dinosaur-french-kiss.webp",
          "https://media.tenor.com/5XOehZUJ1MAAAAAm/cute-cat-couple.webp",
          "https://media.tenor.com/3L4TBFeaPVwAAAAM/peach-goma-kissing.gif"
        ].map((src, index) => (
          <img
            key={index}
            src={src}
            className="w-36 md:w-32 lg:w-36 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            alt="cute gif"
          />
        ))}
      </div>

      {/* Text Section */}
      <div className="text-center max-w-3xl space-y-4 mb-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Ok yayyyy!!! 🥹💖
        </h1>

        <p className="text-xl md:text-2xl">
          But you pressed “No”{" "}
          <span className="text-rose-600 font-semibold">{noCount}</span>{" "}
          times…
        </p>

        <p className="text-lg md:text-xl opacity-80">
          I admire the persistence 😌
        </p>

        <div className="text-sm opacity-60 pt-2">
          Kevin has been notified of your decision 💌
        </div>
      </div>

      {/* SVG Section */}
      <div className="flex justify-center">
        <SvgDrawReveal Svg={BouquetSvg} play={yesPressed} size={300} />
      </div>
    </>
        ) : (
          <>          
            <h1 className="text-4xl md:text-6xl my-4 text-center">
              Angela/PokemonLettuce
            </h1>
            <img
              className="h-[230px] rounded-lg shadow-lg"
              src="https://media1.tenor.com/m/95YXkvYK2EoAAAAd/cute-sweet.gif"
            />
            <br></br>
            <div className="flex flex-wrap justify-center gap-2 items-center">
              <button
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4 ${sending ? 'opacity-50 cursor-wait' : ''}`}
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
                disabled={sending}
              >
                {sending ? 'Sending...' : 'Yes'}
              </button>
              <button
                onClick={handleNoClick}
                className=" bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4"
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
}

const Footer = () => {
  return (
    <div
      className="fixed bottom-2 right-2 backdrop-blur-md opacity-80 hover:opacity-95 border p-1 rounded border-rose-300"
    >
      Made with{" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>
      
    </div>
  );
};