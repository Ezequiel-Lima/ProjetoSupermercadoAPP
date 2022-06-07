import { ProdutoService } from './../produto/produto.service';
import { Stock } from './../../utils/stock';
import { EstoqueService } from './estoque.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../utils/product';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {
  public stock: Stock[] = [];
  public product: Product[] = [];
  filterTerm: string = "";

  public stockSelecionado: Stock = new Stock();

  title = 'appBootstrap';

  closeResult: string = '';

  constructor(private modalService: NgbModal,
    private service: EstoqueService, private formBuilder: FormBuilder, private http: HttpClient, private productService: ProdutoService) { }

  Form = this.formBuilder.group({
      productId: [],
      productName: [],
      productQuantity: []
  });

  FormEdit = this.formBuilder.group({
    id: [],
    productQuantity: []
});

  ngOnInit(): void {
    this.carregarObjetos();
    this.carregarProduto();
  }

  carregarProduto() {
    this.productService.getAll().subscribe(
      (product: Product[]) => {
        this.product = product;
        console.log(this.product);
      },
      (erro: any) => {
        console.error(erro);
      }
    );
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

  public async post(){
    await this.service.create(this.Form.value).subscribe(res => {
      console.log(res, "testetete");
      this.refreshObj();
    },
    (erro) => {
      if (erro.status == 400) {
        console.log(erro);
      }
    });
  }

  public getById(stock: number){
    this.service.getById(stock).subscribe(res =>{
      this.stockSelecionado = res;
    })
  }

  onSelect(selectedItem: Stock) {
    this.getById(selectedItem.id); 
  }

  openEdit(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public async put(stock: Stock){
    await this.service.put(stock).subscribe(res => {
      console.log(res);
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
    .then(res => this.stock = res as Stock[]);
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

  public async delete(stock: Stock){
    await this.service.delete(stock.id.toString()).subscribe(res => {
      this.refreshObj();
      console.log(res);
    },

    (erro) => {
      if (erro.status == 400) {
        console.log(erro);
      }
    });
  }
}
