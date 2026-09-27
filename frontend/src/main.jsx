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
  { icon: '🥺', title: "Things you can't say out loud", text: 'Some words are easier here.', key: 'hard', tone: 'slate' },
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
  'Love Hypothesis (2026)',
  'Notting Hill',
  'Pride and Prejudice',
  'Sleepless in Seattle',
  'Before Sunrise',
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
  'Even across the miles, my heart still knows exactly where home is: with you.',
  'Somehow, every ordinary day gets softer when it has you in it.',
  'Different cities, the same moon, and my favorite person still you.',
  'I keep choosing you in all the small moments, and I will keep choosing you.',
  'Your laugh is still my favorite plot twist.',
  'Since January 29, 2020, every version of my life has been better with you in it.',
  'Distance changed the map, never what you mean to me.',
  'The best part of every trip was knowing I was going to see you.',
  'I have crossed cities to reach you, and I would take every journey again.',
  'Bangalore, Hyderabad, Bhubaneswar, Indore: my favorite place in every city is beside you.',
  'A long bus ride or a flight across the map: every mile was worth your smile.',
  'You make every goodbye temporary and every reunion feel like a beginning.',
  'When I picture the future, I do not picture a city first. I picture you.',
  'You are the person I want to tell everything to, especially the little things.',
  'I hope you feel how loved you are, even on the days I cannot hold you close.',
  'My favorite thing about us is that after all this time, you still feel like my person.',
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
  { title: 'Ninnu Chuse Anandamlo', artist: 'Anirudh Ravichander & Sid Sriram', videoId: 'J7NIYS6A3Pc' },
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

  if (page === 'birthday') {
    return <BirthdayPage onBack={() => setPage('portal')} />;
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

function Portal({ onSelectSection, onNavigate }) {
  const [nickname] = useState(() => randomNickname());

  return (
    <main className="portal">
      <header className="topbar">
        <div>
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

      <button className="birthday" onClick={() => onNavigate('birthday')}>
        <span>🎁</span>
          <div>
            <strong>A birthday surprise for you</strong>
            <small>Open the little celebration I made for your day.</small>
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
      setError("I can't be reached right now. Please try again in a moment.");
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
          It has left this little corner and is on its way to me.
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
    { year: '29 Jan 2020', event: 'The beginning of us, and my favorite yes to life.', icon: '✨' },
    { year: '2022–2023 · Bangalore', event: 'Bangalore meant long bus rides for me. I would get on that bus knowing that, at the other end of the journey, I would get to see you. Somehow that made every hour feel worth it.', icon: '🚌' },
    { year: '2023–2024 · Hyderabad', event: 'Your home and my home both became part of our Hyderabad chapter. Every visit felt like finding my way back to you.', icon: '🏠' },
    { year: '2024–2026 · Bhubaneswar', event: 'Then came Bhubaneswar, and this time there were flights between us. Different city, longer distance, same excitement every single time I knew I was going to see you.', icon: '✈️' },
    { year: 'Apr–May 2025 · Pune', event: 'And somewhere in the middle of everything, there was Pune too — another little chapter on our map, another city that became part of our story.', icon: '🌸' },
    { year: '2026–now · Indore', event: 'A new chapter, a new city, and still the same person I want beside me: you.', icon: '🌅' },
  ];

  return (
    <main className="archive-page">
      <button className="back" onClick={onBack}>← back</button>

      <div className="archive-header">
        <p className="eyebrow">📖</p>
        <h2>Our story, city by city</h2>
        <p>{nickname}, the cities changed. My destination stayed you.</p>
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
        <p>I have loved every journey, every reunion, and every year of finding my way back to you.</p>
      </div>
    </main>
  );
}

function BirthdayPage({ onBack }) {
  const [nickname] = useState(() => randomNickname());
  const [wishMade, setWishMade] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <main className={`birthday-page ${wishMade ? 'wish-made' : ''}`}>
      <button className="birthday-back" onClick={onBack}>← back to our little place</button>

      <header className="birthday-hero">
        <p className="birthday-eyebrow">SEPTEMBER 28 · YOUR DAY</p>
        <h1>Happy birthday,<br /><span>{nickname}!</span></h1>
        <p>Today I get to celebrate you: my favorite person, my safest place, and the smile I carry with me everywhere.</p>
      </header>

      <section className="birthday-wish" aria-labelledby="birthday-wish-title">
        <h2 id="birthday-wish-title">Make a wish, my love</h2>
        <button
          type="button"
          className="birthday-cake"
          onClick={() => setWishMade(true)}
          aria-label={wishMade ? 'Birthday candles blown out' : 'Blow out your birthday candles'}
          aria-pressed={wishMade}
        >
          <span className="birthday-candles" aria-hidden="true">
            {[0, 1, 2].map((candle) => (
              <span className={`birthday-candle candle-${candle}`} key={candle}><i /></span>
            ))}
          </span>
          <span className="cake-top" />
          <span className="cake-middle" />
          <span className="cake-bottom" />
          <span className="cake-plate" />
        </button>
        <p className="birthday-prompt">
          {wishMade ? 'I hope every wish you made finds its way to you. ♡' : 'Close your eyes, make a wish, and tap the candles.'}
        </p>
        <button className="birthday-wish-button" type="button" onClick={() => setWishMade(true)}>
          {wishMade ? 'your wish is in the universe ♡' : 'I’m right here while you wish'}
        </button>
        {wishMade && (
          <div className="birthday-confetti" aria-hidden="true">
            {Array.from({ length: 28 }, (_, index) => <i key={index} className={`confetti-piece piece-${index % 7}`} style={{ '--piece': index }} />)}
          </div>
        )}
      </section>

      <section className="birthday-letter-section">
        <p className="birthday-eyebrow">A LITTLE NOTE FROM ME</p>
        <button className="birthday-letter-toggle" type="button" onClick={() => setLetterOpen((open) => !open)}>
          {letterOpen ? 'Fold my letter back up' : 'Open your birthday letter'} <span aria-hidden="true">{letterOpen ? '↑' : '↓'}</span>
        </button>
        {letterOpen && (
          <article className="birthday-letter">
            <p>My dearest {nickname},</p>
            <p>Sometimes I genuinely wonder how I got this lucky. Out of all the people in this ridiculously huge world, somehow I got you. Someone so kind, so caring, and so full of warmth that you probably do not even realise how much of it you leave with the people around you. Especially me.</p>
            <p>I love your smile. I love your laugh. I love the stupid little moments that become ten times better just because you are there. You have brought a kind of joy into my life that I did not know how to ask for. You made me see the world in colours I did not even know existed.</p>
            <p>And yes, there is one thing about you that I hate. I hate how much you hide sometimes. How you hesitate to tell me what is going on inside that head of yours. How you keep things to yourself because maybe you think it is easier, or because you do not want to bother me. I wish you would not. I want the messy thoughts too. The anger. The fear. The overthinking. The things that are difficult to say out loud. That is why this little place exists. I hope <strong>always.here</strong> makes it even a tiny bit easier for you to tell me those things whenever words feel hard.</p>
            <p>I know I have my pride. I know I have an ego. But with you, I have learnt that some things are simply not worth winning. If losing an argument means understanding you better, I will lose it. If putting my pride aside means seeing you smile again, I will. You matter to me more than being right ever will.</p>
            <p>There are days when I look at you and feel like poetry fails at its only job, because it still cannot put your beauty into words. Music fails too, because no melody could ever quite contain your smile. Maybe some things are just meant to be felt instead of explained. And that is what you are to me.</p>
            <p>Thank you for the laughter, the joy, the softness, the chaos, and every little bit of you that has become such a huge part of me. I do not know what every year ahead of us will look like. I only know one thing for certain: until time runs out, I will be there for you. Always.</p>
            <p>Happy birthday, my love. I am so, so lucky to have you.</p>
            <p className="birthday-letter-signoff">Always yours,<br />me ♡</p>
          </article>
        )}
      </section>

      <footer className="birthday-footer">Wherever you are today, a piece of my heart is celebrating beside you.</footer>
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
