import { useState, useEffect } from 'react'
import './App.css' 

// --- ICONS (SVG) ---
const HomeIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
const SearchIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
const LibraryIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
const PlusIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
const HeartIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
const PlayIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
const PencilIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>

function App() {
  const [artists, setArtists] = useState([])
  const [showForm, setShowForm] = useState(false) 
  
  // New States for Search and Edit
  const [searchTerm, setSearchTerm] = useState("") 
  const [editingId, setEditingId] = useState(null) // Keeps track of which artist we are editing

  // Form State
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [imageUniqueId, setImageUniqueId] = useState("")

  useEffect(() => { fetchArtists() }, [])

  const fetchArtists = () => {
    fetch('http://localhost:8080/artists')
      .then(res => res.json())
      .then(data => setArtists(data))
  }

  // Handle Create OR Update
  const handleSubmit = (e) => {
    e.preventDefault()
    const artistData = { name, bio, imageUniqueId }

    if (editingId) {
        // UPDATE MODE (PUT)
        fetch(`http://localhost:8080/artists/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(artistData)
        }).then(() => {
            resetForm();
            fetchArtists();
        })
    } else {
        // CREATE MODE (POST)
        fetch('http://localhost:8080/artists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(artistData)
        }).then(() => {
            resetForm();
            fetchArtists();
        })
    }
  }

  // Pre-fill form for editing
  const handleEditClick = (e, artist) => {
    e.stopPropagation();
    setName(artist.name);
    setBio(artist.bio);
    setImageUniqueId(artist.imageUniqueId);
    setEditingId(artist.id);
    setShowForm(true); // Open the form
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleDeleteArtist = (e, id) => {
    e.stopPropagation(); 
    if(window.confirm("Remove this artist permanently?")) {
      fetch(`http://localhost:8080/artists/${id}`, { method: 'DELETE' })
      .then(() => fetchArtists())
    }
  }

  const resetForm = () => {
    setName(""); setBio(""); setImageUniqueId(""); 
    setEditingId(null); setShowForm(false);
  }

  // Search Logic
  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app-layout">
      
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo">
           <div style={{width:'32px', height:'32px', background:'white', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <div style={{width:'16px', height:'16px', background:'black', borderRadius:'50%'}}></div>
           </div>
           GrooveHaven
        </div>
        
        <div className="nav-section">
            <div className="nav-item active"><HomeIcon /> <span>Home</span></div>
            <div className="nav-item"><SearchIcon /> <span>Search</span></div>
            <div className="nav-item"><LibraryIcon /> <span>Your Library</span></div>
        </div>
        <div className="divider"></div>
        <div className="nav-section">
            <div className="nav-item" onClick={() => { resetForm(); setShowForm(true); }}>
                <div style={{background:'white', padding:'4px', borderRadius:'2px', display:'flex', color:'black'}}><PlusIcon /></div>
                <span>Create Artist</span>
            </div>
            <div className="nav-item">
                <div style={{background:'linear-gradient(135deg, #450af5, #c4efd9)', padding:'4px', borderRadius:'2px', display:'flex', color:'white'}}><HeartIcon /></div>
                <span>Liked Songs</span>
            </div>
        </div>
        <div style={{marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', cursor: 'pointer', background:'rgba(255,255,255,0.05)'}}>
            <img src="https://ui-avatars.com/api/?name=User&background=random" style={{width:'32px', borderRadius:'50%'}} alt="User" />
            <div style={{fontSize: '0.9rem', fontWeight: '700'}}>My Account</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        
        {/* HEADER With SEARCH */}
        <div className="header-bar">
            <div className="greeting">Good Afternoon</div>
            
            {/* NEW: Search Bar */}
            <div className="search-container">
                <div className="search-icon-overlay"><SearchIcon /></div>
                <input 
                    className="search-input" 
                    placeholder="What do you want to play?" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <button className="add-btn-pill" onClick={() => { resetForm(); setShowForm(!showForm); }}>
                {showForm ? "Cancel" : "Add Artist"}
            </button>
        </div>

        {/* FORM (Dynamic Title) */}
        {showForm && (
            <div className="creation-overlay">
                <h3 style={{margin:'0 0 15px 0'}}>{editingId ? "Edit Artist Details" : "Add New Artist"}</h3>
                <form onSubmit={handleSubmit} className="form-row">
                    <input className="modern-input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                    <input className="modern-input" placeholder="Description" value={bio} onChange={e => setBio(e.target.value)} required />
                    <input className="modern-input" placeholder="Image URL / ID" value={imageUniqueId} onChange={e => setImageUniqueId(e.target.value)} />
                    <button type="submit" className="save-action-btn">{editingId ? "Update" : "Save"}</button>
                </form>
            </div>
        )}

        {/* ARTIST GRID (Filtered) */}
        <h2 style={{fontSize: '1.5rem', marginBottom: '20px'}}>Your Artists</h2>
        
        <div className="artist-grid">
            {filteredArtists.length === 0 && (
                <p style={{color: '#b3b3b3'}}>No artists found. Try searching for something else!</p>
            )}

            {filteredArtists.map(artist => (
                <div key={artist.id} className="artist-card">
                    <div className="image-box">
                        <img 
                            src={artist.imageUniqueId && artist.imageUniqueId.startsWith("http") ? artist.imageUniqueId : (artist.imageUniqueId ? `/images/${artist.imageUniqueId}.jpg` : "https://via.placeholder.com/150")}
                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${artist.name}&background=333&color=fff&size=200`; }} 
                            className="artist-img"
                            alt={artist.name}
                        />
                        <div className="play-overlay"><PlayIcon /></div>
                    </div>

                    <h3 className="card-title">{artist.name}</h3>
                    <p className="card-desc">{artist.bio}</p>

                    {/* NEW: Action Buttons (Edit + Delete) */}
                    <div className="card-actions">
                        <button className="icon-btn edit-btn" onClick={(e) => handleEditClick(e, artist)} title="Edit">
                            <PencilIcon />
                        </button>
                        <button className="icon-btn delete-btn" onClick={(e) => handleDeleteArtist(e, artist.id)} title="Delete">
                            <TrashIcon />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default App