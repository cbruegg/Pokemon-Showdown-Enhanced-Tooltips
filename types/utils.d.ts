/**
 * Construct a type with the properties of `T` replaced with those of `R`.
 *
 * @example
 * type ItemId = { id: string; getId: () => string; hasId: () => boolean; };
 * type ItemNumId = Modify<ItemId, { id: number; getId: () => number; }>;
 * // -> { id: number; getId: () => number; hasId: () => boolean; }
 * type ItemTId<T> = Modify<ItemId, { id: T; getId: () => T; }>;
 * @since 0.1.0
 */
declare type Modify<T, R> = Omit<T, keyof R> & R;

/**
 * Construct a literal type with the keys of the indexable type `T` whose types extend the literal type `K`.
 *
 * @example
 * type Sosig = {
 *   fatness: number;
 *   color: number;
 *   gain: number;
 *   reset: () => void;
 * };
 * type SosigParams = ExtractKeys<Sosig, number>;
 * // -> 'fatness' | 'color' | 'gain'
 * @since 0.1.0
 */
declare type ExtractKeys<T, K> = { [I in keyof T]: T[I] extends K ? I : never; }[keyof T];

/**
 * Construct an array of literal tuples containing the keys of the indexable type `T` and the type of the corresponding value.
 *
 * * Most useful for declaring the `[key, value]` types in `Object.entries()`.
 *
 * @example
 * const sosig: Sosig = {
 *   fatness: 100,
 *   color: 100,
 *   gain: 6,
 *   reset: () => {},
 * };
 * type SosigEntries = Extract<typeof sosig>;
 * // -> (['fatness', number] | ['color', number] | ['gain', number], ['reset', () => void])[]
 * @since 0.1.0
 */
declare type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];

/* eslint-disable @typescript-eslint/ban-types */

/**
 * Construct a literal type of the property keys of `T` whose types are those of `Function`.
 *
 * * Primarily used as a helper type for the type `FunctionProperties<T>`.
 *
 * @since 0.1.0
 */
declare type FunctionPropertyNames<T> = ExtractKeys<T, Function>;

/* eslint-enable @typescript-eslint/ban-types */

/**
 * Construct a type with the properties of `T` whose types are those of `Function`.
 *
 * * Useful if you want to extend just the functions of a class or interface.
 *
 * @since 0.1.0
 */
declare type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

/**
 * Construct a literal type of the property keys of `T` whose types are **not** those of `Function`.
 *
 * * Primarily used as a helper type for the type `NonFunctionProperties<T>`.
 *
 * @since 0.1.0
 */
declare type NonFunctionPropertyNames<T> = Exclude<keyof T, FunctionPropertyNames<T>>;

/**
 * Construct a type with the properties of `T` whose types **not** are those of `Function`.
 *
 * * Useful if you want to extend non-function properties of a class or interface.
 * * Also useful for defining a *lean* type for a class or interface.
 *
 * @since 0.1.0
 */
declare type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;