import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { styled } from 'styled-components';
import AppBar from '../components/common/AppBar';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { duplicationCheck, duplicationCheckEmail, join, sendCode, varifyCode } from '../api/auth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  nickname: string;
  email: string;
  code: string;
  password: string;
  checkPassword: string;
};

const Join = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [nicknameChecked, setNicknameChecked] = useState<boolean | null>(null);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const nickname = watch('nickname');
  const email = watch('email');

  useEffect(() => {
    setEmailVerified(false);
  }, [email]);

  useEffect(() => {
    setNicknameChecked(false);
  }, [nickname]);

  // 닉네임 중복 확인
  const checkNickname = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const nickname = watch('nickname');
    const email = watch('email');
    const data = { nickname, email }; // 임시

    duplicationCheck(data).then(
      res => {
        console.log(res);

        if (res) {
          setMessage(t('join.nicknameAvailable'));
          setNicknameChecked(true);
          setIsOpen(true);
        } else {
          setMessage(t('join.nicknameUnavailable'));
          setIsOpen(true);
        }
      },
      error => {
        console.log(error);
        setMessage(t('join.nicknameUnavailable'));
        setIsOpen(true);
      }
    );
  };

  // 인증 메일 보내기
  const sendVerificationEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const email = watch('email');
    const data = { email };
    // 이메일 중복 체크
    setSendingEmail(true);
    duplicationCheckEmail(data).then(
      res => {
        if (res) {
          sendCode(data)
            .then(
              res => {
                console.log(res);
                if (res) {
                  setMessage(t('join.emailSent'));
                  setIsOpen(true);
                } else {
                  setMessage(t('join.emailSendFail'));
                  setIsOpen(true);
                }
              },

              error => {
                console.log('이메일 인증코드 전송 실패', error);
                setMessage(t('join.emailSendFail'));
                setIsOpen(true);
              }
            )
            .finally(() => {
              setSendingEmail(false);
            });
        } else {
          alert(`${t('message.alreadyEmail')}`);
          setSendingEmail(false);
        }
      },
      error => {
        console.log('이메일 중복체크 에러', error);
        alert(`${t('message.duplicateFail')}`);
        setSendingEmail(false);
      }
    );
  };

  const verifyEmailCode = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const email = watch('email');
    const code = watch('code');
    const data = { email, code };

    varifyCode(data).then(
      res => {
        console.log(res);
        if (res) {
          setMessage(t('join.verified'));
          setEmailVerified(true);
          setIsOpen(true);
        } else {
          setMessage(t('join.codeInvalid'));
          setIsOpen(true);
        }
      },
      error => {
        console.log(error);

        setMessage(t('join.codeCheckAgain'));
        setIsOpen(true);
      }
    );
  };

  const onSubmit: SubmitHandler<Inputs> = data => {
    const isChecked = nicknameChecked && emailVerified && watch('password') == watch('checkPassword');
    console.log(isChecked);
    const { email, password, nickname, code } = data;
    const joinData = { nickname, email, password, code };

    if (isChecked) {
      setLoading(true);

      join(joinData)
        .then(
          res => {
            console.log(res);
            console.log(t('join.success'));
          },
          error => {
            console.log(t('join.failure'));
            console.log(error);
            setMessage(t('join.failure'));
            setIsOpen(true);
          }
        )
        .finally(() => {
          setLoading(false);
          alert(t('join.success'));
          navigate('/login');
        });
    } else {
      if (!nicknameChecked) {
        setMessage(t('join.checkNickname'));
      } else if (!emailVerified) {
        setMessage(t('join.verifyEmail'));
      } else {
        setMessage(t('join.passwordMismatch'));
      }
      setIsOpen(true);
    }
  };

  return (
    <JoinStyle>
      <div className="app-bar">
        <AppBar leading={false} title={<div className="title">{t('join.title')}</div>} />
      </div>
      <div className="content-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section">
            <div className="input-title">{t('join.nickname')}</div>
            <div className="user-varification">
              <input
                {...register('nickname', {
                  required: { value: true, message: t('join.nicknameRequired') },
                  pattern: {
                    value: /[가-힣a-zA-Z0-9]{2,10}$/,
                    message: t('join.nicknamePattern'),
                  },
                })}
                placeholder={t('join.nickname')}
                className="input-container"
              />
              <Button size={'medium'} scheme={'keyButton'} onClick={checkNickname}>
                {t('join.checkDuplication')}
              </Button>
            </div>
            {errors.nickname ? (
              <div className="guide-message">{errors.nickname.message}</div>
            ) : (
              <div className="guide-message"></div>
            )}
          </div>
          <div className="section">
            <div className="input-title">{t('join.email')}</div>
            <div className="user-varification">
              <input
                {...register('email', { required: { value: true, message: t('join.emailRequired') } })}
                placeholder="example@gmail.com"
                type="email"
                className="input-container"
              />
              <Button size={'medium'} scheme={'keyButton'} onClick={sendVerificationEmail} disabled={sendingEmail}>
                {t('join.verify')}
              </Button>
            </div>
            {sendingEmail && <div className="sending">{'전송중입니다.'}</div>}
            {errors.email && <div className="guide-message">{errors.email.message}</div>}
            <div className="user-varification">
              <input
                {...register('code', { required: { value: true, message: t('join.codeRequired') } })}
                placeholder={t('join.enterCode')}
                className="input-container"
              />
              <Button size={'medium'} scheme={'keyButton'} onClick={verifyEmailCode}>
                {t('join.confirm')}
              </Button>
            </div>
            {errors.code ? (
              <div className="guide-message">{errors.code.message}</div>
            ) : (
              <div className="guide-message"></div>
            )}
          </div>

          <div className="section">
            <div className="input-title">{t('join.password')}</div>
            <div className="user-varification">
              <input
                {...register('password', {
                  required: { value: true, message: t('join.passwordRequired') },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/i,
                    message: t('join.passwordPattern'),
                  },
                })}
                placeholder={t('join.password')}
                type="password"
                className="input-container"
              />
            </div>
            {errors.password && <div className="guide-message">{errors.password.message}</div>}

            <div className="user-varification">
              <input
                {...register('checkPassword', {
                  required: { value: true, message: t('join.checkPasswordRequired') },
                  validate: {
                    positive: value => value === watch('password') || t('join.passwordMismatch'),
                  },
                })}
                placeholder={t('join.checkPassword')}
                type="password"
                className="input-container"
              />
            </div>

            {errors.checkPassword ? (
              <div className="guide-message">{errors.checkPassword.message}</div>
            ) : (
              <div className="guide-message"></div>
            )}
          </div>

          <div className="btn-wrapper">
            <Button size={'large'} scheme={'keyButton'} type="submit" className="join-btn" disabled={loading}>
              {t('join.join')}
            </Button>
          </div>
        </form>
      </div>
      {isOpen && <Modal message={message} setIsOpen={setIsOpen} width={70} />}
    </JoinStyle>
  );
};

