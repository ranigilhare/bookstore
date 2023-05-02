<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $books = Book::orderBy('id', 'desc')->get();
        // return response()->json($books);

        if ($request->filled('search')) {
            $books = Book::search($request->search)->paginate(12);
        } else {
            $books = Book::orderBy('id', 'desc')->paginate(12);
        }
        return response()->json($books);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator     = $this->validateBookRequest($request); // Input Validation
        $fileValidator = $this->validateFileRequest($request); // File Validation

        if ($validator->fails()) {
            return response()->json(
                [
                    "status" => "error",
                    "error" => $validator->messages()
                ],
                201
            );
        }
        if ($fileValidator->fails()) {
            return response()->json(
                [
                    "status" => "error",
                    "error" => $fileValidator->messages()
                ],
                201
            );
        }
        $bookExist = Book::where('title', $request->title)->first();
        if ($bookExist) {
            return response()->json(["status" => "existError", "message" => "Book Title Already Exist."], 201);
        }
        $file_path      = "";

        if ($request->file) {
            if ($request->hasFile('file')) {
                // return 'yes';
                $book_file          = $request->file('file');
                $bookFileName       = time() . '.' . $book_file->getClientOriginalExtension();
                $imageFilePath      = 'uploads/books/';
                $book_file->move($imageFilePath, $bookFileName);
                $file_path          = $imageFilePath . $bookFileName;
            }
        }
        $books = Book::create([
            "title"       => $request->title,
            "author"      => $request->author,
            "genre"       => $request->genre,
            "description" => $request->description,
            "isbn"        => $request->isbn,
            "image"       => $file_path,
            "publisher"   => $request->publisher
        ]);
        return response()->json(['success' => 'Book Details Saved Successfully!!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // $bookExist = Book::where('id',$id)->get();
        $bookExist = Book::find($id);
        if ($bookExist) {
            return response()->json($bookExist);
        } else {
            return response()->json(['error' => 'Book Id does not exist.']);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = $this->validateBookRequest($request); // Input Validation
        $fileTypeValidator = $this->validateFileTypeRequest($request); // Input Validation
        if ($validator->fails()) {
            return response()->json(
                [
                    "status" => "error",
                    "error" => $validator->messages()
                ],
                201
            );
        }
        if ($request->file != "") {
            if ($fileTypeValidator->fails()) {
                return response()->json(
                    [
                        "status" => "error",
                        "error" => $fileTypeValidator->messages()
                    ],
                    201
                );
            }
        }
        $bookExist = Book::find($id);
        if ($bookExist) {

            $file_path      = $bookExist->image;
            if ($request->file) {
                if ($request->hasFile('file')) {
                    // return 'yes';
                    $book_file          = $request->file('file');
                    $bookFileName       = time() . '.' . $book_file->getClientOriginalExtension();
                    $imageFilePath      = 'uploads/books/';
                    $book_file->move($imageFilePath, $bookFileName);
                    $file_path          = $imageFilePath . $bookFileName;
                }
            }
            $books = Book::where('id', $id)->update([
                "title"       => $request->title,
                "author"      => $request->author,
                "genre"       => $request->genre,
                "description" => $request->description,
                "isbn"        => $request->isbn,
                "image"       => $file_path,
                "publisher"   => $request->publisher
            ]);
            return response()->json('Book Details Updated');
        } else {
            return response()->json(['error' => 'Book Id does not exist.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $isExist = Book::find($id);
        if ($isExist) {
            $isExist->delete();
            return response()->json(['success' => 'Book Deleted Successfully!!']);
        } else {
            return response()->json(['error' => 'Book Id does not exist.']);
        }
    }

    public function list(Request $request)
    {
        // $books = Book::orderBy('id', 'desc')->paginate(12);
        // return response($books, 200);

        if ($request->filled('search')) {
            $books = Book::search($request->search)->paginate(12);
        } else {
            $books = Book::orderBy('id', 'desc')->paginate(12);
        }
        return response()->json($books);
    }

    public function validateBookRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'       => 'required',
            'author'      => 'required',
            'genre'       => 'required',
            'description' => 'required',
            'isbn'        => 'required|max:13|min:13',
            'publisher'   => 'required',
        ]);
        return $validator;
    }

    public function validateFileRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file'        => 'required|mimes:jpg,jpeg,png',
        ]);
        return $validator;
    }
    public function validateFileTypeRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file'        => 'mimes:jpg,jpeg,png',
        ]);
        return $validator;
    }
}
