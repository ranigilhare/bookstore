import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import http from "../http";

export default function BookDetails() {
    const navigate = useNavigate();
    const params = useParams();
    const [book, setBooks] = useState([]);

    useEffect(() => {
        fetchBookDetails();
    }, []);

    const fetchBookDetails = () => {
        http.get(`/books/${params.id}`).then(res => {
            if (res.data.error) {
                alert(res.data.error);
                navigate('/');
            }
            setBooks(res.data);
            console.log(res.data);

        })
    }

return (
    <>
        <div className="pt-5 pb-5"><h3>Books Details</h3><hr></hr></div>
        <div className="row">
            <div className="pb-left-column col-xs-12 col-md-4">
            <img src={`http://localhost:8000/${book.image}`} height={250} />
            </div>
            <div className="pb-right-column col-xs-12 col-md-8 border-right">
                <h1 className="product-name" style={{ fontSize: "24px", fontWeight: "700" }}>{book.title}</h1>
                <div>
                    <div style={{ lineHeight: "1" }} className="mt-4">
                        <strong style={{ float: "left" }}>Author: </strong>
                        <p>&nbsp; {book.title}</p>
                    </div>
                    <div style={{ lineHeight: "1" }}>
                        <strong style={{ float: "left" }}>Pulblisher:</strong>
                        <p>&nbsp; {book.publisher}</p>
                    </div>
                    <div style={{ lineHeight: "1" }}>
                        <strong style={{ float: "left" }}>ISBN:</strong>
                        <p>&nbsp; {book.isbn}</p>
                    </div>
                    <div style={{ lineHeight: "1" }}>
                        <strong style={{ float: "left" }}>Genre:</strong>
                        <p>&nbsp; {book.genre}</p>
                    </div>
                    <div style={{ lineHeight: "1" }}>
                        <strong style={{ float: "left" }}>Published At:</strong>
                        <p>&nbsp; {book.created_at}</p>
                    </div>
                </div>   
            </div>  
            <div className="col-md-12 mt-5">
                <h5>About The Book</h5>
                <p>{book.description}</p>
            </div> 
        </div>
        </>
    )   
}   

