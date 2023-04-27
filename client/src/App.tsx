import CanvasModel from './canvas/CanvasModel';
import Customizer from './pages/Customizer';
import Home from './pages/Home';

const App = () => {
    return (
        <main className='app transition-all ease-in'>
            <Home />
            <Customizer />
            <CanvasModel />
        </main>
    );
};

export default App;
