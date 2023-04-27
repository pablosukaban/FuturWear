import { useAppSelector } from '../store/hooks';

type CustomButtonProps = {
    type: string;
    title: string;
    handleClick: () => void;
    customStyles: string;
};

const CustomButton = ({
    customStyles,
    handleClick,
    title,
    type,
}: CustomButtonProps) => {
    const { color } = useAppSelector((state) => state.paramsSlice);

    const generateStyles = (type: string) => {
        switch (type) {
            case 'filled':
                return { backgroundColor: color, text: '#fff' };

            default:
                break;
        }
    };

    return (
        <button
            style={generateStyles(type)}
            className={`flex-1 rounded-md px-2 py-1.5 ${customStyles}`}
            onClick={handleClick}
        >
            {title}
        </button>
    );
};

export default CustomButton;
