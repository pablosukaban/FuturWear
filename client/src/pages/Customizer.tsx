import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// import DownloadImageIcon from '../assets/download.png';
// import { downloadCanvasToImage, getDecalType } from '../config/helpers';
import { EditorTabs, FilterTabs } from '../config/constants';
import { slideAnimation, fadeAnimation } from '../config/motion';
import Tab from '../components/Tab';
import CustomButton from '../components/CustomButton';
import { paramsSlice } from '../store/paramsSlice';
import ColorPicker from '../components/ColorPicker';
import FilePicker from '../components/FilePicker';
import AIPIcker from '../components/AIPIcker';

// type filterTabType = {
//     logoShirt: boolean;
//     stylishShirt: boolean;
// };

const Customizer = () => {
    const { intro } = useAppSelector((state) => state.paramsSlice);
    const dispatch = useAppDispatch();
    const {
        changeIntro,
        changeActiveFilterTab,
        changelogoDecal,
        changeFullDecal,
    } = paramsSlice.actions;

    const [file, setFile] = useState<File>();
    // const [prompt, setPrompt] = useState('');
    // const [generatingImage, setGeneratingImage] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState<string>('');
    const [activeFilterTab, setActiveFilterTab] = useState('logoShirt');

    const handleEditorTabClick = (tabName: string) => {
        setActiveEditorTab(tabName);
    };

    const handleFilterTabClick = (tabName: 'logoShirt' | 'stylishShirt') => {
        dispatch(changeActiveFilterTab(tabName));
        setActiveFilterTab(tabName === activeFilterTab ? '' : tabName);
    };

    const readFile = (type: string) => {
        new Promise((resolve, reject) => {
            if (file === undefined) {
                reject('No file selected');
            } else {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result);
                fileReader.readAsDataURL(file);
            }
        }).then((result) => {
            if (type === 'logo') {
                dispatch(changelogoDecal(result as File));
            } else if (type === 'full') {
                dispatch(changeFullDecal(result as File));
            }
        });
    };

    // console.log(activeFilterTab);

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case 'colorpicker':
                return <ColorPicker />;
            case 'filepicker':
                return (
                    <FilePicker
                        file={file}
                        setFile={setFile}
                        readFile={readFile}
                    />
                );
            case 'aipicker':
                return <AIPIcker />;

            default:
                return null;
        }
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
                                        isActiveTab={
                                            item.name === activeEditorTab
                                        }
                                        isFilterTab={false}
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
                                handleClick={() =>
                                    handleFilterTabClick(item.name)
                                }
                                isFilterTab={true}
                                tab={item}
                                isActiveTab={item.name === activeFilterTab}
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;
