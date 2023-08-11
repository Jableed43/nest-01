import React from 'react'

function Card({song}) {
  return (

    <div id={song.id}>
        <h1>{song.artist}</h1>
        <h2>{song.title}</h2>
        <p>{song.duration}</p>
    </div>
  )
}

export default Card