const JoinStyle = styled.div`
  .app-bar {
    .title {
      flex: 1;

      text-align: center;
      color: ${({ theme }) => theme.color.keyColor};
      ${({ theme }) => theme.font.subTitle};
    }
  }
  .content-wrapper {
    margin: 30px 28px 0 28px;

    .section {
      .input-title {
        margin-bottom: 10px;

        color: ${({ theme }) => theme.color.gray80};
        ${({ theme }) => theme.font.body2};
      }
      .user-varification {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 13px;

        margin-bottom: 10px;
      }
      .guide-message {
        min-height: 20px;

        margin-left: 2px;
        margin-bottom: 8px;

        color: ${({ theme }) => theme.color.red};
        ${({ theme }) => theme.font.body5};
      }
      .sending {
        min-height: 20px;

        margin-left: 2px;
        margin-bottom: 8px;

        color: ${({ theme }) => theme.color.keyColor};
        ${({ theme }) => theme.font.body5};
      }
    }
  }

  .input-container {
    width: 100%;
    height: 52px;
    padding: 15px;
    flex: 1;

    outline: none;
    border: none;
    border-radius: 12px;
    background: ${({ theme }) => theme.color.gray20};
  }

  .btn-wrapper {
    width: 100%;
    margin: 0 auto;
  }

  .join-btn {
    margin-top: 52px;
  }
`;

export default Join;
