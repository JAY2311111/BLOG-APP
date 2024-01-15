import Link from "next/link"
import Image from "next/image"
import Author from "./_child/author"
import fetcher from '../lib/fetcher'
import Spinner from "./_child/spinner"
import Error from "./_child/error"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { decrypt, encrypt } from "../utils/cryptoUtils"
import constants from "../utils/constants"
import { useRouter } from 'next/router';
import RequireAuth from '../components/requireAuth'

const LatestBlogs = () => {

    const [blogs, setBlogs] = useState([])
    const router = useRouter();
    const [userBlogsData, setUsersBlogsData] = useState([])





    const allBlogs = async () => {
        try {
            const response = await fetch(`${constants.backend_url}blogs/all`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'x_access_token': decrypt(localStorage.getItem("token")) },
            });

            const result = await response.json();

            if (result.success == true) {

                setBlogs(result.allBlogs)
            } else {
                if (result.msg == "No token provided") {
                    router.push('/sign-in');
                }
                toast.error(result.msg);
            }

        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong");
        }
    }

    const userBlogs = async () => {
        try {

            const user_id = JSON.parse(decrypt(localStorage.getItem("user_data"))).id

            const response = await fetch(`${constants.backend_url}blogs/all/${user_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'x_access_token': decrypt(localStorage.getItem("token")) },
            });

            const result = await response.json();

            if (result.success == true) {

                setUsersBlogsData(result.allBlogs)
            } else {
                if (result.msg == "No token provided") {
                    router.push('/sign-in');
                }
                toast.error(result.msg);
            }

        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong");
        }
    }


    useEffect(() => {

        userBlogs();
        allBlogs();
    }, []);


    // const { data, isLoading, isError } = fetcher('api/blogs')

    // if(isLoading) return <Spinner></Spinner>;
    // if(isError) return <Error></Error>

    return (
        <>
            <ToastContainer />
            <section className="container mx-auto md:px-20 py-10">
                <h1 className="font-bold text-4xl py-12 text-center">My Posts</h1>

                {/* grid columns */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
                    {
                        userBlogsData.map((value, index) => (
                            <Post data={value} key={index} isEdit={true}></Post>
                        ))
                    }
                </div>
            </section>


            <section className="container mx-auto md:px-20 py-10">
                <h1 className="font-bold text-4xl py-12 text-center">All Posts</h1>

                {/* grid columns */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
                    {
                        blogs.map((value, index) => (
                            <Post data={value} key={index} isEdit={false}></Post>
                        ))
                    }
                </div>
            </section>


        </>
    )
}


function Post({ data, isEdit }) {
    const { _id, title, content, blogImage, createdAt, createdBy } = data;
    const [isLoading, setIsLoading] = useState(true);
    const date = new Date(createdAt).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });;

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    }

    const getContent = () => {
        if (content.split(' ').length > 30 && !isExpanded) {
            return content.split(' ').slice(0, 30).join(' ') + '...';
        } else {
            return content;
        }
    }



    // const id = encrypt(JSON.stringify(_id));
    const id = _id;





    return (
        <div className="item">
            <div className="images">
                <Link href={`/blogs/${id}`}><a>
                    {<Image src={`${constants.backend_url + blogImage}` || "/"} className="rounded"
                        onLoadingComplete={() => setIsLoading(false)}
                        width={500} height={350} />}
                    {isLoading ? (
                        <Spinner />
                    ) : null}

                </a></Link>
            </div>
            <div className="info flex justify-center flex-col py-4">
                <div className="cat">
                    <Link href={`/blogs/${id}`}><a className="text-orange-600 hover:text-orange-800">{createdBy.fullName || "Unknown"}</a></Link>
                    <Link href={`/blogs/${id}`}><a className="text-gray-800 hover:text-gray-600">-     {date || "Unknown"}</a></Link>

                    {isEdit &&
                        <Link href={`/blogs/edit/${id}`}>
                            <a className="bg-orange-500 py-2 px-3  hover:bg-gray-200 text-sm font-medium ml-3 rounded">Edit</a>
                        </Link>
                    }


                </div>
                <div className="title">
                    <Link href={`/blogs/${id}`}><a className="text-xl font-bold text-gray-800 hover:text-gray-600">{title || "Title"}</a></Link>
                </div>
                <p className="text-gray-500 py-3">
                    {getContent()}
                    {content.split(' ').length > 30 && (
                        <span className="text-bold" onClick={toggleReadMore}>
                            {isExpanded ? ' Show Less' : ' ... Read More'}
                        </span>
                    )}
                </p>
                {createdBy ? <Author {...createdBy}></Author> : <></>}
            </div>
        </div>
    )
}


export default RequireAuth(LatestBlogs)