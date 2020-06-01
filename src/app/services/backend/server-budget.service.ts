import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_URL } from 'src/environments/environment';
import { BudgetCategory } from 'src/app/models/budgetCategory';

@Injectable({
  providedIn: 'root'
})
export class ServerBudgetService extends ServerService {

  constructor(private http: HttpClient) {
    super();
  }

  public changeBudgetValue(budgetCategory: BudgetCategory): Observable<any> {
    return this.http.patch(`${SERVER_URL}/orcamentos`, budgetCategory, this.httpOptions);
  }
}
