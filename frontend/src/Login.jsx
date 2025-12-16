import { useState } from 'react'
import './App.css' 

// --- ICONS ---
const InstaIcon = () => <svg className="social-icon" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
const GithubIcon = () => <svg className="social-icon" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
const XIcon = () => <svg className="social-icon" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>

export default function Login({ onLogin }) {
    const [isSignup, setIsSignup] = useState(false)
    const [isAdminLogin, setIsAdminLogin] = useState(false)
    
    // Form States
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")
    
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        if (isSignup && password.length < 8) {
            setError("Password must be at least 8 characters.")
            setIsLoading(false)
            return
        }

        setTimeout(() => {
            const endpoint = isSignup ? '/signup' : '/login'
            const url = `http://localhost:8080/users${endpoint}`

            // Construct data payload
            const userData = { username, password }
            if (isSignup) {
                userData.firstName = firstName
                userData.lastName = lastName
                userData.birthday = birthday
            }

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })
            .then(async res => {
                const data = await res.text() 
                try {
                    const user = JSON.parse(data)
                    if (user.id) {
                        onLogin(user) 
                        return
                    }
                } catch (e) { }

                if (res.ok) {
                    if (isSignup) {
                        alert("Account created! Please Log In.")
                        setIsSignup(false) 
                        setPassword("")
                    } else {
                        setError("Invalid credentials")
                    }
                } else {
                    setError("Login failed. Check connection.")
                }
            })
            .catch(() => setError("Server not reachable"))
            .finally(() => setIsLoading(false)) 
        }, 800) 
    }

    const getButtonText = () => {
        if(isLoading) return "Processing...";
        if(isAdminLogin) return "LOG IN"; 
        return isSignup ? "Sign Up Free" : "Log In";
    }

    return (
        <div className="app-layout" style={{ justifyContent: 'flex-end', alignItems: 'center', paddingRight: '80px' }}>
            <div className={isAdminLogin ? "admin-background" : "login-background"}></div>
            <div className="login-overlay-tint"></div>

            <div className="login-card">
                <h1 className="brand-title">GrooveHaven</h1>
                <p className="brand-subtitle">
                    {isAdminLogin ? "Administrative Portal" : (isSignup ? "Join the Rhythm" : "Welcome Back")}
                </p>

                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                    
                    {/* NEW: First & Last Name (Only for Sign Up) */}
                    {isSignup && !isAdminLogin && (
                        <div style={{display:'flex', gap:'10px'}}>
                            <input className="login-input" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                            <input className="login-input" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                        </div>
                    )}

                    {/* NEW: Birthday (Only for Sign Up) */}
                    {isSignup && !isAdminLogin && (
                        <input className="login-input" type="date" placeholder="Birthday" value={birthday} onChange={e => setBirthday(e.target.value)} required />
                    )}

                    <input className="login-input" type="text" placeholder={isAdminLogin ? "Admin ID" : "Username / Email"} value={username} onChange={e => setUsername(e.target.value)} required />
                    
                    <input className="login-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    
                    {error && <p style={{ color: '#ff5555', fontSize: '0.8rem', margin: '5px 0' }}>{error}</p>}

                    <button type="submit" className="login-btn" disabled={isLoading} 
                        style={isAdminLogin ? { borderColor: '#d63031', color: '#d63031' } : {}}
                        onMouseEnter={(e) => { if(isAdminLogin) { e.currentTarget.style.backgroundColor = '#d63031'; e.currentTarget.style.color = 'white'; } }}
                        onMouseLeave={(e) => { if(isAdminLogin) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#d63031'; } }}
                    >
                        {getButtonText()}
                    </button>
                </form>

                {!isAdminLogin && (
                    <div className="switch-text">
                        {isSignup ? "Already a member?" : "New to GrooveHaven?"}
                        <span className="switch-link" onClick={() => { setIsSignup(!isSignup); setError(""); }}>
                            {isSignup ? " Log In" : " Sign Up"}
                        </span>
                    </div>
                )}

                <div className="social-section">
                     <a href="https://www.instagram.com/officialthenx03/" target="_blank"><InstaIcon /></a>
                     <a href="https://github.com/ThevinduDha/ThevinduDha" target="_blank"><GithubIcon /></a>
                     <a href="https://x.com/ThevinduHansaja" target="_blank"><XIcon /></a>
                </div>

                <div className="admin-toggle" onClick={() => { setIsAdminLogin(!isAdminLogin); setIsSignup(false); setError(""); }}>
                    {isAdminLogin ? "← Back to User Login" : "Admin Portal"}
                </div>
            </div>
        </div>
    )
}