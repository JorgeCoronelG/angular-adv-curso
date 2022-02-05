import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from "rxjs";
import { take, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs!: Subscription;

  constructor() {
    /*this.retornaObservable()
      .pipe(
        retry(2)
      )
      .subscribe({
        next: value => console.log('subs:', value),
        error: (error) => console.warn('error:', error),
        complete: () => console.log('terminado')
      });*/

    this.intervalSubs = this.retornaIntervalo()
      .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  public retornaIntervalo(): Observable<number> {
    return interval(1000)
      .pipe(
        // take(10),
        map<number, number>(value => value + 1),
        filter(value => value % 2 === 0)
      );
  }

  public retornaObservable(): Observable<number> {
    let i = 0;

    return new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i == 2) {
          clearInterval(intervalo);
          observer.error('Llegó al valor de 2');
        }
      }, 1000);
    });
  }

}
