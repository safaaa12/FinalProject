import React from 'react';
import ContentCard from './contentCard';

const ContentMap = ({ contents }) => {
    return (
        <>
            {contents.map((content, index) => (
                <ContentCard key={index} content={content} />
            ))}
        </>
    );
}

export default ContentMap;
