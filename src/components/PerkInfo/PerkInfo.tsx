import { autoPlacement, offset, shift } from '@floating-ui/dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';

import { clearSelectedPerkId } from '@/store/appSlice';
import { RootState } from '@/store/store';
import { getDataAttribute } from '@/utils';

import PerkDescription from '@/components/PerkDescription/PerkDescription';
import PerkHeader from '@/components/PerkHeader/PerkHeader';

import './PerkInfo.scss';

export default function PerkInfo(): JSX.Element {
  const dispatch = useDispatch();

  const currentPerkId = useSelector(
    (state: RootState) => state.app.selectedPerkId,
  );

  return (
    <Tooltip
      // Unique ID for each tooltip to force rerender on language change
      id={`perk-info-${currentPerkId}` ?? 'perk-info-no-selected-perk'}
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

        const perkId = getPerkData('perk-id');
        const perkName = getPerkData('perk-name');
        const perkSide = getPerkData('perk-side');
        const perkCharacter = getPerkData('perk-character');
        const perkWiki = getPerkData('perk-wiki');
        const perkDescription = getPerkData('perk-description');
        const perkHasLegacy = getPerkData('perk-has-legacy') === 'true';
        const perkLegacy = {
          name: getPerkData('perk-legacy-name'),
          character: getPerkData('perk-legacy-character'),
          wiki: getPerkData('perk-legacy-wiki'),
        };

        return (
          <>
            <PerkHeader
              id={perkId}
              name={perkName}
              side={perkSide}
              character={perkCharacter}
              wiki={perkWiki}
              hasLegacy={perkHasLegacy}
              legacy={perkLegacy}
            />
            <PerkDescription description={perkDescription} />
          </>
        );
      }}
    />
  );
}
