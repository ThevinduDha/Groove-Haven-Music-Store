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
const CameraIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
const MusicFileIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1db954" strokeWidth="1.5"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
const LogoutIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
const ImageIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>

function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('home')
  const [viewedArtist, setViewedArtist] = useState(null)
  
  const [artists, setArtists] = useState([]) 
  const [songs, setSongs] = useState([])

  const [showUpload, setShowUpload] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  const [upgradeBio, setUpgradeBio] = useState("")
  const [upgradePic, setUpgradePic] = useState(null)
  const [editName, setEditName] = useState("")
  const [editPic, setEditPic] = useState(null)

  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => { 
      if(user) { fetchArtists(); fetchSongs(); setEditName(user.firstName || ""); }
  }, [user])

  const fetchArtists = () => fetch('http://localhost:8080/users/artists').then(res => res.json()).then(setArtists)
  const fetchSongs = () => fetch('http://localhost:8080/songs').then(res => res.json()).then(setSongs)

  useEffect(() => {
    if (currentSong && audioRef.current) isPlaying ? audioRef.current.play().catch(()=>{}) : audioRef.current.pause();
  }, [currentSong, isPlaying])

  const playSong = (song) => {
    if (currentSong && currentSong.id === song.id) setIsPlaying(!isPlaying);
    else { setCurrentSong(song); setIsPlaying(true); }
  }

  const handleProfileUpdate = (e) => {
      e.preventDefault();
      fetch(`http://localhost:8080/users/${user.id}`, {
          method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ firstName: editName })
      }).then(res => res.json()).then(updatedUser => {
          if(editPic) {
             const formData = new FormData(); formData.append("file", editPic);
             fetch(`http://localhost:8080/users/${user.id}/image`, {method:'POST', body:formData})
             .then(res => res.json()).then(finalUser => { 
                 setUser(finalUser); alert("✅ Profile Updated!"); setView('home'); 
             }).catch(() => { alert("⚠️ Name saved, but image too big."); setView('home'); })
          } else { 
              setUser(updatedUser); alert("✅ Name Updated!"); setView('home'); 
          }
      }).catch(() => alert("❌ Update Failed."))
  }

  const handleUpgrade = (e) => {
      e.preventDefault();
      if(!upgradePic) return alert("Artists need a profile picture!");
      if(window.confirm("💎 Pay $9.99 to become an Artist?")) {
          fetch(`http://localhost:8080/users/${user.id}`, {
              method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ role: 'ARTIST', bio: upgradeBio })
          }).then(res => res.json()).then(() => {
              const formData = new FormData(); formData.append("file", upgradePic);
              fetch(`http://localhost:8080/users/${user.id}/image`, {method:'POST', body:formData})
              .then(res => res.json()).then(finalUser => {
                  setUser(finalUser); setShowUpgradeModal(false); alert("🎉 Welcome to the Artist Club!"); fetchArtists();
              })
          })
      }
  }

  // 👇 UPDATED: Uploads both Audio + Cover Image
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("artist", user.firstName || user.username);
    formData.append("file", e.target.file.files[0]);   // The Audio
    formData.append("cover", e.target.cover.files[0]); // The Picture

    fetch('http://localhost:8080/songs/upload', { method: 'POST', body: formData })
    .then(() => { 
        alert("🎵 Song & Cover Uploaded!"); 
        setShowUpload(false); 
        fetchSongs(); 
    })
    .catch(() => alert("❌ Upload Failed (Check file sizes!)"));
  }

  const getImage = (u) => u.profilePic ? `http://localhost:8080/music/${u.profilePic}?t=${new Date().getTime()}` : `https://ui-avatars.com/api/?name=${u.username}&background=random`;
  
  // Helper to get Song Cover
  const getSongCover = (s) => s.coverImage ? `http://localhost:8080/music/${s.coverImage}` : `https://ui-avatars.com/api/?name=${s.title}&background=1db954&color=fff&size=200`;

  if (!user) return <Login onLogin={setUser} />

  const mySongs = songs.filter(s => s.artist === (user.firstName || user.username));

  return (
    <div className="app-layout" style={{height: '100vh', overflow: 'hidden'}}>
      {currentSong && <audio ref={audioRef} src={`http://localhost:8080/music/${currentSong.filePath}`} onEnded={()=>setIsPlaying(false)} />}

      <div className="sidebar">
        <div className="logo">GrooveHaven</div>
        <div className="nav-section">
            <div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => {setView('home'); setViewedArtist(null)}}><HomeIcon /> <span>{user.role === 'ARTIST' ? "Dashboard" : "Home"}</span></div>
            <div className={`nav-item ${view === 'profile' ? 'active' : ''}`} onClick={() => setView('profile')}><UserIcon /> <span>My Profile</span></div>
        </div>
        {user.role === 'LISTENER' && <div className="nav-section"><div className="nav-item" onClick={() => setShowUpgradeModal(true)} style={{color: '#ffd700'}}><StarIcon /> <span>Become an Artist</span></div></div>}
        <div style={{padding:'0 24px', marginTop:'auto', marginBottom:'20px'}}>
             <div className="logout-btn-sidebar" onClick={() => setUser(null)}><LogoutIcon /> <span>Log Out</span></div>
        </div>
      </div>

      <div className="main-content" style={{overflowY: 'auto', paddingBottom:'100px'}}>
        
        <div className="header-bar">
            {view === 'artist' && <div onClick={() => setView('home')} style={{cursor:'pointer', marginRight:'20px'}}><BackIcon /></div>}
            <div className="greeting">{view === 'profile' ? "Account Settings" : (view === 'artist' ? viewedArtist.firstName : `Hello, ${user.firstName || user.username}`)}</div>
            {(user.role === 'ARTIST' && view === 'home') && (
                <button className="add-btn-pill" onClick={() => setShowUpload(true)} style={{display:'flex', alignItems:'center', gap:'5px'}}>
                    <UploadIcon /> New Drop
                </button>
            )}
        </div>

        {/* ARTIST DASHBOARD */}
        {(view === 'home' && user.role === 'ARTIST') && (
            <>
                <div className="dashboard-hero">
                    <h1>Artist Command Center</h1>
                    <p>Manage your music, check your stats, and grow your audience.</p>
                </div>

                <div className="stats-container">
                    <div className="stat-card">
                        <span className="stat-number">{mySongs.length}</span>
                        <span className="stat-label">Tracks Uploaded</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">12.5K</span>
                        <span className="stat-label">Total Streams</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">842</span>
                        <span className="stat-label">Followers</span>
                    </div>
                </div>

                <div style={{marginBottom:'40px', background:'rgba(255,255,255,0.02)', padding:'20px', borderRadius:'16px', border:'1px solid rgba(255,255,255,0.05)'}}>
                    <h4 style={{marginTop:0, color:'#b3b3b3'}}>Weekly Listener Growth</h4>
                    <div style={{display:'flex', alignItems:'flex-end', gap:'10px', height:'100px', paddingBottom:'10px'}}>
                        {[40, 60, 45, 80, 55, 90, 100].map((h, i) => (
                            <div key={i} style={{flex:1, background: i===6 ? '#1db954' : '#333', height: `${h}%`, borderRadius:'4px 4px 0 0', opacity:0.8}}></div>
                        ))}
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#666'}}>
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                <h3 style={{marginBottom:'15px'}}>Your Discography</h3>
                <div className="track-list-container">
                    {mySongs.length > 0 ? mySongs.map(song => (
                        <div key={song.id} className="track-row" onClick={() => playSong(song)}>
                            {/* 👇 Shows Real Cover Art in List */}
                            <img src={getSongCover(song)} className="track-img-small" />
                            <div className="track-info">
                                <div className="track-title">{song.title}</div>
                                <div className="track-meta">Added recently</div>
                            </div>
                            <div className="track-actions">
                                {/* 👇 Shows Pause if playing, Play if not */}
                                {(currentSong?.id === song.id && isPlaying) ? <PauseIcon /> : <PlayIcon />}
                            </div>
                        </div>
                    )) : (
                        <div style={{textAlign:'center', padding:'30px', color:'#888'}}>
                            <p>You haven't uploaded any music yet.</p>
                            <button className="login-btn" style={{width:'auto', marginTop:'10px'}} onClick={() => setShowUpload(true)}>Upload Your First Song</button>
                        </div>
                    )}
                </div>
            </>
        )}

        {/* LISTENER HOME */}
        {(view === 'home' && user.role !== 'ARTIST') && (
            <>
                <h2 style={{fontSize: '1.5rem', marginBottom: '15px'}}>Fresh Drops 🎵</h2>
                <div style={{display:'flex', gap:'20px', overflowX:'auto', paddingBottom:'20px', marginBottom:'30px'}}>
                    {songs.slice(0, 6).map(song => (
                        <div key={song.id} className="artist-card" style={{minWidth:'160px'}} onClick={() => playSong(song)}>
                            <div className="image-box">
                                {/* 👇 Shows Real Cover Art */}
                                <img src={getSongCover(song)} className="artist-img" />
                                <div className="play-overlay" style={{opacity: (currentSong?.id === song.id && isPlaying) ? 1 : undefined, transform: (currentSong?.id === song.id && isPlaying) ? 'translateY(0)' : undefined}}>
                                    {/* 👇 Shows Pause/Play Logic */}
                                    {(currentSong?.id === song.id && isPlaying) ? <PauseIcon /> : <PlayIcon />}
                                </div>
                            </div>
                            <h3 className="card-title" style={{fontSize:'0.9rem'}}>{song.title}</h3>
                            <p className="card-desc" style={{fontSize:'0.8rem'}}>{song.artist}</p>
                        </div>
                    ))}
                    {songs.length === 0 && <p style={{color:'#666'}}>No songs uploaded yet. Be the first!</p>}
                </div>

                <h2 style={{fontSize: '1.5rem', marginBottom: '20px'}}>Popular Artists</h2>
                <div className="artist-grid">
                    {artists.map(artist => (
                        <div key={artist.id} className="artist-card" onClick={() => { setViewedArtist(artist); setView('artist'); }}>
                            <div className="image-box"><img src={getImage(artist)} className="artist-img" style={{objectFit:'cover'}} /></div>
                            <h3 className="card-title">{artist.firstName || artist.username}</h3>
                            <p className="card-desc">Artist</p>
                        </div>
                    ))}
                </div>
            </>
        )}

        {/* ARTIST DETAIL */}
        {view === 'artist' && viewedArtist && (
            <>
                <div style={{display:'flex', alignItems:'center', gap:'20px', marginBottom:'40px'}}>
                    <img src={getImage(viewedArtist)} style={{width:'150px', height:'150px', borderRadius:'50%', objectFit:'cover', boxShadow:'0 10px 30px rgba(0,0,0,0.5)'}} />
                    <div><h1 style={{fontSize:'3rem', margin:0}}>{viewedArtist.firstName || viewedArtist.username}</h1><p style={{color:'#ccc', fontSize:'1.1rem'}}>{viewedArtist.bio || "No bio yet."}</p></div>
                </div>
                <h3>Songs</h3>
                <div className="artist-grid">
                    {songs.filter(s => s.artist === (viewedArtist.firstName || viewedArtist.username)).map(song => (
                        <div key={song.id} className="artist-card" onClick={() => playSong(song)}>
                            <div className="image-box">
                                {/* 👇 Shows Real Cover Art */}
                                <img src={getSongCover(song)} className="artist-img" />
                                <div className="play-overlay" style={{opacity: (currentSong?.id === song.id && isPlaying) ? 1 : undefined, transform: (currentSong?.id === song.id && isPlaying) ? 'translateY(0)' : undefined}}>
                                    {(currentSong?.id === song.id && isPlaying) ? <PauseIcon /> : <PlayIcon />}
                                </div>
                            </div>
                            <h3 className="card-title">{song.title}</h3>
                        </div>
                    ))}
                </div>
            </>
        )}

        {/* PROFILE EDITOR */}
        {view === 'profile' && (
            <div className="profile-editor-container">
                <form onSubmit={handleProfileUpdate}>
                    <div className="profile-avatar-wrapper">
                        <label htmlFor="profile-upload" style={{cursor: 'pointer'}}>
                            <img src={editPic ? URL.createObjectURL(editPic) : getImage(user)} className="profile-avatar-large" />
                            <div className="avatar-edit-overlay"><CameraIcon /></div>
                        </label>
                        <input id="profile-upload" type="file" onChange={e=>setEditPic(e.target.files[0])} style={{display:'none'}} />
                    </div>
                    <div className="premium-input-group"><label className="premium-label">Display Name</label><input className="premium-input" value={editName} onChange={e=>setEditName(e.target.value)} placeholder="How should we call you?" /></div>
                    <div className="premium-input-group"><label className="premium-label">Role</label><div style={{color:'white', fontWeight:'bold', fontSize:'1.2rem', display:'flex', alignItems:'center', gap:'10px'}}>{user.role} {user.role === 'ARTIST' && <span style={{fontSize:'0.8rem', background:'#1db954', padding:'2px 8px', borderRadius:'10px', color:'black'}}>VERIFIED</span>}</div></div>
                    <button type="submit" className="login-btn" style={{marginTop:'20px'}}>💾 Save Profile Changes</button>
                </form>
            </div>
        )}

        {/* === MODALS === */}
        {showUpload && (
            <div className="premium-modal-overlay">
                <div className="premium-card">
                    <h2 style={{color:'white', marginBottom:'5px'}}>Upload New Track</h2>
                    <p style={{color:'#888', marginBottom:'25px', fontSize:'0.9rem'}}>Share your sound with the world.</p>
                    <form onSubmit={handleUpload}>
                        <div className="premium-input-group"><input name="title" className="premium-input" placeholder="Song Title" required /></div>
                        
                        {/* Audio File Input */}
                        <div className="premium-input-group">
                            <label className="file-upload-zone"><MusicFileIcon /><span style={{fontWeight:'600'}}>Click to select MP3</span><input name="file" type="file" accept=".mp3" required style={{display:'none'}} /></label>
                        </div>

                        {/* 👇 NEW: Cover Image Input */}
                        <div className="premium-input-group">
                            <label className="file-upload-zone" style={{borderColor: '#b3b3b3'}}>
                                <ImageIcon />
                                <span style={{fontWeight:'600'}}>Click to select Cover Art</span>
                                <input name="cover" type="file" accept="image/*" required style={{display:'none'}} />
                            </label>
                        </div>

                        <div style={{display:'flex', gap:'15px', marginTop:'30px'}}>
                            <button className="login-btn" style={{margin:0}}>🚀 Upload</button>
                            <button type="button" onClick={()=>setShowUpload(false)} style={{background:'transparent', border:'1px solid #555', color:'white', padding:'12px 25px', borderRadius:'50px', cursor:'pointer', fontWeight:'bold'}}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {showUpgradeModal && (
            <div className="premium-modal-overlay">
                <div className="premium-card">
                    <div style={{fontSize:'3rem', marginBottom:'10px'}}>💎</div>
                    <h2 style={{color:'#1db954', margin:0}}>Artist Plan</h2>
                    <p style={{color:'#ccc', margin:'10px 0 25px 0'}}>Pay $9.99/mo to verify and upload.</p>
                    <form onSubmit={handleUpgrade}>
                        <div className="premium-input-group"><textarea className="premium-input" placeholder="Tell us about yourself (Bio)..." value={upgradeBio} onChange={e=>setUpgradeBio(e.target.value)} required rows={3} style={{resize:'none'}} /></div>
                        <div className="premium-input-group"><label className="premium-label">Artist Profile Image</label><label className="file-upload-zone"><CameraIcon /><span>Select Artist Photo</span><input type="file" onChange={e=>setUpgradePic(e.target.files[0])} required style={{display:'none'}} /></label></div>
                        <div style={{display:'flex', gap:'15px', marginTop:'20px'}}><button className="login-btn" style={{margin:0, background:'white', color:'black', borderColor:'white'}}>Pay & Upgrade</button><button type="button" onClick={()=>setShowUpgradeModal(false)} style={{background:'transparent', border:'1px solid #555', color:'white', padding:'12px', borderRadius:'50px', cursor:'pointer'}}>Cancel</button></div>
                    </form>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default App