import './styles.scss';
import { CustomComponentProps, PerkData } from '../../types';
import Perk from '../Perk';
import useWindowDimensions from '../../hooks/use-window-dimensions';
import { useEffect, useState } from 'react';
import {
  MOBILE_PADDING,
  TABLET_PADDING,
  TABLET_WINDOW_WIDTH,
} from '../../consts';

const MOBILE_PERK_WIDTH = 92;
const TABLET_PERK_WIDTH = 160;

const MOBILE_PERK_GAP = 6;
const TABLET_PERK_GAP = 32;

const MOBILE_EXTRA_OFFSET = 50;
const TABLET_EXTRA_OFFSET = 96;

const FREE_WIDTH = 18;

const calcRowSize = (windowWidth: number) => {
  if (
    windowWidth <
    4 * MOBILE_PERK_WIDTH +
      3 * MOBILE_PERK_GAP +
      MOBILE_EXTRA_OFFSET +
      MOBILE_PADDING * 2 +
      FREE_WIDTH
  )
    return 3;
  if (
    windowWidth <
    5 * MOBILE_PERK_WIDTH +
      4 * MOBILE_PERK_GAP +
      MOBILE_EXTRA_OFFSET +
      MOBILE_PADDING * 2 +
      FREE_WIDTH
  )
    return 4;
  if (windowWidth < TABLET_WINDOW_WIDTH) return 5;
  if (
    windowWidth <
    4 * TABLET_PERK_WIDTH +
      3 * TABLET_PERK_GAP +
      TABLET_EXTRA_OFFSET +
      TABLET_PADDING * 2 +
      FREE_WIDTH
  )
    return 3;
  if (
    windowWidth <
    5 * TABLET_PERK_WIDTH +
      4 * TABLET_PERK_GAP +
      TABLET_EXTRA_OFFSET +
      TABLET_PADDING * 2 +
      FREE_WIDTH
  )
    return 4;
  return 5;
};

type EmptySlotProps = CustomComponentProps;

function EmptySlot({ className = '' }: EmptySlotProps): React.JSX.Element {
  return <div className={`perks__empty-slot ${className}`} />;
}

type EmptySlotsProps = {
  count: number;
};

function EmptySlots({ count }: EmptySlotsProps): React.JSX.Element | null {
  if (count <= 0) return null;

  return (
    <>
      {new Array(count).fill(null).map((_, i) => {
        return <EmptySlot key={i} className="perks__perk" />;
      })}
    </>
  );
}

type PerksProps = CustomComponentProps & {
  perks: PerkData[];
};

export default function Perks({
  className = '',
  perks,
}: PerksProps): React.JSX.Element {
  const { width: windowWidth } = useWindowDimensions();

  const [rowSize, setRowSize] = useState<number>(calcRowSize(windowWidth));

  useEffect(() => {
    setRowSize(calcRowSize(windowWidth));
  }, [windowWidth]);

  const perksCount = perks.length;
  const isMultiple = perksCount % rowSize === 0;

  return (
    <div className={`perks perks--row-size-${rowSize} ${className}`}>
      {perks.map((perk) => {
        return <Perk key={perk.id} className="perks__perk" {...perk} />;
      })}

      {perksCount < rowSize * 3 &&
        EmptySlots({ count: rowSize * 3 - perksCount })}

      {perksCount > rowSize * 3 &&
        !isMultiple &&
        EmptySlots({ count: rowSize - (perksCount % rowSize) })}
    </div>
  );
}
