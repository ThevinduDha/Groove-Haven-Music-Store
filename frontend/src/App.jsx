import { useState, useEffect } from 'react'
import './App.css' 

function App() {
  const [artists, setArtists] = useState([])
  
  // Form State
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [imageUniqueId, setImageUniqueId] = useState("")

  // 1. Fetch Artists (Load when page starts)
  useEffect(() => {
    fetchArtists()
  }, [])

  const fetchArtists = () => {
    fetch('http://localhost:8080/artists')
      .then(res => res.json())
      .then(data => setArtists(data))
  }

  // 2. Add Artist (Create)
  const handleAddArtist = (e) => {
    e.preventDefault()
    const newArtist = { name, bio, imageUniqueId }

    fetch('http://localhost:8080/artists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArtist)
    })
    .then(() => {
        setName("")
        setBio("")
        setImageUniqueId("")
        fetchArtists() // Reload list
    })
  }

  // 3. Delete Artist (NEW FEATURE)
  const handleDeleteArtist = (id) => {
    fetch(`http://localhost:8080/artists/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      fetchArtists() // Reload list automatically after delete
    })
  }

  return (
    <div className="app-container">
      
      {/* HEADER */}
      <div className="header">
        <h1>🎵 Groove Haven</h1>
        <p style={{color: '#b3b3b3'}}>Your Personal Artist Collection</p>
      </div>

      {/* INPUT FORM */}
      <div className="form-container">
        <h3 style={{marginTop: 0}}>Add New Artist</h3>
        <form onSubmit={handleAddArtist} className="form-inputs">
            <input 
                type="text" 
                placeholder="Artist Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
            />
            <input 
                type="text" 
                placeholder="Short Bio" 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                required
            />
             <input 
                type="text" 
                placeholder="Image ID (e.g. elvis-img) or URL" 
                value={imageUniqueId} 
                onChange={(e) => setImageUniqueId(e.target.value)} 
            />
            <button type="submit" className="add-btn">
                + Add Artist
            </button>
        </form>
      </div>

      {/* ARTIST GRID */}
      <div className="artist-grid">
        {artists.map(artist => (
          <div key={artist.id} className="artist-card">
             
            {/* Image Handling */}
            <img 
              src={
                artist.imageUniqueId && artist.imageUniqueId.startsWith("http") 
                  ? artist.imageUniqueId 
                  : `/images/${artist.imageUniqueId}.jpg`
              } 
              onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} 
              alt={artist.name}
              style={{ width: "100%", borderRadius: "8px", marginBottom: "15px", height: "200px", objectFit: "cover" }}
            />
            
            <h2 className="artist-name">{artist.name}</h2>
            <p className="artist-bio">{artist.bio}</p>

            {/* DELETE BUTTON (NEW) */}
            <button 
                onClick={() => handleDeleteArtist(artist.id)}
                style={{
                    background: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px",
                    width: "100%",
                    fontSize: "0.9rem"
                }}
            >
                Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default App