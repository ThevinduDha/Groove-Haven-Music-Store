import { useState, useEffect, useRef } from 'react'
import './App.css' 
import Login from './Login'

// --- ICONS ---
const HomeIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
const UserIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
const StarIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="gold" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
const PlayIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
const PauseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
const UploadIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
const BackIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>

function App() {
  const [user, setUser] = useState(null)
  
  // --- NAVIGATION STATE ---
  const [view, setView] = useState('home') // 'home', 'profile', 'artist'
  const [viewedArtist, setViewedArtist] = useState(null) // The artist we are clicking on

  // --- DATA ---
  const [artists, setArtists] = useState([]) 
  const [songs, setSongs] = useState([])

  // --- FORMS ---
  const [showUpload, setShowUpload] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  // Upgrade Form Data
  const [upgradeBio, setUpgradeBio] = useState("")
  const [upgradePic, setUpgradePic] = useState(null)

  // Profile Edit Data
  const [editName, setEditName] = useState("")
  const [editPic, setEditPic] = useState(null)

  // Player
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Init Data
  useEffect(() => { 
      if(user) {
          fetchArtists();
          fetchSongs();
          setEditName(user.firstName || "");
      }
  }, [user])

  // --- API CALLS ---
  const fetchArtists = () => {
    // We now fetch USERS who are ARTISTS
    fetch('http://localhost:8080/users/artists')
      .then(res => res.json())
      .then(data => setArtists(data))
  }

  const fetchSongs = () => {
    fetch('http://localhost:8080/songs')
      .then(res => res.json())
      .then(data => setSongs(data))
  }

  // --- AUDIO PLAYER ---
  useEffect(() => {
    if (currentSong && audioRef.current) {
        isPlaying ? audioRef.current.play().catch(e=>{}) : audioRef.current.pause();
    }
  }, [currentSong, isPlaying])

  const playSong = (song) => {
    if (currentSong && currentSong.id === song.id) {
        setIsPlaying(!isPlaying);
    } else {
        setCurrentSong(song);
        setIsPlaying(true);
    }
  }

  // --- 1. PROFILE UPDATE ---
  const handleProfileUpdate = (e) => {
      e.preventDefault();
      // Update Name
      fetch(`http://localhost:8080/users/${user.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ firstName: editName })
      }).then(res => res.json()).then(updatedUser => {
          // If there is an image, upload it
          if(editPic) {
             const formData = new FormData(); formData.append("file", editPic);
             fetch(`http://localhost:8080/users/${user.id}/image`, {method:'POST', body:formData})
             .then(res => res.json()).then(finalUser => {
                 setUser(finalUser); alert("Profile Updated!");
             })
          } else {
              setUser(updatedUser); alert("Profile Updated!");
          }
      })
  }

  // --- 2. UPGRADE TO ARTIST ---
  const handleUpgrade = (e) => {
      e.preventDefault();
      if(!upgradePic) return alert("Artists need a profile picture!");
      
      const confirmPayment = window.confirm("💎 Pay $9.99 to become an Artist?");
      if(confirmPayment) {
          // 1. Update Role and Bio
          fetch(`http://localhost:8080/users/${user.id}`, {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ role: 'ARTIST', bio: upgradeBio })
          }).then(res => res.json()).then(upgradedUser => {
              // 2. Upload the Artist Image
              const formData = new FormData(); formData.append("file", upgradePic);
              fetch(`http://localhost:8080/users/${user.id}/image`, {method:'POST', body:formData})
              .then(res => res.json()).then(finalUser => {
                  setUser(finalUser); 
                  setShowUpgradeModal(false);
                  alert("🎉 Welcome to the Artist Club! You can now upload songs.");
                  fetchArtists(); // Refresh list
              })
          })
      }
  }

  // --- 3. SONG UPLOAD ---
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("artist", user.firstName || user.username); // Use updated name
    formData.append("file", e.target.file.files[0]);

    fetch('http://localhost:8080/songs/upload', { method: 'POST', body: formData })
    .then(() => {
        alert("Song Uploaded!");
        setShowUpload(false);
        fetchSongs();
    })
  }

  // --- VIEW HELPERS ---
  const getImage = (u) => u.profilePic ? `http://localhost:8080/music/${u.profilePic}` : `https://ui-avatars.com/api/?name=${u.username}&background=random`;

  if (!user) return <Login onLogin={setUser} />

  return (
    <div className="app-layout" style={{height: '100vh', overflow: 'hidden'}}>
      {currentSong && <audio ref={audioRef} src={`http://localhost:8080/music/${currentSong.filePath}`} onEnded={()=>setIsPlaying(false)} />}

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo">GrooveHaven</div>
        <div className="nav-section">
            <div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => {setView('home'); setViewedArtist(null)}}><HomeIcon /> <span>Home</span></div>
            <div className={`nav-item ${view === 'profile' ? 'active' : ''}`} onClick={() => setView('profile')}><UserIcon /> <span>My Profile</span></div>
        </div>

        {user.role === 'LISTENER' && (
             <div className="nav-section">
                <div className="nav-item" onClick={() => setShowUpgradeModal(true)} style={{color: '#ffd700'}}>
                    <StarIcon /> <span>Become an Artist</span>
                </div>
            </div>
        )}

        {(user.role === 'ADMIN' || user.role === 'ARTIST') && (
            <div className="nav-section">
                <div className="nav-item" onClick={() => setShowUpload(true)}><UploadIcon /> <span>Upload Song</span></div>
            </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content" style={{overflowY: 'auto', paddingBottom:'100px'}}>
        
        {/* === HEADER === */}
        <div className="header-bar">
            {view === 'artist' && <div onClick={() => setView('home')} style={{cursor:'pointer', marginRight:'20px'}}><BackIcon /></div>}
            <div className="greeting">
                {view === 'profile' ? "Edit Profile" : (view === 'artist' ? viewedArtist.firstName : `Hello, ${user.firstName || user.username}`)}
            </div>
        </div>

        {/* === VIEW: HOME (List Artists) === */}
        {view === 'home' && (
            <>
                <h2 style={{fontSize: '1.5rem', marginBottom: '20px'}}>Popular Artists</h2>
                <div className="artist-grid">
                    {artists.map(artist => (
                        <div key={artist.id} className="artist-card" onClick={() => { setViewedArtist(artist); setView('artist'); }}>
                            <div className="image-box">
                                <img src={getImage(artist)} className="artist-img" style={{objectFit:'cover'}} />
                            </div>
                            <h3 className="card-title">{artist.firstName || artist.username}</h3>
                            <p className="card-desc">Artist</p>
                        </div>
                    ))}
                </div>
            </>
        )}

        {/* === VIEW: ARTIST DETAIL (Show Songs) === */}
        {view === 'artist' && viewedArtist && (
            <>
                <div style={{display:'flex', alignItems:'center', gap:'20px', marginBottom:'40px'}}>
                    <img src={getImage(viewedArtist)} style={{width:'150px', height:'150px', borderRadius:'50%', objectFit:'cover', boxShadow:'0 10px 30px rgba(0,0,0,0.5)'}} />
                    <div>
                        <h1 style={{fontSize:'3rem', margin:0}}>{viewedArtist.firstName || viewedArtist.username}</h1>
                        <p style={{color:'#ccc', fontSize:'1.1rem'}}>{viewedArtist.bio || "No bio yet."}</p>
                    </div>
                </div>

                <h3>Songs</h3>
                <div className="artist-grid">
                    {songs.filter(s => s.artist === (viewedArtist.firstName || viewedArtist.username)).map(song => (
                        <div key={song.id} className="artist-card" onClick={() => playSong(song)}>
                            <div className="image-box">
                                <img src={`https://ui-avatars.com/api/?name=${song.title}&background=1db954&color=fff`} className="artist-img" />
                                <div className="play-overlay" style={{opacity: (currentSong?.id === song.id && isPlaying) ? 1 : undefined, transform: (currentSong?.id === song.id && isPlaying) ? 'translateY(0)' : undefined}}>
                                    {(currentSong?.id === song.id && isPlaying) ? <PauseIcon /> : <PlayIcon />}
                                </div>
                            </div>
                            <h3 className="card-title">{song.title}</h3>
                        </div>
                    ))}
                    {songs.filter(s => s.artist === (viewedArtist.firstName || viewedArtist.username)).length === 0 && <p style={{color:'#666'}}>No songs uploaded yet.</p>}
                </div>
            </>
        )}

        {/* === VIEW: PROFILE (Edit User) === */}
        {view === 'profile' && (
            <div style={{maxWidth:'500px'}}>
                <div style={{textAlign:'center', marginBottom:'30px'}}>
                    <img src={getImage(user)} style={{width:'120px', height:'120px', borderRadius:'50%', objectFit:'cover', border:'3px solid #1db954'}} />
                </div>
                <form onSubmit={handleProfileUpdate} className="form-row" style={{flexDirection:'column'}}>
                    <label>Display Name</label>
                    <input className="modern-input" value={editName} onChange={e=>setEditName(e.target.value)} />
                    <label>Profile Picture</label>
                    <input type="file" onChange={e=>setEditPic(e.target.files[0])} style={{color:'white', padding:'10px 0'}} />
                    <button type="submit" className="save-action-btn" style={{marginTop:'20px'}}>Save Changes</button>
                </form>
            </div>
        )}

        {/* === MODALS === */}

        {/* 1. UPLOAD SONG MODAL */}
        {showUpload && (
            <div className="creation-overlay" style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)', zIndex:100}}>
                <h3>Upload New Track</h3>
                <form onSubmit={handleUpload} className="form-row" style={{flexDirection:'column'}}>
                    <input name="title" className="modern-input" placeholder="Song Title" required />
                    <input name="file" type="file" accept=".mp3" required style={{color:'white', margin:'10px 0'}} />
                    <button className="save-action-btn">Upload</button>
                    <button type="button" onClick={()=>setShowUpload(false)} style={{background:'none', border:'none', color:'white', marginTop:'10px', cursor:'pointer'}}>Cancel</button>
                </form>
            </div>
        )}

        {/* 2. BECOME ARTIST MODAL */}
        {showUpgradeModal && (
            <div className="creation-overlay" style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)', zIndex:100, width:'400px'}}>
                <h2 style={{color:'#1db954'}}>Artist Application</h2>
                <p>Complete your profile to start your journey.</p>
                <form onSubmit={handleUpgrade} className="form-row" style={{flexDirection:'column'}}>
                    <textarea className="modern-input" placeholder="Artist Bio / Description" value={upgradeBio} onChange={e=>setUpgradeBio(e.target.value)} required rows={4} />
                    <p style={{fontSize:'0.9rem', marginBottom:'5px'}}>Artist Profile Image:</p>
                    <input type="file" onChange={e=>setUpgradePic(e.target.files[0])} required style={{color:'white'}} />
                    <button className="save-action-btn" style={{marginTop:'20px', background:'gold', color:'black'}}>Pay $9.99 & Join</button>
                    <button type="button" onClick={()=>setShowUpgradeModal(false)} style={{background:'none', border:'none', color:'white', marginTop:'10px', cursor:'pointer'}}>Cancel</button>
                </form>
            </div>
        )}

      </div>
    </div>
  )
}

export default App