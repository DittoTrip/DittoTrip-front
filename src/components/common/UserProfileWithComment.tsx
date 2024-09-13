import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import profileImg from '../../assets/profile.png';
import { ReviewCommentData, ReviewData } from '../../models/reveiw/reviewModel';

interface Props {
  name: string;
  date: string;
  comment: ReviewCommentData;
  isParent?: boolean;
  setIsExpandedOption: (expanded: boolean) => void;
  setSelectedObj?: (obj: ReviewCommentData | ReviewData) => void;
  setParentComment?: (parentComment: ReviewCommentData) => void;
}
const UserProfileWithComment = ({ name, date, comment, setIsExpandedOption, setParentComment }: Props) => {
  return (
    <UserProfileWithCommentStyle>
      {/* 마이페이지 이동 필요   */}
      {/* 마이페이지 이동 필요   */}
      <div className="profile-left">
        <img className="user-img" src={profileImg} alt="프로필 이미지" />
      </div>
      <div className="profile-right">
        <div className="profile-info">
          <div className="profile-details">
            <div className="user-name">{name}</div>
            <div className="date">{date}</div>
          </div>

          <div className="actions">
            <FontAwesomeIcon
              className="icon"
              icon={faEllipsis}
              onClick={() => {
                setIsExpandedOption(true);
              }}
            />
          </div>
        </div>

        {comment && <div className="comment">{comment.body}</div>}
        {setParentComment && (
          <div className="parent" onClick={() => setParentComment(comment)}>
            댓글달기
          </div>
        )}
      </div>
    </UserProfileWithCommentStyle>
  );
};

const UserProfileWithCommentStyle = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;

  .profile-left {
    display: flex;
  }

  .user-img {
    width: 42px;
    height: 42px;
  }

  .profile-right {
    flex: 1;

    .profile-info {
      display: flex;
      justify-content: space-between;

      .user-name {
        ${({ theme }) => theme.font.body2}
      }

      .date {
        color: ${({ theme }) => theme.color.gray60};
      }
    }

    .actions {
      path {
        color: ${({ theme }) => theme.color.gray40};
      }
    }

    .comment {
      margin-top: 8px;
    }

    .parent {
      color: ${({ theme }) => theme.color.gray80};
    }
  }
`;

export default UserProfileWithComment;
