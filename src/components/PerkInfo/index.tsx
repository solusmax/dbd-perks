import { useIsLegacyMode } from '../../hooks/use-is-legacy-mode';
import { clearSelectedPerkId, toogleLegacyPerk } from '../../store/appSlice';
import { RootState } from '../../store/store';
import { CustomComponentProps } from '../../types';
import { getDataAttribute, isCurrentLanguageEnglish } from '../../utils';
import './styles.scss';
import { autoPlacement, offset, shift } from '@floating-ui/dom';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';

type SideImages = {
  survivor: string;
  killer: string;
};

const sideImages: SideImages = {
  survivor: './img/perks/survivor.png',
  killer: './img/perks/killer.png',
};

type SideImgProps = CustomComponentProps & {
  side: string;
};

function SideImg({ className = '', side }: SideImgProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <img
      className={`perk-info__side-img ${className}`}
      src={sideImages[side as keyof SideImages]}
      alt={t(side, { ns: 'sides' })}
    />
  );
}

export default function PerkInfo(): React.JSX.Element {
  const currentPerkId = useSelector(
    (state: RootState) => state.app.selectedPerkId,
  );
  const isLegacyMode = useIsLegacyMode(currentPerkId);
  const dispatch = useDispatch();

  const handleLegacySwitcherClick = (perkId: string) => {
    return (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();

      dispatch(toogleLegacyPerk(perkId));
    };
  };

  return (
    <Tooltip
      className="perk-info"
      anchorSelect={'.perk__button'}
      openOnClick
      closeOnEsc
      clickable
      afterHide={() => {
        dispatch(clearSelectedPerkId());
      }}
      noArrow
      opacity={1}
      middlewares={[
        autoPlacement({
          crossAxis: true,
          allowedPlacements: ['bottom-start', 'bottom', 'bottom-end'],
        }),
        shift({
          padding: 10,
        }),
        offset(-25),
      ]}
      render={({ activeAnchor: activePerkButton }) => {
        if (activePerkButton === null) return;

        const getPerkData = (attribute: string) =>
          getDataAttribute(activePerkButton, attribute);

        const getStringWithDevider = (string: string) => `${string} • `;

        const perkId = getPerkData('data-perk-id');
        const perkName = getPerkData('data-perk-name');
        const perkNameEn = getPerkData('data-perk-name-en');
        const perkSide = getPerkData('data-perk-side');
        const perkCharacter = getPerkData('data-perk-character');
        const perkDescription = getPerkData('data-perk-description');
        const perkHasLegacy = getPerkData('data-perk-has-legacy') === 'true';
        const perkWiki = getPerkData('data-perk-wiki');
        const perkLegacy = {
          name: getPerkData('data-perk-legacy-name'),
          nameEn: getPerkData('data-perk-legacy-name-en'),
          character: getPerkData('data-perk-legacy-character'),
          wiki: getPerkData('data-perk-legacy-wiki'),
        };

        return (
          <>
            <div className="perk-info__header">
              <div className="perk-info__name">
                <a
                  className="perk-info__wiki-link"
                  href={
                    !(perkHasLegacy && isLegacyMode)
                      ? perkWiki
                      : perkLegacy.wiki
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {!isLegacyMode ? perkName : perkLegacy.name}
                </a>
              </div>
              <div className="perk-info__subtitle">
                {!isCurrentLanguageEnglish()
                  ? !isLegacyMode
                    ? getStringWithDevider(perkNameEn)
                    : getStringWithDevider(perkLegacy.nameEn)
                  : ''}
                {!isLegacyMode ? perkCharacter : perkLegacy.character}
              </div>
              <div className="perk-info__side">
                {!perkHasLegacy ? (
                  <SideImg side={perkSide} />
                ) : (
                  <button
                    className="perk-info__legacy-switcher"
                    type="button"
                    onClick={handleLegacySwitcherClick(perkId)}
                  >
                    <SideImg side={perkSide} />
                  </button>
                )}
              </div>
            </div>
            <div
              className="perk-info__description"
              dangerouslySetInnerHTML={{ __html: perkDescription }}
            />
          </>
        );
      }}
    />
  );
}
