import { useEffect, useState } from "react"
import http from "../http"
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

export default function List() {
    const [books, setBooks] = useState([]);
    const [popup, setPopup] = useState();
    const [current_page, setCurrentPage] = useState();
    const [total, setTotal] = useState();
    const [per_page, setPerPage] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        fetchAllBooks(1);
    }, []);

    const fetchAllBooks = (pageNumber) => {
        // http.get('/books').then(res => {
        http.get(`/booklist?page=${pageNumber}`).then(res => {
            setBooks(res.data.data);
            setCurrentPage(res.data.current_page);
            setTotal(res.data.total);
            setPerPage(res.data.per_page);
        })
    }
    function handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        setCurrentPage(pageNumber);
        fetchAllBooks(pageNumber);
    }

    function deleteBook(id) {
        fetch(`http://localhost:8000/api/books/${id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((res) => {
                alert('Book Deleted Successfully.');
                fetchAllBooks();

            })
        });
    }
    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }

    return (
        <>
            <div className="pt-5 pb-5"><h3>Book List</h3><hr></hr></div>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Description</th>
                        <th>Isbn</th>
                        <th>Image</th>
                        <th style={{ whiteSpace: "nowrap" }}>Publication Date</th>
                        <th>Publisher</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.description} </td>
                            <td>{book.isbn}</td>
                            <td><img src={`http://localhost:8000/${book.image}`} width={30} height={30} /></td>
                            <td>{formatDate(book.created_at)}</td>
                            <td>{book.publisher}</td>
                            <td style={{ display: "flex" }}>
                                <Link to={`/edit/${book.id}`}>
                                    <span className="btn btn-sm btn-primary">Edit</span>
                                </Link>
                                <span className="btn btn-sm btn-danger" onClick={() => deleteBook(book.id)}>Delete</span>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
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