import { useState, useEffect } from 'react'
import './App.css' 
import Login from './Login'

// --- ICONS (SVG) ---
const HomeIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
const SearchIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
const LibraryIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
const PlusIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
const HeartIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
const PlayIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
const PencilIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
const VerifiedIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#3d91f4"><path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path></svg>

function App() {
  const [user, setUser] = useState(null)
  const [artists, setArtists] = useState([])
  const [showForm, setShowForm] = useState(false) 
  const [searchTerm, setSearchTerm] = useState("") 
  const [editingId, setEditingId] = useState(null) 
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [imageUniqueId, setImageUniqueId] = useState("")

  // --- NEW: Dynamic Greeting Logic ---
  const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good Morning";
      if (hour < 18) return "Good Afternoon";
      return "Good Evening";
  }

  // Only fetch data if user is logged in
  useEffect(() => { 
      if(user) fetchArtists() 
  }, [user])

  const fetchArtists = () => {
    fetch('http://localhost:8080/artists')
      .then(res => res.json())
      .then(data => setArtists(data))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const artistData = { name, bio, imageUniqueId }

    if (editingId) {
        fetch(`http://localhost:8080/artists/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(artistData)
        }).then(() => { resetForm(); fetchArtists(); })
    } else {
        fetch('http://localhost:8080/artists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(artistData)
        }).then(() => { resetForm(); fetchArtists(); })
    }
  }

  const handleEditClick = (e, artist) => {
    e.stopPropagation();
    setName(artist.name); setBio(artist.bio); setImageUniqueId(artist.imageUniqueId);
    setEditingId(artist.id); setShowForm(true);
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

  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // --- 🔒 IF NOT LOGGED IN, SHOW LOGIN SCREEN ---
  if (!user) {
      return <Login onLogin={(loggedInUser) => setUser(loggedInUser)} />
  }

  // --- 🔓 IF LOGGED IN, SHOW DASHBOARD ---
  return (
    <div className="app-layout" style={{height: '100vh', overflow: 'hidden'}}>
      
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
        
        {/* Only Artists and Admins can see "Create Artist" */}
        {(user.role === 'ADMIN' || user.role === 'ARTIST') && (
            <div className="nav-section">
                <div className="nav-item" onClick={() => { resetForm(); setShowForm(true); }}>
                    <div style={{background:'white', padding:'4px', borderRadius:'2px', display:'flex', color:'black'}}><PlusIcon /></div>
                    <span>Create Artist</span>
                </div>
            </div>
        )}

        <div className="nav-item">
             <div style={{background:'linear-gradient(135deg, #450af5, #c4efd9)', padding:'4px', borderRadius:'2px', display:'flex', color:'white'}}><HeartIcon /></div>
             <span>Liked Songs</span>
        </div>

        {/* User Profile Section */}
        <div onClick={() => setUser(null)} style={{marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', cursor: 'pointer', background:'rgba(255,255,255,0.05)'}}>
            <img src={`https://ui-avatars.com/api/?name=${user.firstName || user.username}&background=random`} style={{width:'32px', borderRadius:'50%'}} alt="User" />
            <div>
                <div style={{fontSize: '0.9rem', fontWeight: '700', display:'flex', alignItems:'center', gap:'5px'}}>
                    {user.firstName || user.username}
                    {user.verified && <VerifiedIcon />} {/* Blue Tick! */}
                </div>
                <div style={{fontSize: '0.75rem', color:'#b3b3b3', textTransform:'capitalize'}}>{user.role.toLowerCase()}</div>
            </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content" style={{overflowY: 'auto'}}>
        
        <div className="header-bar">
            {/* 👇 DYNAMIC GREETING WITH NAME */}
            <div className="greeting">
                {getGreeting()}, {user.firstName || user.username}
            </div>
            
            <div className="search-container">
                <div className="search-icon-overlay"><SearchIcon /></div>
                <input 
                    className="search-input" 
                    placeholder="What do you want to play?" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {(user.role === 'ADMIN' || user.role === 'ARTIST') && (
                <button className="add-btn-pill" onClick={() => { resetForm(); setShowForm(!showForm); }}>
                    {showForm ? "Cancel" : "Add Artist"}
                </button>
            )}
        </div>

        {showForm && (
            <div className="creation-overlay">
                <h3 style={{margin:'0 0 15px 0'}}>{editingId ? "Edit Artist Details" : "Add New Artist"}</h3>
                <form onSubmit={handleSubmit} className="form-row">
                    <input className="modern-input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                    <input className="modern-input" placeholder="Description" value={bio} onChange={e => setBio(e.target.value)} required />
                    <input className="modern-input" placeholder="Image URL / ID" value={imageUniqueId} onChange={e => setImageUniqueId(e.target.value)} />
                    <button type="submit" className="save-action-btn">{editingId ? "Update" : "Save"}</button>
                    <button type="button" onClick={resetForm} style={{background:'transparent', border:'1px solid #555', color:'white', padding:'10px 20px', borderRadius:'50px', cursor:'pointer', fontWeight:'bold', marginLeft: '10px'}}>Cancel</button>
                </form>
            </div>
        )}

        <h2 style={{fontSize: '1.5rem', marginBottom: '20px'}}>Your Artists</h2>
        
        <div className="artist-grid">
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

                    {/* ONLY ADMINS CAN DELETE/EDIT */}
                    {user.role === 'ADMIN' && (
                        <div className="card-actions">
                            <button className="icon-btn edit-btn" onClick={(e) => handleEditClick(e, artist)} title="Edit">
                                <PencilIcon />
                            </button>
                            <button className="icon-btn delete-btn" onClick={(e) => handleDeleteArtist(e, artist.id)} title="Delete">
                                <TrashIcon />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default App