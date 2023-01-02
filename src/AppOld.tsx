import { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';

import './App.css';

const getRandomNumberFromApi = async (): Promise<number> => {
  const resp = await fetch(
    'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
  );
  const data = await resp.text();

  // throw new Error('Error de prueba');
  return parseInt(data);
};

function App() {
  const [number, setNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [key, forceRefetch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setIsLoading(true);
    getRandomNumberFromApi()
      .then((data) => setNumber(data))
      .catch((err) => setError(err.message));
  }, [key]);

  useEffect(() => {
    if (number !== 0) {
      setIsLoading(false);
    }
  }, [number]);

  useEffect(() => {
    if (error !== '') {
      setIsLoading(false);
    }
  }, [error]);
  return (
    <div className="App">
      {isLoading ? <h2>Cargando...</h2> : <h2>Número aleatorio: {number}</h2>}

      {!isLoading && error !== '' && <h2>Error: {error}</h2>}

      <button onClick={forceRefetch} disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Nuevo número'}
      </button>
    </div>
  );
}

export default App;
