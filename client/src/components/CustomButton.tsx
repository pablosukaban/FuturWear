import { useAppSelector } from '../store/hooks';
import { getContrastingColor } from '../config/helpers';

type CustomButtonProps = {
    type: string;
    title: string;
    disabled?: boolean;
    handleClick?: () => void;
    customStyles: string;
};

const CustomButton = ({
    customStyles,
    handleClick,
    title,
    type,
    disabled,
}: CustomButtonProps) => {
    const state = useAppSelector((state) => state.paramsSlice);

    const contrastingColor = getContrastingColor(state.color as string);

    const stringedColor = String(state.color);

    // const generateStyles = (type: string) => {
    //     if (type === 'filled') {
    //         return { backgroundColor: color, text: '#fff' };
    //     } else {
    //         return { backgroundColor: '#fff', text: color };
    //     }
    // };

    return (
        <button
            disabled={disabled}
            style={
                type === 'filled'
                    ? {
                          backgroundColor: stringedColor,
                          color: contrastingColor,
                      }
                    : {
                          color: stringedColor,
                          borderWidth: '1px',
                          borderColor: stringedColor,
                      }
            }
            className={`flex-1 rounded-md px-2 py-1.5 ${customStyles}`}
            onClick={handleClick}
        >
            {title}
        </button>
    );
};

export default CustomButton;
