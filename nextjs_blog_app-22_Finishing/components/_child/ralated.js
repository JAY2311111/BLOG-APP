import Link from "next/link"
import Image from "next/image"
import Author from "./author"
import fetcher from "../../lib/fetcher"
import Spinner from "./spinner"
import Error from "./error"
import { decrypt, encrypt } from "../../utils/constants"
import constants from "../../utils/constants"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react"
import { useRouter } from 'next/router';

export default function Ralated() {

    const router = useRouter();
    const [userBlogsData, setUsersBlogsData] = useState([])

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

    }, []);







    return (
        <section className="pt-20">
             <h1 className="font-bold text-3xl py-10">Related</h1>

             <div className="flex flex-col gap-10">
                {
                    userBlogsData.map((value, index) => (
                        <Post key={index} data={value}></Post>
                    ))
                }
             </div>
        </section>
    )
}


function Post( {data } ){
        <ToastContainer />
    const { _id, title, content, blogImage, createdAt, createdBy  } = data;
    const date = new Date(createdAt).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });;

    const id = _id;

    return (
        <>
        <ToastContainer />
        <div className="flex gap-5">
            <div className="image flex flex-col justify-start">
                <Link href={`/blogs/${id}`}><a><Image src={`${constants.backend_url + blogImage}`|| ""} className="rounded" width={300} height={200} /></a></Link>
            </div>
            <div className="info flex justify-center flex-col">
                <div className="cat">
                    <Link href={`/blogs/${id}`}><a className="text-orange-600 hover:text-orange-800">{createdBy.fullName  || "No Category"}</a></Link>
                    <Link href={`/blogs/${id}`}><a className="text-gray-800 hover:text-gray-600">- {date || ""}</a></Link>
                </div>
                <div className="title">
                    <Link href={`/blogs/${id}`}><a className="text-xl font-bold text-gray-800 hover:text-gray-600">{title || "No Title"}</a></Link>
                </div>
                { createdBy ? <Author {...createdBy}></Author> : <></>}
            </div>
        </div>
        </>
    )
}