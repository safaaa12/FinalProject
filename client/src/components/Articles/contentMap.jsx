import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { contentCard } from '.';
import ContentCard from './contentCard';

const ContentMap = ({ contents, favouriteContents, onlyFavourites }) => {

    return (
        <>
            {contents.map((content, index) => {
                const isFavourite = favouriteContents.includes(content._id);
                return (
                    (onlyFavourites && isFavourite) || !onlyFavourites ? (
                        <ContentCard key={index} content={content}
                            isFavourite={isFavourite} />
                    ) : null
                );
            })}
        </>
    );
}

export default ContentMap;