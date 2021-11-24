import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'app/core/types/list.types';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DispositivosService } from './dispositivos.services';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styleUrls: ['./dispositivos.component.scss']
})
export class DispositivosComponent implements OnInit {

  isLoading:boolean = false;
  dispositivos$:Observable<any>;
  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    private _router: Router,
    private _activatedRoute:ActivatedRoute,
    private _dispositivosServices:DispositivosService,
    
  ) {
    this.dispositivos$ = this._dispositivosServices.dispositivos$.pipe(
      takeUntil(this._unsubscribeAll)
    );
    this.pagination$ = this._dispositivosServices.pagination$;

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this._dispositivosServices
      .getDispositivos(this._activatedRoute.snapshot.queryParams)
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
