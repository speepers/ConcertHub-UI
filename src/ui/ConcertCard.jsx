import { Link } from "react-router-dom";

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

function ConcertCard({ concertID, title, image, time, location}) {
  const formattedTime = formatTime(time);

  return (
    <div 
      className="card border-5 rounded-4 border-dark shadow p-3 d-flex flex-column align-items-center text-center mx-auto" 
      style={{ height: '400px', width: '300px' , backgroundColor: 'rgba(203, 203, 203, 0.8)'}}
    >
        <img
          src={image}
          alt={title}
          className="card-img-top mb-3 img-fluid"
          style={{ 
              width: "100%",
              height: "150px",
              objectFit: "cover"
          }}
        />
        <h2 
            className="h5 flex-grow-1"
            style={{ 
                fontWeight: 'bold'
            }}
        >
        {title}
        </h2>
        <p className="text-muted small">{formattedTime}</p>
        <p className="text-muted small">⚲ {location}</p>

        <Link to={`/details/${concertID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button className="btn btn-primary mt-auto">Details</button>
        </Link>
    </div>
  );
}

export default ConcertCard;
