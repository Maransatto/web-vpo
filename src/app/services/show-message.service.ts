import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor(
    private toastr: ToastrService
  ) { }

  public success(message: string, title: string = 'Sucesso') {
    this.toastr.success(message, title, {
      timeOut: 5000,
      progressBar: true,
      easeTime: 500,
      closeButton: true
    });
  }

  public error(message: string, title: string = 'Hummm...') {
    this.toastr.error(message, title, {
      timeOut: 5000,
      progressBar: true,
      easeTime: 500,
      closeButton: true
    });
  }
}
