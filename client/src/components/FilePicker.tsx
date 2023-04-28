import CustomButton from './CustomButton';

type FilePickerProps = {
    file: File | undefined;
    setFile: (file: File) => void;
    readFile: (type: string) => void;
};

const FilePicker = ({ file, setFile, readFile }: FilePickerProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target?.files?.item(0);

        if (!newFile) return;

        setFile(newFile);
    };

    const handleLogoButtonClick = () => {
        readFile('logo');
    };

    const handleFullTextureButtonClick = () => {
        readFile('full');
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
                <p className='mt-2 truncate text-xs text-gray-500'>
                    Имя файла: {file?.name}
                </p>
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
