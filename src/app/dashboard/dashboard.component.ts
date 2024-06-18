import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { CardComponent } from '../card/card.component';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  modalRef!: BsModalRef;
  cardData:any = [
  ]
  constructor(private modalService: BsModalService, private mainService : MainService){}

  ngOnInit(): void {
    this.getAllItems()
  }
  deleteCard(id:any) {
    const initialState = {
      cardID: id
    }
    this.modalRef = this.modalService.show(ConfirmationComponent, {initialState});
    this.modalRef.content.confirmDelete.subscribe((confirmedID: any) => {
      this.cardData = this.cardData.filter((data:any)=>data.id != confirmedID)
    });
  }
  editCard(data:any) {
    const initialState = {
      cardData: data,
      isUpdate: true
    }
    this.modalRef = this.modalService.show(CardComponent, {initialState});
    this.modalRef.content.confirmAdd.subscribe((confirm: any) => {
      if(confirm) {
        this.getAllItems()
      }
    });
  }
  addCard() {
    this.modalRef = this.modalService.show(CardComponent);
    this.modalRef.content.confirmAdd.subscribe((confirm: any) => {
      if(confirm) {
        this.getAllItems()
      }
    });
  }
  getAllItems() {
    this.mainService.getItem().subscribe(items=>{
      console.log(items)
      this.cardData = items
    })
  }
}
