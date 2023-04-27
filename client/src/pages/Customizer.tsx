import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import config from '../config/config';
import DownloadImage from '../assets/download.png';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { slideAnimation, fadeAnimation } from '../config/motion';
import Tab from '../components/Tab';
import CustomButton from '../components/CustomButton';
import { paramsSlice } from '../store/paramsSlice';
import ColorPicker from '../components/ColorPicker';
import FilePicker from '../components/FilePicker';
import AIPIcker from '../components/AIPIcker';

type filterTabType = {
    logoShirt: boolean;
    stylishShirt: boolean;
};

const Customizer = () => {
    const { intro } = useAppSelector((state) => state.paramsSlice);
    const dispatch = useAppDispatch();
    const { changeIntro } = paramsSlice.actions;

    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImage, setGeneratingImage] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState('');
    const [activeFilterTab, setActiveFilterTab] = useState<filterTabType>({
        logoShirt: true,
        stylishShirt: false,
    });

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case 'colorpicker':
                return <ColorPicker />;
            case 'filepicker':
                return <FilePicker />;
            case 'aipicker':
                return <AIPIcker />;

            default:
                return null;
        }
    };

    const handleEditorTabClick = (tabName: string) => {
        setActiveEditorTab(tabName);
    };

    return (
        <AnimatePresence>
            {!intro && (
                <>
                    <motion.div
                        key='custom'
                        className='absolute left-0 top-0 z-10'
                        {...slideAnimation('left')}
                    >
                        <div className='flex min-h-screen items-center'>
                            <div className='editortabs-container tabs'>
                                {EditorTabs.map((item) => (
                                    <Tab
                                        key={item.name}
                                        tab={item}
                                        handleClick={() =>
                                            handleEditorTabClick(item.name)
                                        }
                                        isActiveTab=''
                                        isFilterTab={true}
                                    />
                                ))}

                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className='absolute right-5 top-5 z-10'
                        {...fadeAnimation}
                    >
                        <CustomButton
                            title='Назад'
                            type='filled'
                            handleClick={() => dispatch(changeIntro(true))}
                            customStyles='w-fit px-4 py-2.5 font-bold text-sm'
                        />
                    </motion.div>

                    <motion.div
                        className='filtertabs-container'
                        {...slideAnimation('up')}
                    >
                        {FilterTabs.map((item) => (
                            <Tab
                                key={item.name}
                                handleClick={() => {
                                    console.log('yo');
                                }}
                                isFilterTab={true}
                                tab={item}
                                isActiveTab=''
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;
