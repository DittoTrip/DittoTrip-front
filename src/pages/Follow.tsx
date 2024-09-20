import { styled } from 'styled-components';

import Tap from '../components/common/Tab';
import { TapItem } from './Category';
import AppBar from '../components/common/AppBar';
import { useState } from 'react';
import SearchContent from '../components/search/SearchContent';
import SearchCeleb from '../components/search/SearchCeleb';
import SpotItem from '../components/common/SpotItem';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import useFollowList from '../hooks/follow/useFollowList';
import SearchUser from '../components/search/SearchUser';
import ErrorPage from './Error';

const tapData: TapItem[] = [
  { id: 1, title: '팔로우', content: <div></div> },
  { id: 2, title: '팔로워', content: <div></div> },
];

const Follow = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [selectedTapId, setSelectedId] = useState<number>(tapData[0]?.id);
  const { FollowedList, FollowedCount, FollowingList, FollowingCount, loading } = useFollowList(id!);

  if (loading) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  }

  return (
    <FollowStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">팔로우</div>} />
      </div>
      <Tap tapData={tapData} selectedId={selectedTapId} setSelectedId={setSelectedId} />
      <div className="content-wrapper">
        {selectedTapId === 1 && (
          <>
            {FollowedCount}명
            {FollowedList?.map(data => (
              <SearchUser data={data.userData} />
            ))}
          </>
        )}
        {selectedTapId === 2 && (
          <>
            {FollowingCount}명
            {FollowingList?.map(data => (
              <SearchUser data={data.userData} />
            ))}
          </>
        )}
      </div>
    </FollowStyle>
  );
};

const FollowStyle = styled.div`
  .title {
    flex: 1;
    text-align: left;
    ${({ theme }) => theme.font.subTitle}
  }

  .content-wrapper {
    margin: 16px 22px;
  }
  .content-search-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

export default Follow;
