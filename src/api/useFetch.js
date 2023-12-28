/*export function useFetch(word) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
      .then((response) => response.json())                                Este fue un intento de codigo pero me acorde que no estaba usando 
      .then((data) => {                                                   el Async para crearlo
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [word]); 
  return { data, loading };
}
*/
export async function useFetch(word) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
  
        try {
          const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          const data = await response.json();
          setData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [word]);
  
    return { data, loading };
  }