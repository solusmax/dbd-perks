import { autoPlacement, offset, shift } from '@floating-ui/dom';
import clsx from 'clsx';
import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { useEventListener } from 'usehooks-ts';

import {
  setIsKillerPerksShown,
  setIsSearchByDescripton,
  setIsSurvivorPerksShown,
} from '@/store/appSlice';
import { RootState } from '@/store/store';

import { CustomComponentProps } from '@/types';

import SvgIcon from '@/components/SvgIcon/SvgIcon';

import './Menu.scss';

type MenuCheckboxProps = CustomComponentProps & {
  id: string;
  checked: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

function MenuCheckbox({
  children,
  id,
  checked,
  onChange,
}: MenuCheckboxProps): JSX.Element {
  return (
    <>
      <input
        className="menu__checkbox visually-hidden"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label className="menu__checkbox-label" htmlFor={id}>
        {children}
      </label>
    </>
  );
}

type MenuProps = CustomComponentProps;

export default function Menu({ className }: MenuProps): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isKillerPerksShown = useSelector(
    (state: RootState) => state.app.killerPerksShown,
  );
  const isSurvivorPerksShown = useSelector(
    (state: RootState) => state.app.survivorPerksShown,
  );
  const isSearchByDescription = useSelector(
    (state: RootState) => state.app.isSearchByDescription,
  );

  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);

  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    setIsMenuShown(!isMenuShown);
  };

  const handleOutsideClick = (evt: Event) => {
    const menuWrapperNode = menuWrapperRef.current;
    const menuButtonNode = menuButtonRef.current;

    if (
      menuWrapperNode == null ||
      menuWrapperNode.contains(evt.target as Node) ||
      menuButtonNode == null ||
      menuButtonNode.contains(evt.target as Node)
    ) {
      return;
    }

    if (isMenuShown) {
      setIsMenuShown(false);
    }
  };

  const handleKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      if (isMenuShown) {
        setIsMenuShown(false);
      }
    }
  };

  const handleScroll = () => {
    if (isMenuShown) {
      setIsMenuShown(false);
    }
  };

  useEventListener('mousedown', handleOutsideClick);
  useEventListener('keydown', handleKeydown);
  useEventListener('scroll', handleScroll);

  const handleKillerCheckboxClick = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsKillerPerksShown(evt.target.checked));
  };

  const handleSurvivorCheckboxClick = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsSurvivorPerksShown(evt.target.checked));
  };

  const handleSearchByDescriptionCheckboxClick = (
    evt: ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setIsSearchByDescripton(evt.target.checked));
  };

  return (
    <>
      <div className={clsx(className, 'menu', isMenuShown && 'menu--shown')}>
        <button
          className="menu__button"
          ref={menuButtonRef}
          onClick={handleButtonClick}
        >
          <SvgIcon className="menu__button-svg" icon="settings" />
          <span className="visually-hidden">
            {t('show-menu-button', { ns: 'app' })}
          </span>
        </button>
      </div>

      {createPortal(
        <Tooltip
          className="menu__dropdown"
          anchorSelect={'.menu__button'}
          clickable
          isOpen={isMenuShown}
          noArrow
          opacity={1}
          middlewares={[
            autoPlacement({
              crossAxis: true,
              allowedPlacements: ['bottom-end'],
            }),
            shift({
              padding: 10,
            }),
            offset(4),
          ]}
        >
          <FocusLock>
            <div className="menu__wrapper" ref={menuWrapperRef}>
              <ul className="menu__list">
                <li className="menu__item">
                  <MenuCheckbox
                    id="menu-killer-perks-checkbox"
                    checked={isKillerPerksShown}
                    onChange={handleKillerCheckboxClick}
                  >
                    {t('menu.checkbox-killer-perks', { ns: 'app' })}
                  </MenuCheckbox>
                </li>

                <li className="menu__item">
                  <MenuCheckbox
                    id="menu-survivor-perks-checkbox"
                    checked={isSurvivorPerksShown}
                    onChange={handleSurvivorCheckboxClick}
                  >
                    {t('menu.checkbox-survivor-perks', { ns: 'app' })}
                  </MenuCheckbox>
                </li>
              </ul>

              <hr className="menu__divider" />

              <ul className="menu__list">
                <li className="menu__item">
                  <MenuCheckbox
                    id="menu-search-by-description-checkbox"
                    checked={isSearchByDescription}
                    onChange={handleSearchByDescriptionCheckboxClick}
                  >
                    {t('menu.search-description', { ns: 'app' })}
                  </MenuCheckbox>
                </li>
              </ul>

              <hr className="menu__divider" />

              <ul className="menu__list">
                <li className="menu__item menu__item--not-full-width">
                  <a
                    className="menu__link"
                    href="https://github.com/solusmax/dbd-perks"
                  >
                    <SvgIcon className="menu__item-icon" icon="github" />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </FocusLock>
        </Tooltip>,
        document.body,
      )}
    </>
  );
}
