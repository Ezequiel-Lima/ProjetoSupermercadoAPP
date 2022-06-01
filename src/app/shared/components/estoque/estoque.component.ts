import { Stock } from './../../utils/stock';
import { EstoqueService } from './estoque.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {
  public stock: Stock[] = [];

  title = 'appBootstrap';

  closeResult: string = '';

  constructor(private modalService: NgbModal,
    private service: EstoqueService, private formBuilder: FormBuilder) { }

  Form = this.formBuilder.group({
      name: [],
      productQuantity: []
  });

  ngOnInit(): void {
    this.carregarObjetos();
  }

  carregarObjetos() {
    this.service.getAll().subscribe(
      (stock: Stock[]) => {
        this.stock = stock;
        console.log(this.stock);
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
