import React from 'react';
import { useAppSelector } from './store/hooks';

const App = () => {
    const { color } = useAppSelector((state) => state.paramsSlice);

    return <div className='text-4xl text-green-400'>{color}</div>;
};

export default App;
