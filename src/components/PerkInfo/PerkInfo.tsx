import { autoPlacement, offset, shift } from '@floating-ui/dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';

import { setSelectedPerkId } from '@/store/appSlice';
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
        dispatch(setSelectedPerkId(null));
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

        const perkId = getDataAttribute(activePerkButton, 'perk-id');

        return (
          <>
            <PerkHeader id={perkId} />
            <PerkDescription id={perkId} />
          </>
        );
      }}
    />
  );
}
