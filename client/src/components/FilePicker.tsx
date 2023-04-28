import CustomButton from './CustomButton';

const FilePicker = () => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
    };

    const handleLogoButtonClick = () => {
        console.log('click');
    };

    const handleFullTextureButtonClick = () => {
        console.log('full click');
    };

    return (
        <div className='filepicker-container'>
            <div className='flex flex-1 flex-col'>
                <input
                    id='file-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleChange}
                />
                <label htmlFor='file-upload' className='filepicker-label'>
                    Загрузить файл
                </label>
                <p className='mt-2 truncate text-xs text-gray-500'>Имя файла</p>
            </div>

            <div className='mt-4 flex flex-wrap gap-3'>
                <CustomButton
                    customStyles='text-xs'
                    title='logo'
                    type='outline'
                    handleClick={handleLogoButtonClick}
                />

                <CustomButton
                    customStyles='text-xs'
                    title='full'
                    type='filled'
                    handleClick={handleFullTextureButtonClick}
                />
            </div>
        </div>
    );
};

export default FilePicker;
