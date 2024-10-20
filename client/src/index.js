import './index.css';
import Header from './components/header/code/Header';
import Main from './components/main/code/Main';
import Footer from './components/footer/code/Footer';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './stateManager/store';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Header/>
        <Main/>
        <Footer/>
    </Provider>
);