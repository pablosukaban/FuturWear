import { TabType } from '../config/constants';

type TabProps = {
    tab: TabType;
    isFilterTab: boolean;
    isActiveTab: string;
    handleClick: () => void;
};

const Tab = (props: TabProps) => {
    return <div>Tab</div>;
};

export default Tab;
