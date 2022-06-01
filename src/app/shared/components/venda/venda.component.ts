import { VendaService } from './venda.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sales } from '../../utils/sales';
import { FormBuilder } from '@angular/forms';
import { ProdutoService } from '../produto/produto.service';
import { Product } from '../../utils/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {
  public sales: Sales[] = [];
  public product: Product[] = [];

  title = 'appBootstrap';

  closeResult: string = '';

  Form = this.formBuilder.group({
    productId: [],
    productName: [],
    productQuantitySales: [],
});

  constructor(private modalService: NgbModal, private service: VendaService, private formBuilder: FormBuilder, private productService: ProdutoService, private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarObjetos();
    this.carregarProduto();
  }

  carregarProduto() {
    this.productService.getAll().subscribe(
      (product: Product[]) => {
        this.product = product;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  public async post(){
    console.log(this.Form.value, "gustavo mama pa crl");
    await this.service.create(this.Form.value).subscribe(res => {
      this.refreshObj();
    },
    (erro) => {
      if (erro.status == 400) {
        console.log(erro);
      }
    });
  }

  refreshObj(){
    this.http.get(this.service.baseUrl).toPromise()
    .then(res => this.sales = res as Sales[]);
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
    this.carregarProduto();
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
