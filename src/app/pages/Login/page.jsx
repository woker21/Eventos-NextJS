'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../components/UserProvider';
import { createHilo, signIn, loginWithGoogle, signUp, getUserById } from '../services/users';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/api';

const Home = () => {
    const [user, setUser] = useUserContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [account, setCreateAccount] = useState(false);
    const router = useRouter();

    const register = () => {
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert('Introduce un nombre, email y password');
            return;
        }
        signUp(name, email, password).then(id => {
            setUser({ id, name, email });
        }).catch(err => {
            alert(err);
        });
    };

    const loginWithUserAndPassword = (e) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            alert('Introduce un email y password');
            return;
        }

        signIn(email, password).then(id => {
            getUserById(id).then(user => {
                setUser({ id, name: user.name, email });
            });
        }).catch(err => {
            alert(err);
        });
    };

    const googleLogin = () => {
        loginWithGoogle().then(user => {
            setUser({ id: user.uid, name: user.displayName, email: user.email });
        });
    };

    useEffect(() => {
        if (!user) {
            onAuthStateChanged(auth, user => {
                if (user) {
                    if (!user.displayName) {
                        getUserById(user.uid).then(u => {
                            setUser({ id: u.id, name: u.name, email: user.email });
                        });
                    } else {
                        setUser({ id: user.uid, name: user.displayName, email: user.email });
                    }
                } else {
                    setUser(null);
                }
            });
        }
    }, [user, setUser]);

    return (
        <div>
            <h1>Home</h1>
            {!user ? (
                <form action="">
                    <div>
                        {account ? <h2>Register</h2> : <h2>Login</h2>}
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" onChange={e => setEmail(e.target.value)} required />
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" onChange={e => setPassword(e.target.value)} required />
                        {account && (
                            <div>
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" onChange={e => setName(e.target.value)} />
                            </div>
                        )}
                        <br />
                        <div>
                            {!account ? (
                                <div>
                                    <br />
                                    <button type="submit" style={{ float: "left", marginRight: "30px" }} onClick={e => loginWithUserAndPassword(e)}>Log In</button>
                                    <button type="button" style={{ backgroundColor: "unset", padding: "unset" }} onClick={googleLogin}><img src='/google.PNG' width="40px" alt="Google Login" /></button>
                                    <br />
                                    <br />
                                    <a href="#" onClick={() => setCreateAccount(true)}>Don&apos;t have an account?</a>
                                    <br />
                                    <br />
                                </div>
                            ) : (
                                <div>
                                    <button type="button" onClick={register}>Sign Up</button>
                                    <br />
                                    <br />
                                    <a href="#" onClick={() => setCreateAccount(false)}>Already have an account?</a>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            ) : (
                <div>
                    <p>{user.id} - {user.name} - {user.email}</p>
                    <br />
                    <button type="button" onClick={async () => { await signOut(auth); setUser(null); router.push('/'); }}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Home;
