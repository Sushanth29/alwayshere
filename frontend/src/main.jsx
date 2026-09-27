import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const nicknames = [
  'bujji', 'bujjilu', 'babyy', 'mano', 'honey', 'bangaram', 'love', 'baby girl', 'princess',
  'my favorite person', 'bangaru', 'chinni', 'pandu', 'bujjamma', 'jaan', 'sunshine', 'sweetheart',
  'cutie pie', 'my moon', 'pilla', 'naa bangaram', 'my heart',
];
let previousNickname = '';
const wishlistStorageKey = 'always-here-wishlist';

const communicationSections = [
  { icon: '💭', title: 'Tell me something', text: 'No category. No rules.', key: 'anything', tone: 'lavender' },
  { icon: '❤️', title: 'Something I should know', text: 'The things you wish I knew.', key: 'know', tone: 'rose' },
  { icon: '🥺', title: "Things I can't say out loud", text: 'Some words are easier here.', key: 'hard', tone: 'slate' },
  { icon: '🎶', title: 'A song for you', text: 'A little dedication, just because.', key: 'song', tone: 'peach' },
  { icon: '🎬', title: 'Rom-com night', text: 'Movie picks and cute chaos.', key: 'movie', tone: 'violet' },
];

const needSections = [
  { icon: '😤', title: 'Yell at me', text: 'Go ahead. Let it out.', key: 'angry', tone: 'warm' },
  { icon: '🫶', title: 'Tell me what you need', text: 'Listen, reassure, talk, space…', key: 'need', tone: 'peach' },
  { icon: '📸', title: 'Save a memory', text: 'A little piece of today.', key: 'memory', tone: 'golden' },
  { icon: '💌', title: 'Write me a letter', text: 'Take your time.', key: 'letter', tone: 'cream' },
  { icon: '🌙', title: 'Late night corner', text: 'For the thoughts that keep you awake.', key: 'night', tone: 'midnight' },
];

const movieOptions = [
  '10 Things I Hate About You',
  'The Notebook',
  'Before Sunrise',
  'Kuch Kuch Hota Hai',
  'Dilwale Dulhania Le Jayenge',
];

const needOptions = [
  { label: 'Just listen', icon: '👂', prompt: 'I need you to listen without trying to fix it yet.' },
  { label: 'Reassure me', icon: '🫶', prompt: 'I could use some reassurance that we are okay.' },
  { label: 'A little affection', icon: '🤍', prompt: 'I need a little affection and to feel close to you.' },
  { label: 'Call me', icon: '📞', prompt: 'Could you call me when you have a moment?' },
  { label: 'Spend time with me', icon: '⏳', prompt: 'I would love some focused time with you.' },
  { label: 'Help me figure it out', icon: '🧭', prompt: 'Can we think through this together?' },
  { label: 'Apologize and understand', icon: '💗', prompt: 'I need you to understand why this hurt me and hear me out.' },
  { label: 'Give me space, then check in', icon: '🌿', prompt: 'I need a little space, and a gentle check-in later would help.' },
  { label: 'Make a plan with me', icon: '🗓️', prompt: 'Can we make a plan for when we can be together next?' },
  { label: 'Something else', icon: '✍️', prompt: 'What I need most right now is...' },
];

const relationshipQuotes = [
  'Even across the miles, my heart still knows exactly where home is.',
  'Somehow, every ordinary day gets softer when it has you in it.',
  'Different cities, the same moon, one stubborn little us.',
  'Love is choosing each other again, gently, in all the small moments.',
  'Your laugh is still my favorite plot twist.',
  'Since January 29, 2020, every version of life has been better with you in it.',
  'Distance changed the map, never the meaning of us.',
  'On March 10, 2022, I said out loud what my heart had known for ages.',
];

const jokePool = [
  'Why did the romance novel break up with the dictionary? Because it felt too wordy.',
  'I told my Wi‑Fi I loved it. Now it keeps disconnecting from my feelings.',
  'My heart is like a broken calculator. It keeps trying to add us up but can’t divide the distance.',
  'I tried to be romantic. It became a dramatic text and a very suspicious smile.',
  'I love you so much I even smile at the sound of your name. It is genuinely embarrassing.',
];

