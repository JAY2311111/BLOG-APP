
import React from 'react'

import Format from '../layout/format';


import Section2 from '../components/section2';

import RequireAuth from '../components/requireAuth'



const allBlogs = () => {
  return (
       <Format>
         <Section2></Section2> 

   </Format>
  )
}

export default RequireAuth(allBlogs)
