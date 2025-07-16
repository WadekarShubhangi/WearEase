import { useState, useEffect } from "react";

// const useFetch = (url, initialData) => {
//   const [data, setData] = useState(initialData);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true)
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setData(data))
//       .catch((error) => setError(error.message))
//       .finally(() => setLoading(false));
//   }, [url]);

//   return { data, error, loading };
// };

// export default useFetch;

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = () => {
    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(run, [url]);
  return { data, loading, error, refetch: run };
}
