import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  unsubscription: Subscription;

  constructor() {

    this.unsubscription = this.regresaObservable().pipe(
      retry(2)
    )
      .subscribe(
      numero => console.log ( 'Subs:', numero ),
      error => console.log( 'Error en el observer, ', error ),
      () => console.log( 'El observer termino !!!' )
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscription.unsubscribe();
  }

  regresaObservable (): Observable<any> {
    return new Observable(
      ( observer: Subscriber<any> ) => {

        let contador = 0;

        let interval = setInterval( () => {

          contador ++;
          const salida = { valor: contador };

          observer.next( salida );

          /* if ( contador === 3 ) {
            clearInterval( interval );
            observer.complete();
          } */

          /* if ( contador === 2 ) {
            clearInterval( interval );
            observer.error( 'Auxilio !!!' );
          } */

        }
        , 1000);
      }
    ).pipe(
      map( resp => resp.valor ),
      filter( ( valor, index ) => {

        if ( ( valor % 2 ) === 1 ) {
          // true
          return true;
        } else {
          // false
          return false;
        }
      } )
    );
  }
}
