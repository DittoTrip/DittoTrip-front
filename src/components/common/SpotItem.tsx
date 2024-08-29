import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import { spotDetails } from '../../pages/Spot';
import Dot from './Dot';
import TagSlide from './TagSlide';
import Star from './Star';

interface AroundDataType {
  img: string;
  name: string;
  distance: string;
  tagList: string[];
  reviewCount: number;
  rating: number;
  address: string;
}

interface Props {
  data: AroundDataType;
  setSelectedAddress: (selectedAddress: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const SpotItem = ({ data, setSelectedAddress, setIsOpen }: Props) => {
  const handleAddressClick = () => {
    setSelectedAddress(data.address);
    setIsOpen(true);
  };

  const handleHeartClick = () => {};

  return (
    <SpotItemStyle>
      <img className="spot-image" src={data.img} />
      <div className="spot-info">
        <div className="spot-info-header">
          <div className="spot-info-name">{data.name}</div>
          <div className="heart">
            <FontAwesomeIcon icon={spotDetails.isLiked ? faHeart : faEmptyHeart} onClick={() => handleHeartClick()} />
          </div>
        </div>
        <div className="spot-info-rating-wrapper">
          <div className="spot-info-rating">{data.rating}</div>
          <Star rating={data.rating} size={12} gap={3} />
          <div>({data.reviewCount})</div>
        </div>
        <div className="spot-info-address-wrapper" onClick={() => handleAddressClick()}>
          <div className="spot-info-distance">{data.distance}</div>
          <Dot color={'gray40'} />

          <div className="spot-info-address">{data.address}</div>
          <FontAwesomeIcon className="more-icon" icon={faChevronDown} />
        </div>
        <div className="spot-info-tag">
          <TagSlide tagList={data.tagList} />
        </div>
      </div>
    </SpotItemStyle>
  );
};

const SpotItemStyle = styled.div`
  display: flex;
  gap: 16px;

  padding: 16px 0;

  border-radius: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray20};
  background-color: ${({ theme }) => theme.color.background};

  .spot-image {
    height: 100px;
    width: 128px;
    border-radius: 12px;
  }

  .spot-info-tag {
    width: 200px;
  }
  .spot-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .spot-info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;

      margin-bottom: 4px;

      .spot-info-name {
        ${({ theme }) => theme.font.body2};
      }

      .heart {
        path {
          color: ${({ theme }) => theme.color.keyColor};
        }
      }
    }

    .spot-info-rating-wrapper {
      display: flex;
      gap: 8px;

      ${({ theme }) => theme.font.body5}
    }

    .spot-info-address-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;

      .spot-info-distance {
        ${({ theme }) => theme.font.body4};
        color: ${({ theme }) => theme.color.gray80};
      }

      .spot-info-address {
        color: ${({ theme }) => theme.color.gray60};
        ${({ theme }) => theme.font.body4};
        width: 135px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .more-icon {
        font-size: 7px;
      }

      path {
        color: ${({ theme }) => theme.color.gray60};
      }
    }
  }
`;

export default SpotItem;
