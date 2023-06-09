import { EditorTabType, FilterTabType } from '../config/constants';
import { useAppSelector } from '../store/hooks';

type TabProps = {
    tab: FilterTabType | EditorTabType;
    isFilterTab: boolean;
    isActiveTab: boolean;
    handleClick: () => void;
};

const Tab = ({ handleClick, isActiveTab, isFilterTab, tab }: TabProps) => {
    const { color } = useAppSelector((state) => state.paramsSlice);

    const stringedColor = String(color);

    const activeStyle = isActiveTab
        ? { backgroundColor: stringedColor, opacity: 0.5 }
        : { backgroundColor: 'transparent', opacity: 1 };

    return (
        <div
            style={activeStyle}
            key={tab.name}
            onClick={handleClick}
            className={`tab-btn ${
                isFilterTab ? 'glassmorhism rounded-full' : 'rounded-4'
            }`}
        >
            <img
                src={tab.icon}
                className={`${
                    isFilterTab
                        ? 'h-2/3 w-2/3'
                        : 'h-11/12 w-11/12 object-contain'
                }`}
            />
        </div>
    );
};

export default Tab;
