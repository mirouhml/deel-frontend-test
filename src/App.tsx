import { useState, useEffect } from 'react';
import AutoComplete from './components/auto-complete/AutoComplete';
import API from './utils/apiUtils';
import './App.css';

const App = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    API.getCountries().then((countriesJSON) => {
      let countriesNames: string[] = [];
      countriesJSON.data.forEach((country: { name: string }) => {
        countriesNames.push(country.name);
      });
      setData(countriesNames);
    });
  }, []);
  return (
    <div className='App'>
      <h1>Country Catalog</h1>
      <h3>Start typing to search for a country:</h3>
      <AutoComplete data={data} />
    </div>
  );
};

export default App;
