import { useUserContext } from '../components/UserProvider';
import { useEffect, useState } from 'react';
import { createHilo, signIn, loginWithGoogle, signUp, getUserById } from '../services/users';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useUserContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [account, setCreateAccount] = useState(false);
    const [hilo, setHilo] = useState('');

    /* const login = (e) => {
        e.preventDefault();
        if (name.trim() === '') {
            alert('Introduce un nombre');
            return;
        }
        access(name).then(id => {
            setUser({ id, name });
        });
    } */

    const register = () => {
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert('Introduce un nombre, email y password');
            return;
        }
        signUp(name, email, password).then(id => {
            /* if (id.includes('Firebase: ')) {
                alert(id);
                return;
            } */
            setUser({ id, name, email });
        }).catch(err => {
            alert(err);
        });
    }
    const loginWithUserAndPassword = (e) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            alert('Introduce un email y password');
            return;
        }

        signIn(email, password).then(id => {
            /* if (id.includes('Firebase: ')) {
                alert(id);
                return;
            } */
            getUserById(id).then(user => {
                setUser({ id, name: user.name, email });
            });
        }).catch(err => {
            alert(err);
        });
    }

    const googleLogin = () => {
        loginWithGoogle().then(user => {
            console.log('Google user', user);
            //setUser({ id: user.uid, name: user.displayName, email: user.email })
        });
    }

    const navigate = useNavigate();
    const crtHilo = (e) => {
        e.preventDefault();
        if (hilo.trim() === '') {
            alert('Introduce un nombre para el hilo');
            return;
        }

        createHilo({ userId: user.id, title: hilo }).then(id => {
            if (!id) {
                alert('Este hilo ya existe');
            } else {
                navigate('/hilos')
            }
        });
    }

    useEffect(() => {
        if (!user) {
            onAuthStateChanged(auth, user => {
                if (user) {
                    console.log(user);
                    if (!user.displayName) {
                        getUserById(user.uid).then(u => {
                            setUser({ id: u.id, name: u.name, email: user.email });
                        });
                    } else {
                        setUser({ id: user.uid, name: user.displayName, email: user.email });
                    }
                } else {
                    console.log("No user logged");
                    setUser(null);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {/* <button type='submit' onClick={e => login(e)}>Acceder</button> */}
            <br />
            {!user ?
                <form action="">
                    <div>
                        {account ? <h2>Register</h2> : <h2>Login</h2>}
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" onChange={e => setEmail(e.target.value)} required />
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" onChange={e => setPassword(e.target.value)} required />
                        {account &&
                            <div>
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" onChange={(e) => setName(e.target.value)} />
                            </div>
                        }
                        <br />
                        <div>
                            {!account ?
                                <div>
                                    <br />
                                    <button type='submit' style={{ float: "left", marginRight: "30px" }} onClick={e => loginWithUserAndPassword(e)}>Log In</button>
                                    <button type='button' style={{ backgroundColor: "unset", padding: "unset" }} onClick={googleLogin}><img src='/google.PNG' width="40px"></img></button>
                                    <br />
                                    <br />
                                    <a href="#" onClick={() => setCreateAccount(true)}>Don&apos;t have an account?</a>
                                    <br />
                                    <br />
                                </div>
                                :
                                <div>
                                    <button type='button' onClick={register}>Sign Up</button>
                                    <br />
                                    <br />
                                    <a href="#" onClick={() => setCreateAccount(false)}>Already have an account?</a>
                                </div>
                            }
                        </div>
                    </div>
                </form>
                : <div>
                    <p>{user.id} - {user.name} - {user.email}</p>
                    <br />
                    <button type='button' onClick={async () => { await signOut(auth); setUser(null) }}>Logout</button>
                    <form action="">
                        <h2>Crear hilos</h2>
                        <input type="text" onChange={(e) => setHilo(e.target.value)} />
                        <br />
                        <button type='submit' onClick={(e) => crtHilo(e)}>Crear hilo</button>
                    </form>
                </div>
            }
        </div >
    )
}

export default Home