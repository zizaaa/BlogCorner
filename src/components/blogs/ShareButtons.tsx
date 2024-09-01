import React from 'react';
import { ShareButtonProps } from '../../types/Props';
import { clientURL } from '../../hooks/clientURL';
import ShareSocialButton from './ShareSocialButton';


const ShareButtons: React.FC<ShareButtonProps> = ({ id }) => {
    const blogUrl = `${clientURL}/blog/${id}`

    return (
        <div className='border-[1px] border-gray-200 rounded-md p-5 mb-5 dark:border-gray-600 max-[900px]:w-full'>
            <h1 className='text-xl font-medium dark:text-white'>Share</h1>
            <div className='flex flex-row flex-wrap items-center gap-5 mt-5'>
                <ShareSocialButton
                    url={blogUrl}
                />
            </div>
        </div>
    );
};

export default ShareButtons;