const dedicationSongs = [
  { title: 'Kaise Hua', artist: 'Vishal Mishra', videoId: '5DFJO3rNRTA' },
  { title: 'Talapu Talapu', artist: 'Vivek Sagar', videoId: 'JJl6KGqa08k' },
  { title: "We Don't Talk Anymore", artist: 'Charlie Puth', videoId: '3AtDnEC4zak' },
  { title: 'Perfect', artist: 'Ed Sheeran', videoId: '2Vv-BfVoq4g' },
  { title: 'Until I Found You', artist: 'Stephen Sanchez', videoId: 'GxldQ9eX2wo' },
];

function randomNickname() {
  const availableNicknames = nicknames.filter((nickname) => nickname !== previousNickname);
  previousNickname = availableNicknames[Math.floor(Math.random() * availableNicknames.length)];
  return previousNickname;
}

function App() {
  const [page, setPage] = useState('entrance');
  const [selectedSection, setSelectedSection] = useState(null);
  const [easterEggCounter, setEasterEggCounter] = useState(0);

  if (page === 'entrance') {
    return <Entrance onEnter={() => setPage('portal')} />;
  }

  if (page === 'story') {
    return <OurStory onBack={() => setPage('portal')} />;
  }

  if (page === 'things') {
    return <OurThings onBack={() => setPage('portal')} />;
  }

  if (page === 'wishlist') {
    return <WishlistPage onBack={() => setPage('portal')} />;
  }

  if (page === 'joke') {
    return <JokePage onBack={() => setPage('portal')} />;
  }

  if (page === 'room' && selectedSection?.key === 'song') {
    return <SongDedicationPage onBack={() => setPage('portal')} />;
  }

  if (page === 'room' && selectedSection?.key === 'movie') {
    return <MoviePickerPage onBack={() => setPage('portal')} />;
  }

  if (page === 'room' && selectedSection) {
    return <MessageRoom section={selectedSection} onBack={() => setPage('portal')} />;
  }

  return (
    <Portal
      onSelectSection={(section) => {
        setSelectedSection(section);
        setPage('room');
      }}
      onNavigate={setPage}
      onEasterEgg={() => setEasterEggCounter((count) => count + 1)}
      easterEggCounter={easterEggCounter}
    />
  );
}

function Entrance({ onEnter }) {
  const [nickname] = useState(() => randomNickname());

  return (
    <main className="entrance">
      <div className="stars" aria-hidden="true">✦ · ✧ · ✦</div>
      <p className="eyebrow">psst...</p>
      <h1>
        always<span>.</span>here
      </h1>
      <p className="lead">A little place for you, {nickname}, to come whenever you want to talk to me.</p>
      <button className="primary" onClick={onEnter}>
        come in <span>→</span>
      </button>
      <p className="tiny">made with an unreasonable amount of love ♡</p>
    </main>
  );
}

