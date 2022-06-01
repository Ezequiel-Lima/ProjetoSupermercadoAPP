import { ProdutoService } from './produto.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../utils/product';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  public product: Product[] = [];

  title = 'appBootstrap';

  closeResult: string = '';

  constructor(private modalService: NgbModal,
    private service: ProdutoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.carregarObjetos();
  }

  carregarObjetos() {
    this.service.getAll().subscribe(
      (product: Product[]) => {
        this.product = product;
        console.log(this.product);
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
