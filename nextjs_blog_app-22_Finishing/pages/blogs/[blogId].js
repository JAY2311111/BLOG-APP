import Format from '../../layout/format'
import Author from '../../components/_child/author'
import Image from 'next/image'
import Ralated from '../../components/_child/ralated'
import getPost from '../../lib/helper'
import fetcher from '../../lib/fetcher';
import Spinner from '../../components/_child/spinner'
import ErrorComponent from '../../components/_child/error'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import { useEffect, useState } from 'react'
import constants from '../../utils/constants'
import { decrypt } from '../../utils/cryptoUtils'
import RequireAuth from '../../components/requireAuth'

const  SingleBlog = () =>{
    const [blogData, setBlogData] = useState({})

    const router = useRouter()
    const { blogId } = router.query;

    
    const blog = async () =>{
        try {
            const response = await fetch(`${constants.backend_url}blogs/${blogId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' , 'x_access_token' : decrypt(localStorage.getItem("token"))},
            });

            const result = await response.json();

            console.log(result)
            if (result.success == true) {

                setBlogData(result.blog)
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
    }

    useEffect(() => {
        if(blogId){
             blog(); 
        }
    }, [blogId]);




    // const { data, isLoading, isError } = fetcher(`api/posts/${blogId}`)

    // if(isLoading) return <Spinner></Spinner>/
    // if(isError) return <ErrorComponent></ErrorComponent>

    return (
        <>
             <ToastContainer />
             {blog ?  <Article {...blogData}></Article> : <Spinner></Spinner>}
  </>

    )

}

function Article({ title, blogImage, content, createdAt, createdBy }){

 

    const date = new Date(createdAt).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });;

    
    return (
        <Format>
            <section className='container mx-auto md:px-2 py-16 w-1/2'>
                <div className='flex justify-center'>
                { createdBy ? <Author {...createdBy}></Author> : <></>}
                </div>

                <div className="post py-10">
                    <h1 className='font-bold text-4xl text-center pb-5'>{title || "No Title"}</h1>

                    <p className='text-gray-500 text-xl text-center'>{date || "No Title"}</p>

                    <div className="py-10">
                        <Image alt='Blog-Image' src={ `${constants.backend_url + blogImage}` || "/"}width={900} height={600}></Image>
                    </div>

                    <div className="content text-gray-600 text-lg flex flex-col gap-4">
                        {content || "No Description"}
                    </div>

                </div>  

                {/* <Ralated></Ralated> */}
            </section>
        </Format>
    )
}
export default RequireAuth(SingleBlog)