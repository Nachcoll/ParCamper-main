import React, { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { RatingProps } from '../Interfaces/Rating.interface';

const Rating = ({ count, rating, color, onRating }: RatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const getColor = (index: number) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }
    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <Icon
          className='cursor-pointer'
          key={idx}
          icon='mdi:star'
          height={40}
          width={40}
          onClick={() => onRating(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, rating, hoverRating]);
  return <div className='rating'>{starRating}</div>;
};

Rating.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: '#ecdd7b',
    unfilled: '#DCDCDC',
  },
};

export default Rating;
