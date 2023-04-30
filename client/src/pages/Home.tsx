import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
} from '../config/motion';

import ThreejsIcon from '../../public/threejs.png';
import CustomButton from '../components/CustomButton';
import { paramsSlice } from '../store/paramsSlice';

const Home = () => {
    const { intro } = useAppSelector((state) => state.paramsSlice);
    const { changeIntro } = paramsSlice.actions;
    const dispatch = useAppDispatch();

    return (
        <AnimatePresence>
            {intro && (
                <motion.section className='home' {...slideAnimation('left')}>
                    <motion.header {...slideAnimation('down')}>
                        <img
                            src={ThreejsIcon}
                            alt='threejs icon'
                            className='h-8 w-8 object-contain'
                        />
                    </motion.header>

                    <motion.div
                        className='home-content'
                        {...headContainerAnimation}
                    >
                        <motion.div {...headTextAnimation}>
                            <h1 className='head-text'>
                                ЗА <br className='hidden xl:block' /> ДЕЛО
                            </h1>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        {...headContentAnimation}
                        className='flex flex-col gap-5'
                    >
                        <p className='max-w-md text-base font-normal text-gray-600'>
                            Создайте свою уникальную и эксклюзивную футболку с
                            помощью совершенно нового инструмента
                            3D-кастомизации.{' '}
                            <strong> Раскройте свое воображение </strong> и
                            определите свой собственный стиль
                        </p>
                        <CustomButton
                            type='filled'
                            title='Создать'
                            handleClick={() => dispatch(changeIntro(false))}
                            customStyles='w-fit px-4 py-2.5 font-bold text-sm'
                        />
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default Home;
