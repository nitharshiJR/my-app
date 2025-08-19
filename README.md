RxJs is a library in js. use to handle async data.
RxJs use to appevents, Http reqs
# Rxjs main
   observable-special data structure
   send multiple values over time not a same time
   every time a new data update
# why use RxJs in angular
    handle async http reqs
    manage click,scrolls
    form changes track in reactive form
    give communication methods for components

 # why use observable
   *mutiple emitions(send)
   *lazy execution- if your wish you can subscribe and start 
   *cancelation-if you want you can stop data then resources can save.

   # RxJs concepts
   1. cold vs hot observable
      cold observable - if we give subscription then it will start otherwise its cant start.
      Hot observable -  automatically start to send data.even we dont give subscription to start
   2. multicasting
       ex: live tv everyone see same show
   3. operators/functions
        modify data stream (stream is data flow)
           map - transform data
           filter - filter data
           merge - combine two streams
   *without promisses we can using call back. but callback is look messy
   *promise returns one value then stops.
   *observable can return multiple values over time and can be cancelled.its used for http calls,user input events, timers, intervals
 
 # Subscribing to observables
 to consume data from an observable then need to subscribe.
           observable.subscribe({
              next: value => console.log(value),
              error: err => console.error(err),
              complete: () => console.log('Done!'),
           });
# unsubscribing
always unsubscribe from observables to avaoid memory leaks.
         const subscription = observable.subscribe(data => console.log(data));
         subscription.unsubscribe();

# map -> transforms data
       import { of } from 'rxjs';
   import { map } from 'rxjs/operators';

   of(1, 2, 3)
     .pipe(map((x) => x * 2))
     .subscribe((value) => console.log(value));
   // Output: 2, 4, 6

# filter -> Filters values based on a condition.
       import { filter } from 'rxjs/operators';

        of(1, 2, 3, 4, 5)
            .pipe(filter((x) => x % 2 === 0))
             .subscribe((value) => console.log(value));
   // Output: 2, 4 

# take -> limits the number of emitted values
          import { take } from 'rxjs/operators';

   of(1, 2, 3, 4, 5)
     .pipe(take(3))
     .subscribe((value) => console.log(value));
   // Output: 1, 2, 3

   # unsubscribe to avoid memory leaks
      import { interval, Subscription } from 'rxjs';

// interval(1000) → emits 0, 1, 2, 3... every 1 second
const myObservable = interval(1000);

let subscription: Subscription = myObservable.subscribe((value) => {
  console.log('Value emitted:', value);
});

// Unsubscribe after 3 seconds
setTimeout(() => {
  console.log('Unsubscribing now...');
  subscription.unsubscribe();
}, 3000);

 # use asyncpipe in templates
 to avoid manual subscription, use the angular asyncpipe
 <div *ngIf="data$ | async as data">
  {{ data }}
</div>

# combine operators for complex logic
chain multiple operators for complex transformations

import { of } from 'rxjs';
   import { map, filter } from 'rxjs/operators';

   of(1, 2, 3, 4, 5)
     .pipe(
       filter((x) => x % 2 === 0),
       map((x) => x * 10)
     )
     .subscribe((value) => console.log(value));
   // Output: 20, 40

# why use pipe'
    modify data , filter unwanted values , apply logic  
     
     
     import { of } from 'rxjs';
      import { map, filter } from 'rxjs/operators';
     const numbers$ = of(1, 2, 3, 4, 5);
    numbers$
    .pipe(
    filter((n) => n % 2 === 0), // Only even numbers
    map((n) => n * 10)         // Multiply by 10
    )
    .subscribe(console.log);
# tap operator (import)
 used to side effects. example debug,logging but doesnt change data flow

   source$
  .pipe(
    tap((value) => console.log('Before processing:', value)),
    map((value) => value * 2),
    tap((value) => console.log('After processing:', value))
  )
  .subscribe();

 # Error handelling 
      if there errors in RxJs then entire pipeline will be stopped. so we put catch error & retry.

   import { of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const source$ = throwError('Error occurred!');

source$
  .pipe(
    retry(2), // 2 times retry 
    catchError((err) => of('Fallback value')) // error fallback-a use 
  )
  .subscribe(console.log);

  # practical 
      import { from } from 'rxjs';
      import { filter, map, tap } from 'rxjs/operators';

const users$ = from([
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
]);

users$
  .pipe(
    filter((user) => user.age > 30), // Select users older than 30
    map((user) => user.name),       // Extract usernames
    tap((name) => console.log('Selected user:', name)) // Log usernames
  )
  .subscribe();  
   
   # fromEvent
    using formEvent is help to handle input changes, button clicking and other Dom events in a reactive way.
        import { fromEvent } from 'rxjs';
         import { map, debounceTime } from 'rxjs/operators';

// Reference the input element
const searchInput = document.getElementById('search');

// Create an observable for the input's 'input' event
const searchObservable = fromEvent(searchInput, 'input')
  .pipe(
    map((event) => event.target.value), // Extract the input value
    debounceTime(300)                  // Delay emissions for better performance
  );

// Subscribe to the observable
searchObservable.subscribe((value) => {
  console.log('Search query:', value);
});
# imperative vs declarative
i-> step by step instructions, for loops&if conditions manual state update
d-> describe desired outcome,RxJs operators,fromevent 
    
# changeDetection: ChangeDetectionStrategy.OnPush,
 default mode- every few seconds you want to check the updates. if its there no updates
 onpush mode - checks only when the update happen

 # probably used interval just to test subscription working.
 But for real PostService → backend data fetch, you don’t need interval.

 # imperative style 
 focus on how to do it, write explicit instructions, you manually control the data
# declarative style
focus on what the outcome should come on, like give a condition .
ex: i want posts but only those where age >18

# fork join
It takes multiple Observables as input, runs them all in parallel, and emits the last emitted value of each Observable as an array once all of them complete.

# combine latest
combineLatest combines the latest emitted values from multiple Observables.

It emits a new array/value every time any of the input Observables emits, but only after all Observables have emitted at least once.

Unlike forkJoin, it does not wait for Observables to complete.