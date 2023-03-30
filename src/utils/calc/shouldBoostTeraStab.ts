import { formatId } from '@showdex/utils/app';
import { getDexForFormat } from '@showdex/utils/battle';
import type { MoveName } from '@smogon/calc/dist/data/interface';
import type { CalcdexPokemon } from '@showdex/redux/store';
import { calcHiddenPower } from './calcHiddenPower';

/**
 * Whether the Terastallized STAB move's BP should be boosted to 60.
 *
 * @since 1.1.2
 */
export const shouldBoostTeraStab = (
  format: string,
  pokemon: CalcdexPokemon,
  moveName: MoveName,
): boolean => {
  const dex = getDexForFormat(format);
  const move = dex.moves.get(moveName);

  if (!move?.exists || !pokemon?.teraType) {
    return false;
  }

  const moveId = move.id || formatId(moveName);

  const basePower = moveId.startsWith('hiddenpower')
    ? calcHiddenPower(format, pokemon)
    : move.basePower || 0;

  const abilityId = formatId(pokemon.dirtyAbility || pokemon.ability);
  const hasTechnician = abilityId === 'technician';

  return pokemon.terastallized
    && move.type === pokemon.teraType
    && basePower < 60
    && (!hasTechnician || Math.floor(basePower * 1.5) < 60)
    && !move.multihit
    && !move.priority;
};