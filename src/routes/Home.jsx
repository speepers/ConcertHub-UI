import { useEffect, useState } from "react";
import ConcertCard from "../ui/ConcertCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../index.css";

function Home() {
    const [concerts, setConcerts] = useState([]);
    const apiUrl = import.meta.env.VITE_CONCERTHUB_API_URL;
    const placeholderImageURL = import.meta.env.VITE_PLACEHOLDER_IMAGE_URL;

    useEffect(() => {
        const getConcerts = async () => {
            const response = await fetch(apiUrl);
            const result = await response.json();

            if (response.ok) {
                const concerts = result.map(concert => {
                    if (concert.filename === "") {
                        return { ...concert, filename: placeholderImageURL };
                    }
                    return concert;
                });

                setConcerts(concerts);
            }
        };

        getConcerts();
    }, []);

    return (
        <>
            <header className="app-header">
                <div className="pt-3">
                    <h1 className="text-center accent" style={{ fontWeight: 'bold', fontSize: '3rem' }}>
                        ConcertHub
                    </h1>
                    <p className="text-center accent">
                        Est. 2025
                    </p>
                </div>
            </header>
            <hr/>
            <div className="bg-darkslategray">
                <div>
                    <h1 className="text-center text-decoration-italicized accent">Upcoming Concerts</h1>
                    <Container className="full-width-container pb-4">
                        <Row className="justify-content-center">
                            {
                                concerts.length > 0 && concerts.map(concert => (
                                    <Col key={concert.concertID} className="pt-4">
                                        <ConcertCard
                                            concertID={concert.concertID}
                                            title={concert.concertName}
                                            image={concert.filename}
                                            time={concert.concertTime}
                                            location={concert.locationName}
                                            genre={concert.genreName}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                </div>
            </div>
            <footer className="app-header">
                <div className="pt-3">
                    <p className="text-center accent">
                        © 2025 - ConcertHub
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Home;
