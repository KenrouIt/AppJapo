import { useState, useEffect } from 'react';
import './App.css';
import hanamichiImg from '../../assets/hanamichi.jpg';
import japonImg from '../../assets/japon.png';
import Modal from '../../DefModal';
import { Navigate } from 'react-router-dom';
import db, { User } from '../../DataBase/usersDb';

function App() {
  const isLoggedIn = !!sessionStorage.getItem("user");
  const user = sessionStorage.getItem("user");

  if (!isLoggedIn) {
    return <Navigate to="/Login" />;
  }

  const [text, setText] = useState<string>('');
  const [wordsLearned, setWordsLearned] = useState<string[]>([]);

  const [word, setWord] = useState<string>('');
  const [, setIsLoading] = useState<boolean>(false);
  const [definition, setDefinition] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function searchWord() {
      if(word === '') return
      setIsLoading(true);
      setDefinition('')
    
      try {
        const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
        if (!response.ok) {
          const data = await response.json()
          setDefinition(data.message)
          return
        }
        const data = await response.json();
        console.log(1, data)
        const def = data[0].meanings[0].definitions[0].definition
        setDefinition(def);
      } catch (error) {
        console.error('Error:', error);
        setDefinition("Unexpected error")
      } finally {
        setIsLoading(false);
      }
    }

    searchWord()
  }, [word]);

  useEffect(() => {
    const userDb: User | undefined = db.find(entry => entry.user === user);
    if (userDb) {
      setWordsLearned(userDb.wordsLearned || []);
    }
  }, [user]);

// Estado para rastrear la palabra resaltada
const [highlightedWord, setHighlightedWord] = useState('');

// Función para manejar cambios en el área de texto
const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  setText(event.target.value);
};

// Función para resaltar una palabra al pasar el mouse por encima
const handleWordHighlight = (word: string) => {
  setHighlightedWord(word);
};

// Función para desactivar el resaltado cuando el mouse se va
const handleWordUnhighlight = () => {
  setHighlightedWord('');
};

const removePunctuation = (word: string) => {
  return word.replace(/[¿?¡!,\.'"]/g, '');
};

const onWordClickListener = (word: string) => {
  setWord(word);
  setIsModalOpen(true);
  setWordsLearned(prevState => {
    const newState = [...prevState, word];
    const updatedDb = db.map(entry => {
      if (entry.user === user) {
        return { ...entry, wordsLearned: newState };
      }
      return entry;
    });
    sessionStorage.setItem("usersDb", JSON.stringify(updatedDb));
    return newState;
  });
};


return (
  <>
  <h1>Welcome: {user} </h1> 
    <div>
      <a href="https://youtu.be/dQw4w9WgXcQ?si=oWiKbvsS_-vc3-2d" target="_blank">
        <img src={japonImg} className="logo" alt="Vite logo" />
      </a>
      <a target="_blank">
        <img src={hanamichiImg} className="logo react" alt="React logo" />
      </a>
    </div>
    <div>
      <h1>Aplicación de Japonés</h1>

      <div className="words-learned-container">
          <p>Palabras Aprendidas por el Usuario:</p>
          <ul>
            {wordsLearned.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>

      <label htmlFor="textArea">Ingresa el texto que desees:</label><br></br>
      <textarea
        id="textArea"
        value={text}
        onChange={handleTextChange}
        rows={5}
        cols={40}
      />

      {/* TEXTO PARA INGRESAR LAS PALABRAS */}
      <p>Texto ingresado:</p>
      <div>
        {/* Divide el texto en palabras usando un espacio como delimitador y crea un nuevo array de palabras. */}
        {text.split(' ').map((word, index) => {
          const wordWithoutPunctuation = removePunctuation(word);
          return (
          <span
            key={index} // Clave única para cada elemento en el mapeo, en este caso, el índice de la palabra.
          >
            <span
              className={wordWithoutPunctuation === highlightedWord ? 'highlighted' : ''}
              // Asigna la clase 'highlighted' si la palabra actual es igual a la palabra destacada.
              onMouseEnter={() => handleWordHighlight(wordWithoutPunctuation)}
              // Cuando el mouse entra en la palabra, llama a la función handleWordHighlight con la palabra actual como argumento.
              onMouseLeave={handleWordUnhighlight}
              // Cuando el mouse sale de la palabra, llama a la función handleWordUnhighlight.
              onClick={() => onWordClickListener(wordWithoutPunctuation)}
            >
              {word}
            </span> {/* Muestra la palabra seguida de un espacio en blanco para separar las palabras visualmente.*/}
            <span> </span>
          </span>
        )}
        )}
      </div>
      {/*CONECTAR Y USAR LA API*/}
    </div>
    <Modal
        className="modal-content"
        word={word}
        definition={definition}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
  </>
)
}

export default App;