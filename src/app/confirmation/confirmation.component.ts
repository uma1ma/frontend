import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  cardID:any;
  @Output() confirmDelete = new EventEmitter<any>();

  constructor(public bsModalRef: BsModalRef, private mainService: MainService) {}

  confirm(): void {
    this.mainService.deleteItem(this.cardID).subscribe(res=>{
      this.confirmDelete.emit(this.cardID);
      this.bsModalRef.hide();
    })
    
  }

  decline(): void {
    this.bsModalRef.hide();
  }
}
