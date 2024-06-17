import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Layout from '../components/Layout/Layout';

const Router = () => (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route index element={<Home />} />
            </Routes>
        </Layout>
    </BrowserRouter>
);

export default Router;