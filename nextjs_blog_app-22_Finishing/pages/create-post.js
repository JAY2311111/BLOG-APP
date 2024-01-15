import React from 'react'

import CreatePost from '../components/createpost'
import RequireAuth from '../components/requireAuth'
import Format from '../layout/format';

const createPost = () => {
  return (
    <Format>
  <CreatePost/>

  </Format>
  
  )
}

export default RequireAuth(createPost)
