import { useState } from 'react';
import Link from 'next/link';
import constants from '../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { decrypt } from '../utils/cryptoUtils';




const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [content, setPostContent] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const [fileError, setFileError] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

  
    const router = useRouter();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // console.log(file);
    if (file) {
      const allowedExtensions = [".png" , ".jpg" , ".jpeg"];
      const extension = file.name.substring(file.name.lastIndexOf("."));
      if (allowedExtensions.includes(extension.toLowerCase())) {

        setSelectedFile(file);
        setFileError(null);
      } else {
        event.target.value = null; 
        setSelectedFile(null);
        setFileError("Invalid file type. Please choose a PNG, JPEG, JPG file.");
      }
    } else {
      setSelectedFile(null);
      setFileError("Please choose a Image file");
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setFileError("Please choose a file before submitting.");
            return;
          } 
 
          const formData = new FormData();
          formData.append('blog-image', selectedFile);
          formData.append('content', content);
          formData.append('title', title);

   

        try {
            const response = await fetch(`${constants.backend_url}blogs/create-blog`, {
                method: 'POST',
                headers: { 'x_access_token' : decrypt(localStorage.getItem("token"))},
                body: formData
            });

            const result  = await response.json();
            if (result.success == true) {
             toast.success(result.msg);
             router.push(`/blogs/${result.blogId}`); 
          
              } else {
                if(result.msg == "No token provided"){
              
                    router.push('/sign-in'); 
                }
                toast.error(result.msg); 
              }
           
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong");
        }

    };

    return (

        <>
       <ToastContainer />
   
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create Your Blog
                    </h2>
                  
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="mb-4 rounded-md shadow-sm -space-y-px">
                        <label htmlFor="name" className="sr-only">Post Title</label>
                        <input
                            name="title"
                            type="text"
                            autoComplete="off"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Blog Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>





                    <div className="mb-4 rounded-md shadow-sm -space-y-px">
                        <label htmlFor="content" className="sr-only">Email</label>
                        <textarea
                        style={{minHeight:"200px"}}
                            type="text"
                            name="content"
                            value={content}
                            required
                            onChange={(e) => setPostContent(e.target.value)}
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Blog Content"
                        />
                    </div>

                    <div className="mb-4 rounded-md shadow-sm -space-y-px">
                        <label htmlFor="blog-image" className="sr-only">Password</label>
                        <input
                            type="file"
                            name="blog-image"
                            id="blog-image"
                            accept=".png , .jpeg , .jpg"
                            onChange={handleFileChange}
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                      
                      <p style={{ marginLeft: "5px", marginTop: "10px", fontStyle: "italic", display: 'inline' }}>
                    File selected:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {selectedFile && selectedFile.name || "No file chosen"}
                    </span>
                  </p>
                  {fileError && <p style={{ color: "red" }}>{fileError}</p>}
                    </div>


                    <div className="mb-4 rounded-md shadow-sm -space-y-px">
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </div>

                </form>
            </div>
        </div>
        </>
    );

}

export default CreatePost;