function Portal({ onSelectSection, onNavigate, onEasterEgg, easterEggCounter }) {
  const [nickname, setNickname] = useState(() => randomNickname());

  return (
    <main className="portal">
      <header className="topbar">
        <div
          onClick={() => {
            if (easterEggCounter > 0) {
              setNickname(randomNickname());
              onEasterEgg();
            }
          }}
          style={{ cursor: easterEggCounter > 0 ? 'pointer' : 'default' }}
        >
          <div className="brand">
            always<span>.</span>here
          </div>
          <div className="welcome">hi, {nickname} ♡</div>
        </div>
        <button className="ghost" onClick={() => onNavigate('entrance')}>
          leave
        </button>
      </header>

      <section className="hero">
        <p className="eyebrow">your little corner</p>
        <h2>
          What would you like
          <br />
          to tell me?
        </h2>
        <p>There is no right way to use this place. Just be you, {nickname}.</p>
      </section>

      <section className="grid">
        {[...communicationSections, ...needSections].map((section) => (
          <button className={`card ${section.tone}`} key={section.key} onClick={() => onSelectSection(section)}>
            <span className="card-icon">{section.icon}</span>
            <span className="card-title">{section.title}</span>
            <span className="card-text">{section.text}</span>
            <span className="arrow">↗</span>
          </button>
        ))}
      </section>

      <div className="divider">
        <span>our little universe</span>
      </div>

      <section className="universe">
        <button className="wide-card" onClick={() => onNavigate('story')}>
          <span>📖</span>
          <div>
            <strong>Our story</strong>
            <small>Everything that brought us here.</small>
          </div>
          <b>→</b>
        </button>

        <button className="wide-card" onClick={() => onNavigate('things')}>
          <span>🧩</span>
          <div>
            <strong>Love notes</strong>
            <small>A few words for you, whenever you need them.</small>
          </div>
          <b>→</b>
        </button>

        <button className="wide-card" onClick={() => onNavigate('wishlist')}>
          <span>🎁</span>
          <div>
            <strong>Wishlist</strong>
            <small>Little things I would love to surprise you with.</small>
          </div>
          <b>→</b>
        </button>

        <button className="wide-card" onClick={() => onNavigate('joke')}>
          <span>😄</span>
          <div>
            <strong>Read a joke</strong>
            <small>A tiny chaotic little laugh for you.</small>
          </div>
          <b>→</b>
        </button>
      </section>

      <button className="birthday" onClick={() => onEasterEgg()}>
        <span>🎁</span>
        <div>
          <strong>Something for you</strong>
          <small>There's a little surprise waiting here.</small>
        </div>
        <b>→</b>
      </button>

      <footer>always here, even when I'm not ♡</footer>
    </main>
  );
}

function MessageRoom({ section, onBack }) {
  const [nickname] = useState(() => randomNickname());
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const [needStarter, setNeedStarter] = useState('');
  const messageRef = useRef(null);
  const reasons = [
    'I felt unheard',
    'I felt dismissed or misunderstood',
    'You left me waiting',
    'You forgot to reply',
    'I needed reassurance',
    'I needed affection or quality time',
    'I missed you and felt lonely',
    'I felt left out',
    'Plans changed and I felt unimportant',
    'You forgot something that mattered to me',
    'Something you said hurt my feelings',
    'I felt like I was carrying the conversation',
    'I needed support and did not know how to ask',
    'I was already having a hard day',
    'I feel overwhelmed and it is not one thing',
    'Something else, and I want to explain it properly',
  ];

  const toggleNeed = (option) => {
    const nextNeeds = selectedNeeds.some((need) => need.prompt === option.prompt)
      ? selectedNeeds.filter((need) => need.prompt !== option.prompt)
      : [...selectedNeeds, option];
    const typedText = message.startsWith(needStarter)
      ? message.slice(needStarter.length).replace(/^\n+/, '')
      : message;
    const nextStarter = nextNeeds.map((need) => need.prompt).join('\n');

    setSelectedNeeds(nextNeeds);
    setNeedStarter(nextStarter);
    setMessage(`${nextStarter}${nextStarter && typedText ? '\n\n' : ''}${typedText}`);
    messageRef.current?.focus();
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    let payloadBody = message;
    if (section.key === 'angry' && selectedReason) {
      payloadBody = `${selectedReason}\n\n${message}`;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: section.key,
          body: payloadBody,
          title: section.title,
        }),
      });

      if (response.ok) {
        setSent(true);
      } else {
        setError('Something went wrong. Try again?');
      }
    } catch (err) {
      setError("Can't reach him right now. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <main className="sent-screen">
        <div className="sent-heart">♡</div>
        <p className="eyebrow">sent, {nickname}</p>
        <h2>Your note is on its way.</h2>
        <p>
          It has left this little corner and is being delivered to him.
          <br />
          You said it. And that's enough.
        </p>
        <button className="primary" onClick={onBack}>
          back to our little place
        </button>
      </main>
    );
  }

  return (
    <main className={`room ${section.tone || ''}`}>
      <button className="back" onClick={onBack}>← back</button>
      <div className={`room-icon ${section.tone || ''}`}>{section.icon}</div>
      <p className="room-greeting">for you, {nickname}</p>
      <p className="eyebrow">{section.title}</p>
      <h2>{roomHeading(section.key)}</h2>
      <p className="room-subtitle">{roomSubtitle(section.key)}</p>

      {section.key === 'angry' && (
        <div className="reason-chips">
          {reasons.map((reason) => (
            <button
              key={reason}
              className={`reason-chip ${selectedReason === reason ? 'selected' : ''}`}
              onClick={() => setSelectedReason(reason)}
            >
              {reason}
            </button>
          ))}
        </div>
      )}

      {section.key === 'need' && (
        <div className="need-options" aria-label="Choose what you need">
          {needOptions.map((option) => {
            const selected = selectedNeeds.some((need) => need.prompt === option.prompt);
            return (
              <button
                key={option.label}
                type="button"
                className={`need-option ${selected ? 'selected' : ''}`}
                aria-pressed={selected}
                onClick={() => toggleNeed(option)}
              >
                <span>{option.icon}</span>{option.label}
              </button>
            );
          })}
        </div>
      )}

      <textarea
        ref={messageRef}
        autoFocus
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Take your time..."
        className={section.key === 'night' ? 'textarea-night' : ''}
      />

      {error && <p className="error-message">{error}</p>}

      <div className="room-actions">
        <span>{message.length > 0 ? `${message.length} characters` : 'nothing needs to be perfect'}</span>
        <button className="primary" disabled={!message.trim() || loading} onClick={sendMessage}>
          {loading ? '...' : 'send this to me ♡'}
        </button>
      </div>
    </main>
  );
}

