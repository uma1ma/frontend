import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  @Output() confirmAdd = new EventEmitter<any>();
  isUpdate:any;
  myForm: FormGroup;
  cardData:any
  constructor(private fb: FormBuilder,public bsModalRef: BsModalRef,private mainService: MainService) {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    if (this.cardData) {
      this.editCard()
    }
  }
  onSubmit(): void {
    if (this.myForm.valid) {
      if(!this.cardData || !this.isUpdate){
        this.mainService.createItem(this.myForm.value).subscribe(
          response => {
            console.log('Item created successfully', response);
            this.confirmAdd.emit(true);
            this.bsModalRef.hide();
            // Handle successful response
          },
          error => {
            console.error('Error creating item', error);
            // Handle error response
          }
        );
      }
      else {
        this.mainService.updateItem(this.cardData.id, this.myForm.value).subscribe(
          response => {
            console.log('Item created successfully', response);
            this.confirmAdd.emit(true);
            this.bsModalRef.hide();
            // Handle successful response
          },
          error => {
            console.error('Error creating item', error);
            // Handle error response
          }
        );
      }
      
    }
  }

  decline(): void {
    this.bsModalRef.hide();
  }
  editCard(): void {
    this.myForm.setValue({
      title: this.cardData.name,
      description: this.cardData.description
    });
  }
}
