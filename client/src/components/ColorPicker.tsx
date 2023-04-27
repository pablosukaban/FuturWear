import { useAppSelector, useAppDispatch } from '../store/hooks';
import { ColorResult, SketchPicker } from 'react-color';
import { paramsSlice } from '../store/paramsSlice';

const ColorPicker = () => {
    const { color } = useAppSelector((state) => state.paramsSlice);
    const dispatch = useAppDispatch();
    const { changeColor } = paramsSlice.actions;

    return (
        <div className='absolute left-full ml-3'>
            <SketchPicker
                disableAlpha
                color={color as string}
                onChange={(color) => dispatch(changeColor(color.hex))}
            />
        </div>
    );
};

export default ColorPicker;
