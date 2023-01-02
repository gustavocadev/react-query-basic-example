import './App.css';
import { useRandom } from './hooks/useRandom';

function App() {
  const query = useRandom();

  return (
    <div className="App">
      {query.isFetching ? (
        <h2>Cargando...</h2>
      ) : (
        <h2>Número aleatorio: {query.data}</h2>
      )}

      {!query.isLoading && query.isError && (
        <h2>Error: {JSON.stringify(query.error)}</h2>
      )}

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? 'Cargando...' : 'Nuevo número'}
      </button>
    </div>
  );
}

export default App;
