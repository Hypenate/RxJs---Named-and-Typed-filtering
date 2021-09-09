import './style.css';

import { of, map, combineLatest, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

// Can be null or string for example purpose.
const parameters$ = combineLatest([
  of<string | null>('foo'),
  of<string | null>(null)
]);

// Named parameters (foo and bar).
const namedParameters$ = parameters$.pipe(
  filter(([foo, bar]) => foo !== null && bar !== null)
);

// Named parameters (foo and bar) in a desctructed manner.
const destructedNamedParameters$ = parameters$.pipe(
  filter(([foo, bar]) => foo !== null && bar !== null)
);

// Typed parameters (string and string)
const typedParameters$ = parameters$.pipe(
  filter((params): params is [string, string] => !params[0].includes(null))
);

// Named and typed parameters (foo: string and bar: string
const namedTypedParameters$ = parameters$.pipe(
  filter(([foo, bar]: [string, string]) => foo !== null && bar !== null)
);
