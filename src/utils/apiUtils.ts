const API = {
  getCountries: async () => {
    const res = await fetch(
      'https://countriesnow.space/api/v0.1/countries/positions'
    );
    return await res.json();
  },
};

export default API;
