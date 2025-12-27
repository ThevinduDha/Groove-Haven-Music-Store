import { useState, useEffect, useRef } from 'react'
import './App.css' 
import Login from './Login'
import { Toaster, toast } from 'react-hot-toast'

// --- ICONS ---
const HomeIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
const UserIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
const StarIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="gold" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
const PlayIcon = ({size=24, fill="black"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
const PauseIcon = ({size=24, fill="black"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
const UploadIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
const BackIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
const CameraIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
const MusicFileIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1db954" strokeWidth="1.5"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
const LogoutIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
const ImageIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
const HeartIcon = ({ filled, size=24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#1db954" : "none"} stroke={filled ? "none" : "#b3b3b3"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
const LibraryIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
const NextIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#b3b3b3"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19" stroke="#b3b3b3" strokeWidth="2"></line></svg>
const PrevIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#b3b3b3"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5" stroke="#b3b3b3" strokeWidth="2"></line></svg>
const ShuffleIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
const RepeatIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
const VolumeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
const ShieldIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
const TrashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
const SwitchIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
const SearchIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
const UserPlusIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
const UserCheckIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
const PlusIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
const ListIcon = () => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
const MessageIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
const EditIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
const SmallTrashIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
const DiscIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>


function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('home')
  const [viewedArtist, setViewedArtist] = useState(null)
  const [isArtistMode, setIsArtistMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const [artists, setArtists] = useState([]) 
  const [songs, setSongs] = useState([])
  const [allUsers, setAllUsers] = useState([]) 
  const [likedSongIds, setLikedSongIds] = useState([]) 

  // Album States
  const [myAlbums, setMyAlbums] = useState([])
  const [showCreateAlbum, setShowCreateAlbum] = useState(false)
  
  const [searchQuery, setSearchQuery] = useState("") 
  const [searchResults, setSearchResults] = useState(null)

  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(0) 
  const [myFollowerCount, setMyFollowerCount] = useState(0)

  const [playlists, setPlaylists] = useState([])
  const [viewedPlaylist, setViewedPlaylist] = useState(null)
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false)
  const [songToAdd, setSongToAdd] = useState(null)

  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [activeSongForComments, setActiveSongForComments] = useState(null)
  const [comments, setComments] = useState([])
  const [newCommentText, setNewCommentText] = useState("")
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editText, setEditText] = useState("")

  const [showUpload, setShowUpload] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeBio, setUpgradeBio] = useState("")
  const [upgradePic, setUpgradePic] = useState(null)
  const [editName, setEditName] = useState("")
  const [editPic, setEditPic] = useState(null)

  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef(null)

  useEffect(() => { 
      if(user) { 
          fetchArtists(); fetchSongs(); fetchLikedIDs(); 
          setEditName(user.firstName || ""); 
          if(user.role === 'ADMIN') fetchAllUsers();
          if(user.role === 'ARTIST') {
              fetch(`http://localhost:8080/follow/count?artistId=${user.id}`).then(res => res.json()).then(setMyFollowerCount);
              fetchAlbums(user.id); 
          }
          fetchPlaylists();
      }
  }, [user])

  useEffect(() => { setMobileMenuOpen(false); }, [view]);

  useEffect(() => {
      if(searchQuery.length > 0) {
          fetch(`http://localhost:8080/search?query=${searchQuery}`).then(res => res.json()).then(data => setSearchResults(data))
      } else { setSearchResults(null) }
  }, [searchQuery])

  useEffect(() => {
    if(view === 'artist' && viewedArtist) {
        fetch(`http://localhost:8080/follow/status?followerId=${user.id}&artistId=${viewedArtist.id}`).then(res => res.json()).then(setIsFollowing)
        fetch(`http://localhost:8080/follow/count?artistId=${viewedArtist.id}`).then(res => res.json()).then(setFollowerCount)
    }
  }, [view, viewedArtist, user])

  const fetchArtists = () => fetch('http://localhost:8080/users/artists').then(res => res.json()).then(setArtists)
  const fetchSongs = () => fetch('http://localhost:8080/songs').then(res => res.json()).then(setSongs)
  const fetchLikedIDs = () => fetch(`http://localhost:8080/likes/${user.id}/ids`).then(res => res.json()).then(setLikedSongIds)
  const fetchAllUsers = () => fetch('http://localhost:8080/users/artists').then(res => res.json()).then(setAllUsers) 
  const fetchPlaylists = () => fetch(`http://localhost:8080/playlists/user/${user.id}`).then(res => res.json()).then(setPlaylists)
  const fetchAlbums = (userId) => fetch(`http://localhost:8080/albums/artist/${userId}`).then(res => res.json()).then(setMyAlbums)

  const handleDeleteUser = (userId) => {
      if(window.confirm("⚠️ Are you sure? This will delete the user and their likes!")) {
          fetch(`http://localhost:8080/users/${userId}`, { method: 'DELETE' }).then(() => { toast.success("User Deleted!"); setAllUsers(allUsers.filter(u => u.id !== userId)); }).catch(() => toast.error("❌ Error deleting user"));
      }
  }

  const toggleFollow = () => {
    fetch(`http://localhost:8080/follow/toggle?followerId=${user.id}&artistId=${viewedArtist.id}`, { method: 'POST' })
        .then(res => res.json()).then(newStatus => { setIsFollowing(newStatus); setFollowerCount(prev => newStatus ? prev + 1 : prev - 1); })
  }

  const handleCreatePlaylist = (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      fetch(`http://localhost:8080/playlists/create?name=${name}&userId=${user.id}`, { method: 'POST' })
          .then(res => res.json())
          .then(newPlaylist => { setPlaylists([...playlists, newPlaylist]); setShowCreatePlaylist(false); toast.success("Playlist Created!"); })
  }

  const handleCreateAlbum = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", e.target.title.value);
      formData.append("description", e.target.description.value);
      formData.append("artistId", user.id);
      formData.append("cover", e.target.cover.files[0]);

      fetch('http://localhost:8080/albums/create', { method: 'POST', body: formData })
          .then(res => res.json())
          .then(newAlbum => { 
              setMyAlbums([...myAlbums, newAlbum]); 
              setShowCreateAlbum(false); 
              toast.success("💿 Album Created!"); 
          })
          .catch(() => toast.error("Error creating album"));
  }

  const handleAddToPlaylist = (playlistId) => {
      fetch(`http://localhost:8080/playlists/${playlistId}/add?songId=${songToAdd.id}`, { method: 'POST' })
          .then(res => res.json())
          .then(updatedPlaylist => { setPlaylists(playlists.map(p => p.id === playlistId ? updatedPlaylist : p)); toast.success(`Added to ${updatedPlaylist.name}!`); setShowAddToPlaylist(false); setSongToAdd(null); })
  }

  const handleOpenComments = (song) => {
      setActiveSongForComments(song);
      fetch(`http://localhost:8080/comments/song/${song.id}`)
          .then(res => res.json())
          .then(setComments);
      setShowCommentsModal(true);
  }

  const handlePostComment = (e) => {
      e.preventDefault();
      if(!newCommentText.trim()) return;
      fetch(`http://localhost:8080/comments/add?text=${newCommentText}&userId=${user.id}&songId=${activeSongForComments.id}`, { method: 'POST' })
          .then(res => res.json())
          .then(newComment => { setComments([...comments, newComment]); setNewCommentText(""); toast.success("Comment Posted"); })
  }

  const handleDeleteComment = (commentId) => {
    if(window.confirm("Delete this comment?")) {
        fetch(`http://localhost:8080/comments/${commentId}`, { method: 'DELETE' })
            .then(() => { setComments(comments.filter(c => c.id !== commentId)); toast.success("Comment Deleted"); });
    }
  }

  const handleEditComment = (commentId, text) => { setEditingCommentId(commentId); setEditText(text); }
  const saveEditComment = (commentId) => { fetch(`http://localhost:8080/comments/${commentId}?text=${editText}`, { method: 'PUT' }).then(res => res.json()).then(updated => { setComments(comments.map(c => c.id === commentId ? updated : c)); setEditingCommentId(null); toast.success("Comment Updated"); }) }

  useEffect(() => { if(currentSong && audioRef.current) { if(isPlaying) { const p = audioRef.current.play(); if(p !== undefined) p.catch(()=>setIsPlaying(false)); } else { audioRef.current.pause(); } } }, [currentSong, isPlaying])
  useEffect(() => { const audio = audioRef.current; if(!audio) return; const updateTime = () => setCurrentTime(audio.currentTime); const updateDuration = () => setDuration(audio.duration); const handleEnded = () => setIsPlaying(false); audio.addEventListener('timeupdate', updateTime); audio.addEventListener('loadedmetadata', updateDuration); audio.addEventListener('ended', handleEnded); audio.volume = volume; return () => { audio.removeEventListener('timeupdate', updateTime); audio.removeEventListener('loadedmetadata', updateDuration); audio.removeEventListener('ended', handleEnded); } }, [currentSong, volume]);

  const playSong = (song) => { 
      if (currentSong && currentSong.id === song.id) {
          setIsPlaying(!isPlaying); 
      } else { 
          setCurrentSong(song); 
          setIsPlaying(true);
          
          // 👇 NOTIFY BACKEND & UPDATE LOCAL STREAM COUNT
          fetch(`http://localhost:8080/songs/${song.id}/play`, { method: 'POST' });
          setSongs(prevSongs => prevSongs.map(s => 
              s.id === song.id ? { ...s, streamCount: (s.streamCount || 0) + 1 } : s
          ));
      } 
  }

  const handleSeek = (e) => { const newTime = e.target.value; audioRef.current.currentTime = newTime; setCurrentTime(newTime); }
  const formatTime = (time) => { if(isNaN(time)) return "0:00"; const m = Math.floor(time / 60); const s = Math.floor(time % 60); return `${m}:${s.toString().padStart(2, '0')}`; }
  const toggleLike = (e, song) => { e.stopPropagation(); fetch(`http://localhost:8080/likes/toggle?userId=${user.id}&songId=${song.id}`, { method: 'POST' }).then(res => res.json()).then(isLiked => { isLiked ? setLikedSongIds([...likedSongIds, song.id]) : setLikedSongIds(likedSongIds.filter(id => id !== song.id)); toast.success(isLiked ? "Added to Liked Songs" : "Removed from Liked Songs"); }); }
  const handleProfileUpdate = (e) => { e.preventDefault(); fetch(`http://localhost:8080/users/${user.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ firstName: editName }) }).then(res => res.json()).then(updatedUser => { if(editPic) { const formData = new FormData(); formData.append("file", editPic); fetch(`http://localhost:8080/users/${user.id}/image`, {method:'POST', body:formData}).then(res => res.json()).then(finalUser => { setUser(finalUser); toast.success("Profile Updated!"); setView('home'); }).catch(() => { toast.error("⚠️ Name saved, but image too big."); setView('home'); }) } else { setUser(updatedUser); toast.success("Name Updated!"); setView('home'); }}).catch(() => toast.error("❌ Update Failed.")) }
  const handleUpgrade = (e) => { e.preventDefault(); if(!upgradePic) return toast.error("Artists need a profile picture!"); if(window.confirm("💎 Pay $9.99 to become an Artist?")) { fetch(`http://localhost:8080/users/${user.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ role: 'ARTIST', bio: upgradeBio }) }).then(res => res.json()).then(() => { const formData = new FormData(); formData.append("file", upgradePic); fetch(`http://localhost:8080/users/${user.id}/image`, {method:'POST', body:formData}).then(res => res.json()).then(finalUser => { setUser(finalUser); setShowUpgradeModal(false); toast.success("🎉 Welcome to the Artist Club!"); fetchArtists(); }) }) } }
  
  const handleUpload = (e) => { 
      e.preventDefault(); 
      const formData = new FormData(); 
      formData.append("title", e.target.title.value); 
      formData.append("artist", user.firstName || user.username); 
      formData.append("file", e.target.file.files[0]); 
      formData.append("cover", e.target.cover.files[0]);
      
      const albumId = e.target.albumId.value;
      if(albumId && albumId !== "none") {
          formData.append("albumId", albumId);
      }

      fetch('http://localhost:8080/songs/upload', { method: 'POST', body: formData })
        .then(() => { toast.success("🎵 Song & Cover Uploaded!"); setShowUpload(false); fetchSongs(); })
        .catch(() => toast.error("❌ Upload Failed (Check file sizes!)")); 
  }

  const getImage = (u) => u.profilePic ? `http://localhost:8080/music/${u.profilePic}?t=${new Date().getTime()}` : `https://ui-avatars.com/api/?name=${u.username}&background=random`;
  const getSongCover = (s) => s.coverImage ? `http://localhost:8080/music/${s.coverImage}` : `https://ui-avatars.com/api/?name=${s.title}&background=1db954&color=fff&size=200`;
  const getAlbumCover = (a) => a.coverImage ? `http://localhost:8080/music/${a.coverImage}` : `https://ui-avatars.com/api/?name=${a.title}&background=1db954&color=fff&size=200`;
  const getTimeAgo = (dateStr) => { if(!dateStr) return "Just now"; const date = new Date(dateStr); const now = new Date(); const diff = Math.floor((now - date) / 1000); if(diff < 60) return "Just now"; if(diff < 3600) return `${Math.floor(diff/60)} mins ago`; if(diff < 86400) return `${Math.floor(diff/3600)} hours ago`; return `${Math.floor(diff/86400)} days ago`; }

  const cardStyle = { minWidth: '180px', width: '180px', flexShrink: 0, scrollSnapAlign: 'start' };
  const imageContainerStyle = { width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', position: 'relative', marginBottom: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' };
  const imageStyle = { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' };
  const titleStyle = { fontSize:'0.95rem', fontWeight:'600', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', margin:0 };
  const artistCircleStyle = { width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 5px 15px rgba(0,0,0,0.4)', marginBottom: '10px' };

  if (!user) return <Login onLogin={setUser} />

  const mySongs = songs.filter(s => s.artist === (user.firstName || user.username));
  const likedSongsList = songs.filter(s => likedSongIds.includes(s.id));

  const showArtistDashboard = user.role === 'ARTIST' && isArtistMode && !searchQuery;
  const showListenerView = (user.role === 'LISTENER' || (user.role === 'ARTIST' && !isArtistMode)) && !searchQuery;
  const showAdminView = user.role === 'ADMIN' && !searchQuery;
  const showSearchView = searchQuery.length > 0 && searchResults;

  return (
    <div className="app-layout" style={{height: '100vh', overflow: 'hidden'}}>
      <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
      {currentSong && <audio ref={audioRef} src={`http://localhost:8080/music/${currentSong.filePath}`} onEnded={()=>setIsPlaying(false)} />}
      {mobileMenuOpen && <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}></div>}

      <div className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="logo">GrooveHaven</div>
        <div className="nav-section">
            <div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => {setView('home'); setViewedArtist(null); setSearchQuery("")}}><HomeIcon /> <span>Home</span></div>
            {user.role !== 'ADMIN' && <div className={`nav-item ${view === 'liked' ? 'active' : ''}`} onClick={() => setView('liked')}><LibraryIcon /> <span>Liked Songs</span></div>}
            <div className={`nav-item ${view === 'profile' ? 'active' : ''}`} onClick={() => setView('profile')}><UserIcon /> <span>My Profile</span></div>
        </div>
        
        {user.role !== 'ADMIN' && (
            <div className="nav-section">
                <div style={{padding: '0 16px', marginBottom: '10px', fontWeight: 'bold', fontSize: '0.8rem', color: '#b3b3b3', letterSpacing: '1px'}}>YOUR PLAYLISTS</div>
                <div className="nav-item" onClick={() => setShowCreatePlaylist(true)} style={{opacity: 0.8}}><div style={{background: 'white', padding: '2px', borderRadius: '2px', color:'black', display:'flex'}}><PlusIcon /></div> <span>New Playlist</span></div>
                <div style={{height: '150px', overflowY: 'auto'}}>
                    {playlists.map(p => (
                        <div key={p.id} className={`nav-item ${view === 'playlist' && viewedPlaylist?.id === p.id ? 'active' : ''}`} onClick={() => { setView('playlist'); setViewedPlaylist(p); }}>
                            <ListIcon /> <span>{p.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
        {user.role === 'ARTIST' && <div className="nav-section"><div className="nav-item" onClick={() => setIsArtistMode(!isArtistMode)} style={{color: isArtistMode ? '#1db954' : '#b3b3b3'}}><SwitchIcon /> <span>{isArtistMode ? "Artist View" : "Listener View"}</span></div></div>}
        {user.role === 'ADMIN' && <div className="nav-section"><div className="nav-item active" style={{color:'red'}}><ShieldIcon /> <span>Admin Panel</span></div></div>}
        {user.role === 'LISTENER' && <div className="nav-section"><div className="nav-item" onClick={() => setShowUpgradeModal(true)} style={{color: '#ffd700'}}><StarIcon /> <span>Become an Artist</span></div></div>}
        <div style={{padding:'0 24px', marginTop:'auto', marginBottom:'20px'}}><div className="logout-btn-sidebar" onClick={() => setUser(null)}><LogoutIcon /> <span>Log Out</span></div></div>
      </div>

      <div className="main-content" style={{overflowY: 'auto', paddingBottom: currentSong ? '120px' : '40px'}}>
        <div className="header-bar" style={{gap:'20px'}}>
            <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><MenuIcon /></div>
            {view === 'artist' && <div onClick={() => setView('home')} style={{cursor:'pointer', marginRight:'20px'}}><BackIcon /></div>}
            <div className="search-container" style={{flex:1, maxWidth:'400px', position:'relative'}}>
                 <input placeholder="What do you want to play?" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{width:'100%', padding:'12px 20px 12px 45px', borderRadius:'50px', border:'none', background:'#333', color:'white', fontSize:'0.9rem'}}/>
                 <div style={{position:'absolute', left:'15px', top:'50%', transform:'translateY(-50%)'}}><SearchIcon /></div>
            </div>
            <div className="greeting desktop-only" style={{marginLeft:'auto'}}>{view === 'profile' ? "Account Settings" : view === 'liked' ? "Your Collection" : (view === 'artist' ? viewedArtist.firstName : `Hello, ${user.firstName || user.username}`)}</div>
            {(showArtistDashboard && view === 'home') && (
                <div style={{display:'flex', gap:'10px'}}>
                    <button className="add-btn-pill" onClick={() => setShowCreateAlbum(true)} style={{display:'flex', alignItems:'center', gap:'5px', background:'#555'}}><DiscIcon /> New Album</button>
                    <button className="add-btn-pill" onClick={() => setShowUpload(true)} style={{display:'flex', alignItems:'center', gap:'5px'}}><UploadIcon /> New Drop</button>
                </div>
            )}
        </div>

        {showSearchView && (
            <>
                <h2 style={{fontSize: '1.5rem', marginBottom: '15px'}}>Top Result</h2>
                {searchResults.artists && searchResults.artists.length > 0 && (
                    <div className="artist-grid" style={{marginBottom:'30px'}}>{searchResults.artists.map(artist => (<div key={artist.id} className="artist-card" style={{background:'transparent', border:'none', boxShadow:'none', textAlign:'center', cursor:'pointer'}} onClick={() => { setViewedArtist(artist); setView('artist'); }}><img src={getImage(artist)} style={artistCircleStyle} className="artist-img-hover" /><h3 className="card-title" style={{fontSize:'1rem', margin:'5px 0'}}>{artist.firstName || artist.username}</h3><p className="card-desc" style={{margin:0}}>Artist</p></div>))}</div>
                )}
                {searchResults.songs && searchResults.songs.length > 0 ? (
                    <div className="track-list-container">{searchResults.songs.map(song => (<div key={song.id} className="track-row" onClick={() => playSong(song)}><img src={getSongCover(song)} className="track-img-small" style={{objectFit:'cover'}} /><div className="track-info"><div className="track-title">{song.title}</div><div className="track-meta">{song.artist}</div></div><div className="track-actions"><div onClick={(e) => toggleLike(e, song)} style={{marginRight:'15px', cursor:'pointer'}}><HeartIcon filled={likedSongIds.includes(song.id)} /></div>{(currentSong?.id === song.id && isPlaying) ? <PauseIcon /> : <PlayIcon />}</div></div>))}</div>
                ) : (searchResults.artists.length === 0 && <p style={{color:'#666'}}>No songs or artists found for "{searchQuery}"</p>)}
            </>
        )}

        {(view === 'home' && showArtistDashboard) && (
            <>
                <div className="dashboard-hero"><h1>Artist Command Center</h1><p>Manage your music, check your stats, and grow your audience.</p></div>
                <div className="stats-container">
                    <div className="stat-card"><span className="stat-number">{mySongs.length}</span><span className="stat-label">Tracks Uploaded</span></div>
                    {/* 👇 UPDATED: Dynamic Total Streams Calculation */}
                    <div className="stat-card"><span className="stat-number">{mySongs.reduce((total, song) => total + (song.streamCount || 0), 0)}</span><span className="stat-label">Total Streams</span></div>
                    <div className="stat-card"><span className="stat-number">{myFollowerCount}</span><span className="stat-label">Followers</span></div>
                </div>
                
                <h3 style={{marginBottom:'15px'}}>Your Albums</h3>
                <div style={{display:'flex', gap:'20px', overflowX:'auto', paddingBottom:'20px', marginBottom:'30px'}}>
                    {myAlbums.length > 0 ? myAlbums.map(album => (
                        <div key={album.id} className="artist-card-hover" style={{...cardStyle, minWidth:'150px', width:'150px'}}>
                             <img src={getAlbumCover(album)} style={{width:'100%', borderRadius:'8px', marginBottom:'10px'}} />
                             <h4 style={{margin:0, fontSize:'0.9rem'}}>{album.title}</h4>
                             <p style={{margin:0, fontSize:'0.8rem', color:'#888'}}>{album.songs ? album.songs.length : 0} songs</p>
                        </div>
                    )) : <p style={{color:'#666', fontStyle:'italic'}}>No albums yet. Create one!</p>}
                </div>

                <h3 style={{marginBottom:'15px'}}>Your Discography</h3>
                <div className="track-list-container">{mySongs.map(song => (<div key={song.id} className="track-row" onClick={() => playSong(song)}><img src={getSongCover(song)} className="track-img-small" style={{objectFit:'cover'}} /><div className="track-info"><div className="track-title">{song.title}</div><div className="track-meta">Added recently</div></div><div className="track-actions"><div onClick={(e) => { e.stopPropagation(); handleOpenComments(song); }} style={{cursor:'pointer', padding:'5px', marginRight:'10px'}}><MessageIcon /></div>{(currentSong?.id === song.id && isPlaying) ? <PauseIcon /> : <PlayIcon />}</div></div>))}</div>
            </>
        )}

        {(view === 'home' && showListenerView) && (
            <><h2 style={{fontSize: '1.5rem', marginBottom: '15px'}}>Fresh Drops 🎵</h2>
              <div style={{display:'flex', gap:'20px', overflowX:'auto', paddingBottom:'25px', marginBottom:'30px', scrollSnapType: 'x mandatory'}}>
                {songs.slice(0, 10).map(song => (
                    <div key={song.id} className="artist-card-hover" style={cardStyle} onClick={() => playSong(song)}>
                        <div style={imageContainerStyle}><img src={getSongCover(song)} style={imageStyle} /><div className="play-overlay" style={{opacity: (currentSong?.id === song.id && isPlaying) ? 1 : undefined, transform: (currentSong?.id === song.id && isPlaying) ? 'translateY(0)' : undefined}}>{(currentSong?.id === song.id && isPlaying) ? <PauseIcon fill="white"/> : <PlayIcon fill="white"/>}</div></div>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <div style={{overflow:'hidden', maxWidth:'130px'}}><h3 style={titleStyle} title={song.title}>{song.title}</h3><p className="card-desc" style={{fontSize:'0.8rem', margin:0}}>{song.artist}</p></div>
                            <div style={{display:'flex', gap:'5px'}}>
                                <div onClick={(e) => { e.stopPropagation(); setSongToAdd(song); setShowAddToPlaylist(true); }} style={{cursor:'pointer', padding:'5px'}}><PlusIcon /></div>
                                <div onClick={(e) => { e.stopPropagation(); handleOpenComments(song); }} style={{cursor:'pointer', padding:'5px'}}><MessageIcon /></div>
                                <div onClick={(e) => toggleLike(e, song)} style={{cursor:'pointer', padding:'5px'}}><HeartIcon filled={likedSongIds.includes(song.id)} /></div>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
              <h2 style={{fontSize: '1.5rem', marginBottom: '20px'}}>Popular Artists</h2><div className="artist-grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap:'30px'}}>{artists.map(artist => (<div key={artist.id} className="artist-card" style={{background:'transparent', border:'none', boxShadow:'none', textAlign:'center', cursor:'pointer'}} onClick={() => { setViewedArtist(artist); setView('artist'); }}><img src={getImage(artist)} style={artistCircleStyle} className="artist-img-hover" /><h3 className="card-title" style={{fontSize:'1rem', margin:'5px 0'}}>{artist.firstName || artist.username}</h3><p className="card-desc" style={{margin:0}}>Artist</p></div>))}</div></>
        )}

        {(view === 'home' && showAdminView) && (
            <><div className="dashboard-hero" style={{background:'linear-gradient(135deg, #890000 0%, #1a0000 100%)'}}><h1>Admin Console</h1><p>System Overview & User Management</p></div><div className="stats-container"><div className="stat-card"><span className="stat-number">{allUsers.length}</span><span className="stat-label">Total Users</span></div><div className="stat-card"><span className="stat-number">{songs.length}</span><span className="stat-label">Total Songs</span></div></div><h3 style={{marginBottom:'20px'}}>User Database</h3>
            <div className="track-list-container">{allUsers.map(u => (<div key={u.id} className="track-row" style={{cursor:'default'}}><img src={getImage(u)} className="track-img-small" style={{borderRadius:'50%'}} /><div className="track-info"><div className="track-title">{u.username}</div><div className="track-meta" style={{color: u.role === 'ARTIST' ? '#1db954' : '#b3b3b3'}}>{u.role}</div></div><div className="track-actions"><button onClick={() => handleDeleteUser(u.id)} style={{background:'transparent', border:'1px solid red', color:'red', padding:'5px 10px', borderRadius:'5px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px'}}><TrashIcon /> Remove</button></div></div>))}</div></>
        )}

        {view === 'liked' && (
            <><div className="dashboard-hero" style={{background: 'linear-gradient(135deg, #450af5 0%, #c4efd9 100%)'}}><h1>Your Library</h1><p>{likedSongsList.length} Liked Songs</p></div><div className="track-list-container">{likedSongsList.length > 0 ? likedSongsList.map(song => (<div key={song.id} className="track-row" onClick={() => playSong(song)}><img src={getSongCover(song)} className="track-img-small" style={{objectFit:'cover'}} /><div className="track-info"><div className="track-title">{song.title}</div><div className="track-meta">{song.artist}</div></div><div className="track-actions"><div onClick={(e) => { e.stopPropagation(); setSongToAdd(song); setShowAddToPlaylist(true); }} style={{cursor:'pointer', marginRight:'15px'}}><PlusIcon /></div><div onClick={(e) => { e.stopPropagation(); handleOpenComments(song); }} style={{cursor:'pointer', marginRight:'15px'}}><MessageIcon /></div><div onClick={(e) => toggleLike(e, song)} style={{marginRight:'15px', cursor:'pointer'}}><HeartIcon filled={true} /></div>{(currentSong?.id === song.id && isPlaying) ? <PauseIcon /> : <PlayIcon />}</div></div>)) : (<div style={{textAlign:'center', padding:'50px', color:'#888'}}><h3>No liked songs yet.</h3><button className="login-btn" style={{width:'auto', marginTop:'10px'}} onClick={() => setView('home')}>Find Music</button></div>)}</div></>
        )}

        {/* MODALS */}
        {view === 'profile' && (<div className="profile-editor-container"><form onSubmit={handleProfileUpdate}><div className="profile-avatar-wrapper"><label htmlFor="profile-upload" style={{cursor: 'pointer'}}><img src={editPic ? URL.createObjectURL(editPic) : getImage(user)} className="profile-avatar-large" style={{objectFit:'cover'}} /><div className="avatar-edit-overlay"><CameraIcon /></div></label><input id="profile-upload" type="file" onChange={e=>setEditPic(e.target.files[0])} style={{display:'none'}} /></div><div className="premium-input-group"><label className="premium-label">Display Name</label><input className="premium-input" value={editName} onChange={e=>setEditName(e.target.value)} placeholder="How should we call you?" /></div><div className="premium-input-group"><label className="premium-label">Role</label><div style={{color:'white', fontWeight:'bold', fontSize:'1.2rem', display:'flex', alignItems:'center', gap:'10px'}}>{user.role} {user.role === 'ARTIST' && <span style={{fontSize:'0.8rem', background:'#1db954', padding:'2px 8px', borderRadius:'10px', color:'black'}}>VERIFIED</span>}</div></div><button type="submit" className="login-btn" style={{marginTop:'20px'}}>💾 Save Profile Changes</button></form></div>)}
        {showUpload && (<div className="premium-modal-overlay"><div className="premium-card"><h2 style={{color:'white', marginBottom:'5px'}}>Upload New Track</h2><form onSubmit={handleUpload}><div className="premium-input-group"><input name="title" className="premium-input" placeholder="Song Title" required /></div>
        <div className="premium-input-group">
            <select name="albumId" className="premium-input" style={{background:'#222'}}>
                <option value="none">No Album (Single)</option>
                {myAlbums.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>
        </div>
        <div className="premium-input-group"><label className="file-upload-zone"><MusicFileIcon /><span style={{fontWeight:'600'}}>Select MP3</span><input name="file" type="file" accept=".mp3" required style={{display:'none'}} /></label></div><div className="premium-input-group"><label className="file-upload-zone" style={{borderColor: '#b3b3b3'}}><ImageIcon /><span style={{fontWeight:'600'}}>Select Cover Art</span><input name="cover" type="file" accept="image/*" required style={{display:'none'}} /></label></div><div style={{display:'flex', gap:'15px', marginTop:'30px'}}><button className="login-btn" style={{margin:0}}>🚀 Upload</button><button type="button" onClick={()=>setShowUpload(false)} style={{background:'transparent', border:'1px solid #555', color:'white', padding:'12px 25px', borderRadius:'50px', cursor:'pointer', fontWeight:'bold'}}>Cancel</button></div></form></div></div>)}
        
        {showCreateAlbum && (
            <div className="premium-modal-overlay">
                <div className="premium-card">
                    <h2 style={{color:'white', marginBottom:'10px'}}>Create New Album</h2>
                    <form onSubmit={handleCreateAlbum}>
                        <div className="premium-input-group"><input name="title" className="premium-input" placeholder="Album Title" required /></div>
                        <div className="premium-input-group"><textarea name="description" className="premium-input" placeholder="Album Description (Optional)" rows={3} /></div>
                        <div className="premium-input-group"><label className="file-upload-zone"><ImageIcon /><span>Album Cover Art</span><input name="cover" type="file" accept="image/*" required style={{display:'none'}} /></label></div>
                        <div style={{display:'flex', gap:'15px', marginTop:'20px'}}><button className="login-btn" style={{margin:0}}>Create Album</button><button type="button" onClick={()=>setShowCreateAlbum(false)} style={{background:'transparent', border:'1px solid #555', color:'white', padding:'12px', borderRadius:'50px', cursor:'pointer'}}>Cancel</button></div>
                    </form>
                </div>
            </div>
        )}

        {showUpgradeModal && (<div className="premium-modal-overlay"><div className="premium-card"><div style={{fontSize:'3rem', marginBottom:'10px'}}>💎</div><h2 style={{color:'#1db954', margin:0}}>Artist Plan</h2><form onSubmit={handleUpgrade}><div className="premium-input-group"><textarea className="premium-input" placeholder="Bio..." value={upgradeBio} onChange={e=>setUpgradeBio(e.target.value)} required rows={3} style={{resize:'none'}} /></div><div className="premium-input-group"><label className="file-upload-zone"><CameraIcon /><span>Select Artist Photo</span><input type="file" onChange={e=>setUpgradePic(e.target.files[0])} required style={{display:'none'}} /></label></div><div style={{display:'flex', gap:'15px', marginTop:'20px'}}><button className="login-btn" style={{margin:0, background:'white', color:'black'}}>Pay & Upgrade</button><button type="button" onClick={()=>setShowUpgradeModal(false)} style={{background:'transparent', border:'1px solid #555', color:'white', padding:'12px', borderRadius:'50px', cursor:'pointer'}}>Cancel</button></div></form></div></div>)}

        {showCreatePlaylist && (
            <div className="premium-modal-overlay">
                <div className="premium-card" style={{width:'300px'}}>
                    <h2 style={{color:'white'}}>Create Playlist</h2>
                    <form onSubmit={handleCreatePlaylist}>
                        <div className="premium-input-group"><input name="name" className="premium-input" placeholder="Playlist Name" required autoFocus /></div>
                        <div style={{display:'flex', gap:'10px', marginTop:'20px'}}><button className="login-btn" style={{margin:0}}>Create</button><button type="button" onClick={()=>setShowCreatePlaylist(false)} style={{background:'transparent', border:'1px solid #555', color:'white', padding:'10px 20px', borderRadius:'50px', cursor:'pointer'}}>Cancel</button></div>
                    </form>
                </div>
            </div>
        )}

        {showAddToPlaylist && (
            <div className="premium-modal-overlay">
                <div className="premium-card" style={{width:'300px', maxHeight:'400px', overflowY:'auto'}}>
                    <h3 style={{color:'white', marginTop:0}}>Add to Playlist</h3>
                    <p style={{fontSize:'0.9rem', color:'#b3b3b3', marginBottom:'20px'}}>Which playlist do you want to add this song to?</p>
                    {playlists.length > 0 ? (<div style={{display:'flex', flexDirection:'column', gap:'10px'}}>{playlists.map(p => (<div key={p.id} onClick={() => handleAddToPlaylist(p.id)} style={{padding:'12px', background:'#333', borderRadius:'8px', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px'}}><ListIcon /> {p.name}</div>))}</div>) : (<p>No playlists yet. Create one first!</p>)}
                    <button type="button" onClick={()=>{setShowAddToPlaylist(false); setSongToAdd(null)}} style={{width:'100%', background:'transparent', border:'1px solid #555', color:'white', padding:'10px', borderRadius:'50px', marginTop:'20px', cursor:'pointer'}}>Cancel</button>
                </div>
            </div>
        )}

        {showCommentsModal && activeSongForComments && (
            <div className="premium-modal-overlay">
                <div className="premium-card" style={{width:'450px', maxHeight:'650px', display:'flex', flexDirection:'column', padding:0, overflow:'hidden'}}>
                    <div style={{padding:'20px', background:'#282828', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #3e3e3e'}}>
                        <div>
                            <h2 style={{margin:0, fontSize:'1.2rem', color:'white'}}>Comments</h2>
                            <p style={{margin:'5px 0 0 0', color:'#b3b3b3', fontSize:'0.85rem'}}>{activeSongForComments.title} • {activeSongForComments.artist}</p>
                        </div>
                        <button onClick={()=>setShowCommentsModal(false)} style={{background:'transparent', border:'none', color:'white', cursor:'pointer', fontSize:'1.5rem', lineHeight:1}}>×</button>
                    </div>
                    
                    <div style={{flex:1, overflowY:'auto', padding:'20px', background:'#121212'}}>
                        {comments.length > 0 ? comments.map(c => (
                            <div key={c.id} style={{display:'flex', gap:'12px', marginBottom:'20px'}}>
                                <img src={getImage(c.user)} style={{width:'40px', height:'40px', borderRadius:'50%', objectFit:'cover'}} />
                                <div style={{flex:1}}>
                                    <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px'}}>
                                        <span style={{fontWeight:'bold', fontSize:'0.9rem', color:'white'}}>{c.user?.username}</span>
                                        <span style={{fontSize:'0.75rem', color:'#666'}}>{getTimeAgo(c.createdAt)}</span>
                                    </div>
                                    {editingCommentId === c.id ? (
                                        <div style={{marginBottom:'5px'}}>
                                            <input value={editText} onChange={(e)=>setEditText(e.target.value)} autoFocus style={{width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid #444', background:'#222', color:'white', marginBottom:'5px'}} />
                                            <div style={{display:'flex', gap:'5px'}}>
                                                <button onClick={()=>saveEditComment(c.id)} style={{fontSize:'0.8rem', padding:'4px 8px', background:'#1db954', border:'none', borderRadius:'4px', color:'black', cursor:'pointer', fontWeight:'bold'}}>Save</button>
                                                <button onClick={()=>setEditingCommentId(null)} style={{fontSize:'0.8rem', padding:'4px 8px', background:'transparent', border:'1px solid #555', borderRadius:'4px', color:'white', cursor:'pointer'}}>Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{fontSize:'0.95rem', color:'#ddd', lineHeight:'1.4'}}>{c.text}</div>
                                    )}
                                    {user.id === c.user?.id && !editingCommentId && (
                                        <div style={{display:'flex', gap:'12px', marginTop:'8px'}}>
                                            <div onClick={()=>handleEditComment(c.id, c.text)} style={{cursor:'pointer', color:'#888', fontSize:'0.8rem', display:'flex', alignItems:'center', gap:'4px'}}><EditIcon /> Edit</div>
                                            <div onClick={()=>handleDeleteComment(c.id)} style={{cursor:'pointer', color:'#888', fontSize:'0.8rem', display:'flex', alignItems:'center', gap:'4px'}}><SmallTrashIcon /> Delete</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )) : <div style={{textAlign:'center', color:'#555', marginTop:'40px', fontStyle:'italic'}}>No comments yet. Be the first to share your thoughts!</div>}
                    </div>

                    <div style={{padding:'20px', background:'#282828', borderTop:'1px solid #3e3e3e'}}>
                        <form onSubmit={handlePostComment} style={{display:'flex', gap:'10px', alignItems: 'center', marginTop: '10px'}}>
                            <img src={getImage(user)} style={{width:'36px', height:'36px', borderRadius:'50%', objectFit:'cover'}} />
                            <input placeholder="Add a comment..." value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} style={{flex:1, padding:'12px', borderRadius:'8px', border:'1px solid #444', background:'#222', color:'white', outline:'none'}} />
                            <button className="login-btn" style={{width:'auto', margin:0, padding:'12px 20px', borderRadius:'8px', background:'#1db954', color:'black', fontWeight:'bold', border:'none', cursor:'pointer'}}>Post</button>
                        </form>
                    </div>
                </div>
            </div>
        )}
      </div>

      {currentSong && (
        <div className="glass-player-bar" style={{boxSizing: 'border-box', width: '100%', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display:'flex', alignItems:'center', gap:'15px', flex:1, minWidth:'200px'}}><img src={getSongCover(currentSong)} style={{width:'60px', height:'60px', borderRadius:'6px', objectFit:'cover'}} /><div style={{overflow:'hidden'}}><div style={{fontWeight:'600', fontSize:'0.95rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{currentSong.title}</div><div style={{fontSize:'0.8rem', color:'#b3b3b3'}}>{currentSong.artist}</div></div><div onClick={(e) => toggleLike(e, currentSong)} style={{cursor:'pointer', marginLeft:'10px'}}><HeartIcon filled={likedSongIds.includes(currentSong.id)} size={20} /></div></div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'40%', maxWidth:'600px'}}><div style={{display:'flex', alignItems:'center', gap:'25px', marginBottom:'5px'}}><div style={{cursor:'pointer'}}><ShuffleIcon /></div><div style={{cursor:'pointer'}}><PrevIcon /></div><div onClick={() => setIsPlaying(!isPlaying)} style={{cursor:'pointer', background:'white', borderRadius:'50%', padding:'8px', display:'flex'}}>{isPlaying ? <PauseIcon size={20} fill="black"/> : <PlayIcon size={20} fill="black" />}</div><div style={{cursor:'pointer'}}><NextIcon /></div><div style={{cursor:'pointer'}}><RepeatIcon /></div></div><div style={{display:'flex', alignItems:'center', gap:'10px', width:'100%', fontSize:'0.75rem', color:'#b3b3b3'}}><span>{formatTime(currentTime)}</span><input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeek} style={{flex:1}} /><span>{formatTime(duration)}</span></div></div>
            <div style={{display:'flex', alignItems:'center', gap:'10px', flex: 1, minWidth: '120px', justifyContent: 'flex-end'}}><VolumeIcon /><input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(e.target.value)} style={{width:'100px'}} /></div>
        </div>
      )}
    </div>
  )
}

export default App