function OurStory({ onBack }) {
  const [nickname] = useState(() => randomNickname());
  const timeline = [
    { year: 'Jan 2020', event: 'It started here', icon: '✨' },
    { year: 'Mar 2022', event: 'The official proposal', icon: '💍' },
    { year: 'Oct 2022', event: 'Long distance began', icon: '🌍' },
    { year: 'Today', event: 'Still choosing each other, every day', icon: '♡' },
  ];

  return (
    <main className="archive-page">
      <button className="back" onClick={onBack}>← back</button>

      <div className="archive-header">
        <p className="eyebrow">📖</p>
        <h2>Our Story</h2>
        <p>{nickname}, everything that brought us here.</p>
      </div>

      <div className="timeline">
        {timeline.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-dot">{item.icon}</div>
            <div className="timeline-event">{item.event}</div>
          </div>
        ))}
      </div>

      <div className="archive-footer">
        <p>The rest is unwritten. And that's beautiful.</p>
      </div>
    </main>
  );
}

function OurThings({ onBack }) {
  const [nickname] = useState(() => randomNickname());
  const [quoteIndex, setQuoteIndex] = useState(0);
  useEffect(() => {
    const slideshow = window.setInterval(() => {
      setQuoteIndex((currentIndex) => (currentIndex + 1) % relationshipQuotes.length);
    }, 6000);
    return () => window.clearInterval(slideshow);
  }, []);

  const moveQuote = (direction) => {
    setQuoteIndex((currentIndex) => (currentIndex + direction + relationshipQuotes.length) % relationshipQuotes.length);
  };

  return (
    <main className="archive-page">
      <button className="back" onClick={onBack}>← back</button>

      <div className="archive-header">
        <p className="eyebrow">♡</p>
        <h2>A few words for you</h2>
        <p>For you, {nickname}, and the love we keep choosing.</p>
      </div>

      <div className="quote-slideshow" aria-live="polite">
        <span className="quote-mark" aria-hidden="true">“</span>
        <blockquote key={quoteIndex}>{relationshipQuotes[quoteIndex]}</blockquote>
        <p>always, for {nickname} ♡</p>
        <div className="quote-controls">
          <button type="button" onClick={() => moveQuote(-1)} aria-label="Previous quote">←</button>
          <span>{quoteIndex + 1} / {relationshipQuotes.length}</span>
          <button type="button" onClick={() => moveQuote(1)} aria-label="Next quote">→</button>
        </div>
      </div>

      <div className="archive-footer">
        <p>A little reminder: you are loved, in every version of every day.</p>
      </div>
    </main>
  );
}

