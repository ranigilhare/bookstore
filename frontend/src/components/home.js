import { useEffect, useState } from "react"
import http from "../http"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
export default function Home() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [data, setData] = useState();
    const [current_page, setCurrentPage] = useState();
    const [total, setTotal] = useState();
    const [per_page, setPerPage] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getBooksData(1);
    }, []);

    const getBooksData = (pageNumber) => {
        http.get(`/booklist?page=${pageNumber}&&search=${search}`).then(res => {
            setBooks(res.data.data);
            setCurrentPage(res.data.current_page);
            setTotal(res.data.total);
            setPerPage(res.data.per_page);
            // console.log(res.data);
        })
    }

    function handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        setCurrentPage(pageNumber);
        getBooksData(pageNumber);
    }

    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }

    function bookDetails(id) {
        console.log(id);
        navigate(`/bookdetails/${id}`);
    }

    const handleMouseOver = e => {
        e.target.style.cursor = "pointer"
    }

    return (
        <>
            <div className="pt-5 pb-5"><h3>Books</h3></div>
            <div className="input-group" align=""  >
                <input type="text" value={search || ''} onChange={(e) => setSearch(e.target.value)} name="search" placeholder="Search Here" className="form-control" />
                <button type="button" onClick={getBooksData} className="btn btn-success">Seach</button>
            </div>
            <hr></hr>
            <div className="row">
                {books.map((book, index) => (
                    <div className="col-md-3 my-3" key={book.id}>
                        <div className="card" style={{ border: "1px solid #fc9200" }}
                        >
                            <img src={`http://localhost:8000/${book.image}`} height={250} onClick={() => bookDetails(book.id)} onMouseOver={handleMouseOver} />
                            <div className="card-body">
                                <h5 className="title">Title: {book.title}</h5>
                                <p><span>Author: {book.author}</span><br></br>
                                    <span>ISBN: {book.isbn}</span><br></br>
                                    <span>Genre: {book.genre}</span><br></br>
                                    <span>Pulibshed By: {book.publisher}</span>
                                </p>
                                <div style={{ color: "#fc9200" }}>Publication Date: {formatDate(book.created_at)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div >
            <div className="mt-5">
                <Pagination
                    activePage={current_page}
                    itemsCountPerPage={per_page}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    onChange={handlePageChange.bind(this)}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </div>
        </>
    )
}