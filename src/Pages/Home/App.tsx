import { useState, useEffect } from 'react';
import './App.css';
import hanamichiImg from '../../assets/hanamichi.jpg';
import japonImg from '../../assets/japon.png';
import Modal from '../../DefModal';
import { Navigate, useNavigate } from 'react-router-dom';
import db, { User } from '../../DataBase/usersDb';

function App() {
  const isLoggedIn = !!sessionStorage.getItem("user");
  const user = sessionStorage.getItem("user");

  if (!isLoggedIn) {
    return <Navigate to="/Login" />;
  }

  const [text, setText] = useState<string>('');
  const [wordsLearned, setWordsLearned] = useState<string[]>(() => {
    const userWords = localStorage.getItem(`learnedWords_${user}`);
    return userWords ? JSON.parse(userWords) : [];
    
      //El wordsLearnes almacena un Array de Strings. 
      //Se utiliza una función de inicialización para este estado que intenta obtener los datos desde el localStorage.
      //Si hay datos guardados previamente, los parsea*1 desde JSON; de lo contrario, se inicializa el estado como un array vacío. 
      //setWordsLearned es la función que se utilizará para actualizar este estado.

      //*1 Parsear: Procesar una cadena de texto para convertirla en un formato que la computadora pueda entender y manipular de manera estructurada

  }); 

  const [word, setWord] = useState<string>('');
  const [, setIsLoading] = useState<boolean>(false);
  const [definition, setDefinition] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    setWordsLearned(prevState => {                      //Actualiza las palabras aprendidas, aceptando el estado anteior como argumento.
      const newState = [...prevState, word];            //Crea un newState copiando al prevState y agregando la palabra aprendida.
      const updatedDb = db.map(entry => {               //Busca la entrada del usuario que esta en uso y agrega la palabra.
        if (entry.user === user) {                      //Se usa sessionStorage para almacenar los datos de la sesion en JSON y
          return { ...entry, wordsLearned: newState };  //se usa el localStorage con el newState para agregar las palabras aprendidas en JSON
        }
        return entry;
      });
      sessionStorage.setItem("usersDb", JSON.stringify(updatedDb));
      localStorage.setItem(`learnedWords_${user}`, JSON.stringify(newState));
      return newState;
    });
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate('/Login');
  };

  const removeWord = (wordToRemove: string) => {
    const updatedWords = wordsLearned.filter(word => word !== wordToRemove);
    setWordsLearned(updatedWords);
    localStorage.setItem(`learnedWords_${user}`, JSON.stringify(updatedWords));
  };

  const handleLearnedWordClick = (word: string) => {
  setWord(word);
  setIsModalOpen(true);
};

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
        setWordsLearned(userDb.wordsLearned || []);                               //Busca un usuario que coincida con los datos del LogIn.
      }                                                                           //Si encuentra a dicho usuario mostrara las palabras aprendidas del mismo.
      const userWords = localStorage.getItem(`learnedWords_${user}`);             //Las palabras aprendidas se almacenan en localStorage utilizando "learnedWords_${user}".
      if (userWords) {                                                            //Si hay palabras estas son almacenadas  en un JSON.
        setWordsLearned(JSON.parse(userWords));
      }
    }, [user]);

return (
  <>
  <h1>Welcome: {user} </h1> 
  <button onClick={handleLogout}>Volver al Login</button>
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
              <li key={index}>
                <span
                  className={highlightedWord === word ? 'highlighted' : ''}
                  onMouseEnter={() => handleWordHighlight(word)}
                  onMouseLeave={handleWordUnhighlight}
                  onClick={() => handleLearnedWordClick(word)}
                  style={{ cursor: 'pointer', color: 'green' }}
                >
                  {word}
                </span>
              </li>
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
      {wordsLearned.map((word, index) => (
    <li key={index}>
    {word} 
    <button onClick={() => removeWord(word)}>Eliminar</button>
    </li>
    ))}
  </>
  )
}

export default App;