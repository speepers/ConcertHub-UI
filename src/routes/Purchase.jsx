import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function Purchase() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [concert, setConcert] = useState(null);
    const apiUrl = import.meta.env.VITE_CONCERTHUB_API_URL;

    const onSubmit = async (data) => {
        console.log("Purchase data submitted:", data);

        const response = await fetch(apiUrl + `/${id}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        let responseBody = await response.json();

        if (!response.ok) {
            let errorMessage = "Failed to purchase ticket(s)";

            if (Array.isArray(responseBody?.errors)) {
                errorMessage = responseBody.errors.join("; ");
            }
            else if (responseBody?.error) {
                errorMessage = responseBody.error;
            }

            alert(errorMessage);
            console.error("Server returned an error:", response.status, responseBody);
            return;
        }

        console.log("Purchase response:", responseBody);

        navigate("/purchase-success", {
            state: {
                customerEmail: data.customerEmail,
            },
        });
    };

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
    
    if (!concert) {
        return <div></div>;
    }

    return (
        <>
            <Link to={`/details/${id}`} className="ps-2">
                <button className="btn btn-primary mt-3 ms-3">← Back to details</button>
            </Link>
            <h2 className="text-white ps-4 pt-3 pb-3">Purchase Ticket(s) for {concert.concertName}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="text-white w-25 ps-4">
                <div className="mb-3">
                    <label htmlFor="ticketsOrdered" className="form-label">Number of Tickets: </label>
                    <input 
                      type="number" 
                      className="form-control w-25" 
                      id="ticketsOrdered" 
                      name="ticketsOrdered" 
                      min="1" 
                      max="10" 
                      defaultValue="1" 
                      {...register("ticketsOrdered", { required: true })} />
                </div>
                <input type="hidden" defaultValue={id} {...register("concertID")} />
                <input type="hidden" defaultValue={new Date().toISOString()} {...register("orderDate")} />
                <div className="mb-3">
                    <label htmlFor="customerName" className="form-label">Name: </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="customerName" 
                      name="customerName" 
                      required 
                      {...register("customerName", { required: true })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="customerEmail" className="form-label">Email: </label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="customerEmail" 
                      name="customerEmail"
                      placeholder="hello@test.com"
                      required 
                      {...register("customerEmail", { required: true })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="creditCardNumber" className="form-label">Credit Card Number: </label>
                    <input 
                      inputMode="numeric" 
                      pattern="\d{13,19}" 
                      maxLength="19" 
                      type="text" 
                      className="form-control" 
                      id="creditCardNumber" 
                      name="creditCardNumber" 
                      required 
                      {...register("creditCardNumber", { required: true })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="CVV" className="form-label">CVV: </label>
                    <input 
                      inputMode="numeric" 
                      pattern="\d{3,4}" 
                      maxLength="4" 
                      type="text" 
                      className="form-control w-25" 
                      id="CVV" 
                      name="CVV" 
                      placeholder="123"
                      required 
                      {...register("CVV", { required: true })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="expiryDate" className="form-label">Expiration Date: </label>
                    <input 
                      type="text" 
                      className= "form-control" 
                      id="expiryDate" 
                      name="expiryDate" 
                      placeholder="YYYY/MM"
                      maxLength="7"
                      required 
                      {...register("expiryDate", { required: true })} />
                </div>
                <button type="submit" className="btn btn-primary">Purchase</button>
            </form>
        </>
    );
}

export default Purchase;
