import { useEffect, useState } from "react";

function App() {

    const [concerts, setConcerts] = useState([]);
    const apiUrl = import.meta.env.VITE_CONCERTHUB_API_URL;

    useEffect(() => {
        const getConcerts = async () => {
            const response = await fetch(apiUrl);
            const result = await response.json();
            setConcerts(result);

            if (response.ok) {
                setConcerts(result);
            }
        }

        getConcerts();

        console.log(concerts);
    }, []);

    return (
    <div>
      <h1>Welcome to ConcertHub!</h1>
      {
        concerts.length > 0 && (
            concerts.map(concerts => (
                <div key={concerts.concertID}>
                    <p>{concerts.concertName}</p>
                    <p>{concerts.concertTime}</p>
                    <img src={concerts.filename}></img>
                </div>
            ))
        )
      }
    </div>
    )
}

export default App