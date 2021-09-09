import './style.css';
import { of, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

// Example Observable.
const parameters$ = combineLatest<
  [string | null, string | null, string | null]
>([
  of<string | null>('foo'),
  of<string | null>('bar'),
  of<string | null>(null)
]);

// #### Naming and/or typing parameers
// Named parameters (foo and bar).
const namedParameters$ = parameters$.pipe(
  filter(([foo, bar]) => foo !== null && bar !== null)
);

// Typed parameters (string and string).
const typedParameters$ = parameters$.pipe(
  filter((params): params is [string, string, string] => !params.includes(null))
);

// Named and typed parameters.
const namedTypedParameters$ = parameters$.pipe(
  filter(
    ([foo, bar, other]: [string, string, string]) =>
      foo !== null && bar !== null && other !== null
  )
);

// #### Dropping values ####
// Named and typed parameters, only keep first item.
const fooNamedTypedParameters$ = parameters$.pipe(
  filter(([foo]: [string, string, string]) => foo !== null)
);

// Named and typed parameters, only keep second item.
const barNamedTypedParameters$ = parameters$.pipe(
  filter(([, bar]: [string, string, string]) => bar !== null)
);

// Named and typed parameters, only keep third item.
const otherNamedTypedParameters$ = parameters$.pipe(
  filter(([, , other]: [string, string, string]) => other !== null)
);

// Named and typed parameters, but drop some using the spread operator.
const spreadNamedTypedParameters$ = parameters$.pipe(
  filter(
    ([foo, ...others]: [string, ...string[]]) =>
      foo !== null && others.includes(null)
  )
);
