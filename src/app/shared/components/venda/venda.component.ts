import { VendaService } from './venda.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sales } from '../../utils/sales';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {
  public sales: Sales[] = [];

  title = 'appBootstrap';

  closeResult: string = '';

  constructor(private modalService: NgbModal, private service: VendaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.carregarObjetos();
  }

  carregarObjetos() {
    this.service.getAll().subscribe(
      (sales: Sales[]) => {
        this.sales = sales;
        console.log(this.sales);
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
