import { useState } from 'react'

import './App.css'
import { TwitterCard } from './Twitter-card.jsx'
import { TwitterCard2 } from './TwitterCard2.jsx'

// Renderizado de una lista
const users =[
  {
     userName: "midudev",
     name: "midudev",
     isFollowing: true
 },
 {
     userName: "github",
     name: "midudev",
     isFollowing: true
 },
 {
     userName: "maria",
     name: "midudev",
     isFollowing: true
 },


 ]

function App() {

  //const format = (userName) => `@${userName}`;

  // OBJETOS COMO PROP
  const midudev = {isFollowing: true, userName: 'midudev', name:'midu'}

  return (
    <>
    <TwitterCard name={"kiko beats"} userName={"kikobeats"} isFollowing={false}/>
{/* Es mala practica pasar objetos como prop ya que hay veces que puedes pasar informacion que no es necesaria */}
    <TwitterCard {... midudev}/>

    <TwitterCard name={"Netflix"} userName={"google/netflix.com"} isFollowing={false}/>
    <hr />
    <h2>Renderizado de una lista</h2>
    {
      users.map((item, index) => {
        const {userName, name, isFollowing} = item;
        return(
          <TwitterCard2 
            userName={userName}
            name={name}
            isFollowing={isFollowing}
            key={index}
          />
        )
      })
    }

    </>
  )
}

export default App