function WishlistPage({ onBack }) {
  const [nickname] = useState(() => randomNickname());
  const [items, setItems] = useState(() => {
    try {
      const savedItems = JSON.parse(localStorage.getItem(wishlistStorageKey) || '[]');
      return Array.isArray(savedItems) ? savedItems : [];
    } catch {
      return [];
    }
  });
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(wishlistStorageKey, JSON.stringify(items));
    } catch {
      setError('This browser could not save the wishlist.');
    }
  }, [items]);

  const addItem = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const normalizedLink = /^https?:\/\//i.test(link.trim()) ? link.trim() : `https://${link.trim()}`;
      const parsedLink = new URL(normalizedLink);
      if (!['http:', 'https:'].includes(parsedLink.protocol)) throw new Error('Invalid URL');

      const itemName = name.trim();
      const item = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, name: itemName, link: parsedLink.href };
      setItems((currentItems) => [...currentItems, item]);
      setName('');
      setLink('');
      setSaving(true);

      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: 'wishlist',
            title: 'A little wishlist note',
            body: `${itemName}\n${parsedLink.href}`,
          }),
        });
        if (!response.ok) setError('It is saved here, but the email could not be sent.');
      } catch {
        setError('It is saved here, but the email could not be sent.');
      } finally {
        setSaving(false);
      }
    } catch {
      setError('Add a valid website link, like https://example.com.');
    }
  };

  return (
    <main className="archive-page wishlist-page">
      <button className="back" onClick={onBack}>← back</button>
      <div className="archive-header">
        <p className="eyebrow">🎁</p>
        <h2>Wishlist</h2>
        <p>{nickname}, save anything you want me to find for you.</p>
      </div>

      <form className="wishlist-form" onSubmit={addItem}>
        <label htmlFor="wishlist-name">What would you like?</label>
        <input id="wishlist-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name of the item" required />
        <label htmlFor="wishlist-link">Where can I find it?</label>
        <input id="wishlist-link" value={link} onChange={(event) => setLink(event.target.value)} placeholder="Paste a product link" required />
        {error && <p className="error-message" role="alert">{error}</p>}
        <button className="primary" type="submit" disabled={saving}>{saving ? 'saving…' : 'add to wishlist'}</button>
      </form>

      <section className="wishlist-list" aria-label="Saved wishlist items">
        {items.length === 0 ? (
          <p className="wishlist-empty">Your list is waiting for its first little thing.</p>
        ) : items.map((item) => (
          <article key={item.id} className="wishlist-item">
            <div>
              <strong>{item.name}</strong>
              <a href={item.link} target="_blank" rel="noreferrer">{new URL(item.link).hostname} ↗</a>
            </div>
            <button type="button" className="wishlist-remove" aria-label={`Remove ${item.name}`} onClick={() => setItems((currentItems) => currentItems.filter((entry) => entry.id !== item.id))}>×</button>
          </article>
        ))}
      </section>
    </main>
  );
}

function JokePage({ onBack }) {
  const [nickname] = useState(() => randomNickname());
  return (
    <main className="archive-page joke-page">
      <button className="back" onClick={onBack}>← back</button>
      <div className="archive-header">
        <p className="eyebrow">😄</p>
        <h2>Read a joke</h2>
        <p>A tiny chaotic little laugh for you, {nickname}.</p>
      </div>

      <JokeCard />
    </main>
  );
}

