import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import http from "../http";

export default function Update() {
    const params = useParams();
    const navigate = useNavigate()
    // const [books, setBooks] = useState([]);
    const [error, setError] = useState([]);

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [genre, setGenre] = useState();
    const [description, setDescription] = useState();
    const [isbn, setIsbn] = useState();
    const [publisher, setPublisher] = useState();
    const [file, setFile] = useState();
    const [image, setImage] = useState();

    async function submitForm() {
        // console.warn(title, file, description, isbn);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('genre', genre);
        formData.append('description', description);
        formData.append('isbn', isbn);
        formData.append('publisher', publisher);
        formData.append('file', (file === undefined) ? "" : file);

        let result = await fetch(`http://localhost:8000/api/books/${params.id}`, {
            method: 'POST',
            body: formData
        }).then(res => res.json(), {
        });
        if (result.error) {
            setError(result.error);
        } else {
            alert('Book Details Updated Successfully!!');
            navigate('/list');
        }


    }

    // console.warn("props-", params.id)
    useEffect(() => {
        fetchBookById();
    }, []);

    const fetchBookById = () => {
        http.get(`/books/${params.id}`).then(res => {
            if (res.data.error) {
                alert(res.data.error)
                navigate('/list')
            }
            // setBooks(res.data);
            setTitle(res.data.title)
            setAuthor(res.data.author)
            setGenre(res.data.genre)
            setDescription(res.data.description)
            setIsbn(res.data.isbn)
            setPublisher(res.data.publisher)
            setImage(res.data.image)
        })
    }



    return (
        <>
            <div className="pt-5 pb-5">
                <h3>Update Book</h3><hr></hr>
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
                                <input value={isbn || ''} type="text" onChange={(e) => setIsbn(e.target.value)} name="isbn" placeholder="Enter ISBN No." className="form-control" minLength={13} maxLength={13} />
                                <span className="text-danger">{error.isbn}</span>
                            </div>
                            <div className="mb-4">
                                <label>Publisher<span className="text-danger">*</span></label>
                                <input value={publisher || ''} type="text" onChange={(e) => setPublisher(e.target.value)} name="publisher" placeholder="Enter Publisher Name" className="form-control" />
                                <span className="text-danger">{error.publisher}</span>
                            </div>
                            <div className="mb-4">
                                <label>Image<span className="text-danger">*</span></label>
                                <input type="file" name="file" placeholder="" onChange={(e) => setFile(e.target.files[0])} className="form-control" accept=".jpg,.jpeg,.png" />
                                <span className="text-danger">{error.file}</span>
                            </div><img style={{ width: 100 }} src={`http://localhost:8000/${image}`} />
                            <br></br>
                            <input type="button" onClick={submitForm} name="save" value="Update Book" className="btn btn-warning text-white mb-4" />

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

