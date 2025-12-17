import { useState, useEffect, useRef } from 'react'
import './App.css' 
import Login from './Login'

// --- ICONS ---
const HomeIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
const UserIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
const StarIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="gold" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
const PlayIcon = ({size=24}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
const PauseIcon = ({size=24}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
const UploadIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
const BackIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
const CameraIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
const MusicFileIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1db954" strokeWidth="1.5"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
const LogoutIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
const ImageIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
const HeartIcon = ({ filled, size=24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#1db954" : "none"} stroke={filled ? "none" : "#b3b3b3"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
const LibraryIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
// 👇 NEW PLAYER ICONS
const NextIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#b3b3b3"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19" stroke="#b3b3b3" strokeWidth="2"></line></svg>
const PrevIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#b3b3b3"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5" stroke="#b3b3b3" strokeWidth="2"></line></svg>
const ShuffleIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
const RepeatIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
const VolumeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>

function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('home')
  const [viewedArtist, setViewedArtist] = useState(null)
  
  const [artists, setArtists] = useState([]) 
  const [songs, setSongs] = useState([])
  const [likedSongIds, setLikedSongIds] = useState([]) 

  const [showUpload, setShowUpload] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  const [upgradeBio, setUpgradeBio] = useState("")
  const [upgradePic, setUpgradePic] = useState(null)
  const [editName, setEditName] = useState("")
  const [editPic, setEditPic] = useState(null)

  // --- PLAYER STATE ---
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0) // 👇 Current progress (seconds)
  const [duration, setDuration] = useState(0)       // 👇 Total song length (seconds)
  const [volume, setVolume] = useState(1)           // 👇 Volume (0.0 to 1.0)
  const audioRef = useRef(null)

  useEffect(() => { 
      if(user) { fetchArtists(); fetchSongs(); fetchLikedIDs(); setEditName(user.firstName || ""); }
  }, [user])

  const fetchArtists = () => fetch('http://localhost:8080/users/artists').then(res => res.json()).then(setArtists)
  const fetchSongs = () => fetch('http://localhost:8080/songs').then(res => res.json()).then(setSongs)
  const fetchLikedIDs = () => fetch(`http://localhost:8080/likes/${user.id}/ids`).then(res => res.json()).then(setLikedSongIds)

  // --- AUDIO PLAYER LOGIC ---
  useEffect(() => {
    if(currentSong && audioRef.current) {
        if(isPlaying) {
            // This promise handling prevents "play() request interrupted" errors
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) { playPromise.catch(() => setIsPlaying(false)); }
        } else {
            audioRef.current.pause();
        }
    }
  }, [currentSong, isPlaying])

  // 👇 Listen for time updates from the <audio> element
  useEffect(() => {
      const audio = audioRef.current;
      if(!audio) return;
      
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', handleEnded);
      audio.volume = volume; // Apply volume

      return () => { // Cleanup listeners
          audio.removeEventListener('timeupdate', updateTime);
          audio.removeEventListener('loadedmetadata', updateDuration);
          audio.removeEventListener('ended', handleEnded);
      }
  }, [currentSong, volume]);

  const playSong = (song) => {
    if (currentSong && currentSong.id === song.id) setIsPlaying(!isPlaying);
    else { setCurrentSong(song); setIsPlaying(true); }
  }

  // 👇 Handle dragging the progress bar
  const handleSeek = (e) => {
      const newTime = e.target.value;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
  }

  // 👇 Helper to convert seconds to "MM:SS" format
  const formatTime = (time) => {
      if(isNaN(time)) return "0:00";
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  const toggleLike = (e, song) => {
      e.stopPropagation(); 
      fetch(`http://localhost:8080/likes/toggle?userId=${user.id}&songId=${song.id}`, { method: 'POST' })
      .then(res => res.json()).then(isLiked => {
          isLiked ? setLikedSongIds([...likedSongIds, song.id]) : setLikedSongIds(likedSongIds.filter(id => id !== song.id));
      });
  }

  // (Kept Profile Update, Upgrade, Upload handlers same as before for brevity, they are below)
  const handleProfileUpdate = (e) => { e.preventDefault(); fetch(`http://localhost:8080/users/${user.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ firstName: editName }) }).then(res => res.json()).then(updatedUser => { if(editPic) { const formData = new FormData(); formData.append("file", editPic); fetch(`http://localhost:8080/users/${user.id}/image`, {method:'POST', body:formData}).then(res => res.json()).then(finalUser => { setUser(finalUser); alert("✅ Profile Updated!"); setView('home'); }).catch(() => { alert("⚠️ Name saved, but image too big."); setView('home'); }) } else { setUser(updatedUser); alert("✅ Name Updated!"); setView('home'); }}).catch(() => alert("❌ Update Failed.")) }
  const handleUpgrade = (e) => { e.preventDefault(); if(!upgradePic) return alert("Artists need a profile picture!"); if(window.confirm("💎 Pay $9.99 to become an Artist?")) { fetch(`http://localhost:8080/users/${user.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ role: 'ARTIST', bio: upgradeBio }) }).then(res => res.json()).then(() => { const formData = new FormData(); formData.append("file", upgradePic); fetch(`http://localhost:8080/users/${user.id}/image`, {method:'POST', body:formData}).then(res => res.json()).then(finalUser => { setUser(finalUser); setShowUpgradeModal(false); alert("🎉 Welcome to the Artist Club!"); fetchArtists(); }) }) } }
  const handleUpload = (e) => { e.preventDefault(); const formData = new FormData(); formData.append("title", e.target.title.value); formData.append("artist", user.firstName || user.username); formData.append("file", e.target.file.files[0]); formData.append("cover", e.target.cover.files[0]); fetch('http://localhost:8080/songs/upload', { method: 'POST', body: formData }).then(() => { alert("🎵 Song & Cover Uploaded!"); setShowUpload(false); fetchSongs(); }).catch(() => alert("❌ Upload Failed (Check file sizes!)")); }

  const getImage = (u) => u.profilePic ? `http://localhost:8080/music/${u.profilePic}?t=${new Date().getTime()}` : `https://ui-avatars.com/api/?name=${u.username}&background=random`;
  const getSongCover = (s) => s.coverImage ? `http://localhost:8080/music/${s.coverImage}` : `https://ui-avatars.com/api/?name=${s.title}&background=1db954&color=fff&size=200`;

  const cardStyle = { minWidth: '180px', width: '180px', flexShrink: 0, scrollSnapAlign: 'start' };
  const imageContainerStyle = { width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', position: 'relative', marginBottom: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' };
  const imageStyle = { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' };
  const titleStyle = { fontSize:'0.95rem', fontWeight:'600', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', margin:0 };
  const artistCircleStyle = { width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 5px 15px rgba(0,0,0,0.4)', marginBottom: '10px' };

  if (!user) return <Login onLogin={setUser} />

  const mySongs = songs.filter(s => s.artist === (user.firstName || user.username));
  const likedSongsList = songs.filter(s => likedSongIds.includes(s.id));

  return (
    <div className="app-layout" style={{height: '100vh', overflow: 'hidden'}}>
      {/* Hidden Audio Element */}
      {currentSong && <audio ref={audioRef} src={`http://localhost:8080/music/${currentSong.filePath}`} onEnded={()=>setIsPlaying(false)} />}

      <div className="sidebar">
        <div className="logo">GrooveHaven</div>
        <div className="nav-section">
            <div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => {setView('home'); setViewedArtist(null)}}><HomeIcon /> <span>{user.role === 'ARTIST' ? "Dashboard" : "Home"}</span></div>
            {user.role === 'LISTENER' && <div className={`nav-item ${view === 'liked' ? 'active' : ''}`} onClick={() => setView('liked')}><LibraryIcon /> <span>Liked Songs</span></div>}
            <div className={`nav-item ${view === 'profile' ? 'active' : ''}`} onClick={() => setView('profile')}><UserIcon /> <span>My Profile</span></div>
        </div>
        {user.role === 'LISTENER' && <div className="nav-section"><div className="nav-item" onClick={() => setShowUpgradeModal(true)} style={{color: '#ffd700'}}><StarIcon /> <span>Become an Artist</span></div></div>}
        <div style={{padding:'0 24px', marginTop:'auto', marginBottom:'20px'}}><div className="logout-btn-sidebar" onClick={() => setUser(null)}><LogoutIcon /> <span>Log Out</span></div></div>
      </div>

      {/* Main content has extra padding at bottom for the player bar */}
      <div className="main-content" style={{overflowY: 'auto', paddingBottom: currentSong ? '120px' : '40px'}}>
        
        <div className="header-bar">
            {view === 'artist' && <div onClick={() => setView('home')} style={{cursor:'pointer', marginRight:'20px'}}><BackIcon /></div>}
            <div className="greeting">{view === 'profile' ? "Account Settings" : view === 'liked' ? "Your Collection" : (view === 'artist' ? viewedArtist.firstName : `Hello, ${user.firstName || user.username}`)}</div>
            {(user.role === 'ARTIST' && view === 'home') && (<button className="add-btn-pill" onClick={() => setShowUpload(true)} style={{display:'flex', alignItems:'center', gap:'5px'}}><UploadIcon /> New Drop</button>)}
        </div>

        {/* DASHBOARDS (Artist & Listener) - Same as before */}
        {(view === 'home' && user.role === 'ARTIST') && (
            <>
                <div className="dashboard-hero"><h1>Artist Command Center</h1><p>Manage your music, check your stats, and grow your audience.</p></div>
                <div className="stats-container">
                    <div className="stat-card"><span className="stat-number">{mySongs.length}</span><span className="stat-label">Tracks Uploaded</span></div>
                    <div className="stat-card"><span className="stat-number">12.5K</span><span className="stat-label">Total Streams</span></div>
                    <div className="stat-card"><span className="stat-number">842</span><span className="stat-label">Followers</span></div>
                </div>
                <div style={{marginBottom:'40px', background:'rgba(255,255,255,0.02)', padding:'20px', borderRadius:'16px', border:'1px solid rgba(255,255,255,0.05)'}}>
                    <h4 style={{marginTop:0, color:'#b3b3b3'}}>Weekly Listener Growth</h4>
                    <div style={{display:'flex', alignItems:'flex-end', gap:'10px', height:'100px', paddingBottom:'10px'}}>{[40, 60, 45, 80, 55, 90, 100].map((h, i) => (<div key={i} style={{flex:1, background: i===6 ? '#1db954' : '#333', height: `${h}%`, borderRadius:'4px 4px 0 0', opacity:0.8}}></div>))}</div>
                </div>
                <h3 style={{marginBottom:'15px'}}>Your Discography</h3>
                <div className="track-list-container">{mySongs.map(song => (<div key={song.id} className="track-row" onClick={() => playSong(song)}><img src={getSongCover(song)} className="track-img-small" style={{objectFit:'cover'}} /><div className="track-info"><div className="track-title">{song.title}</div><div className="track-meta">Added recently</div></div><div className="track-actions">{(currentSong?.id === song.id && isPlaying) ? <PauseIcon /> : <PlayIcon />}</div></div>))}</div>
            </>
        )}

        {(view === 'home' && user.role !== 'ARTIST') && (
            <>
                <h2 style={{fontSize: '1.5rem', marginBottom: '15px'}}>Fresh Drops 🎵</h2>
                <div style={{display:'flex', gap:'20px', overflowX:'auto', paddingBottom:'25px', marginBottom:'30px', scrollSnapType: 'x mandatory'}}>
                    {songs.slice(0, 10).map(song => (
                        <div key={song.id} className="artist-card-hover" style={cardStyle} onClick={() => playSong(song)}>
                            <div style={imageContainerStyle}>
                                <img src={getSongCover(song)} style={imageStyle} />
                                <div className="play-overlay" style={{opacity: (currentSong?.id === song.id && isPlaying) ? 1 : undefined, transform: (currentSong?.id === song.id && isPlaying) ? 'translateY(0)' : undefined}}>{(currentSong?.id === song.id && isPlaying) ? <PauseIcon /> : <PlayIcon />}</div>
                            </div>
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                <div style={{overflow:'hidden', maxWidth:'130px'}}><h3 style={titleStyle} title={song.title}>{song.title}</h3><p className="card-desc" style={{fontSize:'0.8rem', margin:0}}>{song.artist}</p></div>
                                <div onClick={(e) => toggleLike(e, song)} style={{cursor:'pointer', padding:'5px'}}><HeartIcon filled={likedSongIds.includes(song.id)} /></div>
                            </div>
                        </div>
                    ))}
                </div>
                <h2 style={{fontSize: '1.5rem', marginBottom: '20px'}}>Popular Artists</h2>
                <div className="artist-grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap:'30px'}}>
                    {artists.map(artist => (<div key={artist.id} className="artist-card" style={{background:'transparent', border:'none', boxShadow:'none', textAlign:'center', cursor:'pointer'}} onClick={() => { setViewedArtist(artist); setView('artist'); }}><img src={getImage(artist)} style={artistCircleStyle} className="artist-img-hover" /><h3 className="card-title" style={{fontSize:'1rem', margin:'5px 0'}}>{artist.firstName || artist.username}</h3><p className="card-desc" style={{margin:0}}>Artist</p></div>))}
                </div>
            </>
        )}

        {view === 'liked' && (
            <>
                <div className="dashboard-hero" style={{background: 'linear-gradient(135deg, #450af5 0%, #c4efd9 100%)'}}><h1>Your Library</h1><p>{likedSongsList.length} Liked Songs</p></div>
                <div className="track-list-container">{likedSongsList.length > 0 ? likedSongsList.map(song => (<div key={song.id} className="track-row" onClick={() => playSong(song)}><img src={getSongCover(song)} className="track-img-small" style={{objectFit:'cover'}} /><div className="track-info"><div className="track-title">{song.title}</div><div className="track-meta">{song.artist}</div></div><div className="track-actions"><div onClick={(e) => toggleLike(e, song)} style={{marginRight:'15px', cursor:'pointer'}}><HeartIcon filled={true} /></div>{(currentSong?.id === song.id && isPlaying) ? <PauseIcon /> : <PlayIcon />}</div></div>)) : (<div style={{textAlign:'center', padding:'50px', color:'#888'}}><h3>No liked songs yet.</h3><button className="login-btn" style={{width:'auto', marginTop:'10px'}} onClick={() => setView('home')}>Find Music</button></div>)}</div>
            </>
        )}

        {view === 'artist' && viewedArtist && (
            <>
                <div style={{display:'flex', alignItems:'center', gap:'20px', marginBottom:'40px'}}><img src={getImage(viewedArtist)} style={{width:'180px', height:'180px', borderRadius:'50%', objectFit:'cover', boxShadow:'0 10px 40px rgba(0,0,0,0.6)'}} /><div><h1 style={{fontSize:'3.5rem', margin:0, fontWeight:'800'}}>{viewedArtist.firstName || viewedArtist.username}</h1><p style={{color:'#ccc', fontSize:'1.1rem'}}>{viewedArtist.bio || "No bio yet."}</p></div></div>
                <h3>Songs</h3>
                <div className="artist-grid">{songs.filter(s => s.artist === (viewedArtist.firstName || viewedArtist.username)).map(song => (<div key={song.id} className="artist-card" onClick={() => playSong(song)}><div className="image-box"><img src={getSongCover(song)} className="artist-img" style={{objectFit:'cover'}} /><div className="play-overlay" style={{opacity: (currentSong?.id === song.id && isPlaying) ? 1 : undefined, transform: (currentSong?.id === song.id && isPlaying) ? 'translateY(0)' : undefined}}>{(currentSong?.id === song.id && isPlaying) ? <PauseIcon /> : <PlayIcon />}</div></div><div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'10px'}}><h3 className="card-title" style={titleStyle}>{song.title}</h3><div onClick={(e) => toggleLike(e, song)} style={{cursor:'pointer', padding:'5px'}}><HeartIcon filled={likedSongIds.includes(song.id)} /></div></div></div>))}</div>
            </>
        )}

        {/* PROFILE & MODALS (Hidden for brevity, same as before) */}
        {view === 'profile' && (<div className="profile-editor-container"><form onSubmit={handleProfileUpdate}><div className="profile-avatar-wrapper"><label htmlFor="profile-upload" style={{cursor: 'pointer'}}><img src={editPic ? URL.createObjectURL(editPic) : getImage(user)} className="profile-avatar-large" style={{objectFit:'cover'}} /><div className="avatar-edit-overlay"><CameraIcon /></div></label><input id="profile-upload" type="file" onChange={e=>setEditPic(e.target.files[0])} style={{display:'none'}} /></div><div className="premium-input-group"><label className="premium-label">Display Name</label><input className="premium-input" value={editName} onChange={e=>setEditName(e.target.value)} placeholder="How should we call you?" /></div><div className="premium-input-group"><label className="premium-label">Role</label><div style={{color:'white', fontWeight:'bold', fontSize:'1.2rem', display:'flex', alignItems:'center', gap:'10px'}}>{user.role} {user.role === 'ARTIST' && <span style={{fontSize:'0.8rem', background:'#1db954', padding:'2px 8px', borderRadius:'10px', color:'black'}}>VERIFIED</span>}</div></div><button type="submit" className="login-btn" style={{marginTop:'20px'}}>💾 Save Profile Changes</button></form></div>)}
        {showUpload && (<div className="premium-modal-overlay"><div className="premium-card"><h2 style={{color:'white', marginBottom:'5px'}}>Upload New Track</h2><form onSubmit={handleUpload}><div className="premium-input-group"><input name="title" className="premium-input" placeholder="Song Title" required /></div><div className="premium-input-group"><label className="file-upload-zone"><MusicFileIcon /><span style={{fontWeight:'600'}}>Select MP3</span><input name="file" type="file" accept=".mp3" required style={{display:'none'}} /></label></div><div className="premium-input-group"><label className="file-upload-zone" style={{borderColor: '#b3b3b3'}}><ImageIcon /><span style={{fontWeight:'600'}}>Select Cover Art</span><input name="cover" type="file" accept="image/*" required style={{display:'none'}} /></label></div><div style={{display:'flex', gap:'15px', marginTop:'30px'}}><button className="login-btn" style={{margin:0}}>🚀 Upload</button><button type="button" onClick={()=>setShowUpload(false)} style={{background:'transparent', border:'1px solid #555', color:'white', padding:'12px 25px', borderRadius:'50px', cursor:'pointer', fontWeight:'bold'}}>Cancel</button></div></form></div></div>)}
        {showUpgradeModal && (<div className="premium-modal-overlay"><div className="premium-card"><div style={{fontSize:'3rem', marginBottom:'10px'}}>💎</div><h2 style={{color:'#1db954', margin:0}}>Artist Plan</h2><form onSubmit={handleUpgrade}><div className="premium-input-group"><textarea className="premium-input" placeholder="Bio..." value={upgradeBio} onChange={e=>setUpgradeBio(e.target.value)} required rows={3} style={{resize:'none'}} /></div><div className="premium-input-group"><label className="file-upload-zone"><CameraIcon /><span>Select Artist Photo</span><input type="file" onChange={e=>setUpgradePic(e.target.files[0])} required style={{display:'none'}} /></label></div><div style={{display:'flex', gap:'15px', marginTop:'20px'}}><button className="login-btn" style={{margin:0, background:'white', color:'black'}}>Pay & Upgrade</button><button type="button" onClick={()=>setShowUpgradeModal(false)} style={{background:'transparent', border:'1px solid #555', color:'white', padding:'12px', borderRadius:'50px', cursor:'pointer'}}>Cancel</button></div></form></div></div>)}
      </div>

      {/* === 👇 NEW: THE PROFESSIONAL GLASS MUSIC PLAYER BAR === */}
      {currentSong && (
        <div className="glass-player-bar">
            {/* LEFT: Song Info */}
            <div style={{display:'flex', alignItems:'center', gap:'15px', flex:1}}>
                <img src={getSongCover(currentSong)} style={{width:'60px', height:'60px', borderRadius:'6px', objectFit:'cover'}} />
                <div style={{overflow:'hidden'}}>
                    <div style={{fontWeight:'600', fontSize:'0.95rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{currentSong.title}</div>
                    <div style={{fontSize:'0.8rem', color:'#b3b3b3'}}>{currentSong.artist}</div>
                </div>
                <div onClick={(e) => toggleLike(e, currentSong)} style={{cursor:'pointer', marginLeft:'10px'}}><HeartIcon filled={likedSongIds.includes(currentSong.id)} size={20} /></div>
            </div>

            {/* CENTER: Controls & Progress */}
            <div style={{flex:2, display:'flex', flexDirection:'column', alignItems:'center', maxWidth:'600px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'25px', marginBottom:'5px'}}>
                    <div style={{cursor:'pointer'}}><ShuffleIcon /></div>
                    <div style={{cursor:'pointer'}}><PrevIcon /></div>
                    <div onClick={() => setIsPlaying(!isPlaying)} style={{cursor:'pointer', background:'white', borderRadius:'50%', padding:'8px', display:'flex'}}>{isPlaying ? <PauseIcon size={20} fill="black"/> : <PlayIcon size={20} fill="black" />}</div>
                    <div style={{cursor:'pointer'}}><NextIcon /></div>
                    <div style={{cursor:'pointer'}}><RepeatIcon /></div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'10px', width:'100%', fontSize:'0.75rem', color:'#b3b3b3'}}>
                    <span>{formatTime(currentTime)}</span>
                    <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeek} style={{flex:1}} />
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* RIGHT: Volume & Extra */}
            <div style={{flex:1, display:'flex', justifyContent:'flex-end', alignItems:'center', gap:'10px'}}>
                <VolumeIcon />
                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(e.target.value)} style={{width:'100px'}} />
            </div>
        </div>
      )}
    </div>
  )
}

export default App