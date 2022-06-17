import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPath } from '../helpers/functions';
import { CSSTransition } from 'react-transition-group';

const Arrows = ({ onExited, show }) => {
  const router = useRouter();
  const { pathname } = router;

  const [value, setValue] = useState(false);

  const timeout = 950;

  const [isRightActive, setIsRightActive] = useState(true);
  const [isLeftActive, setIsLeftActive] = useState(true);

  useEffect(() => {
    if (show) {
      setIsRightActive(true);
      setIsLeftActive(true);
    }
  }, [show]);

  const nextPathname = getPath(pathname, 1);
  const prevPathname = getPath(pathname, -1);

  const onClickRightArrow = (e) => {
    e.preventDefault();
    setIsRightActive(false);
    router.push(nextPathname);
  };

  const onClickLeftArrow = (e) => {
    e.preventDefault();
    setIsLeftActive(false);
    router.push(prevPathname);
  };

  return (
    <>
      <CSSTransition
        classNames={'arrow__right'}
        in={show}
        timeout={timeout}
        onExited={onExited}
      >
        <div className='arrow__right'>
          <CSSTransition classNames={'arrow__link'} in={isRightActive} timeout={timeout}>
            <a className='arrow__link' onClick={onClickRightArrow} href={nextPathname} />
          </CSSTransition>
          <span className='arrow__text'>next</span>
          <div className='arrow__arrow' />
        </div>
      </CSSTransition>
      <CSSTransition classNames={'arrow__left'} timeout={timeout} in={show}>
        <div className='arrow__left'>
          <CSSTransition classNames={'arrow__link'} in={isLeftActive} timeout={timeout}>
            <a className='arrow__link' onClick={onClickLeftArrow} href={prevPathname} />
          </CSSTransition>
          <div className='arrow__arrow' />
          <span className='arrow__text'>prev</span>
        </div>
      </CSSTransition>
    </>
  );
};

export default Arrows;
