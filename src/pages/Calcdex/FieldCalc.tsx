import * as React from 'react';
import cx from 'classnames';
import { Dropdown } from '@showdex/components/form';
import { TableGrid, TableGridItem } from '@showdex/components/layout';
import { Button } from '@showdex/components/ui';
import {
  LegacyWeatherNames,
  TerrainNames,
  WeatherMap,
  WeatherNames,
} from '@showdex/consts';
import { useColorScheme } from '@showdex/redux/store';
import { detectLegacyGen } from '@showdex/utils/battle';
import type { GenerationNum } from '@pkmn/data';
import type { CalcdexBattleField, CalcdexPlayerKey } from '@showdex/redux/store';
import styles from './FieldCalc.module.scss';

interface FieldCalcProps {
  className?: string;
  style?: React.CSSProperties;
  battleId?: string;
  gen?: GenerationNum;
  playerKey?: CalcdexPlayerKey;
  field?: CalcdexBattleField;
  onFieldChange?: (field: DeepPartial<CalcdexBattleField>) => void;
}

export const FieldCalc = ({
  className,
  style,
  battleId,
  gen,
  playerKey = 'p1',
  field,
  onFieldChange,
}: FieldCalcProps): JSX.Element => {
  const colorScheme = useColorScheme();

  const legacy = detectLegacyGen(gen);

  const {
    weather,
    terrain,
    attackerSide: p1Side,
    defenderSide: p2Side,
  } = field || {};

  const attackerSide = playerKey === 'p1' ? p1Side : p2Side;
  const defenderSide = playerKey === 'p1' ? p2Side : p1Side;

  return (
    <TableGrid
      className={cx(
        styles.container,
        !!colorScheme && styles[colorScheme],
        className,
      )}
      style={style}
    >
      {/* table headers */}
      <TableGridItem
        className={styles.label}
        align="left"
        header
      >
        {/* Your Screens */}
        &uarr; Screens
      </TableGridItem>
      <TableGridItem
        className={styles.label}
        header
      >
        Weather
      </TableGridItem>
      <TableGridItem
        className={styles.label}
        header
      >
        Terrain
      </TableGridItem>
      <TableGridItem
        className={styles.label}
        align="right"
        header
      >
        {/* Their Screens */}
        Screens &darr;
      </TableGridItem>

      {/* player's screens */}
      <TableGridItem align="left">
        <Button
          className={cx(
            styles.toggleButton,
            !attackerSide?.isLightScreen && styles.inactive,
          )}
          labelClassName={styles.toggleButtonLabel}
          label="Light"
          onPress={() => onFieldChange?.({
            attackerSide: {
              ...attackerSide,
              isLightScreen: !attackerSide?.isLightScreen,
            },
          })}
        />
        {' '}

        <Button
          className={cx(
            styles.toggleButton,
            !attackerSide?.isReflect && styles.inactive,
          )}
          labelClassName={styles.toggleButtonLabel}
          label="Reflect"
          onPress={() => onFieldChange?.({
            attackerSide: {
              ...attackerSide,
              isReflect: !attackerSide?.isReflect,
            },
          })}
        />

        {' '}
        <Button
          className={cx(
            styles.toggleButton,
            !attackerSide?.isAuroraVeil && styles.inactive,
          )}
          labelClassName={styles.toggleButtonLabel}
          label="Aurora"
          disabled={legacy}
          onPress={() => onFieldChange?.({
            attackerSide: {
              ...attackerSide,
              isAuroraVeil: !attackerSide?.isAuroraVeil,
            },
          })}
        />
      </TableGridItem>

      {/* weather */}
      <TableGridItem>
        <Dropdown
          style={{ textAlign: 'left' }}
          aria-label="Field Weather"
          hint={gen === 1 ? 'N/A' : 'None'}
          input={{
            name: `FieldCalc:Weather:${battleId || '???'}`,
            value: weather,
            onChange: (updatedWeather: CalcdexBattleField['weather']) => onFieldChange?.({
              weather: updatedWeather,
            }),
          }}
          options={(gen > 5 ? WeatherNames : [
            ...LegacyWeatherNames,
            gen > 2 && WeatherMap.hail,
          ].filter(Boolean).sort()).map((name) => ({
            label: name,
            value: name,
          }))}
          noOptionsMessage="No Weather"
          disabled={gen === 1}
        />
      </TableGridItem>

      {/* terrain */}
      <TableGridItem>
        <Dropdown
          style={{ textAlign: 'left' }}
          aria-label="Field Terrain"
          hint={gen < 6 ? 'N/A' : 'None'}
          input={{
            name: `FieldCalc:Terrain:${battleId || '???'}`,
            value: terrain,
            onChange: (updatedTerrain: CalcdexBattleField['terrain']) => onFieldChange?.({
              terrain: updatedTerrain,
            }),
          }}
          options={TerrainNames.map((name) => ({
            label: name,
            value: name,
          }))}
          noOptionsMessage="No Terrain"
          disabled={gen < 6}
        />
      </TableGridItem>

      {/* opponent's screens */}
      <TableGridItem align="right">
        <Button
          className={cx(
            styles.toggleButton,
            !defenderSide?.isLightScreen && styles.inactive,
          )}
          labelClassName={styles.toggleButtonLabel}
          label="Light"
          onPress={() => onFieldChange?.({
            defenderSide: {
              ...defenderSide,
              isLightScreen: !defenderSide?.isLightScreen,
            },
          })}
        />

        {' '}
        <Button
          className={cx(
            styles.toggleButton,
            !defenderSide?.isReflect && styles.inactive,
          )}
          labelClassName={styles.toggleButtonLabel}
          label="Reflect"
          onPress={() => onFieldChange?.({
            defenderSide: {
              ...defenderSide,
              isReflect: !defenderSide?.isReflect,
            },
          })}
        />

        {' '}
        <Button
          className={cx(
            styles.toggleButton,
            !defenderSide?.isAuroraVeil && styles.inactive,
          )}
          labelClassName={styles.toggleButtonLabel}
          label="Aurora"
          disabled={legacy}
          onPress={() => onFieldChange?.({
            // ...field,
            defenderSide: {
              ...defenderSide,
              isAuroraVeil: !defenderSide?.isAuroraVeil,
            },
          })}
        />
      </TableGridItem>
    </TableGrid>
  );
};
