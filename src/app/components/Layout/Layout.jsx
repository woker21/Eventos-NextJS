import { Link } from 'react-router-dom'
import './layout.css'

const Layout = ({ children }) => {
    return (
        <div>
            <div className='container'>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                    </ul>
                </nav>
                <main>{children}</main>
            </div>
        </div>
    )
}

export default Layout;