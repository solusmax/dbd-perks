import './styles.scss'
import { CustomComponentProps, PerkData } from '../../types'
import { useTranslation } from 'react-i18next'
import { Tooltip } from 'react-tooltip'
import { MouseEvent, useState, useRef } from 'react'
import { disablePointerEvents, isCurrentLanguageEnglish, resetPointerEvents } from '../../utils'
import { autoPlacement, offset, shift } from '@floating-ui/dom'
import useWindowDimensions from '../../hooks/use-window-dimensions'
import { DESKTOP_PADDING, DESKTOP_WINDOW_WIDTH, MOBILE_PADDING, TABLET_PADDING, TABLET_WINDOW_WIDTH } from '../../consts'

type SideImages = {
  survivor: string
  killer: string,
}

const sideImages: SideImages = {
  survivor: './img/perks/survivor.png',
  killer: './img/perks/killer.png'
}

type SideImgProps = CustomComponentProps & {
  side: string
}

function SideImg({ className = '', side }: SideImgProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <img className={`perk__side-img ${className}`} src={sideImages[side as keyof SideImages]} alt={t(side, { ns: 'sides' })} />
  )
}

type PerkProps = CustomComponentProps & PerkData;

export default function Perk({
  className = '',
  id,
  side,
  character,
  icon,
  wiki,
  legacy,
}: PerkProps): React.JSX.Element {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isLegacyMode, setLegacyMode] = useState<boolean>(false)
  const { width: windowWidth } = useWindowDimensions();
  const perkButtonRef = useRef<HTMLButtonElement>(null);

  const { t } = useTranslation();

  const handleLegacySwitcherClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLegacyMode(!isLegacyMode);
  }

  const perkButton: HTMLButtonElement | null = perkButtonRef.current;

  return (
    <div className={`perk ${className}`}>
      <button id={`perk-${id}`} className={`perk__button ${isInfoOpen ? 'perk__button--selected' : ''}`} ref={perkButtonRef}>
        <img className="perk__img" src={`./img/perks/${side}/${!(isLegacyMode && legacy !== null) ? icon : 'legacy/' + legacy.icon}`} alt={t(!isLegacyMode ? `${id}.name` : `${id}.legacy.name`, { ns: 'perks'})} />
      </button>
      <div className="perk__overlay" />

      <Tooltip
        className="perk__info"
        anchorSelect={`#perk-${id}`}
        closeOnEsc
        clickable
        noArrow
        afterShow={() => {
          if (perkButton) disablePointerEvents(perkButton);

          setIsInfoOpen(true);
        }}
        afterHide={() => {
          if (perkButton) resetPointerEvents(perkButton);

          setIsInfoOpen(false);
        }}
        openOnClick
        opacity={1}
        middlewares={[
          autoPlacement({
            crossAxis: true,
            allowedPlacements: ['bottom-start', 'bottom', 'bottom-end'],
          }),
          shift({
            padding: windowWidth < TABLET_WINDOW_WIDTH
              ? MOBILE_PADDING
              : windowWidth < DESKTOP_WINDOW_WIDTH
                ? TABLET_PADDING
                : DESKTOP_PADDING
          }),
          offset(-25)
        ]}
      >
        <div className="perk__header">
          <div className="perk__name">
            <a className="perk__wiki-link" href={!(isLegacyMode && legacy !== null) ? wiki : legacy.wiki} target="_blank" rel="noreferrer">
              {t(!isLegacyMode ? `${id}.name` : `${id}.legacy.name`, { ns: 'perks'})}
            </a>
          </div>
          <div className="perk__subtitle">
              {!isCurrentLanguageEnglish() ? `${t(!isLegacyMode ? `${id}.name` : `${id}.legacy.name`, { ns: 'perks', lng: 'en' })} • ` : ''}
              {t(!(isLegacyMode && legacy !== null) ? character : legacy.character, { ns: 'characters' })}
          </div>
          <div className="perk__side">
            {legacy !== null ? (
            <button className="perk__legacy-switcher" type="button" onClick={handleLegacySwitcherClick}>
              <SideImg side={side} />
            </button>
            ) : (
              <SideImg side={side} />
            )}
          </div>
        </div>
        <div className="perk__description" dangerouslySetInnerHTML={{__html: t(`${id}.description`, { ns: 'perks'})}} />
      </Tooltip>
  </div>
  )
}
