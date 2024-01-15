import { ImFacebook, ImTwitter, ImYoutube } from "react-icons/im";
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function header() {

  
    const router = useRouter();
    
    function handleLogout() {
        localStorage.clear(); // Clear the localStorage
        router.push('/sign-in'); 
      }


      function handleCreatePost() {
        
        router.push('/create-post'); 
      }


  return (
    <header className="bg-gray-50">
        <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
            <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
                <input type="text" className="input-text"  placeholder="Search..."/>
            </div>

            <div className="shrink w-80 sm:order-2">
            <Link href={"/all-blogs"}><a  className="font-bold uppercase text-xl">HOME</a></Link>
            
            </div>


        
            <div className="shrink w-80 sm:order-2">
               
                
                    <a style={{ cursor: 'pointer' }} onClick={handleCreatePost} className="font-bold uppercase text-xl">CREATE POST</a>
                
            </div>

            <div className="shrink w-80 sm:order-2">
            <Link href={"/"}><a onClick={handleLogout}  className="font-bold uppercase text-xl">LOGOUT</a></Link>
            
            </div>
            <div className="w-96 order-3 flex justify-center">
                <div className="flex gap-6">
                    <Link href={"/"}><a><ImFacebook color="#888888" /></a></Link>
                    <Link href={"/"}><a><ImTwitter color="#888888" /></a></Link>                    
                    <Link href={"/"}><a><ImYoutube color="#888888" /></a></Link>
              
                    
                </div>

            </div>
        </div>
    </header>
  )
}
