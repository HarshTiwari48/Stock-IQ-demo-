import React, { use, useEffect } from 'react'

function Page() {
  const [User, setUser] = React.useState("guest");

  useEffect(() => {

    console.log(User);
  },[User])

 
  return (
    <div>
      <h1>User Profile</h1>

      <p>Hello {User}</p>

      <input type='text'
      value={User}
      onChange={(e) => setUser(e.target.value)}
      />

    </div>
  )
}

export default Page;
