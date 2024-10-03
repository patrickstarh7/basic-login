import React, { useState, useEffect } from "react";
import "./App.css";
import subjectImage from "./Subject.png";
import customCursor from "./hammer.jpg"; // Replace with your custom cursor image
import audioFile from "./evil-witch-laugh-140135.mp3"; // Replace with your audio file name

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [audio] = useState(new Audio(audioFile));

  // Set the custom cursor style globally when the component mounts
  useEffect(() => {
    document.body.style.cursor = `url(${customCursor}), auto`;
    return () => {
      // Reset cursor to default when the component unmounts
      document.body.style.cursor = "auto";
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && password) {
      setIsLoggedIn(true);
    }
  };

  const teleportButton = () => {
    // Get random positions for top and left
    const randomTop = Math.floor(Math.random() * (window.innerHeight - 50));
    const randomLeft = Math.floor(Math.random() * (window.innerWidth - 50));

    // Update the position state
    setPosition({ top: randomTop, left: randomLeft });
  };

  const handlePlayAudio = () => {
    audio.play();
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <h1>Welcome, {name}! You have successfully logged in.</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <img
            src={customCursor}
            style={{ width: "30%", height: "auto" }}
          ></img>
          <h1>
            Whack-a-mole Login <br /> Turn up your volume!!!
          </h1>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              teleportButton();
              handlePlayAudio();
            }}
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
              padding: 0,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "3rem",
            }}
          >
            submit
            <img
              src={subjectImage}
              alt="Enter"
              style={{ width: "100px", height: "100px" }}
            />
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
