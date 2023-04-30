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

    const [prompt, setPrompt] = useState('');
    const [generatingImage, setGeneratingImage] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState('');
    const [activeFilterTab, setActiveFilterTab] = useState('logoShirt');

    const handleEditorTabClick = (tabName: string) => {
        setActiveEditorTab(tabName === activeEditorTab ? '' : tabName);
    };

    const handleFilterTabClick = (tabName: 'logoShirt' | 'stylishShirt') => {
        dispatch(changeActiveFilterTab(tabName));
        setActiveFilterTab(tabName === activeFilterTab ? '' : tabName);
    };

    const handleDecals = (type: string, result: string | File) => {
        if (type === 'logo') {
            dispatch(changelogoDecal(result as File));
            // dispatch(changeActiveFilterTab('logoShirt'));
            // setActiveFilterTab(
            //     activeFilterTab === 'logoShirt' ? '' : 'logoShirt'
            // );
        } else if (type === 'full') {
            dispatch(changeFullDecal(result as File));
            // dispatch(changeActiveFilterTab('stylishShirt'));
            // setActiveFilterTab(
            //     activeFilterTab === 'stylishShirt' ? '' : 'stylishShirt'
            // );
        }
    };

    const readFile = (type: string) => {
        new Promise((resolve, reject) => {
            if (file === undefined) {
                reject('Фаил не выбран');
            } else {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result);
                fileReader.readAsDataURL(file);
            }
        }).then((result) => {
            handleDecals(type, result as File);
        });
    };

    const handleSubmit = async (type: string) => {
        if (!prompt) {
            alert('Введите prompt');
            return;
        }

        try {
            setGeneratingImage(true);

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            };

            const response = await fetch(
                'https://ai-clothing.onrender.com/api/v1/dalle',
                options
            );

            const data = await response.json();

            handleDecals(type, `data:image/png;base64,${data.photo}`);
        } catch (error) {
            alert(error);
        } finally {
            setGeneratingImage(false);
        }
    };

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
                return (
                    <AIPIcker
                        generatingImage={generatingImage}
                        prompt={prompt}
                        setPrompt={setPrompt}
                        handleSubmit={handleSubmit}
                    />
                );

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
