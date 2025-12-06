import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function getOrdinal(n) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return "th";
  const mod10 = n % 10;
  if (mod10 === 1) return "st";
  if (mod10 === 2) return "nd";
  if (mod10 === 3) return "rd";
  return "th";
}

function formatTime(eta) {
  if (!eta) return "TBA";
  const d = new Date(eta);
  if (Number.isNaN(d.getTime())) return "TBA";

  const month = d.toLocaleString("en-US", { month: "long" }); // "October"
  const day = d.getDate(); // 23
  const year = d.getFullYear(); // 2025

  const hour = d.getHours(); // 0-23 (local time)
  const minute = String(d.getMinutes()).padStart(2, "0"); // "48"
  const hour12 = hour % 12 === 0 ? 12 : hour % 12; // 7
  const ampm = hour >= 12 ? "pm" : "am"; // "pm"

  return `${month} ${day}${getOrdinal(day)}, ${year}, ${hour12}:${minute}${ampm}`;
}

function Details() {
    const {id} = useParams();
    const [concert, setConcert] = useState(null);
    const apiUrl = import.meta.env.VITE_CONCERTHUB_API_URL;

    useEffect(() => {
        const getConcert = async () => {
            const response = await fetch(`${apiUrl}/${id}`);
            const result = await response.json();

            if (response.ok) {
                setConcert(result);
            }
        }
        getConcert();
    }, []);

    return (
        <>
            <Link to="/" className="ps-1">
                <button className="btn btn-primary mt-3 ms-3">← Back to home</button>
            </Link>
            <div>
                <img src={concert?.filename} 
                style={{ 
                width: "100%",
                height: "400px",
                objectFit: "cover",
                padding: "20px"
                
                }}/>
                <div 
                className="card border-5 border-dark shadow p-3 d-flex flex-column align-items-center text-center mx-auto card-style" 
                style={{ width: '98%' , backgroundColor: 'rgba(153, 153, 153, 0.8)'}}
                >
                    <h1 className="text-white" style={{ fontWeight: 'bold'}}>{concert?.concertName}</h1>
                </div>
                <Row>
                    <Col>
                        <div 
                        className="card border-5 border-dark shadow p-3 d-flex flex-column align-items-center text-center mx-auto" 
                        style={{ width: '97%' , backgroundColor: 'rgba(153, 153, 153, 0.8)'}}
                        >
                            <h3 className="text-white" style={{ fontWeight: 'bold'}}>Location:</h3>
                            <h4 className="text-white">{concert?.locationName}</h4>
                        </div>
                    </Col>
                    <Col>
                        <div 
                        className="card border-5 border-dark shadow p-3 d-flex flex-column align-items-center text-center mx-auto" 
                        style={{ width: '97%' , backgroundColor: 'rgba(153, 153, 153, 0.8)'}}
                        >
                            <h3 className="text-white" style={{ fontWeight: 'bold'}}>Time:</h3>
                            <h4 className="text-white">{formatTime(concert?.concertTime)}</h4>
                        </div>
                    </Col>
                    <Col>
                        <div 
                        className="card border-5 border-dark shadow p-3 d-flex flex-column align-items-center text-center mx-auto" 
                        style={{ width: '97%' , backgroundColor: 'rgba(153, 153, 153, 0.8)'}}
                        >
                            <h3 className="text-white" style={{ fontWeight: 'bold'}}>About {concert?.bandName}:</h3>
                            <h4 className="text-white">{concert?.bandDescription}</h4>
                        </div>
                    </Col>
                    <Col>
                        <div 
                        className="card border-5 border-dark shadow p-3 d-flex flex-column align-items-center text-center mx-auto" 
                        style={{ width: '97%' , backgroundColor: 'rgba(153, 153, 153, 0.8)'}}
                        >
                            <h3 className="text-white" style={{ fontWeight: 'bold'}}>Genre:</h3>
                            <h4 className="text-white">{concert?.genreName}</h4>
                        </div>
                    </Col>
                    <Col>
                        <div 
                        className="card border-5 border-dark shadow p-3 d-flex flex-column align-items-center text-center mx-auto" 
                        style={{ width: '97%' , backgroundColor: 'rgba(153, 153, 153, 0.8)'}}
                        >
                            <h3 className="text-white" style={{ fontWeight: 'bold'}}>Tour Name:</h3>
                            <h4 className="text-white">{concert?.tourName}</h4>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="text-center m-2">
                <Link to={`/purchase/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <button className="btn btn-primary mt-auto text-center" style={{ fontWeight: 'bold', fontSize: "1.5rem"}}>Purchase Tickets</button>
                </Link>
            </div>
        </>
    );
}

export default Details;
