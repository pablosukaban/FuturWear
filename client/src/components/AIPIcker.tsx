import CustomButton from './CustomButton';

type AIPIckerProps = {
    prompt: string;
    setPrompt: (prompt: string) => void;
    generatingImage: boolean;
    handleSubmit: (type: string) => void;
};

const AIPIcker = ({
    generatingImage,
    handleSubmit,
    prompt,
    setPrompt,
}: AIPIckerProps) => {
    return (
        <div className='aipicker-container'>
            <textarea
                className='aipicker-textarea'
                rows={5}
                placeholder='Введите запрос...'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <div className='flex flex-wrap gap-3'>
                {generatingImage ? (
                    <>
                        <CustomButton
                            title='Ждем ответ...'
                            disabled={true}
                            customStyles='text-xs'
                            type='outline'
                        />
                    </>
                ) : (
                    <>
                        <CustomButton
                            type='outline'
                            title='AI Logo'
                            handleClick={() => handleSubmit('logo')}
                            customStyles='text-xs'
                        />
                        <CustomButton
                            type='filled'
                            title='AI Full'
                            handleClick={() => handleSubmit('full')}
                            customStyles='text-xs'
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AIPIcker;
