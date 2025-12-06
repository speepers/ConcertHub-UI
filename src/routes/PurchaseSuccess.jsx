import { useLocation, Link } from "react-router-dom";

function PurchaseSuccess() {
  const { state } = useLocation();
  const customerEmail = state?.customerEmail || "email";

  return (
    <div className="container py-4">
      <h1 className="text-white" >Purchase succesuful!</h1>
      <p className="text-white">
        {`Your purchase for the concert was successful, and the ticket(s) will be emailed to ${customerEmail}.`}
      </p>
      <Link to="/">Back to home</Link>
    </div>
  );
}

export default PurchaseSuccess;