function SongDedicationPage({ onBack }) {
  const [nickname] = useState(() => randomNickname());

  return (
    <main className="archive-page song-dedication-page">
      <button className="back" onClick={onBack}>← back</button>
      <div className="archive-header">
        <p className="eyebrow">🎶</p>
        <h2>Songs for you</h2>
        <p>Every one of these is yours, {nickname}.</p>
      </div>
      <div className="dedication-list">
        {dedicationSongs.map((song) => (
          <article className="dedication-track" key={song.videoId}>
            <div className="dedication-track-title">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
            <div className="song-player">
              <iframe
                title={`${song.title} by ${song.artist}`}
                src={`https://www.youtube.com/embed/${song.videoId}?rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </article>
        ))}
      </div>
      <p className="coming-soon-note">This is our first little collection. More songs, more movies, and new features are on their way.</p>
    </main>
  );
}

function MoviePickerPage({ onBack }) {
  const [nickname] = useState(() => randomNickname());
  const [selectedMovie, setSelectedMovie] = useState('');

  return (
    <main className="archive-page movie-picker-page">
      <button className="back" onClick={onBack}>← back</button>
      <div className="archive-header">
        <p className="eyebrow">🎬</p>
        <h2>Rom-com night</h2>
        <p>Pick the movie that feels right tonight, {nickname}.</p>
      </div>
      <div className="movie-grid">
        {movieOptions.map((movie) => (
          <button
            type="button"
            key={movie}
            className={`movie-card ${selectedMovie === movie ? 'selected' : ''}`}
            aria-pressed={selectedMovie === movie}
            onClick={() => setSelectedMovie(movie)}
          >
            <strong>{movie}</strong>
            <span>{selectedMovie === movie ? 'your pick ♡' : 'pick this one'}</span>
          </button>
        ))}
      </div>
      {selectedMovie && (
        <a
          className="streaming-link"
          href={`https://www.justwatch.com/in/search?q=${encodeURIComponent(selectedMovie)}`}
          target="_blank"
          rel="noreferrer"
        >
          Find {selectedMovie} on streaming in India ↗
        </a>
      )}
      <p className="coming-soon-note">This is our first little collection. More movies, songs, and new features are on their way.</p>
    </main>
  );
}

function JokeCard() {
  const [joke, setJoke] = useState(() => jokePool[Math.floor(Math.random() * jokePool.length)]);

  const showAnother = () => {
    const otherJokes = jokePool.filter((candidate) => candidate !== joke);
    setJoke(otherJokes[Math.floor(Math.random() * otherJokes.length)]);
  };

  return (
    <>
      <div className="joke-box">{joke}</div>
      <button className="primary" onClick={showAnother}>another one</button>
    </>
  );
}

function roomHeading(key) {
  return ({
    anything: "What's on your mind?",
    know: 'What do you wish I knew?',
    hard: 'You can say it here.',
    angry: "Okay. I'm listening.",
    need: 'What do you need from me right now?',
    memory: 'What should we remember?',
    letter: 'Dear you,',
    night: "What's keeping you awake?",
    song: 'A song I want to dedicate to you',
    movie: 'Pick the movie night mood',
    wishlist: 'A little wishlist for us',
    joke: 'A tiny little laugh for you',
  })[key];
}

function roomSubtitle(key) {
  const subtitles = {
    anything: 'No category. No rules. Just tell me.',
    know: 'Something you have been wanting me to understand.',
    hard: "You don't have to find the perfect words.",
    angry: "You don't have to make it sound nice. Let it out.",
    need: 'Listen? Reassurance? A call? Some space? Tell me.',
    memory: 'A tiny moment that deserves to stay.',
    letter: "Write whatever you want. I'll read every word.",
    night: 'The thoughts that only show up after midnight.',
    song: 'Tell me the song, the artist, and why it feels like us.',
    movie: 'Romance, chaos, and a little bit of magic.',
    wishlist: 'Some little things I would love to surprise you with.',
    joke: 'A tiny chaotic little laugh, just because.',
  };

  return subtitles[key] || '';
}

createRoot(document.getElementById('root')).render(<App />);
