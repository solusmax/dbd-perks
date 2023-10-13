import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { AppLayout } from '@/consts';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { isMobileBreakpoint } from '@/utils';

import { CustomComponentProps, PerkData } from '@/types';

import Perk from '@/components/Perk/Perk';
import PerkInfo from '@/components/PerkInfo/PerkInfo';

import './Perks.scss';

const PerksLayout = {
  PerkWidth: {
    Mobile: 92,
    Tablet: 160,
  },
  Gap: {
    Mobile: 6,
    Tablet: 32,
  },
  ExtraOffset: {
    Mobile: 50,
    Tablet: 96,
  },
  FreeSpace: 50,
};

const calcMinWindowWidth = (
  perksCount: number,
  breakpoint: 'Mobile' | 'Tablet',
) => {
  return (
    (perksCount + 1) * PerksLayout.PerkWidth[breakpoint] +
    perksCount * PerksLayout.Gap[breakpoint] +
    PerksLayout.ExtraOffset[breakpoint] +
    AppLayout.Padding[breakpoint] * 2 +
    PerksLayout.FreeSpace
  );
};

const calcRowSize = (windowWidth: number) => {
  if (windowWidth < calcMinWindowWidth(3, 'Mobile')) {
    return 3;
  }

  if (windowWidth < calcMinWindowWidth(4, 'Mobile')) {
    return 4;
  }

  if (isMobileBreakpoint(windowWidth)) return 5;

  if (windowWidth < calcMinWindowWidth(3, 'Tablet')) {
    return 3;
  }

  if (windowWidth < calcMinWindowWidth(4, 'Tablet')) {
    return 4;
  }

  return 5;
};

type EmptySlotProps = CustomComponentProps;

function EmptySlot({ className }: EmptySlotProps): JSX.Element {
  return <div className={clsx(className, 'perks__empty-slot')} />;
}

type EmptySlotsProps = {
  count: number;
};

function EmptySlots({ count }: EmptySlotsProps): JSX.Element | null {
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

export default function Perks({ className, perks }: PerksProps): JSX.Element {
  const { width: windowWidth } = useWindowDimensions();

  const [rowSize, setRowSize] = useState<number>(calcRowSize(windowWidth));

  useEffect(() => {
    setRowSize(calcRowSize(windowWidth));
  }, [windowWidth]);

  const perksCount = perks.length;
  const isMultiple = perksCount % rowSize === 0;

  return (
    <>
      <div className={clsx(className, 'perks', `perks--row-size-${rowSize}`)}>
        {perks.map((perk) => {
          return <Perk key={perk.id} className="perks__perk" id={perk.id} />;
        })}

        {perksCount < rowSize * 3 && (
          <EmptySlots count={rowSize * 3 - perksCount} />
        )}

        {perksCount > rowSize * 3 && !isMultiple && (
          <EmptySlots count={rowSize - (perksCount % rowSize)} />
        )}
      </div>
      <PerkInfo />
    </>
  );
}
