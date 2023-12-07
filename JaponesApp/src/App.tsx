import { useState, useEffect } from 'react'
import './App.css'
import hanamichiImg from './assets/hanamichi.jpg'
import japonImg from './assets/japon.png'
import './App.css';
import Modal from './DefModal';

// import { useFetch } from './api/useFetch';
function App() {
  const [count, setCount] = useState(0);

  // Usar estado local para rastrear el contenido del texto
  const [text, setText] = useState('');
  const [url, setUrl] = useState('https://youtu.be/xnaYs20vr0I?si=1UzGR2OIVVRVQNQx');

  const [word, setWord] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [definition, setDefinition] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function searchWord() {
      if(word === '') return
      setIsLoading(true);
      setDefinition('')
    
      try {
        const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
        if (!response.ok) {
          const data = await response.json()

          // console.log(2, data)
          setDefinition(data.message)
          // throw new Error(`Error en la solicitud ${data.message}`);
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

// Estado para rastrear la palabra resaltada
const [highlightedWord, setHighlightedWord] = useState('');

// Función para manejar cambios en el área de texto
const handleTextChange = (event) => {
  setText(event.target.value);
};

// Función para resaltar una palabra al pasar el mouse por encima
const handleWordHighlight = (word) => {
  setHighlightedWord(word);
};

// Función para desactivar el resaltado cuando el mouse se va
const handleWordUnhighlight = () => {
  setHighlightedWord('');
};

const removePunctuation = (word) => {
  return word.replace(/[¿?¡!,\.'"]/g, '');
};

const onWordClickListener = (word) => {
  setWord(word)
  setIsModalOpen(true)
}


return (
  <>
    <div>
      <a href="https://youtu.be/dQw4w9WgXcQ?si=oWiKbvsS_-vc3-2d" target="_blank">
        <img src={japonImg} className="logo" alt="Vite logo" />
      </a>
      <a href={url} target="_blank">
        <img src={hanamichiImg} className="logo react" alt="React logo" />
      </a>
    </div>
    <div>
      <h1>Aplicación de Japonés</h1>
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
