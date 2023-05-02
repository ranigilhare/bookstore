import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http";

export default function Create() {
    const navigate = useNavigate()
    const [error, setError] = useState([]);
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [genre, setGenre] = useState();
    const [description, setDescription] = useState();
    const [isbn, setIsbn] = useState();
    const [publisher, setPublisher] = useState();
    const [file, setFile] = useState();

    async function submitForm() {
        // console.warn(title, file, description, isbn);
        const formData = new FormData();
        formData.append('title', (title === undefined) ? "" : title);
        formData.append('author', (author === undefined) ? "" : author);
        formData.append('genre', (genre === undefined) ? "" : genre);
        formData.append('description', (description === undefined) ? "" : description);
        formData.append('isbn', (isbn === undefined) ? "" : isbn);
        formData.append('publisher', (publisher === undefined) ? "" : publisher);
        formData.append('file', (file === undefined) ? "" : file);

        // http.post(`/books`, {
        //         method: 'POST',
        //         body: formData
        //     }).then(res => {
        //     // setBooks(res.data.data);
        //     // setCurrentPage(res.data.current_page);
        //     // setTotal(res.data.total);
        //     // setPerPage(res.data.per_page);
        //     if (res.data.error) {
        //         setError(res.data.error);
        //     }
        // })

        // await fetch('http://localhost:8000/api/books', {
        //     method: 'POST',
        //     body: formData
        // }).then(res => {
        //     console.log(res);
        //     if (res.status == 201) {
        //         alert('Book Title Already Exist.');
        //         navigate('/create');
        //     } else {
        //         alert('Book Details Saved Successfully!!');
        //         // navigate('/list');
        //     }

        // });
        const result = await fetch('http://localhost:8000/api/books', {
            method: 'POST',
            body: formData
            }).then(res => res.json(), {
        });
        if (result.error) {
            setError(result.error);
        } else if (result.status == "existError") {
            alert(result.message);
        } else {
            alert('Book Details Saved Successfully!!');
            navigate('/list');
        }

    }

    return (
        <div className="pt-5 pb-5">
            <h3>Add Book</h3><hr></hr>
            <p></p>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <div className="mb-4">
                            <label>Title<span className="text-danger">*</span></label>
                            <input type="text" value={title || ''} onChange={(e) => setTitle(e.target.value)} name="title" placeholder="Enter Book Title" className="form-control" />
                            <span className="text-danger">{error.title}</span>
                        </div>
                        <div className="mb-4">
                            <label>Author<span className="text-danger">*</span></label>
                            <input type="text" value={author || ''} onChange={(e) => setAuthor(e.target.value)} name="author" placeholder="Enter Author Name" className="form-control" />
                            <span className="text-danger">{error.author}</span>
                        </div>
                        <div className="mb-4">
                            <label>Genre<span className="text-danger">*</span></label>
                            <input type="text" value={genre || ''} onChange={(e) => setGenre(e.target.value)} name="genre" placeholder="Enter Book Genre" className="form-control" />
                            <span className="text-danger">{error.genre}</span>
                        </div>
                        <div className="mb-4">
                            <label>Description<span className="text-danger">*</span></label>
                            <textarea value={description || ''} onChange={(e) => setDescription(e.target.value)} name="description" placeholder="Enter Description" maxLength={255} className="form-control" style={{ height: "120px" }}></textarea>
                            <span className="text-danger">{error.description}</span>
                        </div>
                        <div className="mb-4">
                            <label>ISBN<span className="text-danger">*</span></label>
                            <input value={isbn || ''} onChange={(e) => setIsbn(e.target.value)} type="text" name="isbn" placeholder="Enter ISBN No." className="form-control" minLength="13" maxLength="13" />
                            <span className="text-danger">{error.isbn}</span>
                        </div>
                        <div className="mb-4">
                            <label>Publisher<span className="text-danger">*</span></label>
                            <input value={publisher || ''} onChange={(e) => setPublisher(e.target.value)} type="text" name="publisher" placeholder="Enter Publisher Name" className="form-control" />
                            <span className="text-danger">{error.publisher}</span>
                        </div>
                        <div className="mb-4">
                            <label>Image<span className="text-danger">*</span></label>
                            <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} placeholder="" className="form-control" accept=".jpg,.jpeg,.png" />
                            <span className="text-danger">{error.file}</span>
                        </div>
                        <div className="mb-4">
                            <input type="button" onClick={submitForm} name="save" value="Save Book" className="btn btn-success" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}