import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'app/core/types/list.types';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ListadoDispositivoService } from './listado.services';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  isLoading:boolean = false;
  dispositivos$:Observable<any>;
  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    private _router: Router,
    private _routeActived:ActivatedRoute,
    private _listadoService:ListadoDispositivoService,
    
  ) {
    this.dispositivos$ = this._listadoService.dispositivos$.pipe(
      takeUntil(this._unsubscribeAll)
    );
    this.pagination$ = this._listadoService.pagination$;

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this._listadoService
      .getDispositivos(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

   /**
   * On destroy
   */
    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }
  

}
