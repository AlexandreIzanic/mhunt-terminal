import { useState } from "react";
import "./App.css";
function App() {
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [showEmailInput, setShowEmailInput] = useState(false); // Nouvelle variable d'état

  const [showPasswordInput, setShowPasswordInput] = useState(false); // Nouvelle variable d'état

  const [isLogin, setIsLogin] = useState(false); // Nouvelle variable d'état

  const loginCredentials = {
    email: "user",
    password: "123",
  };

  const handleInputChange = (event) => {
    setCommand(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      setCommandHistory((prevHistory) => [...prevHistory, command]);
      setCommand("");
    }

    if (event.target.value === "clear") {
      setCommandHistory([]);
    }

    if (event.target.value === "disconnect") {
      setIsLogin(false);
      setCommandHistory([
        ...commandHistory,
        <span key={command} className="text-red-500">
          Disconnected
        </span>,
      ]);
    }

    if (event.target.value === "help") {
      setCommandHistory([
        ...commandHistory,
        "",
        "help",
        <span key={command} className="pl-6 text-amber-600">
          clear - clear the terminal
        </span>,
        <span key={command} className="pl-6 text-amber-600">
          signup - sign up
        </span>,
        <span key={command} className="pl-6 text-amber-600">
          disconnect - disconnect from the terminal
        </span>,
      ]);
    }

    if (event.target.value === "signup") {
      setCommandHistory([
        ...commandHistory,
        "signup",
        "Please enter your email and password",
      ]);
      setShowEmailInput(true); // Afficher l'input spécial
    }
  };

  const handleEmailKey = (event) => {
    if (event.key === "Enter") {
      if (command === loginCredentials.email) {
        setCommandHistory([...commandHistory, "Please enter your password"]);
        setShowEmailInput(false);
        setShowPasswordInput(true);
        setCommand("");
      } else {
        setCommandHistory([
          ...commandHistory,
          "email",
          <span key={command} className="text-red-500">
            Invalid email. Please try again
          </span>,
        ]);
        setShowEmailInput(false);
        setCommand("");
      }
    }
  };

  const handlePasswordKey = (event) => {
    if (event.key === "Enter") {
      if (command === loginCredentials.password) {
        setCommandHistory([
          ...commandHistory,
          <span key={command} className="text-green-500">
            Login successful
          </span>,
        ]);
        setShowPasswordInput(false);
        setIsLogin(true);
        setCommand("");
        setCommandHistory([
          <span key={command} className="text-green-500">
            Login successful
          </span>,
        ]);
      } else {
        setCommandHistory([
          ...commandHistory,
          "password",
          <span key={command} className="text-red-500">
            Invalid password. Please try again
          </span>,
        ]);
        setShowPasswordInput(false);
        setCommand("");
      }
    }
  };

  return (
    <div className=" h-screen p-6 w-screen items-center bg-[#211D1B]">
      <div className=" ">
        <div>Connexion : {isLogin ? "Connecté" : "Déconnecté"}</div>
        <div>
          <span>root@SAM</span>
        </div>
        <div className="italic">@mystery-hunt</div>
        <div>
          <br />
          help to show all commands
        </div>
        <div>
          <div>
            <ul>
              <br />
              {commandHistory.map((cmd, index) => (
                <li key={index}>$ {cmd}</li>
              ))}
            </ul>
          </div>
          {showEmailInput ? ( // Afficher l'input spécial si showSpecialInput est vrai
            <>
              <span className="text-green-200">email</span>&nbsp;
              <input
                className="command"
                value={command}
                onChange={handleInputChange}
                onKeyDown={handleEmailKey}
              />
            </>
          ) : showPasswordInput ? (
            <>
              <span className="text-green-200">password</span>&nbsp;
              <input
                className="command"
                value={command}
                onChange={handleInputChange}
                onKeyDown={handlePasswordKey}
              />
            </>
          ) : (
            <>
              <span>$</span>&nbsp;
              <input
                className="command"
                value={command}
                onChange={handleInputChange}
                onKeyDown={handleEnterKey}
              />
            </>
          )}
        </div>

        {isLogin && (
          <div>
            <img
              src="https://assets-global.website-files.com/606b36731e205c33ceac9c1d/606b38cd09bea409ff1902fc_Zompa-design-braquage-santa-claus2020-min.jpg"
              className="h-32  w-auto rounded-lg"
              alt="profile"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
